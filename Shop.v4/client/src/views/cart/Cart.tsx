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

    // TODO :
    // Bug fix 
    // cannot add / display the same product
    // how to fix - add colum to the table named amount 
    // if there is no product id in the cart start with one
    // if there is product id in the cart add to the amount table +1 each time

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

    const handleUsersBuy = async () => {
        try {
            if (user) {
                const userId = user.user_id;
                const { data } = await axios.delete("/products/delete-products-from-cart", { data: { userId } });
                if(!data) throw new Error("Couldn't receive data from axios DELETE '/delete-products-form-cart' ");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="cart page-container">
            <h1 className="cart__title">סל הקניות</h1>
            {!user &&
                <p className="cart__no-user-information">
                    <Link to="/my-account/registration">הירשם</Link>
                    או
                    <Link to="/my-account">התחבר</Link>
                    בכדי לראות את סל הקניות שלך
                    {/* <Link to="/my-account/registration">הירשם</Link>/
                    <Link to="/my-account">התחבר</Link> בכדי לראות את סל הקניות שלך */}
                </p>}
            {userProducts !== undefined && userProducts.length === 0 &&
                <div className="cart__no-user-information">
                    <p>אין מוצרים בסל קניות</p>
                </div>
            }
            {userProducts !== undefined && userProducts.length > 0 &&
                <div className="cart__table-container">
                    <table className="cart__table-container__table">
                        <tbody>
                            <tr className="cart__table-container__table__header">
                                <th className="cart__table-container__table__header__name">מוצר</th>
                                <th className="cart__table-container__table__header__name">מחיר</th>
                                <th className="cart__table-container__table__header__name">מחיר באילת</th>
                                <th className="cart__table-container__table__header__name"> סה״כ לתשלום</th>
                                <th className="cart__table-container__table__header__name"></th>
                            </tr>
                            {userProducts.map(userProduct => {
                                const productId = userProduct.product_id.toString();
                                return (
                                    <CartProductCard product={userProduct} key={userProduct.product_id} />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            }
            {/* TODO: */}
            {/* When user click buy buy */}
            {/* Empty his cart */}
            {userProducts !== undefined && userProducts?.length > 0 &&
                <div className="cart__purchase">
                    <form onSubmit={handleUsersBuy} className="cart__purchase__form">
                        <p className="cart__purchase__form__price">סה״כ לתשלום: <span className="cart__purchase__form__price__number">{productsPrice} ₪</span></p>
                        <button className="cart__purchase__form__btn">קנה עכשיו</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default Cart