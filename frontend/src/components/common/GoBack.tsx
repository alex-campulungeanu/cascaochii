import { Button } from '@mui/material'
import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const GoBack = () => {
  const location = useLocation()
  const history = useHistory()

  if (location.pathname == '/') return null
  
  return (
    <div>
      <Button 
        color="secondary" 
        onClick={() => history.goBack()}
        startIcon={<ArrowLeftIcon />}
      >
        Go Back
      </Button>
    </div>
  )
}

export default GoBack
