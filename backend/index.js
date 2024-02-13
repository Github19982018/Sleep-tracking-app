import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import router from './routes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(morgan("dev"));

app.use('/api/v1', router);


const PORT = process.env.PORT || 3000;
app.listen(PORT,() => console.log('server listening on port '+ PORT))