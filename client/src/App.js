import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Dashboard } from './components/Dashboard'
import { Login } from './components/Login'
import { Register } from './components/Register'

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem('token')).length
  )

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
