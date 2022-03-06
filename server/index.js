import express from 'express'
import tweetsRouter from './router/tweets.js'
import authRouter from './router/auth.js'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import 'express-async-errors'

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(helmet())

app.use('/tweets', tweetsRouter) // router 연결은 use를 사용해야함
// app.use('/auth', authRouter)
app.use((req, res, next) => {
  res.sendStatus(404)
})
app.use((error, req, res, next) => {
  console.error(error)
  res.status(500).json({ message: 'something went wrong' })
})
app.listen(8080)
