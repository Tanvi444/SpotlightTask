const express = require("express");

const {Add, get, getOrder} = require("../controller/controll.js")
const router = express.Router();


router.route("/").post(Add);
router.route("/get").get(get)
router.route("/order").post(getOrder);


module.exports = router;