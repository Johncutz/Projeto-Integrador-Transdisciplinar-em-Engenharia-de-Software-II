// lib/db.js
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgresql://postgres:123456@localhost:5432/cupcake_store",
});

module.exports = pool;
