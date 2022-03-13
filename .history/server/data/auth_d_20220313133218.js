let users = [
    {
        id : 'taewook',
        password : '123123',
        name : 'taewook',
        email : 'taewook@naver.com',
        url : ''
    },
    {
        id : 'sam',
        password : '123123',
        name : 'sam',
        email : 'sam@naver.com',
        url : ''
    },

]

export async function login(id , password) {
    const foundUser = users.find(user => user.id === id && user.password === password)
    return foundUser
}