import express from "express";
import { connection } from "../../DB/databaseSQL";

export async function getProductsByType(req: express.Request, res: express.Response) {
    try {
        const { storeType } = req.body;
        if (!storeType) throw new Error("Couldn't receive data from req.body");

        const sql = `
            SELECT DISTINCT name, price ,price_eilat
            FROM products
            WHERE type = '${storeType}'`;
        await connection.query(sql, (error, result) => {
            try {
                if(error) throw error;
                res.send({result});
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}