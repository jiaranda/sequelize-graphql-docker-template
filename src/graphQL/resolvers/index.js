const message = require('./message');

// Import all the resolvers
const resolvers = {
  Query: {},
  Mutation: {},
  // Subscription: {},
};

// Assign the queries to the specific object
Object.assign(
  resolvers.Query,
  message.Query,
);

// Assign the mutations to the specific object
Object.assign(
  resolvers.Mutation,
  message.Mutation,
);

// Assign the subscriptions to the specific object
// Object.assign(
//   resolvers.Subscription,
//   message.Subscription,
// );

module.exports = resolvers;