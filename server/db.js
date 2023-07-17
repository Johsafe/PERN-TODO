var Pool = require('pg').Pool
const pool =new Pool({
    user:'postgres',
    password:'johsafe',
    host:'0.0.0.0', //"local host"
    port:5432,
    database:'todobd'//database name 
})
module.exports =pool