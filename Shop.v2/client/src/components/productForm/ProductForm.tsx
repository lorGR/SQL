import { useParams } from "react-router-dom"
import { ProductColors, ProductInfo } from "../../views/product/Product"

interface ProductFormProps {
    productInfo: Array<ProductInfo>
    productColors: Array<ProductColors>
}

const ProductForm: React.FC<ProductFormProps> = ({ productInfo, productColors }) => {
    const { storeType } = useParams();
    return (
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
            {productColors.length > 0 &&
                productColors.map((productColor, idx) => {
                    return (
                        <div key={idx}>
                            <label htmlFor={productColor.color}>{productColor.color}</label>
                            <input type="radio" name="productColor" id={productColor.color} value={productColor.color} required/>
                        </div>
                    );
                })
            }
            {productInfo[0].model !== null &&
                productInfo.map((productModel, idx) => {
                    return (
                        <div key={idx}>
                            <label htmlFor={productModel.model!}>{productModel.model}</label>
                            <input type="radio" name="productModel" id={productModel.model!} value={productModel.model!} required/>
                        </div>
                    );
                })
            }
            <button>הוסף לסל</button>
        </form>
    )
}

export default ProductForm;