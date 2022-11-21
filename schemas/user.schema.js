const mongoose=require('mongoose')
const addressSchema=require('./address.schema')



const userSchema = new mongoose.Schema({

    username: {
        type: String, 
        trim:true,
        required: true, 
        unique: true 
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    phone: {
        type: String, 
        required: true ,
        trim:true
    },
    password: {
        type: String, 
        trim:true,
        required: true 
    },
    address:{
        type:addressSchema,
        required:true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports={
    User
}