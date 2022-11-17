export interface Product {
    name: string,
    price: number,
    price_eilat: number
}

export function extractUniqueProductArray(productsArray: Array<Product>): Array<Product> | any {
    try {
        const uniqueArray: Array<any> = [];
        const unique = productsArray.filter((product : any) => {
            const isDuplicate = uniqueArray.includes(product.name);
            if (!isDuplicate) {
                uniqueArray.push(product.name);
                return true;
            }
            return false;
        });
        return unique;
    } catch (error) {
        console.error(error);
    }
}