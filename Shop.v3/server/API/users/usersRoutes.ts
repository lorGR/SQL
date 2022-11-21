import express from "express";
import { getUserByCookie, registerUser } from "./usersCtrl";

const router = express.Router();

router
    .post("/register-user", registerUser)
    .get("/get-user-by-cookie", getUserByCookie)

export default router;