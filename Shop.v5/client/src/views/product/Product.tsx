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
    storage: string | null,
    previewImg: string | null,
    displayImg: string | null
}

export interface ProductColors {
    color: string
    display_img: string
}

const Product = () => {

    const { productName } = useParams();
    const { storeType } = useParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        const allCookies = document.cookie;
        if (allCookies.length > 0) {
            dispatch(getUserByCookie());
        }
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

    if (productInfo !== undefined) {
        console.log(productInfo[0].price);
    }
    return (
        <div className="product page-container">
            <h1 className="product__title">בחר את ה- {productName} שלך</h1>
            {productInfo !== undefined && <p className="product__early-price">החל מ- {productInfo[0].price} ₪</p>}
            {productInfo !== undefined && productColors !== undefined &&
                <ProductForm productInfo={productInfo} productColors={productColors} />}
        </div>
    );
}

export default Product;