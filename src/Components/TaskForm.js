import React, { useRef } from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Button, TextField } from '@mui/material'

const TaskForm = (props) => {
  const classes = useStyles()
  const taskInputRef = useRef();

  const submitHandler = (ev) => {
    ev.preventDefault()

    const enteredValue = taskInputRef.current.value;

    if (enteredValue.trim().length > 0) {
      props.onEnterTask(enteredValue)
    }
  };

  return (
    <form
      className={classes.form} onSubmit={submitHandler}
    >
      <TextField
        label="Size" className={classes.input}
        variant='filled' ref={taskInputRef}
      />
      <Box sx={{ width: '20px' }} />
      <Button type='submit'
        variant='contained' className={classes.button}
      >
        {props.loading ? 'Sending...' : 'Add Task'}
      </Button>
    </form>
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
  },
  button: {
    width: '200px',
    height: '40px',
    // marginLeft: '20px'
  }
})

export default TaskForm