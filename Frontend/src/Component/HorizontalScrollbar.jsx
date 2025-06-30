import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import BodyPart from './BodyPart'
import Exercise from './Exercise'
const HorizontalScrollbar = ({data,bodyPart,isBodypart,setB}) => {
   
  return (
    <Box   sx={{
        display: "flex",
        overflowX: "auto",
        whiteSpace: "nowrap",
        scrollbarWidth: "none", 
        "&::-webkit-scrollbar": { display: "none" }, 
        gap: "40px",
        padding: "10px", 
      }}>
        
      {data.map((item,ind)=>(
        <Box
            key={ind}
            itemID={item.id || item}
            title={item.id || item}
            m="0 40px">
              {isBodypart ? <BodyPart item={item} bodyPart={bodyPart} setB={setB}/> : <Exercise exercise={item}/>} 
        </Box>
      ))}
   
    </Box>
    
  )
}

export default HorizontalScrollbar
