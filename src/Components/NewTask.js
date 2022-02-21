import React, { useRef } from 'react'

import { makeStyles } from '@mui/styles'
import { Box, Button, } from '@mui/material'
import useHttp from '../Hooks/use-http'

const NewTask = (props) => {
  const firebaseUrl = 'https://react-http-7483e-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json'
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp()

  const taskInputRef = useRef();

  const enterTaskHandler = async (taskText) => {
    const createTask = (taskData) => {
      const generatedId = taskData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
    }

    sendTaskRequest(
      {
        url: firebaseUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { text: taskText }
      },
      createTask
    )
  }

  const submitHandler = (ev) => {
    ev.preventDefault()
    const enteredValue = taskInputRef.current.value

    if (enteredValue.trim().length > 0) {
      enterTaskHandler(enteredValue)
    }
  };

  const classes = useStyles()
  return (
    <div className={classes.layout} >
      <form
        noValidate autoComplete='off'
        className={classes.form} onSubmit={submitHandler}
      >
        <input ref={taskInputRef} className={classes.input} />
        <Box sx={{ width: '20px' }} />
        <Button type='submit'
          variant='contained' className={classes.button}
        >
          {isLoading ? 'Sending...' : 'Add Task'}
        </Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

const useStyles = makeStyles({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    width: '300px',
    height: '40px',
  },
  button: {
    width: '200px',
    height: '40px',
    // marginLeft: '20px'
  }
})

export default NewTask