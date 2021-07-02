import { Router } from 'express'
import { pool } from '../database/database.js'

const router = Router()

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email])

    if (user) {
      return res.status(400).send('User already exists, choose a different email address')
    }

    res.json(user.rows[0])
    next()
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

export default router
