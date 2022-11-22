import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
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

    const handleRemoveFromCart = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any) => {
        try {
            const productId = event.target.id;
            const userId = user.user_id;
            const { data } = await axios.delete("/products/delete-product-from-cart", { data: { userId, productId } });
            if (!data) throw new Error("Couldn't receive data from axios DELETE '/delete-product-from-cart'");

            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    const getUserProducts = async () => {
        try {
            if(user) {
                const userId = user.user_id;
                const { data } = await axios.post("/products/get-products-price-cart", {userId});
                if(!data) throw new Error("Couldn't receive data from axios POST '/get-products-price-cart'");
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

    // TODO: 
    // Create Component of CartProduct

    return (
        <div>
            <h1>סל הקניות</h1>
            {!user &&
                <p>
                    <Link to="/my-account/registration">הירשם</Link>/
                    <Link to="/my-account">התחבר</Link> בכדי לראות את סל הקניות שלך
                </p>}
            {!userProducts &&
                <p>אין מוצרים בסל קניות</p>
            }
            {userProducts &&
                userProducts.map(userProduct => {
                    const productId = userProduct.product_id.toString();
                    return (
                        <div key={userProduct.product_id}>
                            <h4>{userProduct.name}</h4>
                            <figure>
                                <img src={userProduct.display_img} alt={userProduct.name} />
                            </figure>
                            <p>מחיר {userProduct.price} ₪</p>
                            <button onClick={handleRemoveFromCart} id={productId} >הסר מוצר</button>
                        </div>
                    );
                })
            }
            {userProducts &&
                <div>
                    <form>
                        <p>סה״כ לתשלום: {productsPrice} ₪</p>
                        <button>קנה עכשיו</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default Cart