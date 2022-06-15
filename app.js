/**
 * express is node js freamwork using express you can create nodejs server
 * */
const express = require("express");
/**
 * this is node js dialogflow npm package using this we can get the request & response
 * */
const { WebhookClient } = require("dialogflow-fulfillment");

const app = express();
/**
 * this is convert request body to JSON express.json()
 * */
app.use(express.json());
/**
 *
 * this is create GET route for checking our node server is working or not
 * */
app.get("/", (req, res) => {
  res.send("Server Is Working......");
});

/**
 * on this route dialogflow send the webhook request
 * For the dialogflow we need POST Route.
 * */
app.post("/webhook", (req, res) => {
  // get agent from request
  let agent = new WebhookClient({ request: req, response: res });

  const intentName = req.body.queryResult.intent.displayName;
  console.log("Parameters", agent.parameters);
  console.log("Intent Name", intentName);

  if (
    req.body.queryResult.sentimentAnalysisResult &&
    req.body.queryResult.sentimentAnalysisResult.queryTextSentiment &&
    req.body.queryResult.sentimentAnalysisResult.queryTextSentiment.score
  ) {
    console.log(
      "Sentiment score: ",
      req.body.queryResult.sentimentAnalysisResult.queryTextSentiment.score
    );
    console.log(
      "Sentiment Magnitude: ",
      req.body.queryResult.sentimentAnalysisResult.queryTextSentiment.magnitude
    );
  }

  // create intentMap for handle intent
  let intentMap = new Map();

  // add intent map 2nd parameter pass function
  intentMap.set("Bienvenida", handleWebHookIntent);

  // now agent is handle request and pass intent map
  agent.handleRequest(intentMap);
});

/**
 *  handleWebHookIntent function call when webhook-demo intent call.....
 *  from then function we are send the response to dialogflow so we are use agent.add(string) function
 *  you can see more example here https://github.com/dialogflow/fulfillment-actions-library-nodejs
 * */
function handleWebHookIntent(agent) {
  agent.add("Hola te saludo desde el webhook...");
}

/**
 * now listing the server on port number 3002 :)
 * use port 8080 for app engine
 * */
app.listen(3002, () => {
  console.log("Server is Running on port 3002");
});
