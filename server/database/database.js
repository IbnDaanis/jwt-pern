import pkg from 'pg'

const { Pool } = pkg

export const pool = new Pool({
  user: 'postgres',
  password: '',
  host: 'localhost',
  database: 'authtodolist',
  port: 5432
})
