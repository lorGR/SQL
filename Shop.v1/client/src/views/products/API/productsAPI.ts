import axios from "axios";

export async function getStoreType(storeTypeParam: string) {
    try {
        const { data } = await axios.post("/products/get-products-name", { storeTypeParam });
        if(!data) throw new Error("Couldn't receive data from Axios GET '/get-products-name' ");
        const storeType = data.storeTypeParam;
        console.log(storeType);
    } catch (error) {
        console.error(error);
    }
}