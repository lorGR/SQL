import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks";
import ProductForm from "../../components/productForm/ProductForm";
import { getUserByCookie } from "../../features/user/userAPI";
import { extractUniqueProductArray } from "../products/productsHelper";

export interface ProductInfo {
    discription: string,
    model: string | null,
    network: string | null,
    price: number,
    price_eilat: number,
    screen_size: string | null,
    storage: string | null
}

export interface ProductColors {
    color: string
}

const Product = () => {

    const { productName } = useParams();
    const { storeType } = useParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserByCookie());
    }, [])

    const [productInfo, setProductInfo] = useState<ProductInfo[]>();
    const [productColors, setProductColors] = useState<ProductColors[]>();

    const getProductInformation = async () => {
        try {
            const { data } = await axios.post("/products/get-product-info", { productName, storeType });
            if (!data) throw new Error("Couldn't receive data from axios POST '/get-product-info' ");
            const { result } = data;
            setProductInfo(result);
        } catch (error) {
            console.error(error);
        }
    }

    const getProductColors = async () => {
        try {
            const { data } = await axios.post("/products/get-product-colors", { productName, storeType });
            if (!data) throw new Error("Couldn't receive data from axios POST '/get-product-colors' ");
            const { result } = data;
            setProductColors(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProductInformation();
        getProductColors();
    }, [])

    return (
        <div>
            <h1>{productName}</h1>
            {productInfo !== undefined && <p>החל מ- {productInfo[0].price}</p>}
            {productInfo !== undefined && productColors !== undefined &&
                <ProductForm productInfo={productInfo} productColors={productColors} />}
        </div>
    );
}

export default Product;