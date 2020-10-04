const { and, or, shield, deny } = require("graphql-shield");
const rules = require("./rules");

const { isAuthenticated, isNotAuthenticated } = rules;

const permissions = shield({
  Query: {
    getUsers: isAuthenticated,
  },
  Mutation: {
    createUser: isAuthenticated,
    login: isNotAuthenticated,
    logout: isAuthenticated,
  },
  User: {
    id: isAuthenticated,
    firstName: isAuthenticated,
    lastName: isAuthenticated,
    email: isAuthenticated,
  },
});

module.exports = permissions;
