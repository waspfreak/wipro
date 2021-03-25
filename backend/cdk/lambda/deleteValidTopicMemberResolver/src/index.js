
// Create the DynamoDB service object
const DynamoDbClient = require('../../../../dynamodb/util').dynamoDbClient
const topicMemberTable = process.env.TOPIC_MEMBER_TABLE

const fieldName = 'topicMemberTopicId';

const topicMemberResolver = async (id) => {

    const getProps = {
        Key: {
          id: {
            S: `${id}`
          }
        },
        TableName: topicMemberTable
      }
    
      const item = await DynamoDbClient.get(getProps).promise()
    
        if (Object.keys(item).length === 0) {
          throw new Error("Couldn't delete topic member because the Id provided does not exist.")
        }

        const argument = item.topicMemberTopicId;

        var props = {
            TableName: topicMemberTable,
            FilterExpression: `${fieldName} = :${fieldName}`,
            ExpressionAttributeValues: { }
          }
          props.ExpressionAttributeValues[`:${fieldName}`] = { S: `${argument}` }
      
        const allMembersInTopic = await DynamoDbClient.scan(props).promise();
        const canDeleteMember = allMembersInTopic.length > 1
    
        if (canDeleteMember) {

            deleteProps = {
                Key: {
                  id: {
                    S: id
                  }
                },
                TableName: topicMemberTable
              };

          await DynamoDbClient.delete(deleteProps).promise()
          return item
        } else {
          throw new Error('Can\'t delete the member cause there\'s only one in the topic.')
        }
}

const resolvers = {
  Mutation: {
    deleteValidTopicMember: async (event) => {
      return topicMemberResolver(event.arguments.input.id)
    }
  }
}

const noResolver = () => { throw new Error('Resolver not found.') }

exports.handler = async (event, context) => {
  const typeHandler = resolvers[event.typeName]
  if (!typeHandler) {
    noResolver()
  }

  const resolver = typeHandler[event.fieldName]
  if (!resolver) {
    noResolver()
  }

  try {
    const result = await resolver(event)
    context.done(null, result)
  } catch (err) {
    console.log('There was an error while executing the resolver.')
    console.log('Event received:', JSON.stringify(event, null, 2))
    console.log('Error:', err)
    context.done(err)
  }
}
