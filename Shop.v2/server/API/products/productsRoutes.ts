import express from "express";
import { getproductPrice, getProductsName } from "./productsCtrl";


const router = express.Router();

router
    .post('/get-products-name', getProductsName)
    .post('/get-product-price', getproductPrice)
export default router;