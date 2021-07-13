import { Router } from 'express'
import { pool } from '../database/database.js'
import { authorization } from '../middleware/authorization.js'

const router = Router()

router.get('/', authorization, async (req, res) => {
  try {
    const user = (await pool.query('SELECT user_name FROM users where user_id = $1', [req.user.id]))
      .rows[0]
    res.status(200).json(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

export default router
