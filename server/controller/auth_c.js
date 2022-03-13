import * as authRepository from '../data/auth_d.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {} from 'express-async-errors'

const jwtSecretKey = 'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z'
const jwtExpiresInDays = '2d'
const bcryptSaltRounds = 12

export async function signup(req, res) {
  const { username, password, name, eamil, url } = req.body
  const found = await authRepository.findByUsername(username)
  if (found) {
    return res.status(409).json({ message: `${username} already exists` })
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds)
  const userId = await authRepository.signupUser({
    username,
    password: hashed,
    name,
    eamil,
    url,
  })

  const token = createJwtToken(userId)
  res.status(201).json({ token, username })
}

export async function login(req, res) {
  const { username, password } = req.body
  const user = await authRepository.findByUsername(username)
  if (!user) {
    return res.status(401).json({ message: `Invalid user or pw` })
  }
  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or pw' })
  }
  const token = createJwtToken(user.id)
  res.status(200).json({ token, username })
}

export async function me(req, res, next) {
  console.log(req)
  const user = await authRepository.findById(req.userId)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.status(200).json({ token: req.token, username: user.username })
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays })
}
