import pkg from 'pg'

const { Pool } = pkg

export const pool = new Pool({
  user: 'postgres',
  password: '',
  host: 'localhost',
  database: 'pernstack',
  port: 5432
})
