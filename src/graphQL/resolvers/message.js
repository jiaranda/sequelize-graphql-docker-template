const { db } = require('../../models');

module.exports = {
  Subscription: {},

  Query: {
    getMessages: async (_, params, ctx) => {
      // check auth!!
      
      // get
      return await db.message.findAll()
    },
  },

  Mutation: {
      createMessage: async (_, params, ctx) => {
        // check auth!!
        
        // get params
        const { data } = params
    
        // validate params
        // you can use validator js library

        // create
        const newMessage = await db.message.create({ data })
        return newMessage
      },
  },
};