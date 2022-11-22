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
        dispatch(getUserByCookie());
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
        <div className="products">
            {/* TODO: make the title not upper case and remove underscore if there is */}
            <h2 className="products__title">{storeType?.toUpperCase()}</h2>
            {storeProducts?.map((product, idx) => {
                return (
                    <Link className="products__product" to={product.name} key={idx}>
                        <ProductCard product={product} />
                    </Link>
                );
            })}
        </div>
    )
}

export default Products;

