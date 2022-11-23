import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import CartProductCard from "../../components/cartProductCard/CartProductCard";
import { getUserByCookie } from "../../features/user/userAPI";
import { selectUser } from "../../features/user/userSlice"

export interface CartProduct {
    color: string,
    description: string,
    display_img: string,
    model: string | null,
    name: string,
    network: string | null,
    preview_img: string,
    price: number,
    price_eilat: number,
    product_id: number,
    screen_size: string | null,
    storage: string | null,
    type: string
}

const Cart = () => {

    const user = useAppSelector(selectUser);

    const [userProducts, setUserProducts] = useState<CartProduct[]>();
    const [productsPrice, setProductsPrice] = useState<any>();

    const getUserProducts = async () => {
        try {
            if (user) {
                const userId = user.user_id;
                const { data } = await axios.post("/products/get-products-price-cart", { userId });
                if (!data) throw new Error("Couldn't receive data from axios POST '/get-products-price-cart'");
                const sum = data?.reduce((accumulator: any, object: any) => {
                    return accumulator + object.price;
                }, 0);
                setUserProducts(data);
                setProductsPrice(sum);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUserProducts();
    }, [user]);

    return (
        <div className="cart">
            <h1 className="cart__title">סל הקניות</h1>
            {!user &&
                <p className="cart__no-user-information">
                    <Link to="/my-account/registration">הירשם</Link>/
                    <Link to="/my-account">התחבר</Link> בכדי לראות את סל הקניות שלך
                </p>}
            {!userProducts &&
                <p className="cart__user-information">אין מוצרים בסל קניות</p>
            }
            {userProducts &&
                userProducts.map(userProduct => {
                    const productId = userProduct.product_id.toString();
                    return (
                        <CartProductCard product={userProduct} key={userProduct.product_id}/>
                    );
                })
            }
            {userProducts &&
                <div className="cart__purchase">
                    <form className="cart__purchase__form">
                        <p className="cart__purchase__form__price">סה״כ לתשלום: {productsPrice} ₪</p>
                        <button className="cart__purchase__form__btn">קנה עכשיו</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default Cart