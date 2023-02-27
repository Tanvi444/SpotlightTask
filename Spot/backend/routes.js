const express = require("express");
const router = express.Router();

const {getdata,add_customer,getOrderbydate,search} = require("./controller.js")
router.route("/getall").get(getdata);
router.route("/add").post(add_customer);
router.route("/orderbydate").post(getOrderbydate);
router.route("/search").post(search);
module.exports = router;