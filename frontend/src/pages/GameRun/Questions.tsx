import { Box } from '@mui/system'
import { Button } from '@mui/material'
import React, {useState, useEffect, useRef} from 'react'
import ReactPlayer from "react-player"
import { findDOMNode } from 'react-dom'
import screenfull from 'screenfull'

import QuestionList from 'components/QuestionList'
import { IQuestionInterface } from 'interfaces/question-interface'

interface IQuestionsProps {
  questions: IQuestionInterface[],
  url: string
}

const Questions = ({questions, url}: IQuestionsProps) => {
  const [time, setTime] = useState<number>(0)
  const [isPaused, setIsPaused] = useState(true)
  //TODO: implement reactQuery
  // const [questions, setQuestions] = useState([])
  const playerRef = useRef(null)

  // const onClickFullscreen = () => {
  //   screenfull.request(findDOMNode(playerRef.current))
  // }

  const setTimeFromQuestion = (time: number) => {
    setTime(time)
    // onClickFullscreen()
    setIsPaused(false)
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'row'}}>
      <Box>
        <QuestionList 
          questions={questions} 
          getTime={setTimeFromQuestion}
        />
      </Box>
      {questions.length !== 0 && 
        <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
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
      }
    </Box>
  );
}

export default Questions
