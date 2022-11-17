import express from "express";
import { getProductsByType } from "./productsCtrl";

const router = express.Router();

router
    .post("/get-products-by-type", getProductsByType)
export default router;