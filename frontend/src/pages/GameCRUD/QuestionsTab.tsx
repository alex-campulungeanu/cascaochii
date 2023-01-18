import React, {useState, useEffect} from 'react'
import { Button, Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import axios, { AxiosResponse } from 'axios'
import {useParams} from 'react-router-dom'

import QuestionModal from 'components/QuestionModal'
import QuestionForm from 'components/QuestionForm'
import {API_URL} from 'config/constants'
import { IQuestionInterface } from 'interfaces/question-interface'

interface IParamsInterface {
  id: string
}

const QuestionsTab = () => {
  const { id } = useParams<IParamsInterface>()
  const [currentQuestion, setCurrentQuestion] = useState<IQuestionInterface | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [questions, setQuestions] = useState<IQuestionInterface[]>([])
  // const [currentQuestionExpanded, setCurrentQuestionExpanded] = usePersistState('currentQuestionId', {'questionId': false})
  const [expanded, setExpanded] = useState(0);
  
  const handleChange = (question) => (event, isExpanded) => {
    setExpanded(isExpanded ? question.id : 0);
    // setCurrentQuestion(question)
    // setCurrentQuestionExpanded({'questionId': questionId})
  };

  const getQuestions = async () => {
    const response: AxiosResponse<IQuestionInterface[]> =  await axios.get(`${API_URL}/game/${id}/questions/`)
    return response.data
  }

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setModalOpen(false);
    }
  }

  const handleCancel = () => {
    setExpanded(0)
  }

  const handleNewQuestion = () => {
    setCurrentQuestion(null)
    setModalOpen(true);
  }

  useEffect(() => {
    getQuestions().then(data => setQuestions(data))
  }, [])


  // TODO: add a popup when deleting success or failed
  const handleDelete = async (question) => {
    const playerId = question.id
    const response = await axios.delete(`${API_URL}/game/questions/${playerId}/`);
    if (response.status === 204) {
      getQuestions().then(data => setQuestions(data))
    } else {
      console.log('Error occured when deleting question')
    }
  }

  useEffect(() => {
    getQuestions().then(data => setQuestions(data))
  }, [])

  const handleSubmit = async (formData) => {
    if (formData.id) {
      const data = {
        id: formData.id,
        name: formData.name,
        info: formData.info,
        body: formData.body,
        video_timestamp: formData.video_timestamp,
        game: id 
      }
      const response = await axios.put(`${API_URL}/game/questions/${data.id}/`, data);
    } else {
      const data = {
        name: formData.name,
        info: formData.info,
        body: formData.body,
        video_timestamp: formData.video_timestamp,
        game: id
      }
      const response = await axios.post(`${API_URL}/game/questions/`, data);
    }
    getQuestions().then(data => setQuestions(data))
  }

  return (
    // TODO: move Add player button to end
    <Box>
      <Box sx={{ 
        display: 'flex',
        mb: 2,
        flexDirection: 'row'
      }}>
        <Button 
          variant="contained"
          onClick={() => handleNewQuestion()}
          color="secondary"
        >
          Add question
        </Button>
      </Box>
      <Paper sx={{width: '50%'}}>
        <>
          {questions.map(question => (
            <Accordion expanded={expanded === question.id} onChange={handleChange(question)} key={question.id}>
              <AccordionSummary
                expandIcon={<EditOutlinedIcon />}
                aria-controls="panel1bh-content"
                id={`${question.id}-header`}
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  <>{question.name}</>
                </Typography>
                {/* <Typography style={{color:"#00adb5"}} >{question.info}</Typography> */}
                <Divider />
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                  <Box>
                    <QuestionForm 
                      question={question} 
                      onSubmit={handleSubmit}
                      onCancel={handleCancel}
                      onDelete={handleDelete} 
                    />
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      </Paper>
      
    <QuestionModal 
      question={currentQuestion}
      open={modalOpen}
      handleClose={handleClose}
      onSubmit={handleSubmit}
    />

    </Box>
  )
}

export default QuestionsTab
