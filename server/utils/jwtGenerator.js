import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export const jwtGenerator = user_id => {
  const payload = { user: user_id }

  jwt.sign(payload, process.env.jwtsecret, { expiresIn: '1hr' })
}
