
const Customer = require("../model/model.js");
const Features = require("../utils/feature.js");

exports.Add = async (req,res,next)=>{

    const customer = await Customer.create(req.body);
    
    res.status(201).json({
        success:true,
        customer
    })
    
}

exports.get = async(req,res,next)=>{
    
    const feature = new Features(Customer.find(), req.query).search();
    const customer = await feature.query;

    res.status(201).json({
        success:true,
        customer
    })
}

exports.getOrder = async(req,res,next)=>{

    let date = new Date(req.body.date);
    
  
    date = date.toString().slice(0,15)
    
    
    const orders = await Customer.find()

    let order=[]

    orders.forEach((o)=>{
          o.orders.forEach((k)=>{
               if(date == k.date.toString().slice(0,15)){
                order.push(k)
               }
               
               
          })
    })

    res.status(201).json({
        success:true,
       order
    })
}
