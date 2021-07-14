import { Router } from 'express'
import { pool } from '../database/database.js'
import { authorization } from '../middleware/authorization.js'

const router = Router()

router.get('/', authorization, async (req, res) => {
  try {
    const user = (
      await pool.query(
        'SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos as t ON u.user_id = t.user_id WHERE u.user_id = $1',
        [req.user.id]
      )
    ).rows[0]
    res.status(200).json(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

router.post('/todos', authorization, async (req, res) => {
  try {
    const { description } = req.body
    const newTodo = (
      await pool.query('INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *', [
        req.user.id,
        description
      ])
    ).rows[0]

    res.json(newTodo)
  } catch (error) {
    console.error(error.message)
    res.json(error.message)
  }
})

export default router
