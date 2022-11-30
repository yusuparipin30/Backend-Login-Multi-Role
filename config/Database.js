//1. import sequelize
import {Sequelize} from "sequelize";

//2.membuat function untuk database
const db = new Sequelize('auth_db','root','',{
    host: "localhost",
    dialect: "mysql"
});

//3. export variablenya
export default db;