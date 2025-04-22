const express= require('express');
app=express();
const hbs=require('hbs')
const newUser=require('./models/userSchema')
const bcrypt=require('bcrypt')
const Path=require('path')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.set("view engine","hbs");
app.set("views",Path.join(__dirname,"./views"))
const saltround=10;



//for get login page
app.get("/login",(req,res)=>{
    res.render("home")
})
//for get register page
app.get("/register",(req,res)=>{
    res.render("register")
})

app.get("/page",(req,res)=>{
    res.render("page")
})

//for save details of user when register

app.post("/register",async(req,res)=>{
    const {name,email,password,confirmPassword} =req.body
    if(password!==confirmPassword){
      return res.send("password do not match")
    }
    const user=await newUser.findOne({email});
    if(user){
        return res.send("email exit")
    }
    try{
        const hashedPassword=await bcrypt.hash(password,saltround)
        const data =new newUser({
            name,
            email,
            password:hashedPassword,
        });
        await data.save();
         console.log(data)
        res.redirect("/login")
    
    
    }catch(err){
res.send("something error happend",err.message)
console.log(err);

}})

//for get login details
app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
try{
 
    const user= await newUser.findOne({email});
    if(!user){
        return res.send("email is not found");

    }
     const newpassword =await bcrypt.compare(password,user.password);
    if(!newpassword) {
        return res.send("inavalid password")
    }
    return res.redirect("/page")
}catch(err){
    res.send(err.message)
}
  

})
    
    
app.listen(5000,(err)=>{
if(err){
    console.log("server is not running");
}else{ 
    console.log("server is running on port 5000");
}
})