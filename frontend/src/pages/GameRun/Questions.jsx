import { Box } from '@mui/system'
import { Button } from '@mui/material'
import React, {useState, useEffect, useRef} from 'react'
import ReactPlayer from "react-player"
import axios from 'axios'
import { findDOMNode } from 'react-dom'
import screenfull from 'screenfull'

import QuestionList from 'components/QuestionList'
import {API_URL} from 'config/constants'

const Questions = ({questions, url}) => {
  const [time, setTime] = useState(0)
  const [isPaused, setIsPaused] = useState(true)
  //TODO: implement reactQuery
  // const [questions, setQuestions] = useState([])
  const playerRef = useRef(null)

  const onClickFullscreen = () => {
    screenfull.request(findDOMNode(playerRef.current))
  }

  const setTimeFromQuestion = (time) => {
    console.log(time)
    setTime(time)
    // onClickFullscreen()
    setIsPaused(false)
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'row', marginLeft: '10px'}}>
      <Box sx={{width: '50%', flexShrink: 0}}>
        <QuestionList 
          questions={questions} 
          getTime={setTimeFromQuestion}
        />
      </Box>
      <Box sx={{width: '50%', flexShrink: 0, display: 'flex',  marginLeft: '30px', justifyContent: 'center', flexDirection: 'column'}}>
        <ReactPlayer
          ref={playerRef}
          controls={true}
          url={`${url}?t=${time}`}
          playing={ ! isPaused }
          onPause={() => setIsPaused(true)}
          onPlay={() => setIsPaused(isPaused)}
          onStart={() => setIsPaused(isPaused)}
          width='800px'
          height='500px'
          light={false}
          // className='react-player'
        />
        <Button 
          onClick={() => {
            setTime(0)
            setIsPaused(true)
          }
        }>
          RESET TIME
        </Button>
      </Box>
    </Box>
  );
}

export default Questions
