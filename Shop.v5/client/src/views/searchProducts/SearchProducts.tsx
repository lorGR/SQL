import axios from "axios";
import { useEffect } from "react"
import { useParams } from "react-router-dom";


const SearchProducts = () => {

    const { userSearch } = useParams();

    const getProductsBySearch = async () => {
        try {
            const { data } = await axios.post("/products/get-products-by-search", { userSearch });
            if(!data) throw new Error("Couldn't receive data from axios POST '/products/get-products-by-search' ");
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProductsBySearch();
    }, []);

    return (
        <div>
            SearchProducts
        </div>
    )
}

export default SearchProducts