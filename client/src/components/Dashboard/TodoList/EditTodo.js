import React, { useState } from 'react'

export const EditTodo = ({ todo }) => {
  const { todo_id, description } = todo
  const [editedDescription, setEditedDescription] = useState(description)

  const handleEditTodo = async id => {
    const body = { description: editedDescription }
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      window.location = '/'
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      <button
        type='button'
        className='btn btn-warning'
        data-bs-toggle='modal'
        data-bs-target={`#myModal-${todo_id}`}>
        Edit
      </button>
      <div id={`myModal-${todo_id}`} className='modal fade' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='btn btn-default close' data-bs-dismiss='modal'>
                &times;
              </button>
              <h4 className='modal-title'>Edit Todo</h4>
            </div>
            <div className='modal-body'>
              <input
                type='text'
                className='form-control'
                value={editedDescription}
                onChange={({ target }) => setEditedDescription(target.value)}
              />
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-warning'
                data-bs-dismiss='modal'
                onClick={() => handleEditTodo(todo_id)}>
                Edit
              </button>
              <button type='button' className='btn btn-default' data-bs-dismiss='modal'>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
