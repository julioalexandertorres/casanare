//longgiro = 3;
var fotopan2 = "";
    function panorama1(foto){
    //console.log(foto);
    document.getElementById('container3').innerHTML='';
      PSV = new PhotoSphereViewer({
      //panorama: 'http://34.121.137.69/PanosRisaralda/' + foto + '.jpg',
      //panorama: '../../panoramas/' + foto + '.jpg',
      panorama: 'https://storage.googleapis.com/panosbuenaventura/Imagenes_final/' + foto + '.jpg',
      container: container3,
      default_fov: 179,
      default_lat: 0.4,
      default_long: 6.22,
      time_anim: 3000,
      foto: foto,
      //touchmove_two_fingers: true,
     // navbar: true,  
      
    navbar: [
    'autorotate',
    'zoom',
    //'markers',
    'download',
    'fullscreen',
    //'caption',
    {
      id: 'medirfoto',
      title: 'Medir',
      className: 'medir-button',    
      //content: 'Medir',
      onClick: function() {
      document.getElementsByClassName("medir-button-vert")[0].classList[3] = '';
      medirfoto("horizontal");
      },   
    },
    {
      id: 'medirfotovert',
      title: 'Medir Vertical',
      className: 'medir-button-vert',    
      //content: 'Medir',
      onClick: function() {
      document.getElementsByClassName("medir-button")[0].classList[3] = '';
      medirfoto("vertical");
      },   
    },
    //'caption',  
  ],
          
navbar2: [
    'autorotate',
    'zoom',
    //'caption',  
  ],          
        
      mousemove: true,
      navbar_style: {
      backgroundColor: 'rgba(58, 67, 77, 0.7)'                        },
      //loading_img: 'http://tassedecafe.org/wp-content/uploads/2013/01/parc-saint-pierre-amiens.jpg',
      time_anim: false,
      //caption: 'Bryce Canyon National Park <b>&copy; Mark Doliner</b>',
      //mousewheel: false,
      touchmove_two_fingers: true,
  /*size: {
    height: 10
  },*/

  // list of markers     
 /* markers: [

 
    
  ]*/
         
});
        
//console.log(PSV);

var photosphereG = PSV.loader.psv.config.foto;
fotopan2 = select_query("select panoramas, longitud, latitud, heading, coordx, coordy, geom FROM buenaventura360.buenaventura_360 where panoramas = '"+foto+"'");
//fotopan2 = select_query("select panoramas, longitud, latitud, heading, coordx, coordy, geom FROM buenaventura360.copybuenaventura_360 where panoramas = '"+foto+"'");
//console.log(fotopan2);
var resx = fotopan2[0][2];
var resx = resx;//- 12;
//var resx = resx * (-1);
var resy = fotopan2[0][3];
var resy = resy; //- 15;
res = [resx, resy];
        
/**
 * Create a new marker when the user clicks somewhere
 */
PSV.on('click', function(e) {
	var checkBoxmedir = document.getElementById("activarmedirfotos");
	if (checkBoxmedir.checked == false) {
        PSV.removeMarker(marker);
  /* PSV.addMarker({
    id: '#' + Math.random(),
    longitude: e.longitude,
    latitude: e.latitude,*/
    /*image: 'http://localhost/DemoNeiva/imagenes/letrero.png',
    width: 62,
    height: 62,
    anchor: 'bottom center',
    mousewheel: true,*/
 /*   circle: 5,
    svgStyle: {
    fill       : 'rgba(0, 0, 0, 0.5)',
    stroke     : '#ff0000',
    strokeWidth: '2px'
},
    tooltip: '',
    data: {
      generated: true
    }
  });*/
   
 //console.log(e);
 //console.log(e.longitude);
 //console.log(e);
 //console.log(PSV.marker);
    //mapviewer(foto, e);
    }
else{
  if(botonsent=='horizontal'){
   PSV.addMarker({ 
    id: '#' + Math.random(),
    longitude: e.longitude,
    latitude: e.latitude,
    /*image: 'http://localhost/DemoNeiva/imagenes/letrero.png',
    width: 62,
    height: 62,
    anchor: 'bottom center',
    mousewheel: true,*/
    circle: 5,
    svgStyle: {
    fill       : 'rgba(1, 0, 0, 0.5)',
    stroke     : '#1FD537',
    strokeWidth: '2px'
    },
    tooltip: '',
    data: {
      generated: true
    }
  });
}
    
 else{ 
    PSV.addMarker({ 
    id: '#' + Math.random(),
    longitude: e.longitude,
    latitude: e.latitude,
    /*image: 'http://localhost/DemoNeiva/imagenes/letrero.png',
    width: 62,
    height: 62,
    anchor: 'bottom center',
    mousewheel: true,*/
    circle: 5,
    svgStyle: {
    fill       : 'rgba(1, 0, 0, 0.5)',
    stroke     : '#ffb732',
    strokeWidth: '2px'
    },
    tooltip: '',
    data: {
      generated: true
    }
  });    
}    
    
    if(document.getElementsByClassName("medir-button")[0].classList[3]== 'psv-button--active'){
        //document.getElementsByClassName("medir-button-vert")[0].classList[3] = '';
        medirfotografias(e);
    }
    if(document.getElementsByClassName("medir-button-vert")[0].classList[3]== 'psv-button--active'){
        //document.getElementsByClassName("medir-button")[0].classList[3] = '';
        medirfotografiasv(e);
    }
}   
   
    
});


PSV.on('position-updated', function(e) {
	var giro = e.longitude;
	giropsv(giro);
});



/**
 * Delete a generated marker when the user clicks on it
 */
PSV.on('select-marker', function(marker) {
     
  if (marker.data && marker.data.generated) {
    PSV.removeMarker(marker);
  }

	if(marker.id === 'flecha'){
 		  var fotoact = PSV.config.foto;
         // console.log(fotoact);
 		  var fotoact = search2("paicol:buscar_foto_s", fotoact);
         // console.log(fotoact);
 		  var fotoact = (fotoact[0][1])-1;
         // console.log(fotoact);
		  var fotoact = search2("paicol:buscar_foto_consecutivo_s", fotoact);
        //  console.log(fotoact);
		  var fotoact = fotoact[0][0];
         // console.log(fotoact);
		  PSV.config.foto = fotoact;
 		  PSV.setPanorama('../../panoramas/' + fotoact + '.jpg', null, true);
 		  actlin(fotoact); 
 		}  
    
    if(marker.id === 'flecha_atras'){
 		  var fotoact = PSV.config.foto;
         // console.log(fotoact);
 		  var fotoact = search("soacha:buscar_foto_s", fotoact);
         // console.log(fotoact);
 		  var fotoact = (fotoact[0][1])+1;
         // console.log(fotoact);
		  var fotoact = search("soacha:buscar_foto_consecutivo_s", fotoact);
        //  console.log(fotoact);
		  var fotoact = fotoact[0][0];
         // console.log(fotoact);
		  PSV.config.foto = fotoact;
 		  PSV.setPanorama('../../panoramas/' + fotoact + '.jpg', null, true);
 		  actlin(fotoact); 
 		}  
  /*if (marker.data && marker.data.generated) {
      var respmarkdata = search2("pasadena:respmarkdata", marker.x, marker.y);
 
      var table = document.getElementById("tblatt");
                        table.innerHTML = "";
                        var row = table.insertRow(0);
                        var cell1 = row.insertCell(0);
                        cell1.colSpan = 2;
                        cell1.innerHTML = "<b>INFORMACION DEL OBJETO</b>";
                        var select = [];
                        var sel = [];
                        var medicion = respmarkdata[0][3];
                        var observaciones = respmarkdata[0][2];
                        var tipo = respmarkdata[0][1];
                        if (medicion == 0){
                            medicion = "Sin Información"
                        }
                        else{
                           medicion = medicion + " m2" 
                        }
                        if (!observaciones){
                            observaciones = "Sin Información";
                            }
                        if (tipo == "avisosyletreros"){
                            tipo = "Avisos y Tableros";
                        }
                        if (tipo == "senalizacion"){
                            tipo = "Señalización";
                        }
                        //var imag = [];
                        //var stv = [];
                        //var ig = [];
                        select[0] = "<b>Fotografía</b>";
                        select[1] = "<b>Tipo de Elemento</b>";
                        select[2] = "<b>Observaciones</b>";
                        select[3] = "<b>Medición</b>";
                        sel[0] = respmarkdata[0][0];
                        sel[1] = tipo;
                        sel[2] = observaciones;
                        sel[3] = medicion;
                        var campos = 3;
                        for (i = 0; i < select.length; i++) {
                            row = table.insertRow(i + 1);
                            cell1 = row.insertCell(0);
                            cell2 = row.insertCell(1);
                            cell1.innerHTML = select[i];
                            cell2.innerHTML = sel[i];
                            //sel[i].appendChild(imag[i]);
                            //cell2.appendChild(stv[i]);
                            //stv[i].appendChild(ig[i]);                
                        } 
                    document.getElementById("botonminimizar").style.display = "block";
					document.getElementById("panel_atr").style.display = "block";             
   }*/
 });
  

        
PSV.on('ready', function(e) {
//console.log(foto);
    actlin(foto); 
});
}
