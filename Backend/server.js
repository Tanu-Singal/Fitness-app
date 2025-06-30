import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import User from './database/user.js'
import works from './database/plan.js'
import Cal from './database/db.js'



dotenv.config()
const app=express()
app.use(express.json())
app.use(cors({ origin:"*" }))
app.use(bodyParser.json())
const connectdb=async()=>{
   try{
    await mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connected to MongoDB ");
   }
   catch(error)
   {
    console.error("Error connecting");
   }
}
connectdb()


 const headers= {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }

    app.get('/api/exercise/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`, { headers });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exercise detail' });
  }
});

app.get('/api/target/:muscle', async (req, res) => {
  const { muscle } = req.params;
  try {
    const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/target/${muscle}`, { headers });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch muscle exercises' });
  }
});
app.get('/api/exercises/bodyPart/:bodyPart', async (req, res) => {
  const { bodyPart } = req.params;
  try {
    const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching exercises by body part:", error);
    res.status(500).json({ error: 'Failed to fetch exercises by body part' });
  }
});
app.get('/api/equipment/:equip', async (req, res) => {
  const { equip } = req.params;
  try {
    const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/equipment/${equip}`, { headers });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch equipment exercises' });
  }
});
// server.js or routes/youtube.js
app.get("/api/youtube", async (req, res) => {
  const query = req.query.query;

  try {
    const response = await fetch(
      `https://youtube-search-and-download.p.rapidapi.com/search?query=${query}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY, // store securely in .env
          "x-rapidapi-host": "youtube-search-and-download.p.rapidapi.com",
        },
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("YouTube fetch failed:", err);
    res.status(500).json({ error: "YouTube fetch failed" });
  }
});
// Get all exercises
app.get('/api/exercises', async (req, res) => {
  try {
    const response = await fetch('https://exercisedb.p.rapidapi.com/exercises?limit=1000', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching exercises:", error);
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
});

// Get body part list
app.get('/api/bodyparts', async (req, res) => {
  try {
    const response = await fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching body part list:", error);
    res.status(500).json({ error: 'Failed to fetch body part list' });
  }
});

app.post("/api/chat",async(req,res)=>{
 
    const {name,age,weight,gender,fitness_level,workout_day,focus_area}=req.body

    if ( !age || !weight || !gender || !fitness_level || !workout_day || !focus_area) {
      return res.status(400).json({ error: "All fields are required" });
  }
    
   

    try{
      const workoutDays = Array.isArray(workout_day) ? workout_day : [workout_day];
      const focusAreas = Array.isArray(focus_area) ? focus_area : [focus_area];
        const newUser=new User({ name, age, weight, gender, fitness_level,  workout_day: workoutDays, focus_area: focusAreas })
        await newUser.save()
        const prompt = `My name is ${name}, I am ${age} years old, my weight is ${weight} kg, and my gender is ${gender}. My main focus areas are ${focusAreas.join(", ")}, and I prefer working out on ${workoutDays.join(", ")}, and my level is ${fitness_level}. 
        suggest exercies from these 15 only (squat,deadlift,bench press,push-up,lunges,plank,shoulder press,bicep curl,tricep dip,side plank,step-up,burpees,jump squat,calf raises)

        Generate a structured workout plan in **valid JSON format** inside triple backticks (\`\`\`). The JSON format should be:
        
        \`\`\`json
        [
          {
            "day": "Monday",
            "focus_area": "Chest",
            "exercise": "Bench Press",
            "sets": 4,
            "reps": 10,
            "Heart_rate":120,
            "Body_temp":40.3,
            "time": "30min"
          },
          {
            "day": "Tuesday",
            "focus_area": "Back",
            "exercise": "Lat Pulldown",
            "sets": 3,
            "reps": 12,
            "Heart_rate":120,
            "Body_temp":40.3,
            "time": "20min"
          }
        ]
        \`\`\`
        
        Return only the JSON inside triple backticks.`;
        
        const apires=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="+ process.env.GEMINI_API_KEY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body:JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      }),
    
    })

    const data=await apires.json()
    console.log("OpenAI Response:", data); 
   
    let textResponse = data.candidates[0].content.parts[0].text.trim();

// Remove triple backticks and potential "json" keyword
textResponse = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();

try {
    const parsedResult = JSON.parse(textResponse);
    res.json({
        _id: newUser._id,
  name: newUser.name,
  age: newUser.age,
  weight: newUser.weight,
  gender: newUser.gender,
  fitness_level: newUser.fitness_level,
  workout_day: newUser.workout_day,
  focus_area: newUser.focus_area,
  result: parsedResult
     });
} catch (error) {
    console.error("JSON Parsing Error:", error);
    res.status(500).json({ error: "Invalid JSON format received from AI" });
}
}
catch(error)
{
    console.error(error)
    res.status(500).json({error:"internal error"})
}
})
app.post("/api/calorie", async (req, res) => {
  const { userId, date, calorie } = req.body;
  console.log("Incoming Data:", req.body);
  try {
    const newEntry = await works.create({
      userId,
      calorie,
      date: new Date(date),
    });
    console.log("Saved Entry:", newEntry);
    res.status(200).json({ message: "Calories saved!" });
  } catch (err) {
    console.error("Error saving to MongoDB:", err.message);
    res.status(500).json({ error: err.message });
  }
});
app.get("/getuserInfo/:userId",async(req,res)=>{
  try{
      const { userId } = req.params;
    const user = await User.findById(userId);
     if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  }
  catch(error){
    console.error("❌ Error fetching user info:", error);
    res.status(500).json({ message: "Server error" });
  }
})

app.get("/api/calorie/user/:id", async (req, res) => {
    console.log("CALORIE GET API CALLED", req.params.id, req.query.range);
  const { range = "week" } = req.query;
  const { id } = req.params;

  const now = new Date();
  let start;

  if (range === "week") {
    start = new Date(now.setDate(now.getDate() - now.getDay())); // start of week
  } else if (range === "month") {
    start = new Date(now.getFullYear(), now.getMonth(), 1); // start of month
  } else {
    start = new Date();
    start.setHours(0, 0, 0, 0); // today
  }

  try {
    const logs = await works.find({
      userId: id,
      date: { $gte: start },
    });

    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Example in Express.js
app.get('/api/user/:id', async (req, res) => {
  console.log("USER API CALLED", req.params.id);
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

app.post("/saveworkout",async(req,res)=>{
  const {userId,plan}=req.body;

  if(!userId || !Array.isArray(plan))
  {
    return res.status(400).json({ error: "Invalid input" });
  }
  try{
     let existing=await Cal.findOne({userId})
     if(existing)
     {
      existing.plan=plan;
      await existing.save();
       res.status(200).json({ message: "Workout updated" });
     }
     else{
        await Cal.create({userId,plan})
          res.status(201).json({ message: "Workout saved" });
     }
    }
  catch(error)
  {
    console.error(error);
    res.status(500).json({ error: "Server error while saving workout" });
  }
})
app.get("/getworkout/:userId",async(req,res)=>{
  try{
    const {userId}=req.params;
    const workout=await Cal.findOne({userId});
    if(workout)
    {
      res.json(workout)
    }
    else{
         res.status(404).json({ message: "Workout not found" });
    }
  }
  catch (error) {
    console.error("Error fetching workout:", error);
    res.status(500).json({ message: "Server error" });
  }
})


app.listen(process.env.PORT,()=>{
    console.log("Server running")
})
