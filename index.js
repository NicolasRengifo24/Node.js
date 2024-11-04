const express = require("express");
const connection = require("./db");
const app = express();

//encargado de parsear a los json
app.use(express.json());


//ruta de prueba

app.get(`/api/prueba`, (req,res)=>{
res.send(`api funcionando correctamente`)
});


app.get(`/api/prueba1`, (req,res)=>{
    res.status(200).json({
        message : `la api responde correctamente`,
        port: PORT,
        status: `success`

    })
    
});


//API CREAR REGISTRO 

app.post("/api/guardar",(req,res) =>{
    const {nombre,edad,cedula,profesion} = req.body;
    const query = "INSERT INTO persona(nombre,edad,cedula,profesion) values (?,?,?,?)";
    connection.query(query,[nombre,edad,cedula,profesion], (error,result)=>{
        

    if(error){
        res.status(500).json({error});
        
    }else{
        res.status(201).json({cedula: result.insertid,nombre,edad,cedula,profesion});
        }
    });
});

//Api para retornar registros en la b.d

app.get("/api/obtener",(req,res) =>{

    const query = "SELECT * FROM persona"
    connection.query(query,(error,result)=>{
        if(error){
            res.status(500).json({
                status : false,
                message : "error al recuperar los datos",
                details: error.message

            });

        }else{
            res.status(200).json({
                status : true,
                message : "Datos de la tabla",
                data: result

            });
        }
    });
});


//api para eliminar registro de la b.d

app.delete("/api/eliminar/:cedula",(req,res) =>{
    const {cedula} = req.params;
    const query = "DELETE FROM persona WHERE cedula = ?";
    connection.query(query,[cedula],(error,result)=>{

        if(error){
            res.status(500).json({
            status : false,
            message : "error al eliminar los datos",
            details: error.message

        });
        }else if (result.affectedRows === 0) {

            res.status(404).json({
                status : false,
                message : `No exixte el registro ${cedula}`
                
            });


        }else{
            res.status(200).json({
                status : true,
                message : "Datos de la tabla",
                data: result
            
        });
        }
    });
});


//API PARA ACTUALIZAR REGISTROS

app.put("/api/actualizar/:cedula",(req,res) =>{
    const {cedula} = req.params;
    const {nombre,edad,profesion} = req.body;
    const query = `
    UPDATE persona 
    SET nombre=?,
    edad=?,
    profesion=? 
    WHERE cedula = ?`;
    const values = [nombre, edad, profesion,cedula];
    connection.query(query,values,(error,result)=>{
        
        if(error){
            res.status(500).json({
            status : false,
            message : "error al Actualizar los datos",
            details: error.message

        });
        }else{
            res.status(200).json({
                status : true,
                message : "Datos Actualizados",
                data: result
            
            });
        }
    });
});











//puerto de conexion del servidor
const PORT = 3000;

app.listen(PORT,()=>{
    console.log("servidor corriendo");
});