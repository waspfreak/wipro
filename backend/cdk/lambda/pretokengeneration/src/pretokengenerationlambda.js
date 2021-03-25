
const DynamoDbClient = require('../../../dynamodb/util').dynamoDbClient
const topicMemberTableName = process.env.TOPIC_MEMBER_TABLE

exports.handler = async (event, context, callback) => {
  console.log(event, 'event')
  console.log(context, 'context')
  console.log(callback, 'callback')

  const region = process.env.AWS_REGION || 'fake'

  // prepare environment depending whether it's local or remote.
  prepareEnv(region)

  const userId = event.request.userAttributes.preferred_username
  console.log('userID: ' + userId)

  // extract user id from event
  if (event.request.hasOwnProperty('userAttributes')) {
    const topics = await getTopics(userId, topicMemberTableName)
    const groupIdsToOverrideClaim = await parseTopicsToListOfIds(topics)
    console.log('groupIds: ' + groupIdsToOverrideClaim)

    event.response.claimsOverrideDetails = {
      // ids of topics, the user is member of!
      claimsToAddOrOverride: {
        'custom:oid_test': userId
      },
      groupOverrideDetails: {
        groupsToOverride: groupIdsToOverrideClaim
      }

    }
    console.log('updated event', event)
  }

  // Return to Amazon Cognito
  callback(null, event)
}

/**
 *
 * @param {string} userId
 * @param {string} tableName
 * @param {Function} scanTable - The scan operation that should accept a params object and have a method called promise that returns a promise
 *
 * Table scan with Global Secondary Index to fetch all topics and filter them by userId,
 * so that it returns only topics, that the user is member of.
 *
 * Returns a list of topic objects.
 */
async function getTopics (userId, tableName) {
  console.log('tablename: ' + tableName)
  const topicsParams = {
    ExpressionAttributeValues: {
      // using documentclient does not require to provider type { S: } of the item.
      ':topicMemberUserId': userId
    },
    FilterExpression: 'topicMemberUserId = :topicMemberUserId',
    IndexName: 'gsi-TopicMemberUser',
    TableName: tableName
  }

  const topics = await DynamoDbClient().scan(topicsParams).promise()
  console.log('TOPICS: ', topics)
  return topics || { Items: [] }
}

/**
 * Builds configuration object for this lambda to use.
 */
async function prepareEnv (region) {
  var envConfig = {
    region: region,
    topicMemberTableName: topicMemberTableName
  }
  if (region.includes('fake')) {
    envConfig.topicMemberTableName = topicMemberTableName
  }

  return envConfig
}

/**
 *
 * @param {array of objects} topics
 *
 * Parses list of topic objects to list of strings (ids).
 */
async function parseTopicsToListOfIds (topics) {
  console.log('topics from parseTopicsToList: ', topics)
  const groupIdsUserIsMemberOf = topics && Object.values(topics.Items).map(topic => topic.topicMemberTopicId)
  return groupIdsUserIsMemberOf || []
}

exports.prepareEnv = prepareEnv
exports.parseTopicsToListOfIds = parseTopicsToListOfIds
exports.getTopics = getTopics
