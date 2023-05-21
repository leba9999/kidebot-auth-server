import express from "express";
import rateLimit from "express-rate-limit";
import { checkToken, newToken } from "../controllers/authController";
const router = express.Router();

const apiLimiter = rateLimit({
  windowMs: 1 * 1 * 1000, // 1 seconds
  max: 5, // Limit each IP to 5 requests per `window` (here, per 1 seconds)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests, please try again later.",
});

router.route("/token").get(checkToken).post(apiLimiter, newToken);

export default router;
