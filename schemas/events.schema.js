const mongoose=require('mongoose')
const eventSchema=new mongoose.Schema({
    //Category of the event.
        category:{
            type:String,
            enum:["DEFAULT","STANDARD","CUSTOM"],
            default:"DEFAULT",
            required:true
        },
        //what is the name of the event.
        label:{
            type:String,
            required:true
        },
        //where user will go after event is triggered.
        //e.g http://example.com
        target:{
            type:String,
            required:true
        },
        values:{
            type:String,
            required:true

        }



})
module.exports={
    eventSchema

} 
    