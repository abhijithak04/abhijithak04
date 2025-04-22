const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/verUser")
.then(()=>{
    console.log("mongo db connected succesfully");
})
.catch((err)=>{
    console.log("connection is not accomplished",err);
})

const userSchema =new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,requied:true},
    
})
const newUser=new mongoose.model("newUser",userSchema);
module.exports=newUser;
