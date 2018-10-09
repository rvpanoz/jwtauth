import { verifyUniqueUser, hashPassword, createUser } from "../utils/auth";

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
      handler: (req, h) => {
        const { payload } = req;
        const { email, password } = payload || {};

        hashPassword(password, (err, hash) => {
          if (err) {
            throw Boom.badRequest(err);
          }

          const result = createUser(email, hash);

          return h.response({
            result
          });

          result
            .catch(e => {
              return h
                .response(
                  Object.assign(response, {
                    success: false,
                    errorCode: e.code,
                    errorMsg: e.errmsg
                  })
                )
                .type("application/json");
            })
            .then(new_user => {
              if (!new_user) {
                throw Boom.notAcceptable("Failed at user creation");
              }

              return h
                .response(
                  Object.assign(response, {
                    success: true,
                    data: {
                      id_token: createToken(new_user)
                    }
                  })
                )
                .type("application/json");
            });
        });
      }
    }
  }
];

export default routes;
