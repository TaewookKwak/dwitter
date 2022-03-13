import * as authRepository from '../data/auth_d.js'

export async function login(req, res, next) {
  const { id, password } = req.body
  const login = await authRepository.login(id, password)
  if (login) {
    res.status(200).json(login)
  } else {
    res.status(404).json({ message: `id or password arr not found` })
  }
}
