import mysql from "mysql";

export const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "idigital"
});

connection.connect((error) => {
    try {
        if(error) throw error;
        console.log("Connected to MySQL");
    } catch (error) {
        console.error(error);
    }
});