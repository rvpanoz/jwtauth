/**
 * Database utils
 */
import Boom from "boom";
import mongoose from "mongoose";

export const connect = async (url, opts = {}) => {
  const options = Object.assign({}, opts, {
    useNewUrlParser: true
  });

  try {
    const connection = await mongoose.connect(
      url,
      options
    );

    console.log("db connected");
  } catch (error) {
    return Boom.badGateway(error);
  }
};
