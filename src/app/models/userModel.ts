import mongoose, { Schema } from "mongoose"
const userSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:[true,"please provide a first Name"],
       
    },
    last_name:{
        type:String,
        required:[true,"please provide a last Name"],
       
    },
    birthday:{
       type:Date,
       required:[true,"please provid a date of birth"],
    },
    email:{
        type:String,
        required:[true,"please provide a email Id"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please provide a  password"],
        
    },
    phone:{
        type:String,
        required:[true,"please provide a phone number"],
        unique:true
    },
   isVerified:{
      type:String,
      default:"false"
   },
  
    password_reset_token:{
      required:false,
      type:String
    },

    emailvalidation:{
      required:true,
      type:String
    }
    

})

const User=mongoose.models.users || mongoose.model('users',userSchema)

export default User