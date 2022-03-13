let users = [
  {
    id: '1',
    username: 'taewook',
    password: '$2a$12$Nb0G3B13w2lPL.RE/u/CZuhjvHae7h4xOAXR5dgzRErCt.JFtQKdC',
    name: 'taewook',
    email: 'taewook@naver.com',
    url: '',
  },
]

export async function findByUsername(username) {
  return users.find((user) => user.username === username)
}

export async function findById(id) {
  return users.find((user) => user.id === id)
}

export async function signupUser(user) {
  const NewUser = {
    ...user,
    id: Date.now().toString(),
  }

  users.push(NewUser)
  return NewUser.id
}
