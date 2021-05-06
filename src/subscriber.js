"use strict";

function main(timeout = 15,maxMessagesInprogess=15) {
  // [START pubsub_subscriber_async_pull]
  // [START pubsub_quickstart_subscriber]
  const subscriptionName = "" //subscriber details
  // Imports the Google Cloud client library
  const { PubSub } = require("@google-cloud/pubsub");

  // Creates a client; cache this for further use
  const pubSubClient = new PubSub();

  let messageSyncCount = 0;
  function listenForMessages() {
    const subscriberOptions = {
      flowControl: {
        maxMessages: maxMessagesInprogess,
        allowExcessMessages: false,
      },
    };
    // References an existing subscription
    const subscription = pubSubClient.subscription(
      subscriptionName,
      subscriberOptions
      );
    // Create an event handler to handle messages
    let messageCount = 0;
    const messageHandler = (message) => {
      messageCount += 1;
      messageSyncCount += 1;
      /*
      Here goes our business logics
      */
      // "Ack" (acknowledge receipt of) the message
      message.ack();
      

    };

    // Listen for new messages until timeout is hit
    subscription.on("message", messageHandler);

    setTimeout(() => {
      subscription.removeListener("message", messageHandler);
      console.log(`${messageCount} message(s) received.`);
      listenForMessages();
    }, timeout * 1000);
  }
  // getModelCodes("samsung", "SM-T295");
  // triggerCustomManagedConfigPolicy("LC02pxy0zv", "TestPolicy1", "testdevice978900", "3140be86312a52b4");
  listenForMessages();
  // [END pubsub_subscriber_async_pull]
  // [END pubsub_quickstart_subscriber]
}

main(...process.argv.slice(2));
