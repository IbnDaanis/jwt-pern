import React from 'react'
import { EditTodo } from './EditTodo'

export const TodoList = ({ todos, setTodos }) => {
  const handleDelete = async id => {
    try {
      const reqHeaders = new Headers()
      reqHeaders.append('token', JSON.parse(localStorage.getItem('token')))

      await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: 'DELETE',
        headers: reqHeaders
      })
      setTodos(prev => prev.filter(todo => todo.todo_id !== id))
    } catch (error) {
      console.error(error.message)
    }
  }

  if (todos.length && !todos[0].todo_id) {
    return null
  }

  return (
    <table className='table mt-5'>
      <thead>
        <tr>
          <th scope='col'>Description</th>
          <th scope='col'>Edit</th>
          <th scope='col'>Delete</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <tr key={todo.todo_id}>
            <th scope='row'>{todo.description}</th>
            <td>
              <EditTodo todo={todo} />
            </td>
            <td>
              <button className='btn btn-danger' onClick={() => handleDelete(todo.todo_id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
