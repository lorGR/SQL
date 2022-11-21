import { useEffect } from "react"
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

    const user: User = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserByCookie());
    },[]);

    return (
        // TODO:
        // render product img
        <form>
            {productInfo[0].storage !== null &&
                productInfo.map((productStorage, idx) => {
                    return (
                        <div key={idx}>
                            <label htmlFor={productStorage.storage!} >{productStorage.storage}</label>
                            <input type="radio" name="storage" id={productStorage.storage!} value={productStorage.storage!} required />
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