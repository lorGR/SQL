import express from "express";
import { registerUser } from "./usersCtrl";

const router = express.Router();

router
    .post("/register-user", registerUser)

export default router;