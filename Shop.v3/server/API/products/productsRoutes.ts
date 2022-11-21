import express from "express";
import { getProductInfo, getProductsByType, getProductColors, getProductId, addToCart, getUserProducts } from "./productsCtrl";

const router = express.Router();

router
    .post("/get-products-by-type", getProductsByType)
    .post("/get-product-info", getProductInfo)
    .post("/get-product-colors", getProductColors)
    .post("/get-product-id", getProductId)
    .post("/add-to-cart", addToCart)
    .post("/get-user-products", getUserProducts)
export default router;