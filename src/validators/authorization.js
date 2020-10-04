const jwt = require("jsonwebtoken");
const { db } = require("./../models");
const { AuthenticationError } = require("apollo-server");

const validateAuthorizationToken = async (token) => {
  // get user from jwt
  const user = await jwt.verify(
    token,
    process.env.JWT_SECRET_1 + process.env.JWT_SECRET_2,
    async (err, res) => {
      if (err) {
        throw new AuthenticationError("Invalid Authorization Token");
      } else {
        return await db.user.findOne({
          where: { id: res.id },
        });
      }
    }
  );

  // user exists?
  if (!user)
    throw new AuthenticationError("Invalid Authorization Token: invalid user");

  // check blacklist
  if (
    await db.blacklist.count({
      where: { token },
    })
  ) {
    throw new AuthenticationError(
      "Invalid Authorization Token: is in blacklist"
    );
  }

  return user;
};

module.exports = { validateAuthorizationToken };
