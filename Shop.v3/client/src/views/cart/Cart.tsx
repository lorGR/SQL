// This is the logic to get the products of a user that were added to cart
// SELECT *
// FROM products
// WHERE product_id IN (
// 	SELECT product_id FROM cart 
// 	WHERE user_id = 'userId'
// );

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getUserByCookie } from "../../features/user/userAPI";
import { selectUser } from "../../features/user/userSlice"


const Cart = () => {
    // TODO: 
    // Check why not getting products when refreshing page
    const user = useAppSelector(selectUser);

    const [userProducts, setUserProducts] = useState();

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

    return (
        <div>
            <h1>סל הקניות</h1>
            {!user &&
                <p>
                    <Link to="/my-account/registration">הירשם</Link>/
                    <Link to="/my-account">התחבר</Link> בכדי לראות את סל הקניות שלך
                </p>}
        </div>
    )
}

export default Cart