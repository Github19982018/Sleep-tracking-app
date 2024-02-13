import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
    const token = req.body.token;
    try {
        const decoded = jwt.verify(token, secret);
        console.log(decoded.userId);
        req.userId = decoded.userId;
        next();
      } catch(err) {
        res.status(403).json({error:err.message})
      }
}
