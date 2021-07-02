import { Router } from 'express'
import { pool } from '../database/database.js'
import bcrypt from 'bcrypt'

const router = Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const user = (await pool.query('SELECT * FROM users WHERE user_email = $1', [email])).rows[0]

    if (user) {
      return res.status(400).send('User already exists, choose a different email address')
    }

    const SALT_ROUNDS = 10
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const bcryptPassword = bcrypt.hash(password, salt)

    const newUser = await pool.query(
      'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3)',
      [name, email, bcryptPassword]
    ).rows[0]

    return res.status(201).send(newUser)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

export default router
