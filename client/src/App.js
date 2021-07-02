import React from 'react'
import { InputTodo } from './components/InputTodo'
import { TodoList } from './components/TodoList'

export const App = () => {
  return (
    <div className='container'>
      <InputTodo />
      <TodoList />
    </div>
  )
}
