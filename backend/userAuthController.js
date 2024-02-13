import bcrypt from 'bcrypt';
import { pool } from './db.js'
import { generateToken } from './utils.js';

const saltRounds = 10;


export const register =  async(req, res, next) => {
    try {
       const data = await pool.query('SELECT user_ID FROM users WHERE user_mail = $1',[req.body.email])
       console.log(data);
       if(data.rows.length){
        res.status(200).json({data:`${req.body.email} already had an account`});
        return;
       }
       
       const hash = await bcrypt.hash(req.body.password, saltRounds);

       const response = await pool.query('INSERT INTO users (user_mail, user_name, hash_password )VALUES ($1, $2, $3) returning user_id,user_mail,user_name',
       [req.body.email, req.body.user_name, hash])
       
       const token = generateToken(response.rows[0].user_ID)
       res.status(201).json({data:response.rows})

    
   } catch (error) {
    console.log(error);
    
   }
}







export const login =  async(req, res, next) => {
    try {
       const data = await pool.query('SELECT user_ID,hash_password FROM users WHERE user_mail = $1 OR user_name= $1',
       [req.body.user])
       if(!data.rows.length){
        res.status(200).json({data:'Username or Password is incorrect'});
        return;
       }
        
       const hash = data.rows[0].hash_password;
       console.log(data.rows);
       if(await bcrypt.compare(req.body.password, hash)){
           const token = generateToken(data.rows[0].user_id);
           res.status(201).json({data:token});
           return;
        }


        res.status(200).json({data:'Username or Password is incorrect'});
       

    
   } catch (error) {
    console.log(error);
    
   }
}