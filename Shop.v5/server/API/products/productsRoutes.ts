import express from "express";
import { getProductInfo, getProductsByType, getProductColors, getProductId, addToCart, getUserProducts, getProductPreviewImg, deleteProductFromCart, getProductsPrice, deleteProductsFromCart, getProductsBySearch } from "./productsCtrl";

const router = express.Router();

router
    .post("/get-products-by-type", getProductsByType)
    .post("/get-product-info", getProductInfo)
    .post("/get-product-colors", getProductColors)
    .post("/get-product-id", getProductId)
    .post("/add-to-cart", addToCart)
    .post("/get-user-products", getUserProducts)
    .post("/get-product-preview-img", getProductPreviewImg)
    .post("/get-products-price-cart", getProductsPrice)
    .delete("/delete-product-from-cart", deleteProductFromCart)
    .delete("/delete-products-from-cart", deleteProductsFromCart)
    .post("/get-products-by-search", getProductsBySearch)
export default router;