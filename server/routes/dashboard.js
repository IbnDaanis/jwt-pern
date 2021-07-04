import { Router } from 'express'
import { pool } from '../database/database.js'
import { authorization } from '../middleware/authorization.js'

const router = Router()

router.get('/', authorization, (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

export default router
