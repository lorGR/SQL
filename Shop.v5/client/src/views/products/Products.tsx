import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { extractUniqueProductArray } from "./productsHelper";
import { Product } from "../products/productsHelper";
import ProductCard from "../../components/productCard/ProductCard";
import { useAppDispatch } from "../../app/hooks";
import { getUserByCookie } from "../../features/user/userAPI";

import macHeader from "../../assets/images/productsHeader/macHeader.jpeg";
import iphoneHeader from "../../assets/images/productsHeader/iphoneHeader.jpeg";
import ipadHeader from "../../assets/images/productsHeader/ipadHeader.jpeg";
import applewatchHeader from "../../assets/images/productsHeader/applewatchHeader.jpeg";
import airpodsHeader from "../../assets/images/productsHeader/airpodsHeader.jpeg";
import appletvHeader from "../../assets/images/productsHeader/appletvHeader.jpeg";

const Products = () => {
    const { storeType } = useParams();

    const [storeProducts, setStoreProducts] = useState<Product[]>();
    const [storeHeader, setStoreHeader] = useState<string>("");
    const [storeHeaderTitle, setStoreHeaderTitle] = useState<string>("");
    const [storeHeaderText, setStoreHeaderText] = useState<string>("");

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserByCookie());
    }, [])

    async function getProductsByType(storeType: string) {
        try {
            const { data } = await axios.post("/products/get-products-by-type", { storeType });
            if (!data) throw new Error("Couldn't receive data from axios '/get-products-by-type' ");
            const { result } = data;
            const products = await extractUniqueProductArray(result, 'name');
            setStoreProducts(products);
        } catch (error) {
            console.error(error);
        }
    }

    const setHeaderImage = (storeType: string) => {
        try {
            if (storeType === "mac") {
                setStoreHeader(macHeader);
                setStoreHeaderTitle("כל דגמי Mac לרכישה אונליין");
                setStoreHeaderText("iDigital - המומחים של Apple בישראל.");
            } else if (storeType === "iphone") {
                setStoreHeader(iphoneHeader);
                setStoreHeaderTitle("סדרת iPhone 14");
                setStoreHeaderText("");
            } else if (storeType === "ipad") {
                setStoreHeader(ipadHeader);
                setStoreHeaderTitle("כל דגמי iPad לרכישה אונליין");
                setStoreHeaderText("iDigital - המומחים של Apple בישראל.");
            } else if (storeType === "apple_watch") {
                setStoreHeader(applewatchHeader);
                setStoreHeaderTitle("כל דגמי Apple Watch לרכישה אונליין");
                setStoreHeaderText("iDigital - המומחים של Apple בישראל.");
            } else if (storeType === "air_pods") {
                setStoreHeader(airpodsHeader);
                setStoreHeaderTitle("AirPods ללא חוטים. ללא מאמץ. חוויה קסומה מאי פעם.");
                // setStoreHeaderText("");
            } else if (storeType === "apple_tv") {
                setStoreHeader(appletvHeader);
                setStoreHeaderTitle("כל דגמי Apple TV לרכישה אונליין");
                setStoreHeaderText("iDigital - המומחים של Apple בישראל.");
            } else {
                setStoreHeader("");
                setStoreHeaderTitle("");
                setStoreHeaderText("");
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        storeType !== undefined && getProductsByType(storeType);
        storeType !== undefined && setHeaderImage(storeType);
    }, [storeType]);

    return (
        <div className="products">

            {storeHeader.length !== 0 &&
                <div className="products__header">
                    <figure className="products__header__figure">
                        <img className="products__header__figure__image" src={storeHeader} alt="store header" draggable="false" />
                        <p className="products__header__figure__title">{storeHeaderTitle}</p>
                        {storeHeaderText.length > 0 &&
                            <p className="products__header__figure__text">{storeHeaderText}</p>
                        }
                    </figure>
                </div>
            }
            {storeHeader.length === 0 &&
                <div className="products__search-results page-container">
                    <h2 className="products__search-results__title">תוצאות עבור: {storeType}</h2>
                </div>
            }
            {storeProducts?.length === 0 &&
                <div className="products__results-not-found page-container">
                    <p className="products__results-not-found__title">לא נמצאו תוצאות עבור: {storeType}</p>
                </div>
            }
            <div className="products__container page-container">

                {storeProducts?.map((product, idx) => {
                    return (
                        <Link className="products__container__product" to={`../store/${product.type.toLocaleLowerCase()}/${product.name}`} key={idx}>
                            <ProductCard product={product} />
                        </Link>
                    );
                })}

            </div>
        </div>
    )
}

export default Products;

