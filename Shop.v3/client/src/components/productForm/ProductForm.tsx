import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getUserByCookie } from "../../features/user/userAPI"
import { User } from "../../features/user/userModel"
import { selectUser } from "../../features/user/userSlice"
import { ProductColors, ProductInfo } from "../../views/product/Product"

interface ProductFormProps {
    productInfo: Array<ProductInfo>
    productColors: Array<ProductColors>
}

const ProductForm: React.FC<ProductFormProps> = ({ productInfo, productColors }) => {
    const { storeType } = useParams();
    const { productName } = useParams();

    const [productId, setProductId] = useState<number | null>(null);
    const [productImg, setProductImg] = useState<string>();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user: User = useAppSelector(selectUser);
    const userId = user.user_id;

    useEffect(() => {
        dispatch(getUserByCookie());
        getProductPreviewImg()
    }, []);

    useEffect(() => {
        addToCart();
    }, [productId]);

    const handleAddToCart = async (event: React.FC<HTMLFormElement> | any) => {
        try {
            event.preventDefault();
            if (storeType === "mac") {
                if (productName !== "Mac Mini" && productName !== "Mac Pro" && productName !== "Mac Studio") {

                    const [productColor, productModel] = [event.target.elements.productColor.value, event.target.elements.productModel.value];
                    const { data } = await axios.post("/products/get-product-id", { productColor, productModel, storeType });
                    if (!data) throw new Error("Couldn't receive data from axios POST '/get-product-id'");
                    const { prodId } = data;
                    const { product_id } = prodId;
                    setProductId(product_id);
                } else {

                    const productModel = event.target.elements.productModel.value;
                    const { data } = await axios.post("/products/get-product-id", { productName, productModel, storeType });
                    if (!data) throw new Error("Couldn't receive data from axios POST '/get-product-id'");
                    const { prodId } = data;
                    const { product_id } = prodId;
                    setProductId(product_id);
                }

            } else if (storeType === "iphone" || storeType === "ipad" || storeType === "apple_tv") {

                const [productColor, productStorage] = [event.target.elements.productColor.value, event.target.elements.storage.value];
                const { data } = await axios.post("/products/get-product-id", { productColor, productStorage, storeType, productName });
                if (!data) throw new Error("Couldn't receive data from axios POST '/get-product-id'");
                const { prodId } = data;
                const { product_id } = prodId;
                setProductId(product_id);

            } else if (storeType === "apple_watch") {

                const [productColor, productScreenSize] = [event.target.elements.productColor.value, event.target.elements.screenSize.value];
                const { data } = await axios.post("/products/get-product-id", { productColor, productScreenSize, storeType, productName });
                if (!data) throw new Error("Couldn't receive data from axios POST '/get-product-id'");
                const { prodId } = data;
                const { product_id } = prodId;
                setProductId(product_id);

            } else if (storeType === "air_pods" && productName === "AirPods Max") {

                const productColor = event.target.elements.productColor.value;
                const { data } = await axios.post("/products/get-product-id", { productColor, storeType, productName });
                if (!data) throw new Error("Couldn't receive data from axios POST '/get-product-id'");
                const { prodId } = data;
                const { product_id } = prodId;
                setProductId(product_id);

            } else {

                const { data } = await axios.post("/products/get-product-id", { productName, storeType });
                if (!data) throw new Error("Couldn't receive data from axios POST '/get-product-id'");
                const { prodId } = data;
                const { product_id } = prodId;
                setProductId(product_id);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const addToCart = async () => {
        try {
            if (productId !== null) {
                const { data } = await axios.post("/products/add-to-cart", { productId, userId });
                if (!data) throw new Error("Couldn't receive data from axios POST '/add-to-cart'");
                navigate("/cart");
            }

        } catch (error) {
            console.error(error);
        }
    }

    const getProductPreviewImg = async () => {
        try {
            const { data } = await axios.post("/products/get-product-preview-img", { productName });
            if (!data) throw new Error("Couldn't receive data from axios POST '/get-product-preview-img'");
            const { result } = data;
            const { preview_img } = result[0];
            setProductImg(preview_img);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const colorObject = productColors.filter(product => product.color === event.target.value);
            const { display_img } = colorObject[0];
            setProductImg(display_img);
        } catch (error) {
            console.error(error);
        }
    }
    return (


        <div className="product-form">
            <figure className="product-form__figure">
                <img className="product-form__figure__image" src={productImg} alt={productName} />
            </figure>
            <form className="product-form__form" onSubmit={handleAddToCart}>
                {productInfo[0].storage !== null && <p className="product-form__form__storage-title">בחר נפח</p>}
                {productInfo[0].storage !== null &&
                    <div className="product-form__form__storage-container">
                        {productInfo.map((productStorage, idx) => {
                            return (
                                <div className="product-form__form__storage-container__storage" key={idx}>
                                    <label htmlFor={productStorage.storage!} >{productStorage.storage}</label>
                                    <input type="radio" name="storage" id={productStorage.storage!} value={productStorage.storage!} required />
                                    <p className="product-form__form__price">מחיר {productStorage.price} ₪</p>
                                    <p className="product-form__form__price-eilat">מחיר באילת {productStorage.price_eilat} ₪</p>
                                </div>
                            );
                        })}
                    </div>
                }
                {productInfo[0].screen_size !== null && storeType !== 'mac' && <p className="product-form__form__screen-size-title">בחר מידה</p>}
                {productInfo[0].screen_size !== null &&
                    storeType !== 'mac' &&
                    <div className="product-form__form__screen-size-container">
                        {productInfo.map((productScreenSize, idx) => {
                            return (
                                <div className="product-form__form__screen-size-container_screen-size" key={idx}>
                                    <label htmlFor={productScreenSize.screen_size!}>{productScreenSize.screen_size}</label>
                                    <input type="radio" name="screenSize" id={productScreenSize.screen_size!} required value={productScreenSize.screen_size!} />
                                    <p className="product-form__form__price">מחיר {productScreenSize.price} ₪</p>
                                    <p className="product-form__form__price-eilat">מחיר באילת {productScreenSize.price_eilat} ₪</p>
                                </div>
                            );
                        })}
                    </div>
                }
                {productColors.length > 0 && productColors[0].color !== null && <p className="product-form__form__color-title">בחר בצע</p>}
                {productColors.length > 0 && productColors[0].color !== null &&
                    <div className="product-form__form__color-container">
                        {productColors.map((productColor, idx) => {
                            return (
                                <div className="product-form__form__color-container__color" key={idx}>
                                    <label className="product-form__form__color-container__color__label" htmlFor={productColor.color}>
                                        {/* {productColor.color} */}
                                        <input className={productColor.color.toLowerCase()} onChange={handleChangeColor} type="radio" name="productColor" id={productColor.color} value={productColor.color} required />
                                        <div className={`${productColor.color.toLowerCase()} product-form__form__color-container__color__label__box`}></div>
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                }
                {productInfo[0].model !== null && <p className="product-form__form__model-title">בחר דגם</p>}
                {productInfo[0].model !== null &&
                    <div className="product-form__form__model-container">
                        {productInfo.map((productModel, idx) => {
                            return (
                                <div className="product-form__form__model-container__model" key={idx}>
                                    <label htmlFor={productModel.model!}>{productModel.model}</label>
                                    <input type="radio" name="productModel" id={productModel.model!} value={productModel.model!} required />
                                    <p className="product-form__form__price">מחיר {productModel.price} ₪</p>
                                    <p className="product-form__form__price-eilat">מחיר באילת {productModel.price_eilat} ₪</p>
                                </div>
                            );
                        })}
                    </div>
                }
                {/* // TODO: */}
                {/* // Display the amount of money next to button */}

                {/* // TODO: */}
                {/* // Add bottom nav bar with button add to cart which will be scrollable (fixed to bottom) */}
                {user &&
                    <div className="product-form__add-to-cart">
                        <button className="product-form__add-to-cart-btn">הוסף לסל</button>
                    </div>
                }
                {!user &&
                    <div className="product-form__add-to-cart">
                        <button className="product-form__add-to-cart-btn" disabled>הוסף לסל </button>
                        <p>עלייך להירשם או להתחבר בכדי להוסיף מוצר זה לסל הקניות</p>
                    </div>
                }
            </form>
        </div>
    )
}

export default ProductForm;