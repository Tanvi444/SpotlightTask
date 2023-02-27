const mongoose=require("mongoose");
const connect_db=()=>{
    mongoose.connect("mongodb://localhost:27017/spotlight",{useNewUrlParser:true}).then(()=>{
        console.log("Mongodb is connected");
    }).catch((err)=>{
        console.log(err);
    })
}
module.exports=connect_db;