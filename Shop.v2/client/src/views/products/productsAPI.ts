import axios from "axios";

interface Product {
    name: string,
    price: number,
    price_eilat: number
}

export function create(data: Array<Product>) {
    try {
        const uniqueIds: any = [];

        const unique = data.filter(element => {
            const isDuplicate = uniqueIds.includes(element.name);

            if (!isDuplicate) {
                uniqueIds.push(element.name);

                return true;
            }

            return false;
        });
        console.log(unique);
    } catch (error) {
        console.error(error);
    }
}