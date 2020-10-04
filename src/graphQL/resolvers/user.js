const { db } = require("../../models");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

module.exports = {
  Subscription: {},

  Query: {
    getUsers: async (_, params, ctx) => {
      // get
      return await db.user.findAll();
    },
  },

  Mutation: {
    createUser: async (_, params, ctx) => {
      // get params
      const { email, firstName, lastName, password } = params;

      // validate params
      // you can use validator js library

      // create
      const newUser = await db.user.create({
        email,
        firstName,
        lastName,
        password,
      });
      return newUser;
    },
  },
};
