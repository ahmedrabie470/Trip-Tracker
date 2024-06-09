import bcrypt from 'bcrypt';
import { AppError } from "../../utilits/AppError.js";
import jwt from "jsonwebtoken";
import { catchError } from '../../middleware/catchError.js';
import { userModel } from '../../../dataBases/models/user/user.model.js';

export const getAllUsers = async (req, res) => {
  const users = await userModel.findAll({ });
  res.json({ message: "success", users });
};


export const register = catchError(async(req, res, next) => {
  await userModel.create(req.body);
  res.json({ message: "success" });  
} ) 


export const login =catchError(async(req, res, next) =>{
  const user = await userModel.findOne({ where: { email: req.body.email} });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign({ userId: user.id, email: user.email , name:user.username },process.env.JWT_KEY);
    res.json({ message: "Login Successfully", token });
  } else {
    return next(new AppError("Incorrect Email Or Password",409)  );
  }
}) 








