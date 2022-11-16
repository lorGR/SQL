import express from "express";
import { connection } from "./DB/databaseSQL";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/insert-prod", (req, res) => {
    try {
        const colors = ['Space Gray', 'Starlight', 'Midnight', 'Silver'];
        const models = [
            "MacBook Air 13-inch M2 Silver 256GB SSD storage Apple M2 chip with 8‑core CPU, 8‑core GPU, and 16‑core Neural Engine 8GB unified memory Touch ID, Backlit Keyboard English+Hebrew, Two Thunderbolt USB 4 ports",
            "MacBook Air 13-inch M2 Silver 512GB SSD storage Apple M2 chip with 8‑core CPU, 10‑core GPU, and 16‑core Neural Engine 8GB unified memory Touch ID, Backlit Keyboard English+Hebrew, Two Thunderbolt USB 4 ports"
        ];
        const price = [5349 , 6649];
        const priceEilat = [4572, 5683];
        colors.forEach(color => {
            models.forEach(model => {
                if(model === "MacBook Air 13-inch M2 Silver 256GB SSD storage Apple M2 chip with 8‑core CPU, 8‑core GPU, and 16‑core Neural Engine 8GB unified memory Touch ID, Backlit Keyboard English+Hebrew, Two Thunderbolt USB 4 ports") {
                    const sql = `INSERT INTO products(type, name, price, price_eilat, color, model, screen_size)
                    VALUES ('Mac', 'MacBook Air 13" M2', '5349', '4572', '${color}', '${model}', '13')`;
                    connection.query( sql, (error, result) => {
                        if(error) throw error;
                        console.log(result);
                    });
                } else if (model === "MacBook Air 13-inch M2 Silver 512GB SSD storage Apple M2 chip with 8‑core CPU, 10‑core GPU, and 16‑core Neural Engine 8GB unified memory Touch ID, Backlit Keyboard English+Hebrew, Two Thunderbolt USB 4 ports") {
                    const sql = `INSERT INTO products(type, name, price, price_eilat, color, model, screen_size)
                    VALUES ('Mac', 'MacBook Air 13" M2', '6649', '5683', '${color}', '${model}', '13')`;
                    connection.query( sql, (error, result) => {
                        if(error) throw error;
                        console.log(result);
                    });
                }
            })
        })
        res.send({msg: "producds added"});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

app.listen(port, () => {
    console.info(`Server is up and running at http://localhost:${port}`);
})