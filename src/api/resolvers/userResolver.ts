import { GraphQLError } from "graphql";
import { User, TokenAndUser } from "../../interfaces/User";
import userModel from "../models/userModel";

export default {
  Query: {
    users: async () => {
      const users = await userModel.find();
      if (!users || users.length === 0) {
        throw new GraphQLError("No users found", {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return users;
    },
    userById: async (_parent: unknown, args: { id: string }) => {
      const user = await userModel.findById(args.id);
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return user;
    },
  },
  Mutation: {
    createUser: async (
      _parent: unknown,
      args: { user: User },
      authorization: TokenAndUser
    ) => {
      if (!authorization.token || !authorization.user.admin) {
        throw new GraphQLError("Not authorized", {
          extensions: { code: "NOT_AUTHORIZED" },
        });
      }
      if (!args.user) {
        throw new GraphQLError("No user provided", {
          extensions: { code: "NOT_FOUND" },
        });
      }
      const user = new userModel(args.user);
      await user.save();
      return user;
    },
    updateUser: async (
      _parent: unknown,
      args: { user: User },
      authorization: TokenAndUser
    ) => {
      if (!authorization.token || !authorization.user.admin) {
        throw new GraphQLError("Not authorized", {
          extensions: { code: "NOT_AUTHORIZED" },
        });
      }
      if (!args.user) {
        throw new GraphQLError("No user provided", {
          extensions: { code: "NOT_FOUND" },
        });
      }
      const user = await userModel.findById(args.user.id);
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return await userModel.findByIdAndUpdate(args.user.id, args.user, {
        new: true,
      });
    },
    deleteUser: async (
      _parent: unknown,
      args: unknown,
      authorization: TokenAndUser
    ) => {
      if (!authorization.token) {
        throw new GraphQLError("Not authorized", {
          extensions: { code: "NOT_AUTHORIZED" },
        });
      }
      return await userModel.findByIdAndDelete(authorization.user.id);
    },
    adminDeleteUser: async (
      _parent: unknown,
      args: { id: string },
      authorization: TokenAndUser
    ) => {
      if (!authorization.token || !authorization.user.admin) {
        throw new GraphQLError("Not authorized", {
          extensions: { code: "NOT_AUTHORIZED" },
        });
      }
      return await userModel.findByIdAndDelete(args.id);
    },
  },
};
