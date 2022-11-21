import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
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

    const dispatch = useAppDispatch();
    const user: User = useAppSelector(selectUser);
    const userId = user.user_id;

    useEffect(() => {
        dispatch(getUserByCookie());
    }, []);

    useEffect(() => {
        addToCart();
    }, [productId])

    const handleAddToCart = async (event: React.FC<HTMLFormElement> | any) => {
        try {
            event.preventDefault();
            // TODO: 
            // from event outputs
            // get the id of the product
            // add to cart the product_id and user_id as foreign keys
            if (storeType === "mac") {
                if (productName !== "Mac Mini" && productName !== "Mac Pro" && productName !== "Mac Studio") {

                    const [productColor, productModel] = [event.target.elements.productColor.value, event.target.elements.productModel.value];
                    const { data } = await axios.post("/products/get-product-id", { productColor, productModel, storeType });
                    if (!data) throw new Error("Couldn't receive data from axios POST '/get-product-id'");
                    const { prodId } = data;
                    const {product_id} = prodId;
                    setProductId(product_id);
                } else {

                    const productModel = event.target.elements.productModel.value;
                    const { data } = await axios.post("/products/get-product-id", { productName, productModel, storeType });
                    if (!data) throw new Error("Couldn't receive data from axios POST '/get-product-id'");
                    const { prodId } = data;
                    const {product_id} = prodId;
                    setProductId(product_id);
                }

            } else if (storeType === "iphone" || storeType === "ipad" || storeType === "apple_tv") {

                const [productColor, productStorage] = [event.target.elements.productColor.value, event.target.elements.storage.value];
                const { data } = await axios.post("/products/get-product-id", { productColor, productStorage, storeType, productName });
                if (!data) throw new Error("Couldn't receive data from axios POST '/get-product-id'");
                const { prodId } = data;
                const {product_id} = prodId;
                    setProductId(product_id);

            } else if (storeType === "apple_watch") {

                const [productColor, productScreenSize] = [event.target.elements.productColor.value, event.target.elements.screenSize.value];
                const { data } = await axios.post("/products/get-product-id", { productColor, productScreenSize, storeType, productName });
                if (!data) throw new Error("Couldn't receive data from axios POST '/get-product-id'");
                const { prodId } = data;
                const {product_id} = prodId;
                    setProductId(product_id);

            } else if (storeType === "air_pods" && productName === "AirPods Max") {

                const productColor = event.target.elements.productColor.value;
                const { data } = await axios.post("/products/get-product-id", { productColor, storeType, productName });
                if (!data) throw new Error("Couldn't receive data from axios POST '/get-product-id'");
                const { prodId } = data;
                const {product_id} = prodId;
                    setProductId(product_id);

            } else {

                const { data } = await axios.post("/products/get-product-id", { productName, storeType });
                if (!data) throw new Error("Couldn't receive data from axios POST '/get-product-id'");
                const { prodId } = data;
                const {product_id} = prodId;
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
                console.log(data);
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        // TODO:
        // Render a product header image

        // TODO:
        // Render product img

        <form onSubmit={handleAddToCart}>
            {productInfo[0].storage !== null &&
                productInfo.map((productStorage, idx) => {
                    return (
                        <div key={idx}>
                            <label htmlFor={productStorage.storage!} >{productStorage.storage}</label>
                            <input type="radio" name="storage" id={productStorage.storage!} value={productStorage.storage!} required />
                            <p>מחיר {productStorage.price} ₪</p>
                            <p>מחיר באילת {productStorage.price_eilat} ₪</p>
                        </div>
                    );
                })
            }
            {productInfo[0].screen_size !== null &&
                storeType !== 'mac' &&
                productInfo.map((productScreenSize, idx) => {
                    return (
                        <div key={idx}>
                            <label htmlFor={productScreenSize.screen_size!}>{productScreenSize.screen_size}</label>
                            <input type="radio" name="screenSize" id={productScreenSize.screen_size!} required value={productScreenSize.screen_size!} />
                            <p>מחיר {productScreenSize.price} ₪</p>
                            <p>מחיר באילת {productScreenSize.price_eilat} ₪</p>
                        </div>
                    );
                })
            }
            {productColors.length > 0 && productColors[0].color !== null &&
                productColors.map((productColor, idx) => {
                    // TODO : 
                    // on change color change the image above
                    return (
                        <div key={idx}>
                            <label htmlFor={productColor.color}>{productColor.color}</label>
                            <input type="radio" name="productColor" id={productColor.color} value={productColor.color} required />
                        </div>
                    );
                })
            }
            {productInfo[0].model !== null &&
                productInfo.map((productModel, idx) => {
                    return (
                        <div key={idx}>
                            <label htmlFor={productModel.model!}>{productModel.model}</label>
                            <input type="radio" name="productModel" id={productModel.model!} value={productModel.model!} required />
                            <p>מחיר {productModel.price} ₪</p>
                            <p>מחיר באילת {productModel.price_eilat} ₪</p>
                        </div>
                    );
                })
            }
            {user && <button>הוסף לסל</button>}
            {!user &&
                <div>
                    <button disabled>הוסף לסל </button>
                    <p>עלייך להירשם או להתחבר בכדי להוסיף מוצר זה לסל הקניות</p>
                </div>
            }
        </form>
    )
}

export default ProductForm;