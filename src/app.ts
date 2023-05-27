require("dotenv").config();
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import typeDefs from "./api/schemas/index";
import resolvers from "./api/resolvers/index";
import { createRateLimitRule } from "graphql-rate-limit";
import { applyMiddleware } from "graphql-middleware";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { shield } from "graphql-shield";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";

import { notFound, errorHandler } from "./middlewares";
import api from "./api";
import authenticate from "./utils/authenticate";
import { UserContext } from "./interfaces/UserContext";
import RandomEvent from "./classes/RandomEvent";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

(async () => {
  try {
    const rateLimitRule = createRateLimitRule({
      identifyContext: (ctx) => ctx.id,
    });

    const permissions = shield({
      Mutation: {
        updateUser: rateLimitRule({ window: "1s", max: 5 }),
        deleteUser: rateLimitRule({ window: "1s", max: 5 }),
      },
    });

    const schema = applyMiddleware(
      makeExecutableSchema({
        typeDefs,
        resolvers,
      }),
      permissions
    );
    console.dir(new RandomEvent(new Date()).getEvent(), { depth: null });

    app.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: false,
      })
    );
    const server = new ApolloServer<UserContext>({
      schema,
      introspection: true,
      plugins: [
        process.env.NODE_ENV === "production"
          ? ApolloServerPluginLandingPageProductionDefault({
              embed: true as false,
            })
          : ApolloServerPluginLandingPageLocalDefault(),
      ],
      includeStacktraceInErrorResponses: true,
    });
    await server.start();

    app.use(
      "/graphql",
      express.json(),
      cors<cors.CorsRequest>(),
      expressMiddleware(server, {
        context: async ({ req }) => authenticate(req),
      })
    );
    app.use("/api/v1", api);
    app.use(notFound);
    app.use(errorHandler);
  } catch (error) {
    console.log(error);
  }
})();

export default app;
