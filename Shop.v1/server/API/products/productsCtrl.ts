import express from "express";
import { connection } from "../../DB/databaseSQL";

export function getProductsName(req: express.Request, res: express.Response) {
    try {
        const { storeTypeParam } = req.body;
        if (!storeTypeParam) throw new Error("Couldn't receive storeType from req.body");
        // add sql query to get all the items with the same type
        // change name of function and route to productsType to be consistent
        const sql = `SELECT DISTINCT name FROM products WHERE type = '${storeTypeParam}'`;
        connection.query(sql, (error, result) => {
            try {
                if(error) throw error;
                console.log(result);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
        res.send({ storeTypeParam });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}