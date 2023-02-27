const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    managerId:{
        type:Number,

    },
    customers:[
        {
            customerId:{
                type:Number,
             },
             firstName:{
                 type:String,
             },
             lastName:{
                type:String,
             },
             picture:{
                type:String,
             },
             birthDate:{
                type:Date,
             },
             gender:{
                type:String,
             },
             businessUnit:{
                type:String,
             },
             churnRisk:{
                type:Number,
             },
             openSales:{
                type:Number,
             },
             revenueYTD:{
                type:Number,
             },
             costYTD:{
                type:Number,
             },
             bonusEligible:{
                type:String,
             },
             meetingsYTD:{
                type:Number,
             }
        }
    ]
    
   
})


module.exports = mongoose.model("Account",accountSchema);