import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react'

const Tasks = (props) => {
  const classes = useStyles()
  // let taskList = <Typography textAlign='center' >No tasks found. Start adding some!</Typography>;
  let taskList = (
    <Typography textAlign='center' >
      No task found.
    </Typography>
  )

  if (props.items.length > 0) {
    taskList = (
      <List>
        {props.items.map((task) => (
          <ListItem key={task.id}>
            <ListItemText primary={task.text} />
          </ListItem>
        ))}
      </List>
    );
  }

  let content = taskList;

  if (props.error) {
    content = <button onClick={props.onFetch}>Try again</button>;
  }

  if (props.loading) {
    content = 'Loading tasks...';
  }

  return (
    <section className={classes.layout} >
      <Box className={classes.boxLayout} >
        {content}
      </Box>
    </section>
  )
}

const useStyles = makeStyles({
  layout: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px'
  },
  boxLayout: {
    padding: '20px 20px 20px 20px',
    width: 500,
    height: 500,
    backgroundColor: 'lightblue',
    '&:hover': {
      backgroundColor: 'lightblue',
      opacity: [0.9, 0.8, 0.7],
    },
  }
})

export default Tasks