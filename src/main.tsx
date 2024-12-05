import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './app/store'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { TasksList } from './features/tests_template/Dashboard/taskList'
import { TaskItem } from './features/tests_template/Dashboard/taskItem'
import { Result } from './features/tests_template/Dashboard/myTestResult'
import Details from './features/tests_template/Dashboard/details'
import Create from './features/tests_template/Create/create'
import EditQuiz from './features/tests_template/Edit/editQuize'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/quizzes',
    element: <TasksList />
  },
  {
    path: '/quizzes/:quizId',
    element: <TaskItem /> 
  },
  {
    path: '/results/:quizId',
    element: <Result/>,
  },
  {
    path: '/quizzes/:quizId/details', 
  element: <Details />, 
  },
  {
    path:'/create/quiz',
    element:<Create/>
  },
  {
    path: '/quizzes/:quizId/edit',
    element:<EditQuiz/>
  }
])
const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </React.StrictMode>
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  )
}