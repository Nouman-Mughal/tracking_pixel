

// import express from "express";
// import mongoose from 'mongoose';
const express=require('express')
const mongoose=require('mongoose')
const usersRouter=require('./routes/usersRouter')

// import usersRouter from "./routes/usersRouter.js";

const app=express();

// import {} from "dotenv/config"
require('dotenv').config()
app.get('/', (req, res) => {

  res.status(200).json({success: true});
  
  });
const  logger = (req, res, next) => {

  console.log(`${req.method} ${req.body}`)
  
  next();
  
  }
  app.use(logger)

app.use(express.json())
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
   
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(`ERROR: ${err}`);
 }); 
 app.use('/',usersRouter)






  
app.listen(process.env.PORT || 3000,()=>console.log(`server is listening on ${process.env.PORT}`));