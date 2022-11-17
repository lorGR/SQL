import express from "express";
import { getProductsName } from "./productsCtrl";


const router = express.Router();

router
    .post('/get-products-name', getProductsName);
    
export default router;