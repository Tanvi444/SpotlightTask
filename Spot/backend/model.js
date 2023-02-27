const mongoose = require("mongoose");
const {Schema}=mongoose;
const customer_schema = new Schema({
     customerId:{
        type:Number,
     },
     firstName:{
         type:String,
     },
     lastName:{
        type:String,
     },
     orders:[{
        orderID:{
            type:Number,
        },
        amount:{
            type:Number, 
        },
        date:{
            type:Date,
        }

     }]
    
})


module.exports = mongoose.model("Customer",customer_schema);