import express from 'express'
import mongoose from 'mongoose'
import { jwt } from './auth/authMiddleware'
import usersRouter from './users/UsersController'
import authRouter from './auth/authController'
import dotenv from 'dotenv'
import errorHandler from './error/errorsMiddleware'

dotenv.config()

mongoose.connect('mongodb://anon:marbleCake@localhost:27017/my_db')

const app = express()

app.use(express.json())
app.use(jwt())
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/users', usersRouter)
app.use('/auth', authRouter)

app.listen(3000, () => {
  console.log('Server is running')
})
