export default class AuthService {
  constructor(http, tokenStorange) {
    this.http = http
    this.tokenStorange = tokenStorange
  }

  async signup(username, password, name, email, url) {
    const data = await this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        url,
      }),
    })
    this.tokenStorange.saveToken(data.token)
    return data
  }

  async login(username, password) {
    const data = await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    this.tokenStorange.saveToken(data.token)
    return data
  }

  async me() {
    const token = this.tokenStorange.getToken()
    return this.http.fetch('/auth/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async logout() {
    this.tokenStorange.clearToken()
  }
}
