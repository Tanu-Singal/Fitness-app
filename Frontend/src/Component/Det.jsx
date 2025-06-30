import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import rec from '../assets/rec.png'
const Det = ({exerdetail}) => {
   const extradetail=[
    {
        icon:rec,
        name: exerdetail.bodyPart
    },
    {
        icon:rec,
        name:exerdetail.target
    },
    {
        icon:rec,
        name:exerdetail.equipment
    }
   ]
  return (
  
    <Stack gap="60px" sx={{flexDirection:{lg:'row'},p:"20px",alignItems
    :"center"}}>
      <img src={exerdetail.gifUrl} alt={exerdetail.name} loading="lazy" className='detail-image'  style={{ width: '100%', maxWidth: '50%' }} />
    <Stack sx={{gap:{lg:'35px',xs:'20px'}, flex: 1}}>
        <Typography variant="h3">
            {exerdetail.name}
        </Typography>
        <Typography variant='h6'>
            Exercises keep you strong. {exerdetail.name} {` `}
            is one of the best exercise to target your {exerdetail.target}.
             It will help you improve your mood and gain energy.
        </Typography>
        {extradetail.map((item,ind)=>(
            <Stack key={ind} direction="row" gap="24px" alignItems="center">
            <Button sx={{background:'#FF2DB',borderRadius:"50%",width:"100px",height:"100px"}}>
                <img src={item.icon} alt={exerdetail.bodyPart} style={{width:'50px',height:'50px'}}/>
            </Button>
            <Typography varinat="h5" textTransform='capitalize'>
                {item.name}
            </Typography>
            </Stack>
        ))}
    </Stack>
    </Stack>
  )
}

export default Det
