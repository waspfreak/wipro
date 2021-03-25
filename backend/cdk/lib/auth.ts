import * as cdk from '@aws-cdk/core'
import * as cognito from '@aws-cdk/aws-cognito'
import * as lambda from '@aws-cdk/aws-lambda'
import * as sm from '@aws-cdk/aws-secretsmanager'
import * as iam from '@aws-cdk/aws-iam'
import * as kms from '@aws-cdk/aws-kms'

import { DynamoDbStack } from './dynamodb';

interface cognitoStackProps {
  dynamoDbStack: DynamoDbStack;
  stackProps: cdk.StackProps;
}

export class AadAuthStack extends cdk.Stack {
  public readonly user_pool_main: cognito.UserPool;
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope: cdk.Construct, id: string, props: cognitoStackProps) {
    super(scope, id, props.stackProps);

    const secretKey = kms.Key.fromKeyArn(this, process.env.AUTH_SECRET_KEY_ID, process.env.AUTH_SECRET_KEY_ARN)

    const config = sm.Secret.fromSecretAttributes(this, process.env.AUTH_CONFIG_SECRET_ID, {
      secretArn: process.env.AUTH_CONFIG_SECRET_KEY_ARN,
      encryptionKey: secretKey
    });

    const preTokenGeneration = new lambda.Function(this, `${id}-preTokenGeneration`, {
      functionName: `${id}-preTokenGeneration`,
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(__dirname + '/../lambda/pretokengeneration/'),
      environment: {
        REGION: this.region,
        API_ONETASK_GRAPHQLAPIIDOUTPUT: process.env.API_ONETASK_GRAPHQLAPIIDOUTPUT,
        ENV: id,
        ENV_APPSYNC: process.env.ENV_APPSYNC,
        TOPIC_MEMBER_TABLE: props.dynamoDbStack.topicsMembersTable.tableName
      }
    })

    preTokenGeneration.addToRolePolicy(new iam.PolicyStatement({
      resources: ['*'],
      actions: ['dynamodb:*']
    }))

    const postConfirmation = new lambda.Function(this, `${id}-postConfirmation`, {
      functionName: `${id}-postConfirmation`,
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(__dirname + '/../lambda/postconfirmation/'),
      environment: {
        REGION: this.region,
        API_ONETASK_GRAPHQLAPIIDOUTPUT: process.env.API_ONETASK_GRAPHQLAPIIDOUTPUT,
        ENV: id,
        ENV_APPSYNC: process.env.ENV_APPSYNC,
        USER_TABLE: props.dynamoDbStack.usersTable.tableName
      }
    })

    postConfirmation.addToRolePolicy(new iam.PolicyStatement({
      resources: ['*'],
      actions: ['dynamodb:*']
    }))

    this.user_pool_main = new cognito.UserPool(this, `${id}-user-pool`, {
      lambdaTriggers: {
        preTokenGeneration: preTokenGeneration,
        postConfirmation: postConfirmation
      }
    })

    const user_pool = this.user_pool_main.node.defaultChild as cognito.CfnUserPool;
    user_pool.autoVerifiedAttributes = [cognito.UserPoolAttribute.EMAIL]
    user_pool.usernameAttributes = [
      cognito.UserPoolAttribute.EMAIL
    ]
    user_pool.schema = [
      {
        mutable: true,
        name: 'email',
        required: false
      },
      {
        mutable: true,
        name: 'preferred_username',
        required: false
      }
    ]
    user_pool.emailVerificationMessage = 'Your verification code is {####}'
    user_pool.emailVerificationSubject = 'Your verification code'

    const azureAd = new cognito.CfnUserPoolIdentityProvider(this, `${id}-identity-provider`, {
      providerName: 'azuread',
      providerType: 'OIDC',
      userPoolId: user_pool.ref,
      attributeMapping: {
        email: 'preferred_username',
        preferred_username: 'oid'
      },
      providerDetails: {
        client_id: config.secretValueFromJson('msft_application_client_id'),
        client_secret: config.secretValueFromJson(process.env.AZURE_AD_CONFIG_VALUE_CONFIG),
        authorize_scopes: 'phone, email, profile, openid, aws.cognito.signin.user.admin',
        oidc_issuer: `https://sts.windows.net/${config.secretValueFromJson('msft_directory_tenant_id')}`,
        attributes_request_method: 'GET'
      }
    })

    const user_pool_client = new cognito.CfnUserPoolClient(this, `${id}-user-pool-client`, {
      allowedOAuthFlowsUserPoolClient: true,
      explicitAuthFlows: ['ALLOW_ADMIN_USER_PASSWORD_AUTH',
        'ALLOW_CUSTOM_AUTH',
        'ALLOW_USER_SRP_AUTH',
        'ALLOW_REFRESH_TOKEN_AUTH'],
      refreshTokenValidity: 30,
      userPoolId: user_pool.ref,
      supportedIdentityProviders: [azureAd.ref],
      callbackUrLs: ['otask://start'],
      logoutUrLs: ['otask://signout'],
      allowedOAuthFlows: ['code', 'implicit'],
      allowedOAuthScopes: ['phone', 'email', 'openid', 'aws.cognito.signin.user.admin', 'profile'],
      readAttributes: ['preferred_username', 'profile']
    })

    const identity_pool = new cognito.CfnIdentityPool(this, `${id}-identity-pool`, {
      allowUnauthenticatedIdentities: false,
      cognitoIdentityProviders: [{
        clientId: user_pool_client.ref,
        providerName: this.user_pool_main.userPoolProviderName
      }]
    })

    new iam.CfnRole(this, `authenticated-role-${id}`, {
      roleName: `authenticated-role-${id}`,
      assumeRolePolicyDocument: {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Effect": "Allow",
            "Principal": {
              "Federated": "cognito-identity.amazonaws.com"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
              "StringEquals": {
                "cognito-identity.amazonaws.com:aud": `${identity_pool.ref}`
              },
              "ForAnyValue:StringLike": {
                "cognito-identity.amazonaws.com:amr": "authenticated"
              }
            }
          }
        ]
      }
    })

    new iam.CfnRole(this, `unauthenticated-role-${id}`, {
      roleName: `unauthenticated-role-${id}`,
      assumeRolePolicyDocument: {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Effect": "Allow",
            "Principal": {
              "Federated": "cognito-identity.amazonaws.com"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
              "StringEquals": {
                "cognito-identity.amazonaws.com:aud": `${identity_pool.ref}`
              },
              "ForAnyValue:StringLike": {
                "cognito-identity.amazonaws.com:amr": "unauthenticated"
              }
            }
          }
        ]
      }
    })


    const user_pool_domain = new cognito.CfnUserPoolDomain(this, `${id}-user-pool-domain`, {
      domain: process.env.USER_POOL_DOMAIN,
      userPoolId: user_pool.ref
    })
  }
}

module.exports = { AadAuthStack }
