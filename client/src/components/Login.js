import React, { useState } from 'react'

export const Login = ({ setIsAuthenticated }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })

  const { email, password } = inputs
  return (
    <div>
      <h1>Login</h1>
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
    </div>
  )
}
