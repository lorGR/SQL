import express from "express";

export function getStoreType(req: express.Request, res: express.Response) {
    try {
        const { storeTypeParam } = req.body;
        if (!storeTypeParam) throw new Error("Couldn't receive storeType from req.body");
        // add sql query to get all the items with the same type
        // change name of function and route to productsType to be consistent
        res.send({ storeTypeParam });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}