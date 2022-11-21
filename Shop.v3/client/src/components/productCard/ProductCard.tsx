interface ProductCardProps {
    productName: string
}

const ProductCard: React.FC<ProductCardProps> = ({ productName }) => {

    return (
        <div>
            {productName}
        </div>
    )
}

export default ProductCard;