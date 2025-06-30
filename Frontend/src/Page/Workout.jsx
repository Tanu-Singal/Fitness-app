import React, { useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography,Checkbox,Box  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";


const Workout = ({ workoutPlan})=>{
  const [wplan, setwplan] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  const [message,setMessage]=useState("");
  const [calories,setcalories]=useState({});
const [userInfo, setUserInfo] = useState(null);

console.log("🏋️ WorkoutPlan prop:", workoutPlan);

  // Ensure userId exists in localStorage
 useEffect(() => {
  const interval = setInterval(() => {
    const currentId = localStorage.getItem("userId");
    if (currentId !== userId) {
      console.log("🔁 Detected userId change:", currentId);
      setUserId(currentId);
    }
  }, 500); // check every 500ms

  return () => clearInterval(interval); // cleanup on unmount
}, [userId]);

  // Store userId in state (initialized properly)
  
  console.log("Stored User ID in localStorage:", localStorage.getItem("userId"));
useEffect(() => {
  const id = localStorage.getItem("userId");
  if (!id) return;

  fetch(`http://localhost:5054/getuserinfo/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log("✅ User data fetched from MongoDB:", data);
      setUserInfo(data);  // this can now be used like userInfo.gender etc.
    })
    .catch(err => {
      console.error("❌ Failed to fetch user info from MongoDB:", err);
    });
}, []);

useEffect(() => {
  if (!userId) return;
    let parsedWorkoutPlan = [];
    if (typeof workoutPlan === "string" && workoutPlan.trim().length > 0) {
      try {
        parsedWorkoutPlan = JSON.parse(workoutPlan);
      } catch (error) {
        console.error("JSON Parsing Error:", error);
      }
    } else if (Array.isArray(workoutPlan)) {
      parsedWorkoutPlan = workoutPlan;
    }
console.log("Parsed workoutPlan:", parsedWorkoutPlan);
    if (parsedWorkoutPlan.length > 0) {
      setMessage("New workout plan available Please wait for a while!");
     
      setLoading(true);
      setTimeout(() => {
        setwplan(parsedWorkoutPlan); // Fir naya workout set karo
        saveworkout(userId, parsedWorkoutPlan);
       
        setLoading(false);
        setMessage(""); 
      }, 900);
    } else {
      
      const savedWorkout = localStorage.getItem(`workout_${userId}`);
      if (savedWorkout) {
        setwplan(JSON.parse(savedWorkout));
        
      }
      else{
        fetch(`http://localhost:5052/getworkout/${userId}`)
        .then(res=>res.json())
        .then(data=>{
          if(data && Array.isArray(data.plan)){
            setwplan(data.plan);
             localStorage.setItem(`workout_${userId}`, JSON.stringify(data.plan)); // Cache for next time
        console.log("📦 Workout loaded from MongoDB.");
          }
          else {
        console.log("⚠️ No workout plan found in MongoDB.");
      }
        })
           .catch(err => {
      console.error("❌ Error fetching workout from MongoDB:", err);
    });
      }
    }
    const selectedrow=JSON.parse(localStorage.getItem(`selected_${userId}`)) || []
    setSelectedRows(selectedrow)
  }, [userId, workoutPlan]);


  const saveworkout = (userId, workoutPlan) => {
    try {
      localStorage.setItem(`workout_${userId}`, JSON.stringify(workoutPlan));
      console.log("Workout saved locally.");

      fetch("http://localhost:5054/saveworkout",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          userId:userId,
          plan:workoutPlan
        })
      })
      .then((res)=>res.json())
      .then((data)=>{
         console.log("✅ Workout saved to MongoDB:", data);
      }) .catch((err) => {
        console.error("❌ Error saving workout to MongoDB:", err);
      });

    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  console.log("WorkoutPlan prop:", workoutPlan);
  console.log("Stored Workout:", localStorage.getItem(`workout_${userId}`));
  console.log("wplan", wplan);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Your Recommended Workout Plan
      </Typography>
      {message && (
  <div style={{ color: "green", fontWeight: "bold", textAlign: "center", marginBottom: "10px" }}>
    {message}
  </div>
)}

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#d32f2f" }}>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Day</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Focus Area</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Exercise</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Heart_Rate</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Body_Temp</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Sets</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Reps</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Time</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Completed</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Calories Burned</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
  {loading ? (
    <TableRow>
      <TableCell colSpan={9} align="center" style={{ color: "#d32f2f", fontWeight: "bold" }}>
      <CircularProgress color="secondary" /> 
      </TableCell>
    </TableRow>
  ) :  wplan.length > 0 ? (
    wplan.map((workout, index) => (
      <TableRow key={index}>
        <TableCell>{workout.day}</TableCell>
        <TableCell>{workout.focus_area}</TableCell>
        <TableCell
  onClick={() => navigate("/posedetect")}
  sx={{
    cursor: "pointer",
    fontWeight: "bold",
    color: "#d32f2f",
    padding: { xs: "8px", md: "12px" }, // Responsive padding
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    gap: 1, // Space between elements
  }}
>
  <Typography
    variant="body2"
    sx={{
      fontSize: { xs: "10px", md: "12px" }, // Responsive font size
      color: "black",
      fontStyle: "italic",
      flexShrink: 0, // Prevent shrinking
    }}
  >
    Click here!
  </Typography>

  <Box
    sx={{
      backgroundColor: "#d32f2f",
      color: "white",
      padding: { xs: "2px 4px", md: "4px 8px" }, // Responsive padding
      borderRadius: "5px",
      fontWeight: "bold",
      display: "inline-block",
      minWidth: "60px",
      textAlign: "center",
    }}
  >
    {workout.exercise}
  </Box>
</TableCell>

        <TableCell>{workout.Heart_rate}</TableCell>
        <TableCell>{workout.Body_temp}</TableCell>
        <TableCell>{workout.sets}</TableCell>
        <TableCell>{workout.reps}</TableCell>
        <TableCell>{workout.time}</TableCell>

        <TableCell>
       <Checkbox
  sx={{
    color: "green",
    "&.Mui-checked": {
      color: "green",
    },
  }}
  onChange={async (e) => {
    if (e.target.checked && userInfo) {
      try {
        const response = await fetch("http://localhost:5000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
         Gender: userInfo.gender === "male" ? 1 : 0,
          Age: Number(userInfo.age),
  Weight: Number(userInfo.weight),
  Duration: Number(workout.time.replace("min", "").trim()),      // ✅ FIX HERE
  Heart_Rate: Number(workout.Heart_rate), // ✅ make sure it's number
  Body_Temp: Number(workout.Body_temp) 
          }),
        });

        const text = await response.text();
       console.log("🚨 typeof Duration:", typeof workout.time, workout.time);
console.log("typeof Heart_Rate:", typeof workout.Heart_rate);
console.log("typeof Body_Temp:", typeof workout.Body_temp);
        console.log("Raw response from Flask:", text);
         const data = JSON.parse(text);
        // Save calorie for that workout index
        setcalories((prev) => ({ ...prev, [index]: data.calories }));

        await fetch("http://localhost:5054/api/calorie",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            userId:userId,
            date:new Date().toISOString(),
            calorie:parseFloat(data.calories)
          })
        })
      } catch (err) {
        console.error("Error predicting calories", err);
      }
    } else {
      setcalories((prev) => {
        const newCal = { ...prev };
        delete newCal[index];
        return newCal;
      });
    }
  }}
/>

        </TableCell>
         <TableCell>
  {calories[index] ? `${calories[index].toFixed(2)} kcal` : "--"}
</TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={9} align="center" style={{ color: "#757575" }}>
        No workout plan available
      </TableCell>
    </TableRow>
  )}
</TableBody>

        </Table>
      </TableContainer>

       <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      gap={2}       // horizontal gap between buttons
      mt={2}        // margin from the top
    >
      <Button
        variant="contained"
        sx={{ backgroundColor: '#d32f2f' }}
        onClick={() => navigate('/')}
      >
        Go Back
      </Button>

      <Button
        variant="contained"
        sx={{ backgroundColor: '#d32f2f' }}
        onClick={() => navigate('/dashboard')}
      >
        Go to dashboard
      </Button>
    </Box>
    </div>
  );
};

export default Workout;
