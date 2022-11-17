import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductPrice, getProductsName } from "./API/productsAPI";

const Products = () => {
    const { storeType } = useParams();

    const [productsNames, setProductsNames] = useState<string[]>();
    const [products, setProducts] = useState<any>();

    async function getProductsNames() {
        const prodNames = await getProductsName(storeType!);
        setProductsNames(prodNames);
    }

    async function getProductsPrice() {
        if (productsNames !== undefined) {
            const prods: Array<any> = []
            productsNames.forEach(async (productName) => {
                const tempProd = await getProductPrice(productName);
                // prods.push(tempProd);
                setProducts((prevState: any) => [...prevState, tempProd]);
            });
            // setProducts(prods);
        }
    }

    useEffect(() => {
        getProductsNames();
        getProductsPrice();
    }, [storeType]);

    return (
        <div>
            {storeType}

        </div>
    )
}

export default Products;

