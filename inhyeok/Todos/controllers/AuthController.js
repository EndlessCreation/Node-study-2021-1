import express from "express";
import * as AuthService from "../services/AuthService";
import * as AuthHelper from "../middleware/AuthHelper";
const router = express.Router();

router.post("/login", AuthHelper.isNotLoggedIn, AuthService.login);
router.post("/signup", AuthHelper.isNotLoggedIn, AuthService.singup);
router.get("/logout", AuthHelper.isLoggedIn, AuthService.logout);
export default router;
