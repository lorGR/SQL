import axios from "axios";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";
import { CartProduct } from "../../views/cart/Cart"

import trashIcon from "../../assets/svg/cart/trashIcon.svg";
import xIcon from "../../assets/svg/cart/xIcon.svg";

export interface CartProductCardProps {
    product: CartProduct
}

const CartProductCard: React.FC<CartProductCardProps> = ({ product }) => {

    const productId = product.product_id.toString();

    const user = useAppSelector(selectUser);

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

    return (
        // <div className="cart-product-card" key={product.product_id}>
        //     <h4 className="cart-product-card__name">{product.name}</h4>
        //     <figure className="cart-product-card__figure">
        //         <img className="cart-product-card__figure__image" src={product.display_img} alt={product.name} />
        //     </figure>
        //     <p className="cart-product-card__price" >מחיר {product.price} ₪</p>
        //     <button className="cart-product-card__remove-button" onClick={handleRemoveFromCart} id={productId} >הסר מוצר</button>
        // </div>

            <tr className="cart__table-container__table__product">
                <td className="cart__table-container__table__product__name">
                    <div className="cart__table-container__table__product__name__description">
                        <img src={product.display_img} alt={product.name} />
                        <p>{product.name}</p>
                    </div>
                </td>
                <td className="cart__table-container__table__product__price">{product.price} ₪</td>
                <td className="cart__table-container__table__product__price-eilat">{product.price_eilat} ₪</td>
                <td className="cart__table-container__table__product__total-price">{product.price} ₪</td>
                <td className="cart__table-container__table__product__remove-product">
                    <button className="cart__table-container__table__product__remove-product__btn" onClick={handleRemoveFromCart} id={productId}>
                        <img className="cart__table-container__table__product__remove-product__btn__image" onClick={handleRemoveFromCart} id={productId} width="30px" src={xIcon} alt="remove product trash icon" />
                    </button>
                </td>
            </tr>
    )
}

export default CartProductCard;