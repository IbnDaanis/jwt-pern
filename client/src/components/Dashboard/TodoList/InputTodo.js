import React, { useState } from 'react'

export const InputTodo = () => {
  const [description, setDescription] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const body = { description }
      await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      setDescription('')
      window.location = '/'
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      <h1 className='text-center my-5'>Input Todo</h1>
      <form className='d-flex' onSubmit={handleSubmit}>
        <input
          type='text'
          className='form-control'
          placeholder='Add Todo'
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <button type='submit' className='btn btn-success '>
          Add
        </button>
      </form>
    </>
  )
}
