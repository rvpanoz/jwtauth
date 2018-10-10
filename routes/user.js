import {
  verifyUniqueUser,
  verifyCredentials,
  hashPassword,
  createUser,
  createToken
} from "../utils/auth";

const routes = [
  {
    method: "POST",
    path: "/api/user/create",
    config: {
      auth: false,
      pre: [
        {
          method: verifyUniqueUser,
          assign: "user"
        }
      ],
      cors: {
        origin: ["*"],
        headers: ["Access-Control-Allow-Origin"],
        additionalHeaders: ["cache-control", "x-requested-with"]
      },
      handler: async (req, h) => {
        const { payload } = req;
        const { email, password } = payload || {};

        const hash = await hashPassword(password);
        const newUser = await createUser(email, hash);
        const token = await createToken(newUser);

        return h
          .response({
            success: true,
            data: {
              user: newUser,
              token
            }
          })
          .type("application/json");
      }
    }
  },
  {
    method: "POST",
    path: "/api/user/authenticate",
    config: {
      auth: false,
      cors: {
        origin: ["*"],
        headers: [
          "Access-Control-Allow-Origin",
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        ],
        additionalHeaders: ["cache-control", "x-requested-with"]
      },
      pre: [
        {
          method: verifyCredentials,
          assign: "user"
        }
      ],
      handler: (req, h) => {
        const { id, email } = req.pre && req.pre.user;

        const token = createToken({
          id,
          email
        });

        return h
          .response({
            success: true,
            data: { user: email, token }
          })
          .type("application/json");
      }
    }
  }
];

export default routes;
