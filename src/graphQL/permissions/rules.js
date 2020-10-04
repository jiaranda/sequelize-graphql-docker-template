const { rule } = require("graphql-shield");
const { ForbiddenError } = require("apollo-server-express");

module.exports = {
  isNotAuthenticated: rule()(async (parent, params, ctx) => {
    if (!ctx.currentUser) {
      return true;
    }
    return new ForbiddenError();
  }),
  isAuthenticated: rule()(async (parent, params, ctx) => {
    if (ctx.currentUser) {
      return true;
    }
    return new ForbiddenError();
  }),
};
