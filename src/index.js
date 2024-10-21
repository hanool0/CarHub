const express = require("express")
const app = express()
const path = require("path")
const ejs = require("ejs")

app.use(express.json())
app.set("view engine", "ejs")

app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/createAcc",(req,res)=>{
    res.render("createAcc")
})

app.listen(3000, () =>{
    console.log("port connected");
})