import mongoose from "mongoose"
const planSchema=new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
   date:{
    type:Date,
    required:true
   },
   calorie:{
    type:Number,
    required:true
   }
})
const works=mongoose.model("works",planSchema);
export default works

