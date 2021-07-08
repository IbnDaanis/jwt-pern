import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Dashboard } from './components/Dashboard'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const token = JSON.parse(localStorage.getItem('token'))

  async function isAuth() {
    try {
      const response = await fetch('http://localhost:5000/auth/verify', {
        method: 'GET',
        headers: { token }
      })
      const data = await response.json()

      data ? setIsAuthenticated(true) : setIsAuthenticated(false)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    if (token) return isAuth()
  }, [])

  return (
    <Router>
      <div className='container'>
        <Switch>
          <Route
            exact
            path='/login'
            render={props =>
              !isAuthenticated ? (
                <Login {...props} setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Redirect to='/dashboard' />
              )
            }
          />
          <Route
            exact
            path='/register'
            render={props =>
              !isAuthenticated ? (
                <Register {...props} setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Redirect to='/dashboard' />
              )
            }
          />
          <Route
            exact
            path='/dashboard'
            render={props =>
              isAuthenticated ? (
                <Dashboard {...props} setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
        </Switch>
      </div>
    </Router>
  )
}
