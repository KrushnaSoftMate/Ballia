const mysql=require('mysql2')

const connection=mysql.createConnection({
    port:process.env.DBPORT,
    host:process.env.DBHOST,
    password:process.env.DBPASSWORD,
    database:process.env.DBDB,
    user:process.env.DBUSER
})

module.exports=connection