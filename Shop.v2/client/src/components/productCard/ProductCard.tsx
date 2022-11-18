import { useParams } from "react-router-dom";

interface ProductCardProps {
    productName: string
}

const ProductCard: React.FC<ProductCardProps> = ({ productName }) => {

    const { product } = useParams();
    console.log(product);

    return (
        <div>
            {productName}
        </div>
    )
}

export default ProductCard;