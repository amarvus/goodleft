const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://amarnathkumar:CDbsl72vWhqGeRtO@goodleft.bt3rnfc.mongodb.net/goodleft"
  );
};

module.exports = connectDB;
