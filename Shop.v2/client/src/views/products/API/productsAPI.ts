import axios from "axios";

export async function getProductsName(storeTypeParam: string) {
    try {
        const { data } = await axios.post("/products/get-products-name", { storeTypeParam });
        if (!data) throw new Error("Couldn't receive data from Axios POST '/get-products-name' ");
        const { productsNames } = data;
        return productsNames;
    } catch (error) {
        console.error(error);
    }
}

export async function getProductPrice(productName: string) {
    try {
        const { data } = await axios.post("/products/get-product-price", { productName });
        if (!data) throw new Error("Couldn't receive data from Axios POST '/get-product-price' ");
        const { products } = data;
        return products;
    } catch (error) {
        console.error(error);
    }
}