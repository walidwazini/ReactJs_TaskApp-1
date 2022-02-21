import React, { Fragment, useState, useEffect } from 'react'

import { makeStyles } from '@mui/styles'
import NewTask from './Components/NewTask'
import Tasks from './Components/Tasks'
import useHttp from './Hooks/use-http'

const App = () => {
  const firebaseUrl = 'https://react-http-7483e-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json'
  const [tasks, setTasks] = useState([])

  const transformTasks = taskObj => {
    const loadedTasks = []
    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text })
    }
    setTasks(loadedTasks)
  }

  const { isLoading, error, sendRequest: fetchTasks } =
    useHttp({ url: firebaseUrl }, transformTasks)

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