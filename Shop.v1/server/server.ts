import express from "express";

const app = express();
const port = 4000;

app.use(express.json());

app.listen(port, () => {
    console.info(`Server is up and running at http://localhost:${port}`);       
})