import * as authRepository from '../data/auth_d.js'

export async function login(req, res, next) {
  const { username, password } = req.body
  const login = await authRepository.login(username, password)
  if (login) {
    res.status(200).json(login)
  } else {
    res.status(404).json({ message: `username or password arr not found` })
  }
}
