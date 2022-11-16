import express from "express";

export function getStoreType(req: express.Request, res: express.Response) {
    try {
        const { storeTypeParam } = req.body;
        if (!storeTypeParam) throw new Error("Couldn't receive storeType from req.body");
        res.send({ storeTypeParam });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}