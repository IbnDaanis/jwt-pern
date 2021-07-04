import { Router } from 'express'
import { pool } from '../database/database.js'
import bcrypt from 'bcrypt'
import { jwtGenerator } from '../utils/jwtGenerator.js'
import { validateInfo } from '../middleware/validateInfo.js'
import { authorization } from '../middleware/authorization.js'

const router = Router()

router.post('/register', validateInfo, async (req, res) => {
  try {
    const { name, email, password } = req.body

    const user = (await pool.query('SELECT * FROM users WHERE user_email = $1', [email])).rows[0]

    if (user) {
      return res.status(400).send('User already exists, choose a different email address')
    }

    const SALT_ROUNDS = 10
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const bcryptPassword = await bcrypt.hash(password, salt)

    const newUser = (
      await pool.query(
        'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, bcryptPassword]
      )
    ).rows[0]

    const token = jwtGenerator(newUser.user_id)
    res.json({ token })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

router.post('/login', validateInfo, async (req, res) => {
  try {
    const { email, password } = req.body

    const userExists = (await pool.query('SELECT * FROM users WHERE user_email = $1', [email]))
      .rows[0]
    if (!userExists) return res.status(401).json('Email or password is incorrect.')

    const validPassword = await bcrypt.compare(password, userExists.user_password)
    if (!validPassword) return res.status(401).json('Email or password is incorrect.')

    const token = jwtGenerator(userExists.user_id)
    res.json({ token })
  } catch (error) {
    console.error(error.message)
    res.send(error.message)
  }
})

router.get('/verify', authorization, async (req, res) => {
  try {
    res.json(req.user)
  } catch (error) {
    console.error(error.message)
    res.send(error.message)
  }
})

export default router
