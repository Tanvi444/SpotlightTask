const CurrentCustomer = require("./model.js");

exports.getdata=async(req,res,next)=>{
    const all=await CurrentCustomer.find();
    res.status(200).json({
        success:true,
        all,
    })
}

exports.add_customer = async (req,res,next)=>{
    try{
    const new_customer = await CurrentCustomer.create(req.body);  
    res.status(201).json({
        success:true,
        new_customer
    })
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    } 
}

exports.search = async(req,res,next)=>{
    try{
    let user=new RegExp(req.body.ran)
    CurrentCustomer.find({firstName:{$regex:user}})
    .then(user=>{
        res.json({user})
    }).catch(err=>{
        console.log(err);
    })
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

exports.getOrderbydate = async(req,res,next)=>{
    try{
    let date = new Date(req.body.fdate);
    date = date.toString().slice(4,15);
    const order = await CurrentCustomer.find()
    let ordershown=[];
    order.forEach((all)=>{
          all.orders.forEach((i)=>{
            if(date == i.date.toString().slice(4,15)){
                ordershown.push(i);
               }
          })
    })
    res.status(201).json({
        success:true,
        ordershown
    })
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

}