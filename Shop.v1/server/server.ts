import express from "express";
import { connection } from "./DB/databaseSQL";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/insert-prod", (req, res) => {
    try {
        // const colors = ['Space Gray', 'Silver', 'Gold'];
        // const models = [
        //     "MacBook Air 13 M1 Late 2020 Gold 256GB SSD storage Apple M1 Chip with 8‑Core CPU and 7‑Core GPU and 16‑core Neural Engine 8GB unified memory Touch ID, Backlit Keyboard English+Hebrew, Two Thunderbolt USB 4 ports",
        //     "MacBook Air 13 M1 Late 2020 Gold 512GB SSD storage Apple M1 chip with 8‑core CPU, 8‑core GPU, and 16‑core Neural Engine 8GB unified memory Touch ID, Backlit Keyboard English+Hebrew, Two Thunderbolt USB 4 ports",
        // ];
        // const price = [4199, 5249];
        // const priceEilat = [3589, 4486];
        // colors.forEach(color => {
        //     models.forEach(model => {
        //         if(model === "MacBook Air 13 M1 Late 2020 Gold 256GB SSD storage Apple M1 Chip with 8‑Core CPU and 7‑Core GPU and 16‑core Neural Engine 8GB unified memory Touch ID, Backlit Keyboard English+Hebrew, Two Thunderbolt USB 4 ports") {
        //             const sql = `INSERT INTO products(type, name, price, price_eilat, color, model, screen_size)
        //             VALUES ('Mac', 'MacBook Air Late 2020', '4199', '3589', '${color}', '${model}', '13')`;
        //             connection.query( sql, (error, result) => {
        //                 if(error) throw error;
        //                 console.log(result);
        //             });
        //         } else if (model === "MacBook Air 13 M1 Late 2020 Gold 512GB SSD storage Apple M1 chip with 8‑core CPU, 8‑core GPU, and 16‑core Neural Engine 8GB unified memory Touch ID, Backlit Keyboard English+Hebrew, Two Thunderbolt USB 4 ports") {
        //             const sql = `INSERT INTO products(type, name, price, price_eilat, color, model, screen_size)
        //             VALUES ('Mac', 'MacBook Air Late 2020', '5249', '4486', '${color}', '${model}', '13')`;
        //             connection.query( sql, (error, result) => {
        //                 if(error) throw error;
        //                 console.log(result);
        //             });
        //         }
        //     })
        // })
        const sql = `INSERT INTO products(type, name, price, price_eilat, model) 
        VALUES ('Mac', 'Mac Studio', '8599', '7350', 'Mac Studio 512GB SSD storage Apple M1 Max chip with 10-core CPU, 24-core GPU, and 16-core Neural Engine 32GB unified memory')`;
        connection.query( sql, (error, result) => {
            if(error) throw error;
            console.log(result);
        });
        res.send({msg: "producds added"});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

app.listen(port, () => {
    console.info(`Server is up and running at http://localhost:${port}`);
})