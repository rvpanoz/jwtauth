import bcrypt from "bcrypt";
import Boom from "boom";
import User from "../models/User";

export const validate = (decoded, request, h) => {
  console.log(" - - - - - - - decoded token:");
  console.log(decoded);
  console.log(" - - - - - - - request info:");
  console.log(request.info);
  console.log(" - - - - - - - user agent:");
  console.log(request.headers["user-agent"]);

  return true;
};

export const verifyUniqueUser = (request, h) => {
  const { email } = request.payload || {};

  const user = User.findOne(
    {
      $or: [
        {
          email
        }
      ]
    },
    (err, user) => {
      if (err) {
        throw new Error(err);
      }

      if (user && user.email === email) {
        return Boom.badRequest("Email taken");
      }

      // If everything checks out, send the payload through to the route handler
      return h.response(request.payload).type("application/json");
    }
  );

  return user;
};

export const hashPassword = (password, cb) => {
  // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash);
    });
  });
};

export const createUser = async (email, hash) => {
  const newUser = new User({
    email,
    password: hash
  });

  const saved = await newUser.save();
  return saved;
};
