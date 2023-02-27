const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
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


module.exports = mongoose.model("Customer",customerSchema);