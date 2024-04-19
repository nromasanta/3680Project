import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import morgan from 'morgan'; 
dotenv.config();

const app = express();


//middleware
app.use(express.json()); // express
app.use(cors());
app.use(morgan('dev'));
app.use('/api/users', userRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    //listening
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & Listening on port", process.env.PORT);
    })    
  })
  .catch((error) => {
    console.log(error);
  })