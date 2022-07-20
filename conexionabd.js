const mysql = require ('mysql');
const conexion = mysql.createConnection({
    host:'localhost',
    database:'casaseguridad',
    user:'root',
    password:''
});

 
conexion.connect((error)=>{
 if(error){
    console.error('el error es:' +error);
    return
 }
    console.log('Conexion exitosa');

})



module.exports = conexion;