//function resetpass(){
document.getElementById('save').addEventListener('click', function (event) {
    var valorinp = document.getElementById("email").value;
    var validemail = select_query("select * from usuario where email = '"+valorinp+"'");
    if(validemail == null) {
        alert("El correo electrónico ingresado no se encuentra en la base de datos, por favor verifique que este diligenciado correctamente");
    }
    else{
        var passw = "";
        var varnombre = validemail[0][0];
        var varuser = validemail[0][2];
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 8; i++ ) {
            passw += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        var bcrypt = dcodeIO.bcrypt;
        var salt = bcrypt.genSaltSync(12); // 10 es el número de rondas de salting
        var hash = bcrypt.hashSync(passw, salt);
        
        update_query("update usuario set contrasena = '"+hash+"' where email = '"+valorinp+"'");
        let htmlContent = `<p style="font-size: 14px; color: #000000">Hola <b>${varnombre}</b></p><p style="font-size: 14px; color: #000000">Su contraseña ha sido reestablecida y sus nuevas credenciales para acceder a la plataforma WebGis Buenaventura son:</p><p style="font-size: 14px; color: #000000">Usuario: <a style="font-size: 14px; color: #000066;"><b> ${varuser}</b></a></p><p style="font-size: 14px; color: #000000">Contraseña: <a style="font-size: 14px; color: #000066;"><b>${passw}</b></a></p><p><a style="font-size: 14px; color: #000000">el link de acceso es: </a>webgis-buenaventura.com</p>`;  
        fetch('https://us-central1-risaralda-324519.cloudfunctions.net/send_email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ from: "soportewebgis@gmail.com", to: validemail[0][1], subject: "Cambio de Contraseña en plataforma WebGis Buenaventura", text: htmlContent, isHtml: true})
          })
            .then(response => response.text()).then(data => {
                Swal.fire({
                    title: 'La contraseña se reestablecio y se envio al correo electrónico:',
                    html: '<div style="text-align: center;" class="roboto-medium">' + validemail[0][1] + '</div>',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                  }); 
            }).catch(error => {
              Swal.fire({
                title: 'No se pudo enviar el correo electrónico a:',
                text: '' + validemail[0][1] + '',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
              }); 
            }); 

            $('#recovery').modal('hide');

       /*var varcontrasena = hex_md5(passw);
       update_query("update usuario set contrasena = '"+varcontrasena+"' where email = '"+valorinp+"'");
       var data = {
        service_id: 'service_vuzereu',
        template_id: 'template_47zc87w',
        user_id: 'l9UJ5zeZStmGcpF_k',
        template_params: {
            'nombre': varnombre,
            'usuario': varuser,
            'contras': passw,
            'correo': valorinp
      }
    };
    
          $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
          type: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json'
          }).done(function() {
          alert('Se ha enviado la nueva contraseña al correo electronico ingresado');
          location.reload();
          }).fail(function(error) {
          alert('No fue posible enviar el correo electrónico, Por favor verifique que el campo correo electrónico se encuentre bien diligenciado, error: ' + JSON.stringify(error));
          });*/   
        }
    });
