import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getStoreType } from "./API/productsAPI";

// const getProductsNames = async () => { 
//     // Make the request as post and pass the storeType
//     // To get only products of the specific type
//     // const { data } = await axios.get("/products/get-products-name");
//     // if(!data) throw new Error("Couldn't reiceve data from AXIOS GET 'get-products-name' ");
//     // const { result } = data;
//     // console.log(result);
// }

const Products = () => {
    const { storeType } = useParams();

    useEffect(() => {
        // getProductsNames();
        getStoreType(storeType!);
    },[storeType]);

    return (
        <div>
            {storeType}
        </div>
    )
}

export default Products;

