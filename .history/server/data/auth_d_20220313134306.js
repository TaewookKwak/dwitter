let users = [
  {
    username: 'taewook',
    password: '123123',
    name: 'taewook',
    email: 'taewook@naver.com',
    url: '',
  },
  {
    username: 'sam',
    password: '123123',
    name: 'sam',
    email: 'sam@naver.com',
    url: '',
  },
]

export async function login(username, password) {
  const foundUser = users.find(
    (user) => user.username === username && user.password === password,
  )
  return foundUser
}
