import express from "express";
import {
  deleteProduct,
  generateProduct,
  getProduct,
  getProducts,
  postReservation,
} from "../controllers/mockupController";
const router = express.Router();

router.route("/products/:id").get(getProduct).delete(deleteProduct);
router.route("/products").get(getProducts);
router.route("/generate").get(generateProduct);
router.route("/reservations").post(postReservation);

export default router;
