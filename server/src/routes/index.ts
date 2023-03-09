import express from "express";
import authController, { authValidation } from "../controllers/auth.controller";

const router = express.Router();
router.post("/login", authValidation.login, authController.login); // address
router.post("/register", authValidation.register, authController.register); //  address name
router.get("/users", authController.users);

export default router;
