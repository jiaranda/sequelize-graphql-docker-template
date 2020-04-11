// Import subscriptions definitions
// const subsDef = require('./models/subscriptions');

// Import type definition for each entity
const messageDef = require('./models/message');

// Strings concatenation
const typesDefs = 
messageDef // +
// someDef;

// Import mutations for each entity
const messagesMutations = require('./mutations/message');

// Strings concatenation
const mutationsDefs =
  'type Mutation {' +
  messagesMutations +
  '}';

// Import queries for each entity
const messagesQueries = require('./queries/message');

// Strings concatenation
const queriesDefs =
  'type Query {' +
  messagesQueries +
  '}';

// Define the schema as the concatenation of Defs, Subscriptions, Queries and Mutations
const graphqlSchema = typesDefs  + mutationsDefs + queriesDefs // + subsDef;

module.exports = graphqlSchema;