import pkg from 'pg'
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

const PGHOST=process.env.PGHOST
const PGDATABASE=process.env.PGDATABASE
const PGUSER=process.env.PGUSER
const PGPASSWORD=process.env.PGPASSWORD
const PGPORT=process.env.PGPORT
 
export const pool = new Pool()
 
// console.log(await pool.query('SELECT NOW()'))
 