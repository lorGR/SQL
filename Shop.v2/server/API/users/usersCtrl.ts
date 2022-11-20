import express from "express";
import bcrypt from "bcrypt";
import { UserJoi } from "./usersModel";
import { connection } from "../../DB/databaseSQL";

const saltRounds = 10;

export async function registerUser(req: express.Request, res: express.Response) {
    try {
        const { firstName, lastName, identifierNumber,
            phoneNumber, email, confirmEmail, city,
            streetAddress, houseNumber, postalCode,
            password, confirmPassword } = req.body;
        if (!firstName || !lastName || !identifierNumber ||
            !phoneNumber || !email || !confirmEmail || !city ||
            !streetAddress || !houseNumber! || !postalCode ||
            !password || !confirmPassword) throw new Error("All those fields are required to validate");

        const { error } = UserJoi.validate({
            firstName, lastName, identifierNumber,
            phoneNumber, email, confirmEmail, city,
            streetAddress, houseNumber, postalCode,
            password, confirmPassword
        });
        if (error) throw error;

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(password, salt);

        const sql = `INSERT INTO users(first_name, last_name, identifier_number, phone_number, email, city, street_address, house_number, postal_code, password)
        VALUES ('${firstName}', '${lastName}', '${identifierNumber}', '${phoneNumber}', '${email}', '${city}', '${streetAddress}', '${houseNumber}', '${postalCode}', '${hashPassword}')`;
        
        connection.query(sql, (error, result) => {
            try {
                if (error) throw error;
                res.send({ msg: "account created", result });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}