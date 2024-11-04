const mysql = require("mysql2");
const connection = mysql.createConnection ({

host: "localhost",
port: 3311,
user: "root",
password: "1234",
database: "proyectoF"

});

connection.connect((error) =>{

    if(error){
        console.log("error conectando con la base de datos",error);
        return
    }else{
        console.log("conectado a la base de datos");
    }
});

module.exports = connection;