const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TO ACCESS URL FORM ENCODED
app.use(express.static("upload"));
const cors = require("cors");
app.use(cors()); // allow frontend contacts with backend

//require modules 
const auth= require("./routes/Auth")

// run server
app.listen(4000, "localhost",()=>{
     console.log("server is running");
     
});

// api routes 
app.use("/auth",auth);