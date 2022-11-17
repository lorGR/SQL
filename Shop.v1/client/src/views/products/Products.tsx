import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductPrice, getProductsName } from "./API/productsAPI";

const Products = () => {
    const { storeType } = useParams();

    const [productsNames, setProductsNames] = useState<string[]>();
    const [productPrice, setProductPrice] = useState();

    async function getProducts() {
        const prodNames = await getProductsName(storeType!);
        setProductsNames(prodNames);
    }

    function getProductsPrice() {
        productsNames?.forEach(async (product) => {
            const prodPrice = await getProductPrice(product);
            setProductPrice(prodPrice!);
        });
    }

    useEffect( () => {
        getProducts();
        getProductsPrice();
    }, [storeType]);

    return (
        <div>
            {storeType}
        </div>
    )
}

export default Products;

