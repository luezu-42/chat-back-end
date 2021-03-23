const mongoose = require("mongoose");

async function connect() {
  try {
  await  mongoose.connect("mongodb://localhost:27017/chat-app", {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    console.log("Conectado com sucesso!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connect;