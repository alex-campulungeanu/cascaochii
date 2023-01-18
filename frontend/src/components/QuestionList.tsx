import React, {useEffect, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

import usePersistState from '../hooks/usePersistState'
import { IQuestionInterface } from 'interfaces/question-interface';

interface IQuestionListProps {
  questions: IQuestionInterface[],
  getTime: (time: number) => void
}

const QuestionList = (props: IQuestionListProps) => {
  //TODO: logic with preserving last accordion opened should be improved
  const [currentQuestionExpanded, setCurrentQuestionExpanded] = usePersistState('currentQuestionId', {'questionId': false})
  const [expanded, setExpanded] = useState(currentQuestionExpanded.questionId || false);

  useEffect(() => {
    setExpanded(currentQuestionExpanded.questionId)
  }, [currentQuestionExpanded.questionId])

  const handleChange = (questionId) => (event, isExpanded) => {
    setExpanded(isExpanded ? questionId : false);
    setCurrentQuestionExpanded({'questionId': questionId})
  };

  const onClickTime = (event, value) => {
    props.getTime(value)
  }
  
  return (
    <div>
      {props.questions.map(question => (
        <Accordion expanded={expanded === question.id} onChange={handleChange(question.id)} key={question.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id={`${question.id}-header`}
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              <b>{question.name}</b>
            </Typography>
            <Typography style={{color:"#00adb5"}} >{question.info}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Typography variant="h6">
                {question.body}
              </Typography>
              <Button 
                variant="contained"
                onClick={(e) => onClickTime(e, question.video_timestamp)}
              >
                Show answer
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default QuestionList