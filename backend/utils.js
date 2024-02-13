import  jwt  from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();


export const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;
   const token = jwt.sign({
    userId:userId
  }, secret, { expiresIn: 60 * 60 * 24 * 30 });

  return token;
} 

