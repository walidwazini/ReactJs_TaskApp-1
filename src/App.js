import React, { Fragment, useState, useEffect } from 'react'

import { makeStyles } from '@mui/styles'
import NewTask from './Components/NewTask'
import Tasks from './Components/Tasks'

const App = () => {
  const firebaseUrl = 'https://react-http-7483e-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([])

  const fetchTasks = async (taskText) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(firebaseUrl)
      if (!response.ok) {
        throw new Error('Request failed!')
      }

      const data = await response.json()
      const loadedTasks = []

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks)
    } catch (err) {
      setError(err.message || 'Something is wrong!')
    }
    setIsLoading(false)
  }

  useEffect(() => fetchTasks(), [])

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
    // console.log(task)
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  )
}

const useStyles = makeStyles({

})

export default App