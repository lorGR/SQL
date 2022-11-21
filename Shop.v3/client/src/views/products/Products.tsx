import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { extractUniqueProductArray } from "./productsHelper";
import { Product } from "../products/productsHelper";
import ProductCard from "../../components/productCard/ProductCard";
import { useAppDispatch } from "../../app/hooks";
import { getUserByCookie } from "../../features/user/userAPI";

const Products = () => {
    const { storeType } = useParams();
    const [storeProducts, setStoreProducts] = useState<Product[]>();

    const dispatch = useAppDispatch();

    useEffect(() => {
        const allCookies = document.cookie;
        if(allCookies.length > 0) {
            dispatch(getUserByCookie());
        }
    }, [])

    async function getProductsByType(storeType: string) {
        try {
            const { data } = await axios.post("/products/get-products-by-type", { storeType });
            if (!data) throw new Error("Couldn't receive data from axios '/get-products-by-type' ");
            const { result } = data;
            const products = await extractUniqueProductArray(result, 'name');
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
            {storeProducts?.map((product, idx) => {
                return (
                    <Link to={product.name} key={idx}>
                        <ProductCard productName={product.name} />
                    </Link>
                );
            })}
        </div>
    )
}

export default Products;

