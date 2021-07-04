import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Dashboard } from './components/Dashboard'
import { Login } from './components/Login'
import { Register } from './components/Register'

export const App = () => {
  return (
    <Router>
      <div className='container'></div>
    </Router>
  )
}
