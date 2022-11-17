import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getStoreType } from "./API/productsAPI";

const Products = () => {
    const { storeType } = useParams();

    useEffect(() => {
        getStoreType(storeType!);
    },[storeType]);

    return (
        <div>
            {storeType}
        </div>
    )
}

export default Products;

