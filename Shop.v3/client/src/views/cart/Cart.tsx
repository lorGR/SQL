import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getUserByCookie } from "../../features/user/userAPI";
import { selectUser } from "../../features/user/userSlice"

export interface CartProduct {
    color : string,
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
    // TODO: 
    // Check why not getting products when refreshing page
    const user = useAppSelector(selectUser);

    const [userProducts, setUserProducts] = useState<CartProduct[]>();

    const getUserProducts = async () => {
        try {
            if (user) {
                const userId = user.user_id;
                const { data } = await axios.post("/products/get-user-products", { userId });
                if (!data) throw new Error("Couldn't receive data from axios POST '/get-user-products' ");
                console.log(data);
                setUserProducts(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUserProducts();
    }, []);
    // TODO: 
    // Create Component of CartProduct
    // Render button to buy products
    // Functnions: 
    // 1. Get the sum of all the products price in user cart
    // 2. Remove product from cart when user clicks remove
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
                    return (
                        <div>
                            <h4>{userProduct.name}</h4>
                            <figure>
                                <img src={userProduct.display_img} alt={userProduct.name} />
                            </figure>
                            <p>מחיר {userProduct.price} ₪</p>
                            <button>הסר מוצר</button>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default Cart