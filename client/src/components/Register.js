import React from 'react'

export const Register = ({ setIsAuthenticated }) => {
  return (
    <div>
      <h1>Register</h1>
      <button onClick={() => setIsAuthenticated(true)}>Sign Up</button>
    </div>
  )
}
