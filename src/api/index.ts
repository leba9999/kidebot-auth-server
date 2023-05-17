import express from "express";
import MessageResponse from "../interfaces/Responses/MessageResponse";
import authRoute from "./routes/authRoute";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "routes: auth",
  });
});

router.use("/auth", authRoute);

export default router;
