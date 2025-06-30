import { Box, Button, Pagination, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchData } from '../utils/fetchData'

const Exercise = ({exer,bodyPart,setExer,exercise}) => {
  const [currentpage,setcurrentPage]=useState(1)
  const exerciseperpage=9
  const indeoflast=currentpage*exerciseperpage
  const indofirst=indeoflast-exerciseperpage
  const curexer=exer.slice(indofirst,indeoflast)
  const paginate=(e,value)=>{
    setcurrentPage(value);
    window.scrollTo({top:1800,behavior:'smooth'})
  }
  useEffect(()=>{
       const fetchedata=async()=>{
        let edata=[];
        if(bodyPart==="all"){
          edata=await fetchData('http://localhost:5054/api/exercises', {})
        }
        else{
          edata=await fetchData(`http://localhost:5054/api/exercises/bodyPart/${bodyPart}`, {})
        }
        setExer(edata)
       }
       fetchedata();
  },[bodyPart])
  return (
    <Box id="exercises" 
     sx={{mt:{lg:'75px'}}}
     mt="50px"
     p="5px"
    >
      <Typography variant="h3" mb="46px"  sx={{ textAlign: "center", width: "100%" }}>Showing Results</Typography>
      <Stack direction="row"
        sx={{gap:{lg:'110px',xs:'50px'}}} flexWrap="wrap" justifyContent="center"
      >
      {curexer.map((exercise,ind)=>(
        <Box key={ind}  sx={{   width: { xs: "100%", sm: "45%", lg: "32%" }, textAlign: "center", borderTop: "4px solid #FF2625" }} >
      <Link className='exercise-card' to={`/exercise/${exercise.id}`}  style={{ textDecoration: "none" }}>
      <img src={exercise.gifUrl} alt={exercise.name} loading="lazy"     style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}/>
                <Box  sx={{ ml: "21px", textAlign: "left" }}> 
                <Stack direction="row" spacing={2}>

                
                  <Button sx={{color:'#FFF',background:"#FFA9A9",fontSize:'14px',borderRadius:'20px',textTransform:'capitalize',textDecoration:'none !important',
    display: "inline-block"}}>
                    {exercise.bodyPart}
                  </Button>
                  
                  <Button sx={{color:'#FFF',background:"#FCC757",fontSize:'14px',borderRadius:'20px',textTransform:'capitalize',textDecoration:'none !important',
    display: "inline-block"}}>
                    {exercise.target}
                  </Button>
                
                </Stack>
                <Typography ml="21px" color="#000" fontWeight="bold" mt="11px" textTransform="capitalize" fontSize="22px"> {exercise.name}</Typography>
                </Box>
      </Link>
        </Box>
       
        
        
      ))}
      </Stack>
      <Stack mt="100px" alignItems="center"> 
          {exer.length>9 && (
            <Pagination color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exer.length/exerciseperpage)}
            page={currentpage}
            onChange={paginate}
            size="large"
            />

          )}
      </Stack>
    </Box>
  )
}

export default Exercise
