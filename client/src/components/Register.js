import React, { useState } from 'react'

export const Register = ({ setIsAuthenticated }) => {
  const [inputs, setInputs] = useState({
    email: '',
    name: '',
    password: ''
  })

  const { email, name, password } = inputs

  const handleSubmit = async event => {
    event.preventDefault()
    const body = { email, name, password }
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await response.json()

      localStorage.setItem('token', JSON.stringify(data.token))
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className='container'>
      <h1 className='text-center my-5'>Register</h1>
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
          type='text'
          placeholder='Enter Name'
          className='form-control my-3'
          value={name}
          onChange={({ target }) => setInputs(prev => ({ ...prev, name: target.value }))}
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
          Sign Up
        </button>
      </form>
    </div>
  )
}
