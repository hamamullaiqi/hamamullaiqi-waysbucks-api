const express = require('express')
const { getUsers,  addUsers, deleteUser, getUser, updateUser } = require('../controllers/user')

const { register } = require("../controllers/auth")

const router = express.Router()



router.get("/users", getUsers)
router.get("/user/:id", getUser)
router.patch("/user/:id", updateUser)
router.post("/user", addUsers)
router.delete("/user/:id", deleteUser)


//auth 
router.post("/register", register)
module.exports = router