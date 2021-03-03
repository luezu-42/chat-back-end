const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connect() {
  try {
  await  mongoose.connect("mongodb+srv://chat-app-v1:KxRDXk7g399w7GZ@react.bs0mi.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
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