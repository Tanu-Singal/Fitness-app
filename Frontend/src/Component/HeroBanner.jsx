import React from 'react'
import { Box,Stack,Typography,Button } from '@mui/material'//Typography present user design as clearly as possible
import running from '../assets/running.jpg'
const HeroBanner = () => {
  return (
  <Box
      sx={{
        mt: { lg: '50px', xs: '35px' },
        ml: { sm: '30px' },
        px: '20px',
        position: 'relative',
        overflow: 'hidden',
          pb: { lg: '100px', xs: '60px' }, // prevent background text from leaking outside
      }}
    >
      {/* FLEX layout */}
      <Stack
        direction={{ lg: 'row', xs: 'column' }}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* TEXT SECTION */}
        <Box sx={{ flex: 1, position: 'relative' }}>
          <Typography color="#FF2625" fontWeight="600" fontSize="26px">
            Fitness Club
          </Typography>

          <Typography
            fontWeight="700"
            sx={{ fontSize: { lg: '44px', xs: '36px' } }}
            mb="23px"
            mt="30px"
          >
            Sweat, Smile <br /> and Repeat
          </Typography>

          <Typography fontSize="22px" lineHeight="35px" mb={4}>
            Check out the most effective exercises
          </Typography>

          <Button
            variant="contained"
            color="error"
            href="#exercises"
            sx={{ backgroundColor: '#FF2625', padding: '10px 20px' }}
          >
            Explore Exercises
          </Button>

          {/* BACKGROUND TEXT directly below the button */}
          <Typography
            fontWeight={600}
            color="#FF2625"
            sx={{
              opacity: 0.1,
              fontSize: { lg: '180px', xs: '100px' },
              position: 'absolute',
              top: '100%',
              left: 0,
              lineHeight: 1,
              zIndex: -1,
              whiteSpace: 'nowrap',
            }}
          >
            Exercise
          </Typography>
        </Box>

        {/* IMAGE SECTION */}
        <Box
          component="img"
          src={running}
          alt="running"
          sx={{
            display: { lg: 'block', xs: 'none' },
            width: '620px',
            height: '520px',
            borderRadius: '20px',
            objectFit: 'cover',
            ml: { lg: '40px' },
          }}
        />
      </Stack>
    </Box>
  )
}

export default HeroBanner
