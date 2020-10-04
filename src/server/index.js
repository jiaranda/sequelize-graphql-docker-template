const { ApolloServer, gql } = require("apollo-server");
const resolvers = require("../graphQL/resolvers/index");
const typeDefs = require("../graphQL/schema");
const { validateAuthorizationToken } = require("./../validators/authorization");
const { makeExecutableSchema } = require("graphql-tools");
const { applyMiddleware } = require("graphql-middleware");
const permissions = require("./../graphQL/permissions");

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs: gql(typeDefs),
    resolvers,
  }),
  permissions
);

const app = new ApolloServer({
  schema,
  playground: process.env.PLAYGROUND,
  cors: {
    origin: "*",
  },
  formatError: (err) => {
    console.log(err);

    // use this for sentry implementation
    // if (err.extensions.code == 'INTERNAL_SERVER_ERROR') {
    //   Sentry.captureException(err);
    // }
    return err;
  },
  context: async ({ req, connection }) => {
    let finalContext = { currentUser: null, token: null };
    // check if user is authenticated. To access headers use req.headers.headername
    // if authenticated (valid token and not in balcklist), get user and save currentUser into finalContext
    // if not, set this

    const token = req.headers.authorization;

    if (token) {
      const user = await validateAuthorizationToken(token);
      finalContext.currentUser = user;
      finalContext.token = req.headers.authorization;
    }

    // add connection logic for subscriptions
    return finalContext;
  },
});

module.exports = { app };
