const User = require('../../models/User')

const userCreate = async () => {
    await User.create({
        firstName: 'Claudia',
        lastName: 'Rivas',
        email: 'test@test.com',
        password: 'test1',
        phone: '+18098098091'
    })
}

module.exports = userCreate