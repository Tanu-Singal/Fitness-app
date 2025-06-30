import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import pic from '../assets/logo.jpg'

const Footer = () => {
  return (
    <Box mt="80px" bgcolor="#FFF3F4" textAlign="center">
      <Stack
        direction="column"
        gap="20px"
        alignItems="center"
        justifyContent="center"
        px="40px"
        pt="24px"
      >
        <Box
          component="img"
          src={pic}
          alt="logo"
          sx={{
            width: { xs: '50px', sm: '70px', md: '90px' },
            height: { xs: '50px', sm: '70px', md: '90px' },
            borderRadius: '50%',
          }}
        />
        <Typography variant="h6" pb="40px">
          © {new Date().getFullYear()} Fitness-pro. All rights reserved.
        </Typography>
      </Stack>
    </Box>
  )
}

export default Footer

