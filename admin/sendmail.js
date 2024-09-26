var resultPass = "";
function enviar(){
var varuser = document.getElementById("usuario").value;
var varnombre = document.getElementById("nombre").value;
var varcorreo = document.getElementById("correo").value;
var varestado =  document.getElementById("estado").value;
var vartipo =  document.getElementById("tipo").value;
//var varmunicipio =  document.getElementById("municipio").value;

if(varuser.length == 0 || varnombre == 0 || varcorreo == 0){
    if(varuser.length == 0){
        //alert("Por favor diligencie el campo Usuario");
        Swal.fire({
            title: 'Por favor diligencie el campo Usuario',
            text: 'Este es un campo obligatorio',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          });
    }
    else if(varnombre == 0){
        //alert("Por favor diligencie el campo Nombre");
        Swal.fire({
            title: 'Por favor diligencie el campo Nombre',
            text: 'Este es un campo obligatorio',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          });
    }
    else if(varcorreo == 0){
        //alert("Por favor diligencie el campo Correo");
        Swal.fire({
            title: 'Por favor diligencie el campo Correo',
            text: 'Este es un campo obligatorio',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          });
    }
}
else{
    var passw = "";
    var vid = "";
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 8; i++ ) {
        passw += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   var varcontrasena = hex_md5(passw);
   for ( var i = 0; i < 14; i++ ) {
    vid += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  var varid = "fid-" + vid;

  // Llama a la función y maneja la respuesta (por ejemplo, en consola)
generateSecurePassword().then(result => {
    resultPass = result;
    //console.log('Password:', result.password);
    //console.log('Hashed:', result.hash);
}).catch(console.error);

 //console.log(resultPass);
  //console.log(varnombre, varcorreo, varuser, varcontrasena, varestado, varid, vartipo);
 /* update_query("insert into usuario(nombre, email, usuario, contrasena, estado, id, tipo) values ('"+varnombre+"', '"+varcorreo+"', '"+varuser+"', '"+varcontrasena+"', '"+varestado+"', '"+varid+"', '"+vartipo+"')");
 
  var data = {
    service_id: 'service_vuzereu',
    template_id: 'template_6l9nwuc',
    user_id: 'l9UJ5zeZStmGcpF_k',
    template_params: {
        'nombre': varnombre,
        'usuario': varuser,
        'contras': passw,
        'municipio': 'Buenaventura',
        'correo': varcorreo
  }
};
      $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json'
      }).done(function() {
      alert('Se ha enviado el usuario y contraseña al correo electronico ingresado');
      location.reload();
      }).fail(function(error) {
      alert('No fue posible enviar el correo electrónico, Por favor verifique que el campo correo electrónico se encuentre bien diligenciado, error: ' + JSON.stringify(error));
      });   */
 }
}

function alertDGC(mensaje) {
    var dgcTiempo = 500;
    var ventanaCS = '<div class="dgcAlert"><div class="dgcVentana"><div class="dgcCerrar"></div><div class="dgcMensaje">' + mensaje + '<br><div class="dgcAceptar">Aceptar</div></div></div></div></div>';
    $('body').append(ventanaCS);
    var alVentana = $('.dgcVentana').height();
    var alNav = $(window).height();
    var supNav = $(window).scrollTop();
    $('.dgcAlert').css('height', $(document).height());
    $('.dgcVentana').css('top', ((alNav - alVentana) / 2 + supNav - 100) + 'px');
    $('.dgcAlert').css('display', 'block');
    $('.dgcAlert').animate({opacity: 1}, dgcTiempo);
    $('.dgcCerrar,.dgcAceptar, .dgcCerrar2').click(function (e) {
        $('.dgcAlert').animate({opacity: 0}, dgcTiempo);
        setTimeout("$('.dgcAlert').remove()", dgcTiempo);
    });
}
window.alert = function (message) {
    alertDGC(message);
};

//function generateSecurePassword() {
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('generateSecurePassword').addEventListener('click', function(event) {
    var passw = "";
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
        passw += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    var bcrypt = dcodeIO.bcrypt;
    var salt = bcrypt.genSaltSync(12); // 10 es el número de rondas de salting
    var hash = bcrypt.hashSync(passw, salt);
    var vid = "";
    for (var i = 0; i < 14; i++) {
        vid += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    var varid = "fid-" + vid;  
    var varcontrasena = hash; 
    var varuser = document.getElementById("usuario").value;
    var varnombre = document.getElementById("nombre").value;
    var varcorreo = document.getElementById("correo").value;
    var varestado = document.getElementById("estado").value;
    var vartipo = document.getElementById("tipo").value;
    if (varuser.length == 0 || varnombre == 0 || varcorreo == 0) {
        if (varuser.length == 0) {
            
            Swal.fire({
                title: 'Por favor diligencie el campo Usuario',
                text: 'Este es un campo obligatorio',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        }
        else if (varnombre == 0) {
            
            Swal.fire({
                title: 'Por favor diligencie el campo Nombre',
                text: 'Este es un campo obligatorio',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        }
        else if (varcorreo == 0) {
            
            Swal.fire({
                title: 'Por favor diligencie el campo Correo',
                text: 'Este es un campo obligatorio',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        }
    }
    else {     
        var vid = "";
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;    
        for (var i = 0; i < 14; i++) {
            vid += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        var varid = "fid-" + vid;
        update_query("insert into usuario(nombre, email, usuario, contrasena, estado, id, tipo) values ('" + varnombre + "', '" + varcorreo + "', '" + varuser + "', '" + varcontrasena + "', '" + varestado + "', '" + varid + "', '" + vartipo + "')");
        /*var data = {
            service_id: 'service_vuzereu',
            template_id: 'template_6l9nwuc',
            user_id: 'l9UJ5zeZStmGcpF_k',
            template_params: {
                'nombre': varnombre,
                'usuario': varuser,
                'contras': passw,
                'municipio': 'Buenaventura',
                'correo': varcorreo
            }
        };
        $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json'
        }).done(function () {
            alert('Se ha enviado el usuario y contraseña al correo electronico ingresado');
            location.reload();
        }).fail(function (error) {
            alert('No fue posible enviar el correo electrónico, Por favor verifique que el campo correo electrónico se encuentre bien diligenciado, error: ' + JSON.stringify(error));
        });*/
        let htmlContent = `<p style="font-size: 14px; color: #000000">Hola <b>${varnombre}</b></p><p style="font-size: 14px; color: #000000">Se ha creado un usuario y contraseña para el ingreso al WebGis Buenaventura, sus credenciales de acceso son:</p><p style="font-size: 14px; color: #000000">Usuario: <a style="font-size: 14px; color: #000066;"><b> ${varuser}</b></a></p><p style="font-size: 14px; color: #000000">Contraseña: <a style="font-size: 14px; color: #000066;"><b>${passw}</b></a></p><p style="font-size: 14px; color: #000000">Desde el visor geográfico podra realizar el cambio de contraseña si así lo desea.</p><p><a style="font-size: 14px; color: #000000">el link de acceso es: </a>webgis-buenaventura.com</p>`;  
        fetch('https://us-central1-risaralda-324519.cloudfunctions.net/send_email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ from: "soportewebgis@gmail.com", to: varcorreo, subject: "Bienvenido a la Plataforma WebGis Buenaventura", text: htmlContent, isHtml: true})
          })
            .then(response => response.text()).then(data => {
                Swal.fire({
                    title: 'El nuevo usuario fue creado exitosamente y las credenciales de acceso se enviaron al correo electrónico:',
                    text: '' + varcorreo + '',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
                });
            }).catch(error => {
              Swal.fire({
                title: 'No se pudo enviar el correo electrónico a:',
                text: '' + varcorreo + '',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
              }); 
            }); 
    }
});
});
//}


