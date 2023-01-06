const express = require("express")
const router = express.Router()
const controller = require("../controller/controller")
router.post("/signup", controller.registerUser)
router.post("/signin",controller.signIn )
module.exports = router