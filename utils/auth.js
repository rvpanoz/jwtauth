import bcrypt from "bcrypt";
import { auth } from "../common";
import Boom from "boom";
import jwt from "jsonwebtoken";
import User from "../models/User";

/**
 * Verify user
 * @param {*} request
 * @param {*} h
 */
export const verifyUniqueUser = async (request, h) => {
  const { email } = request.payload || {};

  const user = await User.findOne({
    $or: [
      {
        email
      }
    ]
  });

  if (user && user.email === email) {
    return Boom.badRequest("Email taken");
  }

  // if everything checks out, send the payload through to the route handler
  return h.response(request.payload);
};

/**
 * Generate a salt at level 10 strength
 * @param {*} password
 * @param {*} cb
 */
export const hashPassword = async (password, cb) => {
  const { genSalt, hash } = bcrypt;

  try {
    const salt = await genSalt(10);
    const passwordHashed = await hash(password, salt);

    return passwordHashed;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Creates a new user
 * @param {*} email
 * @param {*} hash
 */
export const createUser = async (email, hash) => {
  const newUser = new User({
    email,
    password: hash
  });

  try {
    const result = await newUser.save();

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Authenticate user credentials
 * @param {*} request
 * @param {*} h
 */
export const verifyCredentials = async (request, h) => {
  const { email, password } = request.payload || {};

  try {
    const user = await User.findOne({
      $or: [
        {
          email
        }
      ]
    });

    if (user) {
      const isUserValid = await bcrypt.compare(password, user.password);
      return isUserValid ? user : Boom.forbidden("Password is invalid.");
    }
    return Boom.notFound("User not found.");
  } catch (error) {
    return Boom.badRequest(error);
  }
};

/**
 * Validate token
 * @param {*} decoded
 * @param {*} request
 * @param {*} h
 */
export const validate = (decoded, request, h) => {
  console.log(" - - - - - - - decoded token:");
  console.log(decoded);
  console.log(" - - - - - - - request info:");
  console.log(request.info);
  console.log(" - - - - - - - user agent:");
  console.log(request.headers["user-agent"]);

  return { isValid: true };
};

/**
  Issue a JWT token based on user data
**/

export const createToken = user =>
  jwt.sign(
    {
      id: user._id,
      email: user.email,
      scope: user.admin && "admin"
    },
    auth.secret,
    {
      algorithm: "HS256",
      expiresIn: "1h"
    }
  );
