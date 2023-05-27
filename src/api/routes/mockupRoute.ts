import express from "express";
const router = express.Router();

router.route("/token").get(checkToken).post(apiLimiter, newToken);

export default router;
