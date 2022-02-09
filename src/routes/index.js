const express = require('express')
const { getUsers,  addUsers, deleteUser } = require('../controllers/user')



const router = express.Router()



router.get("/users", getUsers)
router.post("/user", addUsers)
router.delete("/user/:id", deleteUser)
module.exports = router