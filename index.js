import express from "express";
import bodyParser from "body-parser";
import { log } from "console";

const app = express();
const port = 3000;
var aTasks = [];
var workTasks = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.post("/submit",(req,res)=>{    

    let aTask = req.body.task;   
      aTasks.push(aTask);  
      res.redirect("/")
    });

app.get("/",(req,res)=>{
    var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };  
    let day = new Date().toLocaleDateString(undefined,options)
    res.render("index.ejs",{
    today : day,      
    allTasks : aTasks});
    });

app.get("/work",(req,res)=>{
    res.render("work.ejs",{    
    wTasks : workTasks });
});

app.post("/submitwork",(req,res)=>{
    let workT = req.body["tasks"];   
    workTasks.push(workT);  
    res.redirect("/work")
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});