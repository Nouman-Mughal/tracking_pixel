const mongoose=require('mongoose')

const utmSchema=new mongoose.Schema({
    //To check from where traffic on Your website is coming.

    //utm Stands for Urchin Tracking Module
    utm_source:{
        type:String,
        required:true
    },
    //To check from which channel of utm_source traffic is coming.
    // e.g either its free instagram or paid instagram.
    utm_medium:{
        type:String,
        required:true,
    },
    //to tell kind of campaign it is.Like car insurance promo.
    utm_campaign:{
        type:String,
        required:true,
    },
    //to tell the term of your campaign. e.g car insurance
    utm_term:{
        type:String,
        required:false
    },
    // To tell the king of content it is.Like text ad or image ad
    utm_content:{
        type:String,
        required:false

    }
})
module.exports={
    utmSchema
}