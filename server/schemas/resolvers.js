const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        return null;
      }
      console.log("fetching me");
      return await User.findById(context.user._id).populate("savedBooks");
    },
    savedBooks: async (parent, args, context) => {
      if (!context.user) {
        return [];
      }

      const user = await User.findById(context.user._id).populate("savedBooks");

      return user.savedBooks;
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addBook: async (parent, { book }, context) => {
      console.log("Adding new book", book, context.user._id);
      try {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } }
        );
        return true;
      } catch (err) {
        console.error("Error creating book", err);
        return false;
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      console.log("Remove book", bookId, context.user._id);
      try {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } }
        );
        return true;
      } catch (err) {
        console.error("Error removing book", err);
        return false;
      }
    },
  },
};

module.exports = resolvers;
