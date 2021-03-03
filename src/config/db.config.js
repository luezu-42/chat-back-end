const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connect() {
  try {
  await  mongoose.connect(process.env.DB_URL, {
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