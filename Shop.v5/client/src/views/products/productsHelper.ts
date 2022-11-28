export interface Product {
    name: string,
    price: number,
    price_eilat: number,
    type: string
}

export function extractUniqueProductArray(productsArray: Array<Product>, parm: string): Array<Product> | any {
    try {
        const uniqueArray: Array<any> = [];
        const unique = productsArray.filter((product : any) => {
            const isDuplicate = uniqueArray.includes(product[`${parm}`]);
            if (!isDuplicate) {
                uniqueArray.push(product[`${parm}`]);
                return true;
            }
            return false;
        });
        return unique;
    } catch (error) {
        console.error(error);
    }
}