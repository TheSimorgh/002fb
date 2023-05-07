const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const userRoutes = require("./routes/user");
const dbConnect = require("./config/dbConfig");
const dotenv = require("dotenv");
dotenv.config();
mongoose.set("strictQuery", true);
const app = express();
// const options={
//   origin:"http://localhost:5173",
//   useSuccessStatus:200,
// }
// let allowed =["http://localhost:5173","http://localhost:3000"]
// function options(req,res){
//   let tmp;
//   let origin=req.headers("Origin")
//   if(allowed.indexOf(origin)>-1){
//     tmp={
//       origin:true,
//       optionSuccessStatus:200,
//     }
//   }else{
//     tmp={origin:"stupid",}
//   }
//   res(null,tmp)

// }

// Middleware

app.use(express.json());
//app.use(cors(options));
 app.use(cors());
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
// app.get("/",(req,res)=>{
//     res.send("XXXXXXX")
// })

readdirSync("./routes").map((r)=>app.use("/",require("./routes/"+r)))
// console.log(readdirSync("./routes"));
// console.log(readdirSync("./routes").map((r)=>app.use("/",require("./routes/"+r)))
// );




// sudo lsof -i :3000
// kill -9 <PID>


;(async function server() {
  try {
    dbConnect()
    app.listen(process.env.PORT,()=>{ console.log(`Server is Running ${process.env.PORT}`);})

  } catch (error) {
    console.log(`server Error ${error}`);
  }
})();