import express from "express";
import { connection } from "../../DB/databaseSQL";

export async function getProductsName(req: express.Request, res: express.Response) {
    try {
        const { storeTypeParam } = req.body;
        if (!storeTypeParam) throw new Error("Couldn't receive storeType from req.body");

        const productsNames: Array<string> = [];

        const sql = `SELECT DISTINCT name FROM products WHERE type = '${storeTypeParam}'`;
        await connection.query(sql, (error, results) => {
            try {
                if (error) throw error;
                results.forEach(result => {
                    const productName = result.name;
                    productsNames.push(productName);
                });
                res.send({ productsNames });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

export async function getproductPrice(req: express.Request, res: express.Response) {
    try {
        const { productName } = req.body;
        if (!productName) throw new Error("Couldn't receive productName from req.body");

        const sql = `SELECT DISTINCT name, price, price_eilat FROM products WHERE name = '${productName}' ORDER BY price, price_eilat LIMIT 1`;
        await connection.query(sql, (error, products) => {
            try {
                if (error) throw error;
                res.send({ products });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}