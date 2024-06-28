import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './components/Root/Root.jsx'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Resgister/Register.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },

    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
