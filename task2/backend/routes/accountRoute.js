const express = require("express");

const {accountAdd, accountGet, sortData, AllmanagerId} = require("../controller/account_controll.js");


const router = express.Router();

router.route("/account_add").post(accountAdd);
router.route("/account_get").get(accountGet);
router.route("/").post(sortData);
router.route("/all_managerId").get(AllmanagerId)


module.exports = router;