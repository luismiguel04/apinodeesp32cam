const express = require('express');
const servidor = express();



  // entrega la colección de sensores
servidor.get('/sensores',(req,res)=>{
    conexion.query('select * from sensores', (error, reslults)=>{
        if(error){
            console.log(error);
        }else{
            res.status(200).send(reslults);
        }
  
    })
  });



//entrega un recurso en especifico mediante el id
servidor.get('/sensores/:id',(req,res)=>{
    
const idsensor = req.params.id;

function isEmptyObject(obj){
    return JSON.stringify(obj) === '[]';
}

conexion.query('select * from sensores where id='+ idsensor,(error,result)=>{
    if(error){
        console.log(error);
    }else{
       if (isEmptyObject(result)=== true){
        console.log(isEmptyObject(result));
        res.status(404).json({"mensaje":"id no existe en la base de datos"});

       }else{
        res.status(200).send(result);

       }
   
    }
   
})
    
});

servidor.post('/sensores/',express.json({type:'*/*'}), (req, res) => {
    
    
        
      var Numser= req.body.Numser;
      var Lugar= req.body.Lugar;
      var Modelo=req.body.Modelo;
      var Capacidad=req.body.Capacidad;

      const consulta= '"'+Numser+'","'+Lugar+'","'+Modelo+'","'+Capacidad+'")';





    conexion.query('insert into sensores(Numser,Lugar,Modelo,Capacidad) values ('+consulta,(error,reslults)=>{
        if (error) {
            console.error(error);
            console.error(consulta);
            
        }else{
            console.log("1 sensor insertado");
            console.log(reslults);
            console.log(conexion.query);

        }
      
        res.status(201).json({"mensaje":"se agrego un nuevo recurso a la coleccion sensores"});
        res.end();

    
    });
    
     });
  

//BORRAR UN RECURSO
servidor.delete('/sensores/:id',(req,res)=>{

    idsensor=req.params.id;

    function isEmptyObject(obj){
        return JSON.stringify(obj) === '[]';
    }

    conexion.query('select * from sensores where id='+ idusuario,(error,result)=>{
        if(error){
            console.log(error);
        }else{
           if (isEmptyObject(result)=== true){
            console.log(isEmptyObject(result));
            res.status(404).json({"mensaje":"id no existe en la base de datos"});
    
           }else{
            conexion.query('delete from sensores where id ='+idsensor,(error,result)=>{

    
                if (error) {
                    console.error(error);
                    return
                }       
                console.log("sensor eliminado");
                console.log("Number of records deleted: " + result.affectedRows); 
                res.status(200).json({"mensaje":"se elimino un recurso a la coleccion sensor con el id: "+ idsensor});
        
            res.end();
            });
            
           }
       
        }
       
    })

    
});

module.exports.sensores;