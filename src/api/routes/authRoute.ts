import express from "express";
import { token } from "../controllers/authController";
const router = express.Router();

router.post("/token", token);

export default router;
