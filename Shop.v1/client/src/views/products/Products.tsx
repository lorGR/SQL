import { useParams } from "react-router-dom";

interface ProductsProps {
    storeType: string
};

const Products = () => {
    const { storeType } = useParams();
    return (
        <div>
            {storeType}
        </div>
    )
}

export default Products;

