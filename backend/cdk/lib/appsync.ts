import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';
import * as cognito from '@aws-cdk/aws-cognito';
import * as lambda from '@aws-cdk/aws-lambda';


import { AadAuthStack } from './auth';
import { DynamoDbStack } from './dynamodb';

interface AppsyncStackProps {
  authStack: AadAuthStack;
  dynamoDbStack: DynamoDbStack;
  stackProps: cdk.StackProps;
}

export class AppsyncStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope: cdk.Construct, id: string, props: AppsyncStackProps) {
    super(scope, id, props.stackProps)

    const env = process.env.ENV;

    // GraphQLApi creation

    const api = new appsync.GraphQLApi(this, `onetask-${env}-appsync`, {
      name: `onetask-${env}-appsync-cdk`,
      logConfig: {
        fieldLogLevel: appsync.FieldLogLevel.ALL,
      },
      userPoolConfig: { userPool: props.authStack.user_pool_main },
      schemaDefinitionFile: `${__dirname}/../../api/amplify/backend/api/onetask/build/schema.graphql`
    });

    const activityDS = api.addDynamoDbDataSource('ActivityDS', 'The activity data source', props.dynamoDbStack.activityTable);
    const userDS = api.addDynamoDbDataSource('userDS', 'Data source for Users Table', props.dynamoDbStack.usersTable);
    const mentionDS = api.addDynamoDbDataSource('MentionDS', 'Data source for Mention Table', props.dynamoDbStack.mentionTable);
    const messageDS = api.addDynamoDbDataSource('MessagesDS', 'Data source for Messages Table', props.dynamoDbStack.messageTable);
    const notificationsDS = api.addDynamoDbDataSource('NotificiationsDS', 'Data source for Notifications Table', props.dynamoDbStack.notificationsTable);
    const topicDS = api.addDynamoDbDataSource('TopicDS', 'Data Source for Topic Table', props.dynamoDbStack.topicsTable);
    const topicMemberDS = api.addDynamoDbDataSource('topicMemberDS', 'Data Source for Topic Member Table', props.dynamoDbStack.topicsMembersTable);

    const deleteValidTopicMemberResolver = new lambda.Function(this, 'deleteValidTopicMemberResolver', {
      functionName: 'deleteValidTopicMemberResolver',
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(__dirname + '/../lambda/deleteValidTopicMemberResolver/src/'),
      environment: {
        REGION: this.region,
        TOPIC_MEMBER_TABLE: props.dynamoDbStack.topicsMembersTable.tableName
      }
    })

    const topicMemberLambdaDs = api.addLambdaDataSource('topicMemberLambdaDS', 'Lambda Data Source for Topic Member', deleteValidTopicMemberResolver);

    const amplifyBuildPath = `${__dirname}/../../api/amplify/backend/api/onetask/`
    const resolversPath = `${amplifyBuildPath}build/resolvers`

    const customResolversPath = `${amplifyBuildPath}resolvers`
    // Activity Resolver

    topicMemberDS.createResolver({
      typeName: 'Activity',
      fieldName: 'member',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Activity.member.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Activity.member.res.vtl`),
    });

    mentionDS.createResolver({
      typeName: 'Activity',
      fieldName: 'mention',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Activity.mention.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Activity.mention.res.vtl`),
    });

    messageDS.createResolver({
      typeName: 'Activity',
      fieldName: 'message',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Activity.message.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Activity.message.res.vtl`),
    })

    notificationsDS.createResolver({
      typeName: 'Activity',
      fieldName: 'notifications',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Activity.notifications.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Activity.notifications.res.vtl`),
    })

    topicDS.createResolver({
      typeName: 'Activity',
      fieldName: 'topic',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Activity.topic.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Activity.topic.res.vtl`),
    })

    userDS.createResolver({
      typeName: 'Activity',
      fieldName: 'user',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Activity.user.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Activity.user.res.vtl`),
    })


    // Mention Resolver

    activityDS.createResolver({
      typeName: 'Mention',
      fieldName: 'activity',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mention.activity.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mention.activity.res.vtl`),
    })

    userDS.createResolver({
      typeName: 'Mention',
      fieldName: 'owner',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mention.owner.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mention.owner.res.vtl`),
    });

    userDS.createResolver({
      typeName: 'Mention',
      fieldName: 'target',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mention.target.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mention.target.res.vtl`),
    });

    topicDS.createResolver({
      typeName: 'Mention',
      fieldName: 'topic',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mention.topic.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mention.topic.res.vtl`),
    });


    // Message Resolvers

    activityDS.createResolver({
      typeName: 'Message',
      fieldName: 'activity',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Message.activity.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Message.activity.res.vtl`),
    })

    topicDS.createResolver({
      typeName: 'Message',
      fieldName: 'topic',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Message.topic.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Message.topic.res.vtl`),
    });

    // Notifications Resolver

    activityDS.createResolver({
      typeName: 'Notification',
      fieldName: 'activity',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Notification.activity.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Notification.activity.res.vtl`),
    })

    userDS.createResolver({
      typeName: 'Notification',
      fieldName: 'user',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Notification.user.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Notification.user.res.vtl`),
    })

    // Topic Resolver

    activityDS.createResolver({
      typeName: 'Topic',
      fieldName: 'activity',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Topic.activity.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Topic.activity.res.vtl`),
    })

    topicDS.createResolver({
      typeName: 'Topic',
      fieldName: 'children',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Topic.children.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Topic.children.res.vtl`),
    });

    topicMemberDS.createResolver({
      typeName: 'Topic',
      fieldName: 'members',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Topic.members.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Topic.members.res.vtl`),
    });

    mentionDS.createResolver({
      typeName: 'Topic',
      fieldName: 'mentions',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Topic.mentions.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Topic.mentions.res.vtl`),
    });

    messageDS.createResolver({
      typeName: 'Topic',
      fieldName: 'messages',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Topic.messages.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Topic.messages.res.vtl`),
    });

    topicDS.createResolver({
      typeName: 'Topic',
      fieldName: 'nodes',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Topic.nodes.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Topic.nodes.res.vtl`),
    });

    userDS.createResolver({
      typeName: 'Topic',
      fieldName: 'owner',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Topic.owner.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Topic.owner.res.vtl`),
    });


    topicDS.createResolver({
      typeName: 'Topic',
      fieldName: 'parent',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Topic.parent.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Topic.parent.res.vtl`),
    });

    topicDS.createResolver({
      typeName: 'Topic',
      fieldName: 'root',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Topic.root.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Topic.root.res.vtl`),
    });

    // Topic Member Resolver

    activityDS.createResolver({
      typeName: 'TopicMember',
      fieldName: 'activity',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/TopicMember.activity.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/TopicMember.activity.res.vtl`),
    })

    topicDS.createResolver({
      typeName: 'TopicMember',
      fieldName: 'topic',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/TopicMember.topic.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/TopicMember.topic.res.vtl`),
    })

    userDS.createResolver({
      typeName: 'TopicMember',
      fieldName: 'user',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/TopicMember.user.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/TopicMember.user.res.vtl`),
    })


    // User Resolver

    activityDS.createResolver({
      typeName: 'User',
      fieldName: 'activity',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/User.activity.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/User.activity.res.vtl`),
    })

    topicMemberDS.createResolver({
      typeName: 'User',
      fieldName: 'memberships',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/User.memberships.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/User.memberships.res.vtl`),
    })

    mentionDS.createResolver({
      typeName: 'User',
      fieldName: 'mentions',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/User.mentions.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/User.mentions.res.vtl`),
    })

    notificationsDS.createResolver({
      typeName: 'User',
      fieldName: 'notifications',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/User.notifications.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/User.notifications.res.vtl`),
    })

    mentionDS.createResolver({
      typeName: 'User',
      fieldName: 'targets',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/User.targets.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/User.targets.res.vtl`),
    })

    topicDS.createResolver({
      typeName: 'User',
      fieldName: 'topics',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/User.topics.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/User.topics.res.vtl`),
    });


    // Mutations

    activityDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'createActivity',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.createActivity.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.createActivity.res.vtl`),
    })

    activityDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'deleteActivity',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.deleteActivity.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.deleteActivity.res.vtl`),
    })

    activityDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'updateActivity',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.updateActivity.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.updateActivity.res.vtl`),
    })

    mentionDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'createMention',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.createMention.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.createMention.res.vtl`),
    })

    mentionDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'deleteMention',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.deleteMention.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.deleteMention.res.vtl`),
    })

    mentionDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'updateMention',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.updateMention.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.updateMention.res.vtl`),
    })


    messageDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'createMessage',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.createMessage.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.createMessage.res.vtl`),
    })


    messageDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'updateMessage',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.updateMessage.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.updateMessage.res.vtl`),
    })


    messageDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'deleteMessage',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.deleteMessage.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.deleteMessage.res.vtl`),
    })


    notificationsDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'createNotification',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.createNotification.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.createNotification.res.vtl`),
    })


    notificationsDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'updateNotification',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.updateNotification.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.updateNotification.res.vtl`),
    })


    notificationsDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'deleteNotification',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.deleteNotification.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.deleteNotification.res.vtl`),
    });


    topicDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'createTopic',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${customResolversPath}/Mutation.createTopic.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.createTopic.res.vtl`),
    })

    topicDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'updateTopic',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${customResolversPath}/Mutation.updateTopic.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.updateTopic.res.vtl`),
    })

    topicDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'deleteTopic',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.deleteTopic.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.deleteTopic.res.vtl`),
    })

    topicMemberDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'createTopicMember',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.createTopicMember.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.createTopicMember.res.vtl`),

    });

    topicMemberLambdaDs.createResolver({
      typeName: 'Mutation',
      fieldName: 'deleteValidTopicMember',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.deleteValidTopicMember.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.deleteValidTopicMember.res.vtl`),

    });

    topicMemberDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'updateTopicMember',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.updateTopicMember.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.updateTopicMember.res.vtl`),

    })

    userDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'createUser',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.createUser.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.createUser.res.vtl`),
    })


    userDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'updateUser',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.updateUser.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.updateUser.res.vtl`),

    })

    userDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'deleteUser',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.deleteUser.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Mutation.deleteUser.res.vtl`),
    })


    // Query Resolvers


    activityDS.createResolver({
      typeName: 'Query',
      fieldName: 'getActivity',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.getActivity.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.getActivity.res.vtl`),
    });


    mentionDS.createResolver({
      typeName: 'Query',
      fieldName: 'getMention',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.getMention.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.getMention.res.vtl`),
    });

    messageDS.createResolver({
      typeName: 'Query',
      fieldName: 'getMessage',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.getMessage.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.getMessage.res.vtl`),
    });



    notificationsDS.createResolver({
      typeName: 'Query',
      fieldName: 'getNotification',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.getNotification.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.getNotification.res.vtl`),
    });

    topicMemberDS.createResolver({
      typeName: 'Query',
      fieldName: 'getTopic',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.getTopic.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${customResolversPath}/Query.getTopic.res.vtl`),
    });

    topicMemberDS.createResolver({
      typeName: 'Query',
      fieldName: 'getTopicMember',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.getTopicMember.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.getTopicMember.res.vtl`),
    });


    userDS.createResolver({
      typeName: 'Query',
      fieldName: 'getUser',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.getUser.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.getUser.res.vtl`),
    });

    userDS.createResolver({
      typeName: 'Query',
      fieldName: 'listUsers',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.listUsers.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.listUsers.res.vtl`),
    });


    activityDS.createResolver({
      typeName: 'Query',
      fieldName: 'listActivitys',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.listActivitys.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.listActivitys.res.vtl`),
    });


    mentionDS.createResolver({
      typeName: 'Query',
      fieldName: 'listMentions',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.listMentions.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.listMentions.res.vtl`),
    });


    messageDS.createResolver({
      typeName: 'Query',
      fieldName: 'listMessages',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.listMessages.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.listMessages.res.vtl`),
    });


    notificationsDS.createResolver({
      typeName: 'Query',
      fieldName: 'listNotifications',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.listNotifications.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.listNotifications.res.vtl`),

    });


    topicMemberDS.createResolver({
      typeName: 'Query',
      fieldName: 'listTopicMembers',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.listTopicMembers.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.listTopicMembers.res.vtl`),
    });


    topicMemberDS.createResolver({
      typeName: 'Query',
      fieldName: 'listTopics',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.listTopics.req.vtl`),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(`${resolversPath}/Query.listTopics.res.vtl`),
    });

  }
}

