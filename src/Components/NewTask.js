import React, { useState, useRef } from 'react'

import { makeStyles } from '@mui/styles'
import { Box, Button, } from '@mui/material'

const NewTask = (props) => {
  const firebaseUrl = 'https://react-http-7483e-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json'
  const taskInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const enterTaskHandler = async (taskText) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(firebaseUrl, {
        method: 'POST',
        body: JSON.stringify({ text: taskText }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Request failed!');
      }
      const data = await response.json();

      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);

    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
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