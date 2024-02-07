fetch(`local.php`, {
    method: "POST",
    body: "",
  })
    .then((respuesta) => 
      respuesta.json() //Se convierte en formato json y la volvemos a enviar
    )
    .then((respuesta) => {
      let [estado, msj] = respuesta
      if(estado == 1){
        console.log(msj);
      }else{
        console.error("Se produjo un error");
      }
    }).catch((error) => {
      console.log(error)
    });
  