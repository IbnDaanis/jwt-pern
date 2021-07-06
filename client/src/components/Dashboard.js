import React, { useState, useEffect } from 'react'

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
      <h1>Dashboard</h1>
      <div>
        {name && <h2>Welcome back {name}</h2>}
        <button
          className='btn btn-primary my-5'
          onClick={() => {
            localStorage.removeItem('token')
            setIsAuthenticated(false)
          }}>
          Logout
        </button>
      </div>
    </div>
  )
}
