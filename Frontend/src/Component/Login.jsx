import React, { useEffect, useState } from "react";
import { TextField, Box, Button, Card, CardContent, Typography, Grid, FormGroup, FormControlLabel, Checkbox, Slider } from "@mui/material";
import { motion } from "framer-motion";
import { fetchData } from "../utils/fetchData";
import { useNavigate } from "react-router-dom";
const steps = ["User Info", "Workout Days", "Body Focus"];
const Login = ({ setWorkoutPlan }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({ name: "", age: "", weight: "" });
  const [gender, setgender] = useState('')
  const [level, setLevel] = useState("Beginner");

  const levelMarks = [
    { value: 0, label: "Beginner" },
    { value: 50, label: "Intermediate" },
    { value: 100, label: "Advanced" },
  ];
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);
  const [bodyparts, setBodyPart] = useState([])
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];



  const handleSubmit = async (e) => {
    e.preventDefault();
     if (step === 1) {
    if (selectedDays.length === 0) {
      alert("Please select at least one workout day.");
      return;
    }
    setStep(2); // go to next step
    return;
  }
    if (!userData.name || !userData.age || !userData.weight || !gender || level==="" || selectedDays.length === 0 || selectedBodyParts.length === 0) {
      alert("Please fill all the fields.");
      return;
    }
    const finaluserData = {
      name: userData.name,
      age: userData.age,
      weight: userData.weight,
      gender: gender,
      fitness_level: level,
      workout_day: selectedDays,
      focus_area: selectedBodyParts
    };

    try {
      const response = await fetch("http://localhost:5054/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finaluserData)
      });

           const result = await response.json();
    console.log("Response from backend:", result);
    if(result && result._id){
     localStorage.setItem("userId", result._id);
      console.log("UserId saved:", result._id);
       localStorage.setItem(`userinfo_${result._id}`, JSON.stringify({
        name:result.name,
     age: result.age,
      weight: result.weight,
      gender: result.gender
  }));
    console.log("User info saved to localStorage.");
      setWorkoutPlan(result.result);
    alert("Recommended Workout: " + result.result);
      } else {
        console.error("❌ userId not found in result:", result);
      }
    }
    catch (err) {
      console.error("❌ Error submitting data:", err);
    }


  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const bodypartdata = await fetchData('http://localhost:5054/api/bodyparts', {});
        console.log("Fetched bodypartdata:", bodypartdata);

        if (Array.isArray(bodypartdata)) {
          setBodyPart(['all', ...bodypartdata]);
        } else {
          console.error("Expected array, got:", bodypartdata);
        }

      } catch (error) {
        console.error("Failed to fetch body parts:", error);
      }
    };

    fetchdata();
  }, []);

  return (
    <form onSubmit={handleSubmit}>

      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card sx={{ maxWidth: 500, width: "100%", p: 4, boxShadow: 3, textAlign: "center" }}>
          <CardContent>
            <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
              <Typography variant="h5" fontWeight="bold" color="#FF2625" mb={2}>
                {steps[step]}
              </Typography>
            </motion.div>

            {/* Step 1: User Info */}
            {/* Step 1: User Info */}
            {step === 0 && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <Box display="flex" flexDirection="column" gap={2} alignItems="center">
                  <TextField
                    label="Name"
                    type="text"
                    variant="outlined"
                    fullWidth

                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    sx={{ backgroundColor: "white", borderRadius: 2, boxShadow: 1 }}
                  />

                  <TextField
                    label="Age"
                    type="number"
                    variant="outlined"
                    fullWidth
                    required
                    value={userData.age}
                    onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                    sx={{ backgroundColor: "white", borderRadius: 2, boxShadow: 1 }}
                  />

                  <TextField
                    label="Weight (kg)"
                    type="number"
                    variant="outlined"
                    fullWidth
                    required
                    value={userData.weight}
                    onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
                    sx={{ backgroundColor: "white", borderRadius: 2, boxShadow: 1 }}
                  />
                  <Box display="flex" justifyContent="space-between" width="100%">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={gender === "Male"}
                          onChange={(e) => setgender('Male')}
                          sx={{

                            '&.Mui-checked': { color: "red" }
                          }}


                        />
                      }
                      label="Male"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={gender === "Female"}
                          onChange={() => setgender("Female")}
                          sx={{
                            color: gender === "Female" ? "red" : "default",
                            '&.Mui-checked': { color: "red" }
                          }}
                        />
                      }
                      label="Female"
                    />
                  </Box>
                  <Box width="100%" mt={1} p={2} borderRadius={2} boxShadow={1} bgcolor="white">
                    <Typography variant="h6" gutterBottom>
                      Select Fitness Level
                    </Typography>
                    <Slider // used directly in mui
                      value={level === "Beginner" ? 0 : level === "Intermediate" ? 50 : 100}
                      step={null}//Disables free movement, so the user can only select the predefined values.
                      marks={levelMarks} // it creatae labled stopping point on the slider Users can see and click these points directly.
                      //  Each mark consists of:
                      // value: The position on the slider.



                      // label: The text shown at that position.
                      onChange={(e, value) =>
                        setLevel(value === 0 ? "Beginner" : value === 50 ? "Intermediate" : "Advanced")
                      }
                      sx={{
                        color: "red",
                        "& .MuiSlider-thumb": { bgcolor: "red" },
                      }}
                    />
                    <Typography variant="body1" align="center">
                      {level} Level
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            )}
            {/* Step 2: Select Workout Days */}
            {step === 1 && (
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="h6" fontWeight="bold" color="#333" mb={2}>
                  Choose Your Workout Days
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  {days.map((day) => (
                    <Grid item key={day}>
                      <Button
                        variant="contained"
                        sx={{
                          borderRadius: "50%",
                          minWidth: 60,
                          minHeight: 60,
                          fontSize: "16px",
                          fontWeight: "bold",
                          bgcolor: selectedDays.includes(day) ? "#FF2625" : "#ddd",
                          color: selectedDays.includes(day) ? "white" : "#555",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: selectedDays.includes(day) ? "#e60023" : "#bbb",
                            transform: "scale(1.1)",
                          },
                        }}
                        onClick={() =>
                          setSelectedDays(selectedDays.includes(day)
                            ? selectedDays.filter((d) => d !== day)
                            : [...selectedDays, day])  //expand  the array it create a new array
                        }
                      >
                        {day}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}


            {/* Step 3: Select Body Focus */}
            {step === 2 && (
              <Grid container spacing={2} justifyContent="center">
                {bodyparts.map((part) => (
                  <Grid item key={part}>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: "50%",
                        minWidth: 60,
                        minHeight: 60,
                        fontSize: "16px",
                        fontWeight: "bold",
                        bgcolor: selectedBodyParts.includes(part) ? "#FF2625" : "#ddd",

                        color: selectedBodyParts.includes(part) ? "white" : "#555",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: selectedBodyParts.includes(part) ? "#e60023" : "#bbb",
                          transform: "scale(1.1)",
                        },
                      }}
                      onClick={() =>
                        setSelectedBodyParts(selectedBodyParts.includes(part)
                          ? selectedBodyParts.filter((b) => b !== part)
                          : [...selectedBodyParts, part])
                      }
                    >
                      {part}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Navigation Buttons */}
            <Box mt={4} display="flex" justifyContent="space-between">
              {step > 0 && <Button variant="outlined" onClick={handlePrev}>Back</Button>}
              {step < steps.length - 1 ? (
                <Button variant="contained" sx={{ bgcolor: "#FF2625", color: "white" }} onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit" variant="contained" sx={{ bgcolor: "green", color: "white" }}  onClick={()=> navigate('/workout') }>
                  Finish
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </form>
  );
}
export default Login