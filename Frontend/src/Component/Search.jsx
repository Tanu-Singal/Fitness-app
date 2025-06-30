import React, { useEffect, useState } from 'react'
import { Box,Stack,Button,TextField,Typography} from '@mui/material'
import { fetchData} from '../utils/fetchData'
import HorizontalScrollbar from './HorizontalScrollbar'
const Search = ({bodyPart,setB,setExer}) => {
  const [values,setValue]=useState("")
 
  const [bodyparts,setBodyPart]=useState([])
useEffect(() => {
  const fetchdata = async () => {
    try {
      const bodypartdata = await fetchData('https://fitness-app-backend-1xz5.onrender.com/api/bodyparts', {});
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



  const handlesearch = async () => {
    if (values.trim()) {
      try {
        
        const exercises = await fetchData('https://fitness-app-backend-1xz5.onrender.com/api/exercises', {});
        const searchQuery = values.toLowerCase();
        console.log("Fetched Exercises:", exercises.length)
        const searchedExercise = exercises.filter((exercise) =>
          exercise.name.toLowerCase().includes(searchQuery) ||
          exercise.target.toLowerCase().includes(searchQuery) ||
          exercise.equipment.toLowerCase().includes(searchQuery) ||
          exercise.bodyPart.toLowerCase().includes(searchQuery)
        );
        setExer(searchedExercise);
        setValue(''); 
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    }
  };
  return (
   <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
   <Typography fontWeight={700} sx={
    {
         fontSize:{lg:'44px',xs:'30px'}
    }
   } mb="50px" textAlign="center">Awesome exercises You <br/> Should know</Typography>
   <Box position="relative" mb="72px">
    <TextField sx={{
      input:{
        fontWeight:'700',
        border:'none',
        borderRadius:'4px'
      },width:{
        lg:'800px',xs:'350px'
      },
      backgroundColor:'#fff'
    }} height="76px" value={values}  onChange={(e)=>{setValue(e.target.value)}} type="text" placeholder='Search Exercises' />
    <Button className='search-btn' sx={
      {
        bgcolor:'#FF2625',
        color:'#fff',
        textTransform:'none',
        width:{lg:'175px',xs:'80px'},
        fontSize:{lg:'20px',xs:'14px'},
        height:'56px',
        position:'absolute',
        right:'0'
      }
    } onClick={handlesearch}>
      Search
    </Button>
   </Box>
    <Box sx={{
      position:'relative',width:"100%",pt:'20px',pb:'0px',px:'20px'
    }}>
      <HorizontalScrollbar data={bodyparts} bodyPart={bodyPart} setB={setB} isBodypart/>
    </Box>
   </Stack>
  )
}                                  

export default Search
