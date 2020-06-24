# Twilio Conversations Client

View your Chat, SMS, and WhatsApp conversations on the web. Any conversation created with the [Twilio Conversations API](https://www.twilio.com/docs/conversations/api) is supported.
* Based the [Twilio Conversations QuickStart](https://www.twilio.com/docs/conversations/quickstart)
* Also, based on [Twilio Chat](https://www.twilio.com/docs/chat)

![Chat Interface](screenshot.png?raw=true)

# Configuring and getting started

The app requires a Twilio account and a working Chat Service SID. You'll also want to buy an SMS number to interact with real SMS.
You'll need to collect some credentials from the [Twilio Console](https://www.twilio.com/console):
* Your Account SID (`ACXXX`) and Auth Token, both accessible from the [Dashboard](https://twilio.com/console/dashboard)
* Your Account's Chat Service Sid `ISXXX` SID which is attached to your Chat Service

# Replacing the Chat Token
In order for your Chat Application to work, we need to authenticate a Chat user by retrieving a short-lived token attached to your API Key. The `getToken` function in `ChatApp.js` has a placeholder for your chat token.

You can generate a token in a few ways:
* Using the [twilio-cli](https://www.twilio.com/docs/twilio-cli/quickstart) and [twilio token plugin](https://github.com/twilio-labs/plugin-token) (Recommended)
* Using [Twilio Runtime Function](https://www.twilio.com/docs/runtime/functions)

 For the twilio-cli option, run the following command and enter the resulting token into the placeholder:
 `twilio token:chat --identity <The test chat username> --chat-service-sid <ISXXX...>

# Running and Deploying

You will need to have the following environment variables configured in a .env file or your CI pipeline:

```
TWILIO_ACCOUNT_SID=
TWILIO_API_KEY=
TWILIO_API_SECRET=
TWILIO_CHAT_SERVICE_SID=
TWILIO_AUTH_TOKEN=
```
Values can be found in your [Twilio Project Settings](https://www.twilio.com/console/project/settings)

Once the environment is configured, let it rip:
```
npm i
npm start
```
