import express from "express";
import { getStoreType } from "./productsCtrl";

const router = express.Router();

router
    .post('/get-store-type', getStoreType);

export default router;