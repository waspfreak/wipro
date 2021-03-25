const DynamoDbClient = require('../../../dynamodb/util').dynamoDbClient
const formatTableName = require('../../../dynamodb/util').formatTableName

exports.handler = async (event, context, callback) => {
  console.log(event, 'event')
  console.log(context, 'context')
  console.log(callback, 'callback')

  const region = process.env.AWS_REGION || 'fake'
  const userTableName = process.env.USER_TABLE

  prepareEnv(process.env.AWS_REGION, userTableName)

  // get user id from azure.
  const azureUserId = event.request.userAttributes.preferred_username

  // check if user exists in dynamo,
  // if not, add it
  const checkIfUserExist = await DynamoDbClient().get({
    TableName: userTableName,
    Key: {
      id: azureUserId
    }
  }).promise()

  if (Object.keys(checkIfUserExist).length === 0) {
    const object = {
      TableName: userTableName,
      Item: {
        id: azureUserId,
        __typename: 'User',
        createdAt: new Date().toISOString(),
        lastAccessedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
    await DynamoDbClient().put(object).promise()
  }

  console.log('updated event', event)

  // Return to Amazon Cognito
  callback(null, event)
}

/**
 * Builds configuration object for this lambda to use.
 */
async function prepareEnv (region, userTableName) {
  var envConfig = {
    region: region,
    userTableName: userTableName
  }
  if (region.includes('fake')) {
    envConfig.userTableName = userTableName
  }

  return envConfig
}

exports.prepareEnv = prepareEnv
