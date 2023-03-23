require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const contactRoutes = require("./routes/contact");

app.use(express.json());
app.use("/api/v2",contactRoutes);
app.get("/",(request,response,next)=>{
    return response.send("hello world");
})




app.listen(port,()=>{console.log("connected to the server")});