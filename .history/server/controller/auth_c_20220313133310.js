import * as authRepository from '../data/auth_d.js'

export async function login(req, res) {
  const { id, password } = req.body
  const login = await authRepository.login(id, password)
}
