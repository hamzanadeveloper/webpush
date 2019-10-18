const express = require("express");
const cors = require("cors");
const webpush = require('web-push')
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 4000;

app.get("/", (req, res) => res.send("Hello World!"));

const dummyDb = { subscription: null }; //dummy in memory store

const saveToDatabase = async subscription => {
  // Since this is a demo app, I am going to save this in a dummy in memory store. Do not do this in your apps.
  // Here you should be writing your db logic to save it.
  dummyDb.subscription = subscription;
};

// The new /save-subscription endpoint
app.post("/save-subscription", async (req, res) => {
  const subscription = req.body;
  await saveToDatabase(subscription); //Method to save the subscription to Database
  res.json({ message: subscription });
});

const vapidKeys = {
  publicKey:
      'BMECH3RAG2GuHkC2rFhnBSeQn6Wuu8ZRTKgCtX4L0oXXr5IZjHzuroKnlwJkCUSAwNxsja1oNJT-8hBy2O1vy2E',
  privateKey: 'ct-_qhDgUzRwMTKpGxWgc2-1iFCveneMFPJwUHBQZoc',
}

//setting our previously generated VAPID keys
webpush.setVapidDetails(
    'mailto:hamza.n.arshadwork@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend='') => {
  webpush.sendNotification(subscription, dataToSend)
}

app.get('/send-notification', (req, res) => {
  const subscription = dummyDb.subscription //get subscription from your databse here.
  const message = 'Hello World'
  sendNotification(subscription, message)
  res.json({ message: subscription })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
