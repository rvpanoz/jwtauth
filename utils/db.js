/**
 * Database utils
 */
import mongoose from "mongoose";

export const connect = async (url, opts = {}) => {
  const options = Object.assign({}, opts, {
    useNewUrlParser: true
  });
  const connection = await mongoose.connect(
    url,
    options
  );

  return connection;
};
