require("dotenv").config();
import express from "express";
import morgan from "morgan";
import helmet from "helmet";

import { notFound, errorHandler } from "./middlewares";
import api from "./api";
import MessageResponse from "./interfaces/Responses/MessageResponse";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API location: api/v1",
  });
});

app.use("/api/v1", api);

app.use(notFound);
app.use(errorHandler);

export default app;
