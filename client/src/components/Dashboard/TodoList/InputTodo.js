import React, { Fragment, useState } from 'react'

export const InputTodo = () => {
  const [description, setDescription] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const reqHeaders = new Headers()
      reqHeaders.append('Content-Type', 'application/json')
      reqHeaders.append('token', JSON.parse(localStorage.getItem('token')))

      const body = { description }

      const res = await fetch('http://localhost:5000/dashboard/todos', {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify(body)
      })

      const parsed = await res.json()

      console.log(parsed)

      setDescription('')
      window.location = '/'
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <Fragment>
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
    </Fragment>
  )
}
