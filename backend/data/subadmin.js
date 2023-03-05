const bcrypt = require('bcryptjs')

const subadmin = [
  {
    name: 'SubAdmin User',
    email: 'subadmin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
]

module.exports = subadmin
