let { User } = require("../models/schemas/user.schema");
const bcrypt=require('bcrypt')
require('dotenv').config()


const jwt=require('jsonwebtoken');

const getUser=async (req, res, next) => {
  
  let { username,email, password } = req.body;
  
  let existingUser;
  try {

    existingUser = await User.findOne({ username:username,email: email });
  
  } catch(err) {
  
    const error = new Error(err);
    return next(error);
  
  }
  if (!existingUser || (await bcrypt.compare(existingUser.password, password))) {
    const error = Error("Wrong details please check at once");
    return next(error);
  }
  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.TOKEN_KEY,
      { expiresIn: "15d" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error(err);
    return next(error);
  }
  
  res
    .status(200)
    .json({
      success: true,
      data: {
        userId: existingUser.id,
        email: existingUser.email,
        token: token,
      },
    });
};

const createUser= async (req, res, next) => {
  
  const { username, email, password,address } = req.body;
  const encryptedPassword=await bcrypt.hash(password,10)
  const newUser = new User({ username, 
    email:email.toLowerCase(),
    password:encryptedPassword,
    address});
  
  try {
    await newUser.save();
  } catch (err){
    const error = new Error(err);
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      "THisIsTheSuperSEcretkey",
      { expiresIn: "1d" }
    );
  } catch (err) {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  res
    .status(201)
    .json({
      success: true,
      data: { userId: newUser.id,
          email: newUser.email, token: token },
    });
};


const logoutUser=async (req,res)=>{

  const authHeaders=req.headers['authorization']
    
    jwt.sign(authHeaders,'', { expiresIn: 1 } , (logout, err) => {
      if (logout) {
        res.send({msg : 'You have been Logged Out' });
      } else {
        res.send({msg:'Error'});
      }
    })

}; 


module.exports={
  getUser,
  createUser,
  logoutUser
}
  
   
  
  