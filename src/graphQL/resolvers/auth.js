const { db } = require("../../models");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

module.exports = {
  Subscription: {},

  Query: {},

  Mutation: {
    login: async (_, params, ctx) => {
      // get params
      const { email, password } = params;

      //  User have to exist, search by email
      const user = await db.user.findOne({
        where: { email },
      });

      // check credentials
      if (!user) {
        throw new AuthenticationError("Wrong credentials");
      } else {
        const isPasswordCorrect = await user.checkPassword(password);
        if (!isPasswordCorrect) {
          throw new AuthenticationError("Wrong credentials");
        }
      }

      // everything OK
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET_1 + process.env.JWT_SECRET_2,
        {
          expiresIn: "12h",
        }
      );

      return token;
    },
    logout: async (_, params, ctx) => {
      await db.blacklist.create({ token: ctx.token });
      return true;
    },
  },
};
