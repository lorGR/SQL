import express from "express";
import { connection } from "./DB/databaseSQL";

const app = express();
const port = 4000;

app.use(express.json());

import productsRoutes from "./API/products/productsRoutes";
app.use("/products", productsRoutes);

import usersRoutes from "./API/users/usersRoutes";
app.use("/users", usersRoutes);

// app.get("/insert-prod", (req, res) => {
    // try {
    //     const colors = ['Space Gray', 'Pink', 'Green', 'Blue', 'Silver'];
    //     const screenSizes = ["40", "44"];
    //     const productType = "Apple_TV";
    //     const productName = "Apple TV HD";
    //     const storage = "32GB";
    //     const price = 699;
    //     const priceEilat = 597;
    //     const sql = `INSERT INTO products(type, name, price, price_eilat, storage, color)
    //             VALUES ('${productType}', '${productName}', '${price}', '${priceEilat}', '${storage}', 'Black')`;
    //     connection.query(sql, (error, result) => {
    //         if (error) throw error;
    //         console.log(result);
    //     });
    //     res.send({ msg: "products were added" });
    // } catch (error) {
    //     res.status(500).send({ error: error.message });
    // }
// });

app.listen(port, () => {
    console.info(`Server is up and running at http://localhost:${port}`);
})