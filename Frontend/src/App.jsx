import React, { useState } from 'react'
import {Box} from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Home from './Page/Home'
import Detail from './Page/Detail'
import Navbar from './Component/Navbar'
import Footer from './Component/Footer'

import Login from './Component/Login'

import Workout from './Page/Workout'
import Sketch from './Page/Sketch'
import Dashboard from './Component/Dashboard'
const App = () => {
  const [workoutPlan, setWorkoutPlan] = useState("");
  return (
    <div>
      <Box width="400px" m="auto" sx={{width:{xl:'1488px'}}}>
       <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/exercise/:id' element={<Detail/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/login' element={<Login setWorkoutPlan={setWorkoutPlan}/>}/>

          <Route path='/workout' element={<Workout workoutPlan={workoutPlan}/>}/>
          <Route path='/posedetect' element={<Sketch/>}/>
        </Routes> 
        <Footer/>
      </Box>
    </div>
  )
}

export default App
