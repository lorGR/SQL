import express from "express";
import { connection } from "./DB/databaseSQL";

const app = express();
const port = 4000;

app.use(express.json());

import productsRoutes from "./API/products/productsRoutes";
app.use("/products", productsRoutes);

app.get("/insert-prod", (req, res) => {
    // try {
    //     const colors = ['Red', 'Blue', 'White', 'Purple', 'Midnight'];
    //     const storages = ['128GB', '256GB', '512GB'];
    //     const price = [4479, 4979, 5979];
    //     const priceEilat = [3828, 4256, 5110 ];
    //     colors.forEach(color => {
    //       storages.forEach(storage => {
    //         if(storage === "128GB") {
    //             const sql = `INSERT INTO products(type, name, price, price_eilat, storage, color)
    //             VALUES ('iPhone', 'iPhone 14 Plus', '4479', '3828', '${storage}', '${color}')`;
    //             connection.query( sql, (error, result) => {
    //                 if (error) throw error;
    //                 console.log(result);
    //             });
    //         } else if (storage === "256GB") {
    //             const sql = `INSERT INTO products(type, name, price, price_eilat, storage, color)
    //             VALUES ('iPhone', 'iPhone 14 Plus', '4979', '4256', '${storage}', '${color}')`;
    //             connection.query( sql, (error, result) => {
    //                 if (error) throw error;
    //                 console.log(result);
    //             });
    //         } else if (storage === "512GB") {
    //             const sql = `INSERT INTO products(type, name, price, price_eilat, storage, color)
    //             VALUES ('iPhone', 'iPhone 14 Plus', '5979', '5110', '${storage}', '${color}')`;
    //             connection.query( sql, (error, result) => {
    //                 if (error) throw error;
    //                 console.log(result);
    //             });
    //         }
    //       });
    //     })
    //     res.send({msg: "products were added"});
    // } catch (error) {
    //     res.status(500).send({ error: error.message });
    // }
});

app.listen(port, () => {
    console.info(`Server is up and running at http://localhost:${port}`);
})