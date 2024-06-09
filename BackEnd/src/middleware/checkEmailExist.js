// Import bcrypt for password hashing
import bcrypt from 'bcrypt';
//Import catchError for handling error
import { catchError } from './catchError.js';
import { AppError } from '../utilits/AppError.js';
import { userModel } from '../../dataBases/models/user/user.model.js';
// Import the Sequelize User model

// Define the function to check if email already exists
export const checkEmailExist =catchError(async (req, res, next) => {
  const emailExist = await userModel.findOne( {where:{ email: req.body.email }});
  if (emailExist) return next(new AppError("Email Already Exist",404));
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  next()
}) 
