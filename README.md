# OneTask React Native App

One Paragraph of project description goes here

## Getting Started

These instructions detail how to setup your work machine to be able to develop this project.

### Prerequisites

1. [AWS Credential downloader](https://chrome.google.com/webstore/detail/saml-to-aws-sts-keys-conv/ekniobabpcnfjgfbphhcolcinmnbehde)
1. [Local SQL Lite db viewer](https://sqlitebrowser.org/dl/)
1. [Install java jdk for local db](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
1. [Amplify CLI](https://github.com/aws-amplify/amplify-cli)
1. [Postman](https://www.postman.com/)
1. [StandardJS - VS Code linter](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs)
1. [Mark Down Linter](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

you need to install Xcode, Simulator, Expo, the amplify command line interface, a chrome extension to obtain AWS credentials and NodeJs  

#### Installing NodeJS

[Node](https://nodejs.org/en/download/)

#### Installing Xcode

```bash
xcode-select --install
```

### Setup Project

[README file for the Backend](backend/README.md#L10).
[README file for the Frontend](frontend/README.md#L9).

## Setup IDE

Code style and auto formatting is powered by ESLint and in VSC requires the [ESLint](https://github.com/Microsoft/vscode-eslint) extension and the associated settings updated (as detailed in the extension documents).

In order for ESLint to work in each subdirectory it must be configured in the project root with rules overwritten in the sub directories (eg for the React Native rule set)

> **_NOTE:_** Make sure to run `yarn` in the project root to install the ESLint dependancies

## Components

So far this project is a composition of a few modules:

* [Backend](backend/README.md)
* [Application](frontend/README.md)
* Shared:
  * [APIClient](shared/apiclient/README.md)

Those modules should detail in their readme further documentation on their internal working.
