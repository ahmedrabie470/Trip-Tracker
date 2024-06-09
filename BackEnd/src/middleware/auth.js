import jwt from 'jsonwebtoken'
import { catchError } from './catchError.js'
import { AppError } from '../utilits/AppError.js'

const auth = catchError (async(req,res ,next )=>{
    jwt.verify(req.header('token') ,process.env.JWT_KEY,(err, decoded) => {
    if(err) return next(new AppError('Error verifying token' , 409))
        req.user = decoded
    console.log(decoded);
    next()
    })} 
   ) 
export {
    auth
}