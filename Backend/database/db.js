import mongoose from "mongoose";
const dbschema=new mongoose.Schema({
   day:{
    type:String,
    required:true
   },
   focus_area:{
    type:String,
    required:true
   },
   exercise:{
    type:String,
    required:true
   },
    Heart_rate:{
        type:Number,
        required:true
    },
    Body_temp:{
        type:Number,
        required:true
    },
    sets:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    reps:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
     time:{
        type:String,
        required:true
    }
    
})

const WorkoutPlanSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  plan: [dbschema] // Array of exercise objects
});

const Cal=mongoose.model("Cal",WorkoutPlanSchema);
export default Cal