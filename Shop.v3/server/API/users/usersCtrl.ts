import express from "express";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
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

                const cookie = { userId: result.insertId };
                const secret = process.env.JWT_SECRET;
                if (!secret) throw new Error("Coudln't load secret from .env");

                const JWTCookie = jwt.encode(cookie, secret);

                res.cookie("userID", JWTCookie);
                res.send({ registered: true });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function loginUser(req: express.Request, res: express.Response) {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new Error("Couldn't receive email or password from req.body");

        const sql = `SELECT * FROM users WHERE email ='${email}'`;
        connection.query(sql, async (error, result) => {
            try {
                if (error) throw error;
                const isMatch = await bcrypt.compare(password, result[0].password);
                if (!isMatch) throw new Error("Email or password incorrect");

                const cookie = { userId: result[0].user_id };
                const secret = process.env.JWT_SECRET;
                if (!secret) throw new Error("Couldn't load secret from .env");

                const JWTCookie = jwt.encode(cookie, secret);

                res.cookie("userID", JWTCookie);
                res.send({ loggedIn: true })
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function getUserByCookie(req: express.Request, res: express.Response) {
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("Couldn't load secret from .env");

        const { userID } = req.cookies;

        if (userID) {
            const decodedUserId = jwt.decode(userID, secret);
            const { userId } = decodedUserId;

            const sql = `SELECT * FROM users WHERE user_id = '${userId}'`;
            connection.query(sql, (error, result) => {
                if (error) throw error;
                res.send({ result });
            });
        } else {
            res.send({ result: { user: "guest" } });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
