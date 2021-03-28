const express = require('express');
const path = require('path');
const app = express();
require("./database/connector")
const Register = require("./database/collection");//collection class define
const port = process.env.PORT || 8000;

const viewPath = path.join(__dirname+"/../templates/views");
const pathPublic = path.join(__dirname+"/../public");

app.use(express.json());
app.use(express.urlencoded({extended : false}));

//console.log(pathPublic);
app.use(express.static(pathPublic))
app.set("view engine" , "hbs");
app.set("views",viewPath);

app.get("/",(req,res)=>{
   // res.render(viewPath);
    res.render('home');
});

app.get("/register",(req,res)=>{
    res.render(viewPath);
   // res.send("Hello this is home of TODO app");
});

app.post("/register" , async(req,res)=>{
     try{   //res.send(req.body.mname);
            const one =new Register({
                name:req.body.name,
                id:req.body.id,
                phone:req.body.phone,
                email:req.body.mail,
                pass:req.body.pass,
                cnfpass:req.body.cnfpass
            });
       if(req.body.pass === req.body.cnfpass){
           const registered = await one.save();
           res.status(201).render("home");
       }else{
               res.send("Password is not Same")
       }     
     }catch(error){
          res.status(400).send(error);
     }
})

app.get("/login",(req,res)=>{
    res.render('login');
});

app.post("/login",async(req,res)=>{
    try{
        const mail = req.body.mail;
        const password = req.body.pass;
        const data = await Register.findOne({email:mail});
        
        //res.send(data.pass);
        if(data.pass === password){
            res.send("email and password are successfully matched :)");
        }else{
            res.send("invalid login details :(");
        }
        

    }catch(error){
        res.status(400).send(error);
    }
});


app.listen(port , ()=>{
    console.log(`listening... at port ${port}`);
});