const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    pp: {
      type: String,
      default: "profile.png"
    },
    date: { 
      type: Date,
      default: Date.now
    }
  },
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);