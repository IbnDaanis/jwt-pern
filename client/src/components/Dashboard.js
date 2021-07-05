import React from 'react'

export const Dashboard = ({ setIsAuthenticated }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setIsAuthenticated(false)}>Logout</button>
    </div>
  )
}
