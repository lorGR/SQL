import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { create } from "./productsAPI";

const Products = () => {
    const { storeType } = useParams();

    async function getProductsByType(storeType: string) {
        try {
            const { data } = await axios.post("/products/get-products-by-type", { storeType });
            if (!data) throw new Error("Couldn't receive data from axios '/get-products-by-type' ");
            const { result } = data;
            console.log(result);            
            create(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        storeType !== undefined && getProductsByType(storeType)
    }, [storeType]);

    return (
        <div>
            {storeType}

        </div>
    )
}

export default Products;

