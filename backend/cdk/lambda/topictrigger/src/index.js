import 'cross-fetch/polyfill'
import triggerHandler from '../../utils/triggerHandler'
import AddOwnerAsMember from '../../../lib/triggers/Topic.create.AddOwnerAsMember'
import ApiClient from '../../../../../shared/apiclient'

/**
 * @todo configure ApiClient with IAM auth
 * @todo pack dependancies for deployment
 */
const apiclient = new ApiClient()

/**
 * Register handlers for this event stream here...
 */
const handlers = [
  async (event, context) => {
    await AddOwnerAsMember(event, context, apiclient.createTopicMember)
  }
]

/**
 * Boilerplate.
 */
const handler = async (event, context) => triggerHandler(event, context, handlers)

export { handler }
