import express from "express";
import {getAllUsers,login,register} from "./user.controller.js";
import { checkEmailExist } from "../../middleware/checkEmailExist.js";
import { validation } from "../../middleware/validation.js";
import { loginSchema, registerSchema } from "./user.validation.js";

const userRouter = express.Router();


userRouter.post("/register" , validation(registerSchema) ,checkEmailExist ,register)
userRouter.get('/allUsers',getAllUsers)
userRouter.post('/login',validation(loginSchema),login)


export default userRouter;
