const mongoose = require("mongoose");

const url =
  "mongodb+srv://database_brandbajade:Y1Ezb7ZFBPmEDP3f@cluster0.2iilt9b.mongodb.net/brandbajade-digital?retryWrites=true&w=majority";

const connecxtion = mongoose.connect(url);

console.log(connecxtion);
