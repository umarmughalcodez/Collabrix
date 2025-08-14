import { Router } from "express";
import { userRegister } from "../controllers/authControllers";

const router = Router();

router.post("/register", userRegister)


export default router;