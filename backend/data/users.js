import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Prasad',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin@123', 10),
    isAdmin: true,
  },
  {
    name: 'Jhon Doe',
    email: 'jhon@example.com',
    password: bcrypt.hashSync('jhon@123', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('jane@123', 10),
  },
]

export default users
