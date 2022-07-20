const express = require('express');
const webpush = require('web-push');
const servidor = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const conexion = require('./conexionabd');
//const sensores = require('./sensores');
servidor.use(cors());

servidor.listen(5000);
const vapidKeys = {
    "publicKey": "BOMsLjNBI5uD1hVvgmdIxDNOCLJXVYO7wlSGAshMqSbup8cn1iQ1M204DEHKPuAZfKrYAEtP9fzyrtLraIkxYoo",
    "privateKey": "mblRijpn-BeGB1MvlyxozinucyJIHE_QeKdvQnhFCpY"
}

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const enviarNotificacion = (req, res) => {

    const pushSubscription = {
        endpoint: 'https://wns2-bl2p.notify.windows.com/w/?token=BQYAAABtShiwt7vBf6EZnAq5hElt6R8Up1JEhp7%2fRdEf5X6xYJGEFDigXsyhbMmyIBCqIhvjk4S9%2bY8K%2f3Gt5ZoI%2f2lIbjfzMTurZde6hnSFjdrfM1b%2bqNJYiqGwQqqxYEC2jAumc13IHBnO0N3gK7EDUuc6XbnZVPnuxosqFDAuk6tGY6%2fbFXfFVKCnLgxMQV7XPLGJdzIXNalB%2b2CEX2PzchP2UjmTQma2WBN98oYVXtbCkjg1n95gnhu2i2wPog3mAR%2fgrJiHT3R6K30QNgJqqMOPlmYE8t4yy8ZtOtbRfB3B5Tm%2f0FSVsbIWETK80PuZtClvZ0jGtXD2FLwwjey67Olx',
        keys: {
            auth: 'Ke_7eokgZ2e2EklBj6r1Tw',
            p256dh: 'BAb6H-J2iY69sb0Qu9yX5l5Fejq-Udw-tPKO7Xlst9ol9jVWhlBiTHV5TIyxXnH9mNuLHXmh2HYstrT3O9Y9d4g'
        }
    };
    
    const payload = {
        "notification": {
            "title": "Alerta de intruso",
            "body": "Se ha detectado movimiento ",
            "vibrate": [100, 50, 100],
            //"image": "https://previews.123rf.com/images/captainvector/captainvector2204/captainvector220479845/185306401-red-flash-light-siren.jpg",
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    }

    webpush.sendNotification(
        pushSubscription,
        JSON.stringify(payload))
        .then(res => {
            console.log('Enviado !!');
        }).catch(err => {
            console.log('Error', err);
        })

    res.send({ data: 'Se envio subscribete!!' })

}
servidor.route('/alerta').post(enviarNotificacion);

// entrega la coleccion de usuarios
servidor.get('/usuarios',(req,res)=>{
    conexion.query('select * from usuarios', (error, reslults)=>{
        if(error){
            console.log(error);
        }else{
            res.status(200).send(reslults);
        }
  
    })
  });

  servidor.get('/sensores',(req,res)=>{
    conexion.query('select * from sensores', (error, reslults)=>{
        if(error){
            console.log(error);
        }else{
            res.status(200).send(reslults);
        }
  
    })
  });

  servidor.get('/bitacora',(req,res)=>{
    conexion.query('select * from bitacora', (error, reslults)=>{
        if(error){
            console.log(error);
        }else{
            res.status(200).send(reslults);
        }
  
    })
  });



//entrega un recurso en especifico mediante el id
servidor.get('/usuarios/:id',(req,res)=>{
    
const idusuario = req.params.id;

function isEmptyObject(obj){
    return JSON.stringify(obj) === '[]';
}

conexion.query('select * from usuarios where id='+ idusuario,(error,result)=>{
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
//get de camara
servidor.get('/camara/:id',(req,res)=>{
    
    const idcamara = req.params.id;
    
    function isEmptyObject(obj){
        return JSON.stringify(obj) === '[]';
    }
    
    conexion.query('select * from camara where id='+ idcamara,(error,result)=>{
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

  
    servidor.patch('/camara/1', express.json({type: '*/*'}),(req,res)=>{
    
        //recibe el id del estudiante a borrar.
            const idcamara = req.body.ip;
            const consultav= '"'+idcamara+'")';
            //UPDATE `camara` SET `id`='[1]',`ip`='[192.1568.156.156]' WHERE 1
            conexion.query('update camara set id= 1 ,ip= ('+consultav,(error,reslults)=>{
                if (error) {
                    console.error(error);
                    console.error(consulta);
                    
                }else{
                    console.log("ip de camara actualizada");
                    console.log(reslults);
                    console.log(conexion.query);
        
                }
              
                res.status(201).json({"mensaje":"se actualizo la ip de la camara"});
                res.end();
      
        
        
        
        })
    });

servidor.post('/usuarios/',express.json({type:'*/*'}), (req, res) => {
    
    
        
      var Nombre= req.body.Nombre;
      var Usuario= req.body.Usuario;
      var Contrasena=req.body.Contrasena;

      const consulta= '"'+Nombre+'","'+Usuario+'","'+Contrasena+'")';





    conexion.query('insert into usuarios(Nombre, Usuario,Contrasena) values ('+consulta,(error,reslults)=>{
        if (error) {
            console.error(error);
            console.error(consulta);
            
        }else{
            console.log("1 USUARIO insertado");
            console.log(reslults);
            console.log(conexion.query);

        }
      
        res.status(201).json({"mensaje":"se agrego un nuevo recurso a la coleccion usuarios"});
        res.end();

    
    });
    
     });
  

//BORRAR UN RECURSO
servidor.delete('/usuarios/:id',(req,res)=>{

    idusuario=req.params.id;

    function isEmptyObject(obj){
        return JSON.stringify(obj) === '[]';
    }

    conexion.query('select * from usuarios where id='+ idusuario,(error,result)=>{
        if(error){
            console.log(error);
        }else{
           if (isEmptyObject(result)=== true){
            console.log(isEmptyObject(result));
            res.status(404).json({"mensaje":"id no existe en la base de datos"});
    
           }else{
            conexion.query('delete from usuarios where id ='+idusuario,(error,result)=>{

    
                if (error) {
                    console.error(error);
                    return
                }       
                console.log("usuario eliminado");
                console.log("Number of records deleted: " + result.affectedRows); 
                res.status(200).json({"mensaje":"se elimino un recurso a la coleccion usuarios con el id: "+ idusuario});
        
            res.end();
            });
            
           }
       
        }
       
    })

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

    
});

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
    
    servidor.get('/bicacora/:id',(req,res)=>{
    
        const idbitacora = req.params.id;
        
        function isEmptyObject(obj){
            return JSON.stringify(obj) === '[]';
        }
        
        conexion.query('select * from bitacora where id='+ idbitacora,(error,result)=>{
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
    