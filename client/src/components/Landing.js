import React from 'react'
import { Link } from 'react-router-dom'

export const Landing = () => {
  return (
    <div className='jumbotron jumbotron-fluid mt-5'>
      <h1 className='display-4'>Welcome to Todo</h1>
      <p>
        <Link to='/login'>Sign in</Link> and start building your todo list
      </p>
      <Link to='/login' className='btn btn-primary  m-3'>
        Sign in
      </Link>
      <Link to='/register' className='btn btn-primary '>
        Register
      </Link>
    </div>
  )
}
