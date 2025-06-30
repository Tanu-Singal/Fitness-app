import { Stack, Typography } from '@mui/material'
import React from 'react'
import rec from '../assets/mdumb.jpg'
const BodyPart = ({item,bodyPart,setB}) => {
  return (
    <div>
      <Stack type="button" alignItems="center" justifyContent="center" className='bodyPart-card'
        //sx used for inline styling with js obj
      sx={{borderTop:bodyPart===item?'4px solid #FF2625':'',
            background:"#FFF",borderBottomLeftRadius:'20px',width:'270px',height:'280px',
            cursor:'pointer',gap:'47px'
      }}
      >
        <img src={rec} alt="dumble" style={{width:'65px',height:'65px'}} onClick={()=>setB(item)}/>
        <Typography>{item}</Typography>
      </Stack>
    </div>
  )
}

export default BodyPart