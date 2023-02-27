const express= require("express");
const app= express();
app.use(express.json());
const table = require("./routes.js");
app.use("/",table);
module.exports=app;