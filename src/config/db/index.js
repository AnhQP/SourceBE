const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://ilovevietnam272:Qanh2002@cluster0.gx03wsb.mongodb.net/TalkApp?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("Failed to connect to mongo");
  }
}

module.exports = { connect };
