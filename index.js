const express = require("express")

const router = require("./src/routes")


const app = express()

const port = 4000


app.use(express.json())

app.use("/api/v1/", router)




app.listen(port, ()=> console.log(`Api Listener on port ${port}! `))