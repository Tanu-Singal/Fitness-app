import React, { useEffect, useState } from "react";
import { Box, Typography, Card, FormControl, InputLabel, MenuItem, Select, Button } from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [workoutDays, setWorkoutDays] = useState([]); // Example workout days
  const [data, setData] = useState([]);
    const [viewMode, setViewMode] = useState("week"); // "day", "week", "month"
  const [totalCalories, setTotalCalories] = useState(0);
  const [avgCalories, setAvgCalories] = useState(0);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchCalories = async () => {
      try {
        const response = await fetch(
           `http://localhost:5054/api/calorie/user/${userId}?range=${viewMode}`
        );
        const result = await response.json(); // [{ day: 'Mon', calories: 120 }, ...]
console.log("Calories API Result:", result); 
        const grouped = {};
result.forEach((item) => {
  const date = new Date(item.date);
  let label;

  if (viewMode === "day") {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const year = date.getFullYear();
    label = `${day}/${month}/${year}`; 
  } else if (viewMode === "week") {
    label = date.toLocaleDateString("en-US", { weekday: "short" }); // eg: Mon, Tue
  } else if (viewMode === "month") {
   label = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  }

  if (!grouped[label]) grouped[label] = 0;
  grouped[label] += item.calorie;
});

// Convert to chart data
const chartData = Object.entries(grouped).map(([day, calorie]) => ({
  day,
  calorie,
}));
console.log("Processed chartData:", chartData); 
setData(chartData);

        const total = result.reduce((sum, item) => sum + item.calorie, 0);
        const avg = (total / result.length).toFixed(2);

        setTotalCalories(total);
        setAvgCalories(avg);
      } catch (err) {
        console.error("Error fetching calories:", err);
      }
    };

    fetchCalories();
  }, [viewMode]);
 useEffect(() => {
    const fetchWorkoutDays = async () => {
      try {
        
        const res = await fetch(`http://localhost:5054/api/user/${userId}`); // Replace USER_ID with actual user ID or fetch from auth
        const user = await res.json();
        setWorkoutDays(user.workout_day || []);
      } catch (err) {
        console.error("Error fetching workout days:", err);
      }
    };

    fetchWorkoutDays();
  }, []);

  const getWorkoutDates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let workoutDates = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      if (workoutDays.includes(dayName)) {
        workoutDates.push(date.toISOString().split("T")[0]);
      }
    }

    return workoutDates;
  };

  const tileClassName = ({ date }) => {
    const dateString = date.toISOString().split("T")[0];
    return getWorkoutDates().includes(dateString) ? "workout-day" : "";
  };


  return (
    <Box p={3} sx={{ backgroundColor: "#f9f9f9", borderRadius: 3 }}>
      <Typography variant="h4" fontWeight="600" mb={3}>
        Fitness Dashboard
      </Typography>

      {/* Calendar Section */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Card sx={{ p: 3, width: "350px", textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Workout Calendar
          </Typography>
          <Calendar tileClassName={tileClassName}/>
        </Card>
        <style>{`
          .workout-day abbr {
            background-color: red;
            color: white;
            border-radius: 50%;
            display: inline-block;
            width: 25px;
            height: 25px;
            text-align: center;
            line-height: 25px;
          }
        `}</style>

         

      </Box>

      {/* View Selector */}
      <Box mt={5} mb={2}>
        <FormControl>
          <InputLabel>View</InputLabel>
          <Select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            sx={{ width: 200 }}
          >
            <MenuItem value="day">Per Day</MenuItem>
            <MenuItem value="week">Per Week</MenuItem>
            <MenuItem value="month">Per Month</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Bar Chart */}
      <Box>
        <Typography variant="h6" fontWeight="600" mb={2}>
          Calories Burned ({viewMode.charAt(0).toUpperCase() + viewMode.slice(1)})
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="calorie" fill="#FF2625" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
        <Typography mt={2} fontWeight={500}>
          Total Calories Burned: {totalCalories} kcal
        </Typography>
        <Typography fontWeight={500}>
          Avg Calories Burned: {avgCalories} kcal
        </Typography>
      </Box>
    </Box>
  );
};


export default Dashboard;