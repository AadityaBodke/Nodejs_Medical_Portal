const mongoose= require('mongoose');

const imageSchema= mongoose.Schema(
    {
        name: String,
        contact: String,
        image:{
            type: Array,
            // required: true
        },
        imageCount: Number
    }
);


module.exports=mongoose.model("user",imageSchema)