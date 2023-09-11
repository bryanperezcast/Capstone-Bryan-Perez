const { response } = require("express")
const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    password: "cole4132",
    host: "localhost",
    port: 5432
})

pool.query("CREATE DATABASE login_page;").then((Response) => {
    console.log("Database created")
    console.log(response)
})
.catch((err) => {
    console.log(err);
})

module.exports = pool