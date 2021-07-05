import React, { useState } from 'react'

export const Register = ({ setIsAuthenticated }) => {
  const [inputs, setInputs] = useState({
    email: '',
    name: '',
    password: ''
  })

  const handleSubmit = async event => {
    event.preventDefault()
    console.log(inputs)
  }

  return (
    <div className='container'>
      <h1 className='text-center my-5'>Register</h1>
      <form onSubmit={handleSubmit} className='w-50 text-center m-auto'>
        <input
          type='email'
          placeholder='Enter Email'
          className='form-control my-3'
          onChange={({ target }) => setInputs(prev => ({ ...prev, email: target.value }))}
          required
        />
        <input
          type='text'
          placeholder='Enter Name'
          className='form-control my-3'
          onChange={({ target }) => setInputs(prev => ({ ...prev, name: target.value }))}
          required
        />
        <input
          type='password'
          placeholder='Enter Password'
          className='form-control my-3'
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
