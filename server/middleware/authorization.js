import jwt from 'jsonwebtoken'

const authorization = async (req, res, next) => {
  try {
    const jwtToken = req.header('token')

    if (!jwtToken) return res.status(403).json('Not authorized.')

    const payload = jwt.verify(jwtToken, process.env.jwtsecret)

    req.user = payload.user
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(403).json('Not authorized.')
  }
}
