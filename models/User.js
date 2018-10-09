/**
  Mongoose User Schema
**/

"use strict";

import mongoose from "mongoose";

/**
 * Define mongoose schema
 */
const Schema = mongoose.Schema;

/**
 * Define user schema
 */
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  updated_at: {
    type: Date
  },
  created_at: {
    type: Date,
    default: new Date()
  }
});

const User = mongoose.model("User", UserSchema);

export default User;
