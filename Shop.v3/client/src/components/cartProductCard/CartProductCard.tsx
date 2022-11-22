import axios from "axios";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";
import { CartProduct } from "../../views/cart/Cart"

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
        <div className="cart-product-card" key={product.product_id}>
            <h4 className="cart-product-card__name">{product.name}</h4>
            <figure className="cart-product-card__figure">
                <img className="cart-product-card__figure__image" src={product.display_img} alt={product.name} />
            </figure>
            <p className="cart-product-card__price" >מחיר {product.price} ₪</p>
            <button className="cart-product-card__remove-button" onClick={handleRemoveFromCart} id={productId} >הסר מוצר</button>
        </div>
    )
}

export default CartProductCard;