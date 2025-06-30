import React, { useState } from 'react'
import {Box} from '@mui/material'
import HeroBanner from '../Component/HeroBanner'
import Search from '../Component/Search'
import Exercise from '../Component/Exercise'
const Home = () => {
  const [bodyPart,setB]=useState('all')
   const [exer ,setExer]=useState([])
  return (

    <div>
      <Box>
        <HeroBanner/>
        <Search setExer={setExer} bodyPart={bodyPart} setB={setB} />
        <Exercise exer={exer} bodyPart={bodyPart} setExer={setExer} />
      </Box>
    </div>
  )
}

export default Home
 