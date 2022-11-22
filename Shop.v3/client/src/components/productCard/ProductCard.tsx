import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../../views/products/productsHelper";

interface ProductCardProps {
    product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    const productName = product.name;
    const [productImage, setProductImage] = useState<string>();

    const getProductPreviewImg = async () => {
        try {
            const { data } = await axios.post("/products/get-product-preview-img", { productName });
            if (!data) throw new Error("Coiuldn't receive data from axios POST '/get-product-preview-img'");
            const { result } = data;
            const { preview_img } = result[0];
            setProductImage(preview_img);       
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProductPreviewImg();
    }, []);

    return (
        <div>
            <h2>{productName}</h2>
            <p>מחיר {product.price} ₪</p>
            <p>מחיר באילת {product.price_eilat} ₪</p>
            <img src={productImage} alt={productName} />
        </div>
    )
}

export default ProductCard;