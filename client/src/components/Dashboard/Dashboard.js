import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { TodoList } from './TodoList/TodoList'
import { InputTodo } from './TodoList/InputTodo'

export const Dashboard = ({ setIsAuthenticated }) => {
  const [name, setName] = useState('')

  async function getName() {
    try {
      const response = await fetch('http://localhost:5000/dashboard', {
        method: 'GET',
        headers: {
          token: JSON.parse(localStorage.getItem('token'))
        }
      })
      const data = await response.json()
      console.log(data)
      setName(data.user_name)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getName()
  }, [])

  return (
    <div className='container'>
      <div>
        <div className='d-flex mt-5 justify-content-around'>
          <h2>Welcome back {name}</h2>
          <button
            className='btn btn-primary my-5'
            onClick={() => {
              localStorage.removeItem('token')
              toast.success('Logged out')
              setIsAuthenticated(false)
            }}>
            Logout
          </button>
        </div>
        <InputTodo />
        <TodoList />
      </div>
    </div>
  )
}
