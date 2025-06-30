import { CircularProgress, Stack } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
  <Stack direction="row" justifyContent="center" alignItems="center" width="100%">
      <CircularProgress />
  </Stack>
  )
}

export default Loader
