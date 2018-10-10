const headers = {
  cors: {
    origin: ["*"],
    headers: ["Access-Control-Allow-Origin"],
    additionalHeaders: ["cache-control", "x-requested-with"]
  }
};

export default headers;
