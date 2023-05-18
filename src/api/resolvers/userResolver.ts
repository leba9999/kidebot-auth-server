import { GraphQLError } from "graphql";
import { User, TokenAndUser } from "../../interfaces/User";
import userModel from "../models/userModel";

export default {
  Query: {
    users: async () => {
      try {
        const users = await userModel.find();
        if (!users || users.length === 0) {
          throw new GraphQLError("No users found", {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return users;
      } catch (e) {
        console.log(e);
      }
    },
    userById: async (_parent: unknown, args: { id: string }) => {
      try {
        const user = await userModel.findById(args.id);
        if (!user) {
          throw new GraphQLError("User not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return user;
      } catch (e) {
        console.log(e);
      }
    },
  },
  Mutation: {
    createUser: async (
      _parent: unknown,
      args: { user: User },
      authorization: TokenAndUser
    ) => {
      try {
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
      } catch (e) {
        console.log(e);
      }
    },
    updateUser: async (
      _parent: unknown,
      args: { user: User },
      authorization: TokenAndUser
    ) => {
      try {
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
      } catch (e) {
        console.log(e);
      }
    },
    deleteUser: async (
      _parent: unknown,
      args: unknown,
      authorization: TokenAndUser
    ) => {
      try {
        if (!authorization.token) {
          throw new GraphQLError("Not authorized", {
            extensions: { code: "NOT_AUTHORIZED" },
          });
        }
        return await userModel.findByIdAndDelete(authorization.user.id);
      } catch (e) {
        console.log(e);
      }
    },
    adminDeleteUser: async (
      _parent: unknown,
      args: { id: string },
      authorization: TokenAndUser
    ) => {
      try {
        if (!authorization.token || !authorization.user.admin) {
          throw new GraphQLError("Not authorized", {
            extensions: { code: "NOT_AUTHORIZED" },
          });
        }
        return await userModel.findByIdAndDelete(args.id);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
