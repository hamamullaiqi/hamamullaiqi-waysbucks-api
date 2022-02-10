const express = require('express')
const { getUsers,  addUsers, deleteUser, getUser, updateUser } = require('../controllers/user')

const { register, login } = require("../controllers/auth")

const router = express.Router()



router.get("/users", getUsers)
router.get("/user/:id", getUser)
router.patch("/user/:id", updateUser)
router.post("/user", addUsers)
router.delete("/user/:id", deleteUser)


//auth 
router.post("/register", register)
router.post("/login", login)
module.exports = router