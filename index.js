
const express=require('express')
const mongoose=require('mongoose')
const usersRouter=require('./routes/usersRouter')

const app=express();

require('dotenv').config()

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