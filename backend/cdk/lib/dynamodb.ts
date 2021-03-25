import { StackProps } from '@aws-cdk/core';
import * as cdk from '@aws-cdk/core'
import * as dynamodb from '@aws-cdk/aws-dynamodb'

export class DynamoDbStack extends cdk.Stack {
  public readonly usersTable: dynamodb.Table
  public readonly topicsTable: dynamodb.Table
  public readonly topicsMembersTable: dynamodb.Table
  public readonly activityTable: dynamodb.Table
  public readonly mentionTable: dynamodb.Table
  public readonly messageTable: dynamodb.Table
  public readonly notificationsTable: dynamodb.Table

  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope: cdk.Construct, id: string, props: StackProps) {
    super(scope, id, props)

    this.usersTable = new dynamodb.Table(this, 'usersTable', {
      tableName: `usersTable-${process.env.ENV}`,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      },
      stream: dynamodb.StreamViewType.NEW_IMAGE,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });

    this.topicsTable = new dynamodb.Table(this, 'topicsTable', {
      tableName: `topicsTable-${process.env.ENV}`,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      },
      stream: dynamodb.StreamViewType.NEW_IMAGE,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });

    this.topicsTable.addGlobalSecondaryIndex({
      indexName: 'gsi-TopicOwner',
      partitionKey: {
        name: 'topicOwnerId',
        type: dynamodb.AttributeType.STRING
      }
    });

    this.topicsTable.addGlobalSecondaryIndex({
      indexName: 'gsi-TopicRoot',
      partitionKey: {
        name: 'topicRootId',
        type: dynamodb.AttributeType.STRING
      }
    });

    this.topicsTable.addGlobalSecondaryIndex({
      indexName: 'gsi-TopicParent',
      partitionKey: {
        name: 'topicParentId',
        type: dynamodb.AttributeType.STRING
      }
    });

    this.topicsMembersTable = new dynamodb.Table(this, 'topicsMemberTable', {
      tableName: `topicsMemberTable-${process.env.ENV}`,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      },
      stream: dynamodb.StreamViewType.NEW_IMAGE,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });

    this.topicsMembersTable.addGlobalSecondaryIndex({
      indexName: 'gsi-TopicMemberTopic',
      partitionKey: {
        name: 'topicParentId',
        type: dynamodb.AttributeType.STRING
      }
    });

    this.topicsMembersTable.addGlobalSecondaryIndex({
      indexName: 'gsi-TopicMemberUser',
      partitionKey: {
        name: 'topicMemberUserId',
        type: dynamodb.AttributeType.STRING
      }
    });

    this.activityTable = new dynamodb.Table(this, 'activityTable', {
      tableName: `activityTable-${process.env.ENV}`,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      },
      stream: dynamodb.StreamViewType.NEW_IMAGE,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });

    this.activityTable.addGlobalSecondaryIndex({
      indexName: 'gsi-TopicMemberActivity',
      partitionKey: {
        name: 'activityMemberId',
        type: dynamodb.AttributeType.STRING
      }
    });

    this.activityTable.addGlobalSecondaryIndex({
      indexName: 'gsi-MentionActivity',
      partitionKey: {
        name: 'activityMentionId',
        type: dynamodb.AttributeType.STRING
      }
    });

    this.activityTable.addGlobalSecondaryIndex({
      indexName: 'gsi-MessageActivity',
      partitionKey: {
        name: 'activityMessageId',
        type: dynamodb.AttributeType.STRING
      }
    });


    this.activityTable.addGlobalSecondaryIndex({
      indexName: 'gsi-TopicActivity',
      partitionKey: {
        name: 'activityTopicId',
        type: dynamodb.AttributeType.STRING
      }
    });

    this.activityTable.addGlobalSecondaryIndex({
      indexName: 'gsi-UserActivity',
      partitionKey: {
        name: 'activityUserId',
        type: dynamodb.AttributeType.STRING
      }
    });

    this.mentionTable = new dynamodb.Table(this, 'mentionTable', {
      tableName: `mentionTable-${process.env.ENV}`,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      },
      stream: dynamodb.StreamViewType.NEW_IMAGE,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });

    this.mentionTable.addGlobalSecondaryIndex({
      indexName: 'gsi-UserMentions',
      partitionKey: {
        name: 'mentionOwnerId',
        type: dynamodb.AttributeType.STRING
      }
    });

    this.mentionTable.addGlobalSecondaryIndex({
      indexName: 'gsi-TargetUser',
      partitionKey: {
        name: 'mentionTargetId',
        type: dynamodb.AttributeType.STRING
      }
    });

    this.mentionTable.addGlobalSecondaryIndex({
      indexName: 'gsi-TopicMentions',
      partitionKey: {
        name: 'mentionTopicId',
        type: dynamodb.AttributeType.STRING
      }
    });

    this.messageTable = new dynamodb.Table(this, 'messageTable', {
      tableName: `messageTable-${process.env.ENV}`,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      },
      stream: dynamodb.StreamViewType.NEW_IMAGE,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    })

    this.messageTable.addGlobalSecondaryIndex({
      indexName: 'gsi-TopicMessages',
      partitionKey: {
        name: 'messageTopicId',
        type: dynamodb.AttributeType.STRING
      }
    });

    this.notificationsTable = new dynamodb.Table(this, 'notificationsTable', {
      tableName: `notificationsTable-${process.env.ENV}`,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      },
      stream: dynamodb.StreamViewType.NEW_IMAGE,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });

    this.notificationsTable.addGlobalSecondaryIndex({
      indexName: 'ByCreatedAt',
      partitionKey: {
        name: 'createdAt',
        type: dynamodb.AttributeType.STRING
      }
    });

    this.notificationsTable.addGlobalSecondaryIndex({
      indexName: 'gsi-NotificationActivies',
      partitionKey: {
        name: 'notificationsActivityId',
        type: dynamodb.AttributeType.STRING
      }
    });

    this.notificationsTable.addGlobalSecondaryIndex({
      indexName: 'gsi-UserNotifications',
      partitionKey: {
        name: 'notificationsUserId',
        type: dynamodb.AttributeType.STRING
      }
    });

  }
}
