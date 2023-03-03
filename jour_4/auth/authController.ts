import { Router } from 'express'
import { comparePassword } from '../services/hashService'
import { User, removePassword } from '../users/User'
import { generateToken } from './authService'
import type LoginDTO from './dtos/loginDTO'
import { loginSchema } from './dtos/loginDTO'

const router = Router()

router.post('/login', async (req, res) => {
  const { error } = loginSchema.validate(req.body)
  if (error != null) {
    return res.status(400).json({ error: error.message })
  }
  const loginDTO = req.body as LoginDTO

  const user = await User.findOne({ email: loginDTO.email })
  if ((user == null) || !comparePassword(loginDTO.password, user?.password)) {
    return res.status(400).json({ error: 'Invalid credentials' })
  }

  const userWithToken = generateToken(user.toObject())
  res.status(200).json(removePassword(userWithToken))
})

export default router
