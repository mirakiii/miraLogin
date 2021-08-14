const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/loginForm",{
    //to avoid deprication warning
    useUnifiedTopology: true,
    useNewUrlParser: true

}).then(() =>{
    console.log("database connected !");
}).catch((e) =>{
    console.log("connection error occured !");
})