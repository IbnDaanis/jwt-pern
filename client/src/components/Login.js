import React from 'react'

export const Login = ({ setIsAuthenticated }) => {
  return (
    <div>
      <h1>Login</h1>
      <button
        onClick={() => {
          setIsAuthenticated(true)
        }}>
        Login
      </button>
    </div>
  )
}
