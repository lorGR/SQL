interface ProductsProps {
    storeType: string
};

const Products: React.FC<ProductsProps> = ({ storeType }) => {
    return (
        <div>{storeType}</div>
    )
}

export default Products;