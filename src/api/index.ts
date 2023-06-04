import express from "express";
import MessageResponse from "../interfaces/Responses/MessageResponse";
import authRoute from "./routes/authRoute";
import mockupRoute from "./routes/mockupRoute";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "routes: auth",
  });
});

router.use("/auth", authRoute);
router.use("/mockup", mockupRoute);

export default router;
