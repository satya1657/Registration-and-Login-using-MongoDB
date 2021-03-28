const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
      name:{
            type:String,
            required:true
      },
      id:{
            type:Number,
            required:true
      },
      phone:{
            type:Number,
            required:true,
            unique:true
      },
      email:{
            type:String,
            required:true,
            unique:true
      },
      pass:{
            type:String,
            required:true
      },
      cnfpass:{
            type:String,
            required:true
      }
});

const Register = new mongoose.model("Register", studentSchema);
module.exports = Register;