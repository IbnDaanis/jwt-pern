import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export const Login = ({ setIsAuthenticated }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })

  const { email, password } = inputs

  const handleSubmit = async event => {
    event.preventDefault()
    const body = { email, password }
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await response.json()

      if (data.token) {
        localStorage.setItem('token', JSON.stringify(data.token))
        return setIsAuthenticated(true)
      }

      toast.error(data)
      throw new Error(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div>
      <h1 className='text-center my-5'>Login</h1>
      <form onSubmit={handleSubmit} className='w-50 text-center m-auto'>
        <input
          type='email'
          placeholder='Enter Email'
          className='form-control my-3'
          value={email}
          onChange={({ target }) => setInputs(prev => ({ ...prev, email: target.value }))}
          required
        />
        <input
          type='password'
          placeholder='Enter Password'
          className='form-control my-3'
          value={password}
          onChange={({ target }) => setInputs(prev => ({ ...prev, password: target.value }))}
          required
        />
        <button type='submit' className='btn btn-success btn-block'>
          Login
        </button>
      </form>
      <Link className='text-center my-3 d-block' to='/register'>
        Register
      </Link>
    </div>
  )
}
