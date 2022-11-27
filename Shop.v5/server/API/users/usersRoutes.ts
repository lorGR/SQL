import express from "express";
import { getUserByCookie, loginUser, registerUser } from "./usersCtrl";

const router = express.Router();

router
    .post("/register-user", registerUser)
    .post("/login-user", loginUser)
    .get("/get-user-by-cookie", getUserByCookie)
    

export default router;