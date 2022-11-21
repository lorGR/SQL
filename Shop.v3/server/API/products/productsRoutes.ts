import express from "express";
import { getProductInfo, getProductsByType, getProductColors } from "./productsCtrl";

const router = express.Router();

router
    .post("/get-products-by-type", getProductsByType)
    .post("/get-product-info", getProductInfo)
    .post("/get-product-colors", getProductColors)
export default router;