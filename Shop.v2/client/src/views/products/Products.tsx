import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { extractUniqueProductArray } from "./productsHelper";
import { Product } from "../products/productsHelper";

const Products = () => {
    const { storeType } = useParams();
    const [storeProducts, setStoreProducts] = useState<Product[]>();

    async function getProductsByType(storeType: string) {
        try {
            const { data } = await axios.post("/products/get-products-by-type", { storeType });
            if (!data) throw new Error("Couldn't receive data from axios '/get-products-by-type' ");
            const { result } = data;
            const products = await extractUniqueProductArray(result);
            setStoreProducts(products);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        storeType !== undefined && getProductsByType(storeType);
    }, [storeType]);

    return (
        <div>
            {storeType}
            {storeProducts?.map((product ,idx) => {
                return (
                    <div key={idx}>
                        <h1>{product.name}</h1>
                        <p>{product.price}</p>
                        <span>{product.price_eilat}</span>
                    </div>
                );
            })};
        </div>
    )
}

export default Products;

