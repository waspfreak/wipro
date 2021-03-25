
# lon-oneweb-backend

Contains all things backend related for the project OneWeb

## Usage

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

# Setup Backend

## Remote connection

1. Install the aws credential downloader
1. Change the extension settings and set "Apply the SessionDuration requested by the SAML provider" to `no`
1. Login to the AWS console via Google. A file called `credentials` should auto-magically download
1. Create a `~/.aws` folder
1. Run the following command to copy the credentials file `yarn setup-creds`
1. Create aws config in `~/.aws/config`

```text
[default]
output=json
region=eu-west-2
```

1. Install Amplify CLI globally

```bash
npm install -g @aws-amplify/cli
```

## Local connection

* To view the database at a local level you can use the SQLITEDB Viewer to view your local database.
* Location of your local database is `backend/api/amplify/mock-data/dynamodb/fake_us-fake-1.db`

Start your local server by doing the following:

``` bash
cd api
yarn
amplify mock
```

1. Naviagte to [http://localhost:20002](http://localhost:20002) to view the graphql interface
1. If you have data you can view right away.
1. If you have no local data then you can use the seedData script to add randomly generated data (keep local mock on)

```bash
yarn createLocalData
```

* If you are getting errors when creating your local database run 

```bash
yarn deleteLocalData
yarn createLocalData
```

# Authentication and Permissions

## Remote auth to Cognito and AWS Resources

* For any remote requests you need to have a valid cognito token which will contain a valid JWT token that you need to use to make mutation or queries. You get this by using the admin user from Cognito.

## Local database auth

* The local authentication flow is not as intense as the remote but it is still required in order to make the associations the same between different tables. (eg. beteen topic and topic members)

1. Create a user using *any* valid user id (you can get an example from seedDatabase) 
1. Create a token for the new user using the JWT token util(shared/apiclient/utils/token.util.js). This gives dynamo the information it needs for associations.

## Allow Lambda access to call AppSync

This requires a custom Permissiomns Policy to be added to the Lambda execution role that contains a statement like:

```json
{
"Effect": "Allow",
"Action": "appsync:GraphQL",
"Resource": "arn:aws:appsync:REGION:ACCOUNT_ID:apis/API_ID"
}
```

# Testing

## Prerequisite

1. Set up Amplify

```bash
cd api/
amplify pull --appId d31qvulw4at7g3 --envName develop
```

### Run Tests

```bash
cd api
yarn test
```

# Troubleshooting

1. Error: You are not working inside a valid amplify project.
   * Be sure you are inside the top level of the repo
1. No AWS Config,
   * Double check your amplify pull
1. ExpiredTokenException: The security token included in the request is expired
   * Update your aws credentials

# Additional Info

## Adding Sort Keys

Sort keys can be added to existing tables only by assigning them an index name. This ensures that the key is not treated as the primary index which is almost certainly not what you want to do and will not work besides. If you get an error from CloudFormation along the lines of "Cannot change the name of a custom-named resource" then passsing a name for the index is the solution:

`@key(name: "MakeSureYouAddMe", field: createdAt)`
or
`@key(name: "MakeSureYouAddMe", fields: ["createdAt", "otherField"], queryField: "ThisIsACompositeFieldName")`

## Get a Cognito JWT

The Client ID can be found in the Cognito dashboard under App Integration > App Client Settings
`aws cognito-idp initiate-auth --region eu-west-2 --auth-flow USER_PASSWORD_AUTH --client-id 28rdeia6qb6lga92cidn56fle4 --auth-parameters USERNAME=SOMENAME,PASSWORD=SOMEPASS`
You can also generate a local JWT using the Token Util

### Postman Collection

Postman collection is located `docs/OneTask.postman_collection.json`
