import express,{json}  from 'express';
import dotenv from 'dotenv';
import { userauth } from './Routes/userauth.js';
import { adminauth } from './Routes/adminauth.js';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();
const app =express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
 
app.use(cors(({
    origin: 'http://localhost:5173',       
    credentials: true
 })))      
app.use('/',userauth);
app.use('/',adminauth);



mongoose.connect('mongodb://localhost:27017/MY_LIBRARY').then(()=>{
    console.log("Mongodb connected Successfully to Library Project");})
    .catch((error)=>{
        console.error("Mongodb connection failed",error);
});
app.listen(process.env.PORT,function(){
    console.log(`server is listening at ${process.env.PORT}`);
    
});