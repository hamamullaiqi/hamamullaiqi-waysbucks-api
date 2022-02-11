const express = require('express')
const { getUsers,  addUsers, deleteUser, getUser, updateUser } = require('../controllers/user')

const { register, login } = require("../controllers/auth")

const router = express.Router()


//middleware

const {auth} = require("../middlewares/auth")
const { getProducts, getProduct, addProduct, deleteProduct, updateProduct } = require('../controllers/product')
const { uploadFile } = require('../middlewares/uploadFile')

const { getToppings, getTopping, addTopping, updateTopping, deleteTopping } = require('../controllers/topping')



router.get("/users", getUsers)
router.get("/user/:id", getUser)
router.patch("/user/:id", updateUser)
router.post("/user", addUsers)
router.delete("/user/:id", deleteUser)


//auth 
router.post("/register", register)
router.post("/login", auth, login)

//route product
router.get("/products", auth, getProducts)
router.get("/product/:id", auth, getProduct)
router.post("/product", auth, uploadFile("image"), addProduct)
router.delete("/product/:id", auth, deleteProduct)
router.patch("/product/:id", uploadFile("image"), auth, updateProduct)



//route toping
router.get("/toppings", auth, getToppings)
router.get("/topping/:id", auth, getTopping)
router.post("/topping", auth, uploadFile("image"), addTopping)
router.patch("/topping/:id", auth, uploadFile("image"), updateTopping)
router.delete("/topping/:id", auth, deleteTopping)

module.exports = router