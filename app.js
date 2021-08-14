const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const hostname = '127.0.0.1';
const path = require('path');
const Register = require("./src/models/registration");
const { userInfo } = require('os');

// json thing
app.use(express.json());
app.use(express.urlencoded([{extended:false}]));


//connect db
require("./src/db/corn");

//including static file

app.use("/public", express.static(path.join( __dirname + "/public"))); 
console.log(path.join( __dirname , "/public"));
// const p = path.join( "C:/Users/A.S.Rathore/Desktop/sem/webdev/practice/Login form/public");

//pug stuff

app.set('view engine', 'pug');  //setting  view engine as pub

app.set('views', path.join(__dirname, 'views')); //set the view directory

// app.get("/", (req, res)=>{
//     res.sendFile(path.join(__dirname + "/public/index.html"));
//     // res.sendFile("C:/Users/A.S.Rathore/Desktop/sem/webdev/practice/Login form/mern/public/index.html");
// })

app.get("/",(req, res)=>{
    res.render('login.pug');
})
app.get("/register", (req, res)=>{
    res.render('register.pug');
})
// creating new user in db
app.post("/register", async (req,res)=>{
    try{
        //res.send(req.body.first);
        //console.log(req.body.first);

        const password1 = req.body.password1;
        const password2 = req.body.password2;
        
        if(password1===password2){
            const regFinal = new Register ({
                first:req.body.first,
                last:req.body.last,
                phone:req.body.phone,
                mail:req.body.mail,
                password1:req.body.password1,
                password2:req.body.password2,
            })
            const regSave = await regFinal.save();
            res.status(201).render('logged.pug');
        }
        else{
            res.send("PASSWORDS ARE NOT MATCHING");
        }

    }
    catch(error){
        res.status(400).send(error);
    }
})
//validating user
app.post("/login", async (req, res) => {
    try{
    const mail = req.body.mail;
    const password1 = req.body.password1;

    const usermail = await Register.findOne({mail:mail});
    // console.log(password1);
    // console.log(password)
    
    if(usermail.password1=== password1){
        res.status(201).render('logged.pug');
    }
    else{
        res.send("invalid password");
    }
    }catch (error){
        res.status(400).send("invalid mail");
        console.log("invalid mail");
    }   
})
//listen server
app.listen(port, hostname, ()=>{
    console.log(`server listening at http://${hostname}:${port}/`);
})