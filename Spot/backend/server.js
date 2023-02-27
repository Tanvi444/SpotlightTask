const app=require('./app');
const connect_database=require("./db.js");
connect_database();
app.listen(4000,()=>{
    console.log("Server is running on port 4000");
})