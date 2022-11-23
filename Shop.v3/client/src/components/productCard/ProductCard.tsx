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
    }, [product]);

    return (
        <div className="product-card">
            <div className="product-card__info">
                <div className="product-card__info__context">
                    <h2 className="product-card__info__context__name">{productName}</h2>
                    <p className="product-card__info__context__price">מחיר: החל מ- <span className="product-card__info__context__price__number">{product.price} ₪</span></p>
                    <p className="product-card__info__context__price-eilat">מחיר אילת: החל מ- <span className="product-card__info__context__price-eilat__number">{product.price_eilat} ₪</span></p>
                </div>
                <div className="product-card__info__btn-container">
                    <button className="product-card__info__btn-container__btn">לרכישה</button>
                </div>
            </div>
            <div className="product-card__display">
                <figure className="product-card__display__figure">
                    <img className="product-card__display__figure__image" src={productImage} alt={productName} />
                </figure>
            </div>
        </div>
    )
}

export default ProductCard;