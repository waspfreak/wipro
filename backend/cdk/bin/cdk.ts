#!/usr/bin/env node

import { App, Construct, StackProps } from '@aws-cdk/core'
import { AadAuthStack } from '../lib/auth'
import { AppsyncStack } from '../lib/appsync'
import { DynamoDbStack } from '../lib/dynamodb'

import { config } from "dotenv"
import { resolve } from "path"

config()

// Fix for process.env variables seen as string | undefined by typescript
declare global
{
  namespace NodeJS 
  {
    export interface ProcessEnv {
        AWS_REGION: string,
        REGION: string,
        ENV: string,
        USER_POOL_DOMAIN: string,
        AZURE_AD_CONFIG_VALUE_CONFIG: string,
        ENV_APPSYNC: string,
        API_ONETASK_GRAPHQLAPIIDOUTPUT: string,
        AUTH_CONFIG_SECRET_ID: string,
        AUTH_CONFIG_SECRET_KEY_ARN: string, 
        AUTH_SECRET_KEY_ID: string,
        AUTH_SECRET_KEY_ARN: string
    }
  }
}

const envLondon = { region: 'eu-west-2' }

const app = new App()
// `lon-owot-dev-aad-auth-stack`

class BackendService extends Construct {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id);
        const dynamoDbStack = new DynamoDbStack(this, 'dynamodb', { env: envLondon } )
        const authStack = new AadAuthStack(this, `auth`, { dynamoDbStack, stackProps: { env: envLondon } })
        const appsyncStack = new AppsyncStack(this, `appsync`, { authStack, dynamoDbStack, stackProps: { env: envLondon } });
    }
}

const backendService = new BackendService(app, `backend-service-${process.env.ENV}`, { env: envLondon })

