var BarrioStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: "rgba(0,255,255,1)",
        lineDash: null,
        lineCap: 'butt',
        lineJoin: 'miter',
        width: 3
    }),
    /*fill : new ol.style.Fill({
     color : "rgba(0,0,255,0.7)"
     })*/
    text: new ol.style.Text({
        font: '12px helvetica,sans-serif',
        scale: 1.5,
        fill: new ol.style.Fill({
            color: '#000000'
        }),
        stroke: new ol.style.Stroke({
            color: '#FFFFFF',
            width: 3.5
        })
    })
});

var PredioStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: "rgba(255,0,0,1)",
        lineDash: null,
        lineCap: 'butt',
        lineJoin: 'miter',
        width: 2
    }),
    fill: new ol.style.Fill({
        color: "rgba(255,178,178,0.2)"
    })
});

var PredioDebe = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: "rgb(255, 0, 0, 1)",
        lineDash: null,
        lineCap: 'butt',
        lineJoin: 'miter',
        width: 3
    }),
    fill: new ol.style.Fill({
        color: "rgb(255, 0, 0, 0.1)"
    })
});
var PuntoStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: "rgba(0,255,255,1)",

    }),
    fill: new ol.style.Fill({
        color: "rgba(0,255,255,0.3)"
    })
});
// A point marker style using a flag image as the icon.
var flagStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 1],
        //opacity: 0.75,
        //scale: 1,
        //src: './imagenes/flag.png'
        src: './imagenes/bluedot.png'
    })
});

var alerta = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 5,
        snapToPixel: false,
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 0, 0, 0.8)',
            width: 3
        })
    })
});

var alertc = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 5,
        snapToPixel: false,
        stroke: new ol.style.Stroke({
            color: 'rgba(214, 147, 12, 0.8)',
            width: 3
        })
    })
});
var txt = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255,255,255,0.4)'
    }),
    stroke: new ol.style.Stroke({
        color: '#3399CC',
        width: 1.25
    }),
    text: new ol.style.Text({
        font: '12px Calibri,sans-serif',
        fill: new ol.style.Fill({color: '#000'}),
        stroke: new ol.style.Stroke({
            color: '#fff', width: 2
        }),
        
        text: ''
    })
});
var street1 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/1.png'
    })
});
var street2 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/2.png'
    })
});
var street3 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/3.png'
    })
});
var street4 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/4.png'
    })
});
var street5 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/5.png'
    })
});
var street6 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],

        scale: 1,
        src: './imagenes/street/6.png'
    })
});
var street7 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/7.png'
    })
});
var street8 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/8.png'
    })
});
var street9 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/9.png'
    })
});
var street10 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/10.png'
    })
});
var street11 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/11.png'
    })
});
var street12 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/12.png'
    })
});
var street13 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/13.png'
    })
});
var street14 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/14.png'
    })
});
var street15 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/15.png'
    })
});
var street16 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/16.png'
    })
});
var ubicacion = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 1],
        opacity: 1,
        scale: 0.3,
        src: './imagenes/ubicacion.png'
    })
});
//AUTOCOMPLETE INITIAL
$("#direccion").autocomplete({
    minLength: 1,
    source: addressSource,
    select: addressSelectPredio
});

$("#manzana").autocomplete({
    minLength: 1,
    source: addressSource,
    select: addressSelectManzana
});

$("#address1").keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        BuscarSitio();
    }
});

$("#codigo").autocomplete({
    minLength: 1,
    source: addressSource,
    select: addressSelectPredio
});

$("#matricula").autocomplete({
    minLength: 1,
    source: addressSource,
    select: addressSelectPredio
});

$("#propietarios").autocomplete({
    minLength: 1,
    source: addressSource,
    select: addressSelectPropietarios
});

$("#cedul").autocomplete({
    minLength: 1,
    source: addressSource,
    select: addressSelectCedula
});


function addressSource(requestString, responseFunc) {
    //globalstyle = "sinconsulta";
   // predio.setVisible(true);
    //try{
    if (requestString.term !== null && requestString.term !== undefined) {
        var querystr = requestString.term;
        //}catch (err){
    } else {
        var querystr = document.getElementById(requestString).value;
        var requestString = {val: 123};
        //}
    }
    if (querystr.length === 0) {
        response([]);
        return;
    }
    var viewParamsStr = viewparamsToStr({
        query: querystr
    });
    
    if ($("#direccion")["0"].value !== "" || requestString.val === 123) {       
        var temp = "direccion";
    }  
    else if ($("#manzana")["0"].value !== "" || requestString.val === 123) {       
        var temp = "manzana";
    }
    else if ($("#codigo")["0"].value !== "" || requestString.val === 123) {       
        var temp = "codigo";
    }
    else if ($("#matricula")["0"].value !== "" || requestString.val === 123) {       
        var temp = "matricula";
    } 
    else if ($("#propietarios")["0"].value !== "" || requestString.val === 123) {       
        var temp = "propietarios";
    } 
    else if ($("#cedul")["0"].value !== "" || requestString.val === 123) { 
        var temp = "cedul";
    }
        
    //var tamañopantalla = screen.width > 800;
    $.ajax({
        url: url,
        beforeSend: function () {
            //if (tamañopantalla == true) {
                //putgif();
            //} else {
                document.getElementById("carga2").style.display = "block";
            //}
        },
        
        success: function (data, status, xhr) {
            var arr = [];
            if (temp === "direccion") {    
                //var datos = select_query("SELECT initcap(a.direccion) AS direccion, a.codigo AS codigo FROM catastro.u_terreno_registros AS a, to_tsquery_partial('"+querystr+"') AS query WHERE direccion @@ query ORDER BY direccion DESC LIMIT 10");      
                //var datos = select_query("SELECT DISTINCT initcap(a.direccion) AS direccion, a.codigo AS codigo FROM catastro.r1 AS a, to_tsquery_partial('"+querystr+"') AS query WHERE direccion @@ query ORDER BY direccion DESC LIMIT 10");        	 
                  var datos = select_query("SELECT DISTINCT initcap(a.direccion) AS direccion, a.codigo AS codigo FROM catastro.r1 AS a WHERE a.direccion ILIKE '%"+querystr+"%' ORDER BY direccion DESC LIMIT 10");
                  if (datos === null) {
                    var datos = select_query("SELECT DISTINCT initcap(a.direccion) AS direccion, a.codigo AS codigo FROM catastro.u_terreno_registros AS a WHERE a.direccion ILIKE '%"+querystr+"%' ORDER BY direccion DESC LIMIT 10");
                  }
                try{
                    for (i = 0; i < datos.length; i++) {                   
                        arr.push({              
                            direccion: datos[i][0],
                            value: datos[i][0],
                            cod: datos[i][1],
                            feature: datos
                        });
                    }
                }
                catch(err){}
                //console.log(arr); 
            }  
            else if (temp === "manzana") { 
                var datos = select_query("SELECT initcap(a.codigo) AS codigo, a.codigo_ant As codigo_ant, a.barrio_cod AS barrio_cod, a.gid AS gid FROM catastro.u_manzana AS a, to_tsquery_partial('"+querystr+"') AS query WHERE codigo @@ query ORDER BY codigo DESC LIMIT 10");             	 
                //var datos = select_query("SELECT initcap(a.codigo) AS codigo, a.codigo_ant AS codigo_ant, a.barrio_cod AS barrio_cod, a.gid AS gid FROM catastro.u_manzana AS a WHERE a.codigo ILIKE '%"+querystr+"%' ORDER BY codigo DESC LIMIT 10");       
                try{
                    for (i = 0; i < datos.length; i++) {                   
                        arr.push({  
                            value: datos[i][0],
                            cod: datos[i][0],
                            codigo_ant: datos[i][1],
                            barrio_cod: datos[i][2],
                            codigo_mun: datos[i][3],
                            gid: datos[i][4],
                            feature: datos
                        });
                    } 
                }
                catch(err){}   
            } 
            else if (temp === "codigo") { 
                var datos = select_query("SELECT DISTINCT initcap(a.codigo) AS codigo, a.direccion AS direccion FROM catastro.r1 AS a, to_tsquery_partial('"+querystr+"') AS query WHERE codigo @@ query ORDER BY codigo DESC LIMIT 10");             	 
                if (datos === null) {
                    var datos = select_query("SELECT DISTINCT initcap(a.codigo) AS codigo, a.direccion AS direccion FROM catastro.u_terreno_registros AS a, to_tsquery_partial('"+querystr+"') AS query WHERE codigo @@ query ORDER BY codigo DESC LIMIT 10");
                  } 
                try{
                    for (i = 0; i < datos.length; i++) {                   
                        arr.push({              
                            direccion: datos[i][1],
                            value: datos[i][0],
                            cod: datos[i][0],
                            feature: datos
                        });
                    }
                }
                catch(err){}  
            } 
            else if (temp === "matricula") { 
                var datos = select_query("SELECT initcap(a.matricula) AS matricula, a.codigo AS codigo FROM catastro.r1 AS a, to_tsquery_partial('"+querystr+"') AS query WHERE matricula @@ query ORDER BY matricula DESC LIMIT 10");             	 
                //var datos = select_query("SELECT initcap(a.codigo) AS codigo, a.direccion AS direccion FROM catastro.u_terreno_registros AS a, to_tsquery_partial('"+querystr+"') AS query WHERE codigo @@ query ORDER BY codigo DESC LIMIT 10"); 
                try{
                    for (i = 0; i < datos.length; i++) {                   
                        arr.push({              
                            matricula: datos[i][0],
                            value: datos[i][0],
                            cod: datos[i][1],
                            feature: datos
                        });
                    }
                }
                catch(err){}  
            } 
            else if (temp === "propietarios") {
                var datos = select_query("SELECT DISTINCT initcap(a.nombre) AS nombre, a.direccion AS direccion, a.codigo AS codigo FROM catastro.r1 AS a WHERE a.nombre ILIKE '%"+querystr+"%' ORDER BY nombre DESC LIMIT 10");
                //var datos = select_query("SELECT initcap(a.nombre) AS nombre, a.direccion AS direccion, a.codigo AS codigo FROM catastro.r1 AS a, to_tsquery_partial('"+querystr+"') AS query WHERE nombre @@ query ORDER BY nombre DESC LIMIT 10");
                if (datos === null) {
                  var datos = select_query("SELECT DISTINCT initcap(a.nombre) AS nombre, a.direccion AS direccion, a.codigo AS codigo FROM catastro.u_terreno_registros AS a WHERE a.nombre ILIKE '%"+querystr+"%' ORDER BY nombre DESC LIMIT 10");
                }
                try {
                    let uniqueValues = new Set();
                    for (let i = 0; i < datos.length; i++) {
                        if (!uniqueValues.has(datos[i][0])) {
                            uniqueValues.add(datos[i][0]);                 
                        arr.push({              
                            nombre: datos[i][0],
                            value: datos[i][0],
                            direccion: datos[i][1],
                            cod: datos[i][2],
                            feature: datos
                        });
                    }
                 }
                }  
                catch(err){
                    console.error(err); 
                }    
            }
            else if (temp === "cedul") {
                var datos = select_query("SELECT DISTINCT initcap(a.num_doc) AS num_doc, a.direccion AS direccion, a.codigo AS codigo FROM catastro.r1 AS a, to_tsquery_partial('"+querystr+"') AS query WHERE num_doc @@ query ORDER BY num_doc DESC LIMIT 10");             	 
                if (datos === null) {
                    var datos = select_query("SELECT DISTINCT initcap(a.num_doc) AS num_doc, a.direccion AS direccion, a.codigo AS codigo FROM catastro.u_terreno_registros AS a, to_tsquery_partial('"+querystr+"') AS query WHERE num_doc @@ query ORDER BY num_doc DESC LIMIT 10");
                } 
                try{
                    let uniqueValues = new Set();
                    for (let i = 0; i < datos.length; i++) {
                        if (!uniqueValues.has(datos[i][0])) {
                            uniqueValues.add(datos[i][0]);                    
                        arr.push({              
                            doc: datos[i][0],
                            value: datos[i][0],
                            direccion: datos[i][1],
                            cod: datos[i][2],
                            feature: datos
                        });
                    }
                } 
              }
                catch(err){}    
            }
            if (arr.length !== 0) {
                if (requestString.val === "direccion" || requestString.val === "codigo") {
                    var arreglado = {};
                    for (var i = 0; i < arr.length; ++i) {
                        arreglado[i] = arr[i];
                    }
                    arreglado.item = arreglado["0"];
                    addressSelectPredio(1, arreglado);
                }
                else if (requestString.val === "manzana") {
                    var arreglado = {};
                    for (var i = 0; i < arr.length; ++i) {
                        arreglado[i] = arr[i];
                    }
                    arreglado.item = arreglado["0"];
                    addressSelectManzana(1, arreglado);
                }
                else if (requestString.val === "propietarios") {
                    var arreglado = {};
                    for (var i = 0; i < arr.length; ++i) {
                        arreglado[i] = arr[i];
                    }
                    arreglado.item = arreglado["0"];
                    addressSelectPropietarios(1, arreglado);
                }
                else if (requestString.val === "cedul") {
                    var arreglado = {};
                    for (var i = 0; i < arr.length; ++i) {
                        arreglado[i] = arr[i];
                    }
                    arreglado.item = arreglado["0"];
                    addressSelectCedula(1, arreglado);
                }
                try {
                    responseFunc(arr);
                } catch (err) {
                    var arreglado = {};
                    arreglado.item = arr["0"];
                    try {
                        if (temp=='nombre'){
                            addressSelectPredio(1, arreglado);
                        }
                        else
                        {   
                        addressSelect(1, arreglado);
                         }
                    } catch (err) {
                       //alert("");
                    }
                }
            } else {
                if (temp === 'direcci') {
                    codeAddress(viewParamsStr);
                } 
            }
        },
        error: function () {
            console.log("error");
        },
        complete: function () {
            document.getElementById("carga2").style.display = "none";
        }

    });
}

function addressSelectPredio(event, ui){
    actividad("busqueda por dirección, código o matricula");
    try{
        var codph = ui.item.cod.slice(21, 22);
        if(codph == '9' || codph == '8'){
            var codigoterreno = ui.item.cod.slice(0, 9) + '0000' + ui.item.cod.slice(13, 26) + '0000';
            var tipoaval = "Predio en propiedad horizontal o condominio";
        }
        else if(codph == '5'){
            var codigoterreno = ui.item.cod.slice(0, 9) + '0000' + ui.item.cod.slice(13, 21) + '000000000';
            var tipoaval = "Mejora (Construcción en predio ajeno)";
        }
        else{
            var codigoterreno = ui.item.cod;
            var tipoaval = "No PH";
        }
        var view = map.getView();
        var datosr1 = select_query("select * from catastro.r1 where codigo = '"+ui.item.cod+"'");
        var tabref = "registros";
        if(datosr1 == null){
          var datosr1 = select_query("select * from catastro.u_terreno_registros where codigo = '"+ui.item.cod+"'");  
          var tabref = "terrenos"; 
        }

        var geome = select_query("select ST_AsGeoJSON(geom) from catastro.u_terreno_registros where codigo = '"+codigoterreno+"'");
        if(geome == null){
          var geome = select_query("select ST_AsGeoJSON(geom) from catastro.r_terreno_registros where codigo = '"+codigoterreno+"'");
        }
        var geojsonprueba = JSON.parse(geome[0]); 
        var coord = geojsonprueba.coordinates[0][0];
        var feat = new ol.Feature({
            geometry: new ol.geom.Polygon([coord])
        });
        feat.getGeometry().transform('EPSG:4326','EPSG:3857');
        //console.log(feat);
        var geom = feat.getGeometry();
      
        /*highlightfeatures.setStyle(PredioStyle);
        var markerSourcenoph = highlightfeatures.getSource();
        markerSourcenoph.clear();
        markerSourcenoph.addFeature(feat); */

        if (markerPredio) {
            map.removeLayer(markerPredio);
        }

        var vectorSource = new ol.source.Vector({
            features: [feat] // Asegurarse de que es un array
        });
        // Crear el nuevo layer vectorial
        markerPredio = new ol.layer.Vector({
            source: vectorSource,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "rgba(255,0,0,1)",
                    lineDash: null,
                    lineCap: 'butt',
                    lineJoin: 'miter',
                    width: 2
                }),
                fill: new ol.style.Fill({
                    color: "rgba(255,178,178,0.2)"
                })
            })
        });
        map.addLayer(markerPredio);
        ppExtent = geom.getExtent();
        ppExtent[0] = ppExtent[0] - 40;
        ppExtent[2] = ppExtent[2] + 40;
        ppExtent[1] = ppExtent[1] - 40;
        ppExtent[3] = ppExtent[3] + 40;
    
        var featureCenter = ol.extent.getCenter(ppExtent);
        view.setCenter(featureCenter);
        view.fit(ppExtent, map.getSize());

        if(tabref=="registros"){
            try{
                if(datosr1.length <= 1){
                var propietario = datosr1[0][3];
                var documento = datosr1[0][5];
                }
                else if(datosr1.length > 1){
                    var propietarios = []; 
                    for (i = 0; i < datosr1.length; i++) {                   
                        propietarios.push({              
                            prop: datosr1[i][3],
                            doc: datosr1[i][5]
                        });
                    }
                    var propietario = propietarios.map(function(item) {
                        return item.prop;
                    }).join(", ");
                    var documento = propietarios.map(function(item) {
                        return item.doc;
                    }).join(", ");
                }
            }
            
            catch(err){
                var propietario = "Sin información";
                var documento = "Sin información";
            }
            
            try{
                var direccion = datosr1[0][6];
                var areat = parseInt(datosr1[0][8]);
                var areac = parseInt(datosr1[0][9]);
                var avaluo = datosr1[0][10];
                var destino = datosr1[0][7];
                var matricula = datosr1[0][11];
            }
            catch(err){
                var direccion = "Sin Información";
                var areat = "Sin Información";
                var areac = "Sin Información";
                var avaluo = "Sin Información";
                var destino = "Sin Información";
                var matricula = "Sin Información";
            }   
        }

        else if(tabref=="terrenos"){
            try{
                if(datosr1.length <= 1){
                var propietario = datosr1[0][14];
                var documento = datosr1[0][17];
                }
                else if(datosr1.length > 1){
                    var propietarios = []; 
                    for (i = 0; i < datosr1.length; i++) {                   
                        propietarios.push({              
                            prop: datosr1[i][14],
                            doc: datosr1[i][17]
                        });
                    }
                    var propietario = propietarios.map(function(item) {
                        return item.prop;
                    }).join(", ");
                    var documento = propietarios.map(function(item) {
                        return item.doc;
                    }).join(", ");
                }
            }
            
            catch(err){
                var propietario = "Sin información";
                var documento = "Sin información";
            }
            
            try{
                var direccion = datosr1[0][18];
                var areat = parseInt(datosr1[0][21]);
                var areac = parseInt(datosr1[0][22]);
                var avaluo = datosr1[0][23];
                var destino = datosr1[0][20];
                var matricula = datosr1[0][29];
            }
            catch(err){
                var direccion = "Sin Información";
                var areat = "Sin Información";
                var areac = "Sin Información";
                var avaluo = "Sin Información";
                var destino = "Sin Información";
                var matricula = "Sin Información";
            }  
        }

            try{
               var codigo_ant = select_query("select codigo_ant from catastro.u_terreno_registros where codigo = '"+codigoterreno+"'");
               
               if(codigo_ant == null){
                var codigo_ant = select_query("select codigo_ant from catastro.r_terreno_registros where codigo = '"+codigoterreno+"'");
               }
            }
            catch(err){
                var codigo_ant = "sin información";
            }
            
            var tabledinamic = document.getElementById("table-dynamic");
            tabledinamic.innerHTML = "";
            var table = document.getElementById("tblatt");
            table.innerHTML = "";                                 
            var select = [];
            var sel = [];
            var imag = [];
            var stv = [];
            var ig = [];
            select[0] = "<b>Dirección: </b>";
            select[1] = "<b>Código: </b>";
            select[2] = "<b>Código Anterior: </b>";
            select[3] = "<b>Propietario/s: </b>";
            select[4] = "<b>Documento/s: </b>";
            select[5] = "<b>Área de Terreno: </b>";
            select[6] = "<b>Área Construida: </b>";
            select[7] = "<b>Avalúo: </b>"; 
            select[8] = "<b>Destino Económico: </b>"; 
            select[9] = "<b>Matricula inmobiliaria: </b>";
            select[10] = "<b>Tipo de avalúo: </b>";
            
            sel[0] = direccion;
            sel[1] = ui.item.cod;
            sel[2] = codigo_ant;
            sel[3] = propietario;
            sel[4] = documento;
            sel[5] = areat + " m2";
            sel[6] = areac + " m2";
            sel[7] = "$" + formatNumber(avaluo); 
            sel[8] = destino;
            sel[9] = matricula;
            sel[10]  = tipoaval;

            codigopredio = ui.item.cod;
    
            for (i = 0; i < select.length; i++) {
                row = table.insertRow(i);
                cell1 = row.insertCell(0);
                cell2 = row.insertCell(1);
                cell1.innerHTML = select[i];
                cell2.innerHTML = sel[i];
                cell1.className = "roboto-medium";
                cell2.className = "roboto-regular";
             } 
                document.getElementById("panel_atr").style.display = "block";
            }
            catch(err){
                Swal.fire({
                    title: 'No se encontró información geográfica asociada a la consulta',
                    text: 'Es posible que se trate de un predio en Omisión, a continuación se muestran los datos de la tabla de registro',
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#013F6C',
                    customClass: {
                      title: 'roboto-bold tamLetrasweetTitulo',
                      container: 'roboto-medium tamLetrasweetCuerpo',
                      confirmButton: 'roboto-regular',
                      icon: 'custom-icon-font-size',
                      popup: 'custom-popup'
                    },
                  });
                try{
                    var direccion = datosr1[0][6];
                    var propietario = datosr1[0][3];
                    var documento = datosr1[0][5];
                    var areat = parseInt(datosr1[0][8]);
                    var areac = parseInt(datosr1[0][9]);
                    var avaluo = datosr1[0][10];
                    var destino = datosr1[0][7];
                    var matricula = datosr1[0][11];
                }
                catch(err){
                    var direccion = "Sin información";
                    var areat = "Sin información";
                    var areac = "Sin información";
                    var avaluo = "Sin información";
                    var destino = "Sin información";
                    var matricula = "Sin información";
                    var propietario = "Sin información";
                    var documento = "Sin información";
                }
                
                var tabledinamic = document.getElementById("table-dynamic");
                tabledinamic.innerHTML = "";
                var table = document.getElementById("tblatt");
                table.innerHTML = "";                                       
                var select = [];
                var sel = [];
                var imag = [];
                var stv = [];
                var ig = [];       
                select[0] = "<b>Dirección: </b>";
                select[1] = "<b>Código: </b>";
                select[2] = "<b>Propietario/s: </b>";
                select[3] = "<b>Documento/s: </b>";
                select[4] = "<b>Área de Terreno: </b>";
                select[5] = "<b>Área Construida: </b>";
                select[6] = "<b>Avalúo: </b>"; 
                select[7] = "<b>Destino Económico: </b>"; 
                select[8] = "<b>Matricula inmobiliaria: </b>";
                select[9] = "<b>Tipo de avalúo: </b>";        
                sel[0] = direccion;
                sel[1] = ui.item.cod;
                sel[2] = propietario;
                sel[3] = documento;
                sel[4] = areat + " m2";
                sel[5] = areac + " m2";
                sel[6] = "$" + formatNumber(avaluo); 
                sel[7] = destino;
                sel[8] = matricula;
                sel[9] = tipoaval;                                 
                for (i = 0; i < select.length; i++) {
                    row = table.insertRow(i);
                    cell1 = row.insertCell(0);
                    cell2 = row.insertCell(1);
                    cell1.innerHTML = select[i];
                    cell2.innerHTML = sel[i];
                    cell1.className = "roboto-medium";
                    cell2.className = "roboto-regular";
                 }
                    document.getElementById("panel_atr").style.display = "block";
            }
}

function addressSelectManzana(event, ui) {
    actividad("busqueda por manzana");
    try {
        var view = map.getView();
        var geome = select_query("select ST_AsGeoJSON(geom) from catastro.u_manzana where codigo = '" + ui.item.cod + "'");
        var geojsonprueba = JSON.parse(geome[0]);
        var coord = geojsonprueba.coordinates[0][0];
        var feat = new ol.Feature({
            geometry: new ol.geom.Polygon([coord])
        });
        feat.getGeometry().transform('EPSG:4326', 'EPSG:3857');
        var geom = feat.getGeometry();

        /*highlightfeatures.setStyle(PredioStyle);
        var markerSourcenoph = highlightfeatures.getSource();
        markerSourcenoph.clear();
        markerSourcenoph.addFeature(feat);*/

        if (markerPredio) {
            map.removeLayer(markerPredio);
        }
        var vectorSource = new ol.source.Vector({
            features: [feat] // Asegurarse de que es un array
        });

        // Crear el nuevo layer vectorial
        markerPredio = new ol.layer.Vector({
            source: vectorSource,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "rgba(255,0,0,1)",
                    lineDash: null,
                    lineCap: 'butt',
                    lineJoin: 'miter',
                    width: 2
                }),
                fill: new ol.style.Fill({
                    color: "rgba(255,178,178,0.2)"
                })
            })
        });
        map.addLayer(markerPredio);

        ppExtent = geom.getExtent();
        ppExtent[0] = ppExtent[0] - 40;
        ppExtent[2] = ppExtent[2] + 40;
        ppExtent[1] = ppExtent[1] - 40;
        ppExtent[3] = ppExtent[3] + 40;

        var featureCenter = ol.extent.getCenter(ppExtent);
        view.setCenter(featureCenter);
        view.fit(ppExtent, map.getSize());

        var table = document.getElementById("tblattmz");
        table.innerHTML = "";
        document.getElementById("titulotablaMz").innerHTML = "Información"
        var select = [];
        var sel = [];
        var imag = [];
        var stv = [];
        var ig = [];

        select[0] = "<b>Código Manzana: </b>";
        select[1] = "<b>Código Anterior: </b>";
        select[2] = "<b>Código Barrio: </b>";
        sel[0] = ui.item.cod;
        sel[1] = ui.item.codigo_ant;
        sel[2] = ui.item.barrio_cod;


        for (i = 0; i < select.length; i++) {
            row = table.insertRow(i);
            cell1 = row.insertCell(0);
            cell2 = row.insertCell(1);
            cell1.innerHTML = select[i];
            cell2.innerHTML = sel[i];
            cell1.className = "roboto-medium";
            cell2.className = "roboto-regular";
        }
        document.getElementById("panel_mz").style.display = "block";
    }
    catch (err) {
        Swal.fire({
            title: 'No se encontro información geografica asociada a la consulta',
            text: '',
            icon: 'info',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#013F6C'
        });
    }
}

let markerSitio;
function BuscarSitio() {
    const nombreSitio = document.getElementById('address1').value;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: `${nombreSitio}, Casanare, Colombia` }, (results, status) => {
        if (status === 'OK') {
            const location = results[0].geometry.location;
            if(location.lng()=='-71.5723953' && location.lat()=='5.7589269'){
                if (markerSitio) {
                    map.removeLayer(markerSitio);
                }
                Swal.fire({
                 title: 'No se encontró el elemento geográfico',
                 text: '',
                 icon: 'info',
                 confirmButtonText: 'Aceptar',
                 confirmButtonColor: '#013F6C'
                });
            }
            else{
                const coords = ol.proj.fromLonLat([location.lng(), location.lat()]);
                if (markerSitio) {
                    map.removeLayer(markerSitio);
                }
                markerSitio = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: [
                            new ol.Feature({
                                geometry: new ol.geom.Point(coords)
                            })
                        ]
                    }),
                    style: new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 1],
                            //src: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
                            src: './imagenes/bluedot.png'
                        })
                    })
                });
                map.addLayer(markerSitio);
                map.getView().setCenter(coords);
                map.getView().setZoom(18);
            } 
    }
    else{
        Swal.fire({
            title: 'No se encontró el elemento',
            text: '',
            icon: 'info',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#013F6C'
           });
    }
    });
}


function addressSelectPropietarios(event, ui) {
    actividad("busqueda por propietario");
    var nombre = select_query("select * from catastro.r1 where nombre ilike '" + ui.item.nombre + "'");
    var tableref = "registros";
    if (nombre === null) {
        var nombre = select_query("select * from catastro.u_terreno_registros where nombre ilike '" + ui.item.nombre + "'");
        var tableref = "terrenos";
    }
    if (nombre.length > 1) {
        var select = [];
        var sel = [];
        var tabledinamic = document.getElementById("table-dynamic");
        tabledinamic.innerHTML = "";
        var table = document.getElementById("tblattmz");
        table.innerHTML = "";
        var select = [];
        var sel = [];
        var imag = [];
        var stv = [];
        var ig = [];
        var tablaph = "<table id='tablaph' class='table table-bordered' style='width: 100%;'>";
        for (i = 0; i < nombre.length; i++) {
            var dirg = nombre[i][4];
            tablaph += "<tr>";
            if (tableref == 'registros') {
                tablaph += "<td id=tt" + i + ">" + nombre[i][6] + "</td>";
            } else if (tableref == 'terrenos') {
                tablaph += "<td id=tt" + i + ">" + nombre[i][18] + "</td>";
            }
            tablaph += "</tr>";
        }
        tablaph += "</table>";

        select[0] = "<b>Nombre del propietario: </b>";
        select[1] = "<b>Documento del propietario: </b>";
        select[2] = "<b>Número de Predios: </b>";
        if (tableref == 'registros') {
            sel[0] = nombre[0][3];
            sel[1] = nombre[0][5];
        }
        else if (tableref == 'terrenos') {
            sel[0] = nombre[0][14];
            sel[1] = nombre[0][17];
        }
        sel[2] = nombre.length;

        for (i = 0; i < select.length; i++) {
            row = table.insertRow(i);
            cell1 = row.insertCell(0);
            cell2 = row.insertCell(1);
            cell1.innerHTML = select[i];
            cell2.innerHTML = sel[i];
        }

        // Añadir fila para el título de direcciones
        var titleRow = table.insertRow();
        var titleCell = titleRow.insertCell(0);
        titleCell.colSpan = 2;
        titleCell.innerHTML = "<div style='text-align: center;'><b>Seleccione la dirección de su interés:</b></div>";

        // Añadir fila para la tabla de direcciones
        var tableRow = table.insertRow();
        var tableCell = tableRow.insertCell(0);
        tableCell.colSpan = 2;
        tableCell.innerHTML = tablaph;

        for (i = 0; i < nombre.length; i++) {
            var ell = document.getElementById("tt" + i);
            var alg = "mostrardatosmult('tt" + i + "')";
            ell.setAttribute("onclick", alg);
            ell.value = nombre[i][4];
        }
        document.getElementById("panel_mz").style.display = "block";
    }

    else {
        try {
            var view = map.getView();
            var codph = ui.item.cod.slice(21, 22);
            if (codph == '9' || codph == '8') {
                var codigoterreno = ui.item.cod.slice(0, 9) + '0000' + ui.item.cod.slice(13, 26) + '0000';
                var tipoaval = "Predio en propiedad horizontal o condominio";
            }
            else if (codph == '5') {
                var codigoterreno = ui.item.cod.slice(0, 9) + '0000' + ui.item.cod.slice(13, 21) + '000000000';
                var tipoaval = "Mejora (Construcción en predio ajeno)";
            }
            else {
                var codigoterreno = ui.item.cod;
                var tipoaval = "No PH";
            }

            if (tableref == 'registros') {
                var datosr1 = select_query("select * from catastro.r1 where codigo = '" + ui.item.cod + "'");
            }
            else if (tableref == 'terrenos') {
                var datosr1 = select_query("select * from catastro.u_terreno_registros where codigo = '" + ui.item.cod + "'");
            }
            var geome = select_query("select ST_AsGeoJSON(geom) from catastro.u_terreno_registros where codigo = '" + codigoterreno + "'");
            var geojsonprueba = JSON.parse(geome[0]);
            var coord = geojsonprueba.coordinates[0][0];
            var feat = new ol.Feature({
                geometry: new ol.geom.Polygon([coord])
            });
            feat.getGeometry().transform('EPSG:4326', 'EPSG:3857');
            var geom = feat.getGeometry();

            /*highlightfeatures.setStyle(PredioStyle);
            var markerSourcenoph = highlightfeatures.getSource();
            markerSourcenoph.clear();
            markerSourcenoph.addFeature(feat);*/

            if (markerPredio) {
                map.removeLayer(markerPredio);
            }
            var vectorSource = new ol.source.Vector({
                features: [feat] // Asegurarse de que es un array
            });
    
            // Crear el nuevo layer vectorial
            markerPredio = new ol.layer.Vector({
                source: vectorSource,
                style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: "rgba(255,0,0,1)",
                        lineDash: null,
                        lineCap: 'butt',
                        lineJoin: 'miter',
                        width: 2
                    }),
                    fill: new ol.style.Fill({
                        color: "rgba(255,178,178,0.2)"
                    })
                })
            });
            map.addLayer(markerPredio);

            ppExtent = geom.getExtent();
            ppExtent[0] = ppExtent[0] - 40;
            ppExtent[2] = ppExtent[2] + 40;
            ppExtent[1] = ppExtent[1] - 40;
            ppExtent[3] = ppExtent[3] + 40;

            var featureCenter = ol.extent.getCenter(ppExtent);
            view.setCenter(featureCenter);
            view.fit(ppExtent, map.getSize());

            try {
                if (datosr1.length <= 1) {
                    if (tableref == 'registros') {
                        var propietario = datosr1[0][3];
                        var documento = datosr1[0][5];
                    }
                    else if (tableref == 'terrenos') {
                        var propietario = datosr1[0][14];
                        var documento = datosr1[0][17];
                    }
                }
                else if (datosr1.length > 1) {
                    var propietarios = [];
                    for (i = 0; i < datosr1.length; i++) {
                        if (tableref == 'registros') {
                            propietarios.push({
                                prop: datosr1[i][3],
                                doc: datosr1[i][5]
                            });
                        }
                        else if (tableref == 'terrenos') {
                            console.log("terrenos");
                            propietarios.push({
                                prop: datosr1[i][14],
                                doc: datosr1[i][17]
                            });
                        }
                    }
                    var propietario = propietarios.map(function (item) {
                        return item.prop;
                    }).join(", ");
                    var documento = propietarios.map(function (item) {
                        return item.doc;
                    }).join(", ");
                }
            }

            catch (err) {
                var propietario = "Sin información";
                var documento = "Sin información";
            }

            try {
                if (tableref == 'registros') {
                    var direccion = datosr1[0][4];
                    var areat = parseInt(datosr1[0][8]);
                    var areac = parseInt(datosr1[0][9]);
                    var avaluo = datosr1[0][10];
                    var destino = datosr1[0][7];
                    var matricula = datosr1[0][11];
                }
                else if (tableref == 'terrenos') {
                    var direccion = datosr1[0][19];
                    var areat = parseInt(datosr1[0][8]);
                    var areac = parseInt(datosr1[0][9]);
                    var avaluo = datosr1[0][10];
                    var destino = datosr1[0][7];
                    var matricula = datosr1[0][11];
                }
            }
            catch (err) {
                var direccion = "Sin Información";
                var areat = "Sin Información";
                var areac = "Sin Información";
                var avaluo = "Sin Información";
                var destino = "Sin Información";
                var matricula = "Sin Información";
            }
            try {
                var codigo_ant = select_query("select codigo_ant from catastro.u_terreno_registros where codigo = '" + codigoterreno + "'");
                
                if (codigo_ant == null) {
                    var codigo_ant = select_query("select codigo_ant from catastro.r_terreno_registros where codigo = '" + codigoterreno + "'");
                }
            }
            catch (err) {
                var codigo_ant = "sin información";
            }
            
            var table = document.getElementById("tblatt");
            table.innerHTML = "";
            var select = [];
            var sel = [];
            var imag = [];
            var stv = [];
            var ig = [];
            select[0] = "<b>Dirección: </b>";
            select[1] = "<b>Código: </b>";
            select[2] = "<b>Código Anterior: </b>";
            select[3] = "<b>Propietario/s: </b>";
            select[4] = "<b>Documento/s: </b>";
            select[5] = "<b>Área de Terreno: </b>";
            select[6] = "<b>Área Construida: </b>";
            select[7] = "<b>Avalúo: </b>";
            select[8] = "<b>Destino Económico: </b>";
            select[9] = "<b>Matricula inmobiliaria: </b>";
            select[10] = "<b>Tipo de avalúo: </b>";

            sel[0] = ui.item.direccion;
            sel[1] = ui.item.cod;
            sel[2] = codigo_ant;
            sel[3] = propietario;
            sel[4] = documento;
            sel[5] = areat + " m2";
            sel[6] = areac + " m2";
            sel[7] = "$" + formatNumber(avaluo);
            sel[8] = destino;
            sel[9] = matricula;
            sel[10] = tipoaval;

            for (i = 0; i < select.length; i++) {
                row = table.insertRow(i);
                cell1 = row.insertCell(0);
                cell2 = row.insertCell(1);
                cell1.innerHTML = select[i];
                cell2.innerHTML = sel[i];
            }
            document.getElementById("panel_atr").style.display = "block";
        }
        catch (err) {
            Swal.fire({
                title: 'No se encontro información geografica asociada a la consulta',
                text: 'Es posible que se trate de un predio en Omisión, a continuación se muestran los datos de la tabla de registro',
                icon: 'info',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#013F6C'
            });
            try {
                var direccion = datosr1[0][6];
                var propietario = datosr1[0][3];
                var documento = datosr1[0][5];
                var areat = parseInt(datosr1[0][8]);
                var areac = parseInt(datosr1[0][9]);
                var avaluo = datosr1[0][10];
                var destino = datosr1[0][7];
                var matricula = datosr1[0][11];
            }
            catch (err) {
                var direccion = "Sin información";
                var areat = "Sin información";
                var areac = "Sin información";
                var avaluo = "Sin información";
                var destino = "Sin información";
                var matricula = "Sin información";
                var propietario = "Sin información";
                var documento = "Sin información";
            }

            var table = document.getElementById("tblattmz");
            table.innerHTML = "";
            var select = [];
            var sel = [];
            var imag = [];
            var stv = [];
            var ig = [];
            select[0] = "<b>Dirección: </b>";
            select[1] = "<b>Código: </b>";
            select[2] = "<b>Propietario/s: </b>";
            select[3] = "<b>Documento/s: </b>";
            select[4] = "<b>Área de Terreno: </b>";
            select[5] = "<b>Área Construida: </b>";
            select[6] = "<b>Avalúo: </b>";
            select[7] = "<b>Destino Económico: </b>";
            select[8] = "<b>Matricula inmobiliaria: </b>";
            select[9] = "<b>Tipo de avalúo: </b>";
            sel[0] = direccion;
            sel[1] = ui.item.cod;
            sel[2] = propietario;
            sel[3] = documento;
            sel[4] = areat + " m2";
            sel[5] = areac + " m2";
            sel[6] = "$" + formatNumber(avaluo);
            sel[7] = destino;
            sel[8] = matricula;
            sel[9] = tipoaval;
            for (i = 0; i < select.length; i++) {
                row = table.insertRow(i);
                cell1 = row.insertCell(0);
                cell2 = row.insertCell(1);
                cell1.innerHTML = select[i];
                cell2.innerHTML = sel[i];
                cell1.className = "roboto-medium";
                cell2.className = "roboto-regular";
            }
            document.getElementById("panel_mz").style.display = "block";
            vistainicial();
        }
    }
}


function addressSelectCedula(event, ui) {
    actividad("busqueda por cedula");  
    var nombre = select_query("select * from catastro.r1 where num_doc ilike '"+ui.item.doc+"'");
    var tableref = "registros";
    if (nombre === null){
     var nombre = select_query("select * from catastro.u_terreno_registros where num_doc ilike '"+ui.item.doc+"'");
     var tableref = "terrenos";
    }
          if (nombre.length > 1) {
            var select = [];
            var sel = [];
            var tabledinamic = document.getElementById("table-dynamic");
            tabledinamic.innerHTML = "";
            var table = document.getElementById("tblattmz");
            table.innerHTML = "";
            var select = [];
            var sel = [];
            var imag = [];
            var stv = [];
            var ig = [];
            var tablaph = "<table id='tablaph' class='table table-bordered' style='width: 100%;'>";
            for (i = 0; i < nombre.length; i++) {
                var dirg = nombre[i][4];
                tablaph += "<tr>";
                if (tableref == 'registros') {
                    tablaph += "<td id=tt" + i + ">" + nombre[i][6] + "</td>";
                } else if (tableref == 'terrenos') {
                    tablaph += "<td id=tt" + i + ">" + nombre[i][18] + "</td>";
                }
                tablaph += "</tr>";
            }
            tablaph += "</table>";
    
            select[0] = "<b>Nombre del propietario: </b>";
            select[1] = "<b>Documento del propietario: </b>";
            select[2] = "<b>Número de Predios: </b>";
            if (tableref == 'registros') {
                sel[0] = nombre[0][3];
                sel[1] = nombre[0][5];
            }
            else if (tableref == 'terrenos') {
                sel[0] = nombre[0][14];
                sel[1] = nombre[0][17];
            }
            sel[2] = nombre.length;
    
            for (i = 0; i < select.length; i++) {
                row = table.insertRow(i);
                cell1 = row.insertCell(0);
                cell2 = row.insertCell(1);
                cell1.innerHTML = select[i];
                cell2.innerHTML = sel[i];
            }
    
            // Añadir fila para el título de direcciones
            var titleRow = table.insertRow();
            var titleCell = titleRow.insertCell(0);
            titleCell.colSpan = 2;
            titleCell.innerHTML = "<div style='text-align: center;'><b>Seleccione la dirección de su interés:</b></div>";
    
            // Añadir fila para la tabla de direcciones
            var tableRow = table.insertRow();
            var tableCell = tableRow.insertCell(0);
            tableCell.colSpan = 2;
            tableCell.innerHTML = tablaph;
    
            for (i = 0; i < nombre.length; i++) {
                var ell = document.getElementById("tt" + i);
                var alg = "mostrardatosmult('tt" + i + "')";
                ell.setAttribute("onclick", alg);
                ell.value = nombre[i][4];
            }
            document.getElementById("panel_mz").style.display = "block";
        }

    else{
      try{
        var view = map.getView();
        var codph = ui.item.cod.slice(21, 22);
        if(codph == '9' || codph == '8'){
            var codigoterreno = ui.item.cod.slice(0, 9) + '0000' + ui.item.cod.slice(13, 26) + '0000';
            var tipoaval = "Predio en propiedad horizontal o condominio";
        }
        else if(codph == '5'){
            var codigoterreno = ui.item.cod.slice(0, 9) + '0000' + ui.item.cod.slice(13, 21) + '000000000';
            var tipoaval = "Mejora (Construcción en predio ajeno)";
        }
        else{
            var codigoterreno = ui.item.cod;
            var tipoaval = "No PH";
        }

        if(tableref=='registros'){
          var datosr1 = select_query("select * from catastro.r1 where codigo = '"+ui.item.cod+"'");
        }
        else if(tableref=='terrenos'){
          var datosr1 = select_query("select * from catastro.u_terreno_registros where codigo = '"+ui.item.cod+"'");
        }
        var geome = select_query("select ST_AsGeoJSON(geom) from catastro.u_terreno_registros where codigo = '"+codigoterreno+"'");
        var geojsonprueba = JSON.parse(geome[0]); 
        var coord = geojsonprueba.coordinates[0][0];
        var feat = new ol.Feature({
            geometry: new ol.geom.Polygon([coord])
        });
        feat.getGeometry().transform('EPSG:4326','EPSG:3857');
        var geom = feat.getGeometry();
        
        /*highlightfeatures.setStyle(PredioStyle);
        var markerSourcenoph = highlightfeatures.getSource();
        markerSourcenoph.clear();
        markerSourcenoph.addFeature(feat); */

        if (markerPredio) {
            map.removeLayer(markerPredio);
        }
        var vectorSource = new ol.source.Vector({
            features: [feat] // Asegurarse de que es un array
        });

        // Crear el nuevo layer vectorial
        markerPredio = new ol.layer.Vector({
            source: vectorSource,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "rgba(255,0,0,1)",
                    lineDash: null,
                    lineCap: 'butt',
                    lineJoin: 'miter',
                    width: 2
                }),
                fill: new ol.style.Fill({
                    color: "rgba(255,178,178,0.2)"
                })
            })
        });
        map.addLayer(markerPredio);

        ppExtent = geom.getExtent();
        ppExtent[0] = ppExtent[0] - 40;
        ppExtent[2] = ppExtent[2] + 40;
        ppExtent[1] = ppExtent[1] - 40;
        ppExtent[3] = ppExtent[3] + 40;

        var featureCenter = ol.extent.getCenter(ppExtent);
        view.setCenter(featureCenter);
        view.fit(ppExtent, map.getSize());

        try{
            if(datosr1.length <= 1){
                if(tableref=='registros'){
                var propietario = datosr1[0][3];
                var documento = datosr1[0][5];
                }
                else if(tableref=='terrenos'){
                var propietario = datosr1[0][14];
                var documento = datosr1[0][17];
                }
            }
            else if(datosr1.length > 1){
                var propietarios = []; 
                for (i = 0; i < datosr1.length; i++) { 
                  if(tableref=='registros'){                  
                    propietarios.push({              
                        prop: datosr1[i][3],
                        doc: datosr1[i][5]
                    });
                  }
                  else if(tableref=='terrenos'){
                    console.log("terrenos");               
                    propietarios.push({              
                        prop: datosr1[i][14],
                        doc: datosr1[i][17]
                    });
                  }
                }
                var propietario = propietarios.map(function(item) {
                    return item.prop;
                }).join(", ");
                var documento = propietarios.map(function(item) {
                    return item.doc;
                }).join(", ");
            }
        }
        
        catch(err){
            var propietario = "Sin información";
            var documento = "Sin información";
        }
        
        try{
          if(tableref=='registros'){
            var direccion = datosr1[0][4];
            var areat = parseInt(datosr1[0][8]);
            var areac = parseInt(datosr1[0][9]);
            var avaluo = datosr1[0][10];
            var destino = datosr1[0][7];
            var matricula = datosr1[0][11];
          }
          else if(tableref=='terrenos'){
            var direccion = datosr1[0][19];
            var areat = parseInt(datosr1[0][8]);
            var areac = parseInt(datosr1[0][9]);
            var avaluo = datosr1[0][10];
            var destino = datosr1[0][7];
            var matricula = datosr1[0][11];
          }
        }
        catch(err){
            var direccion = "Sin Información";
            var areat = "Sin Información";
            var areac = "Sin Información";
            var avaluo = "Sin Información";
            var destino = "Sin Información";
            var matricula = "Sin Información";
        }   
        try{
           var codigo_ant = select_query("select codigo_ant from catastro.u_terreno_registros where codigo = '"+codigoterreno+"'");
           //console.log(codigo_ant);
           if(codigo_ant == null){
            var codigo_ant = select_query("select codigo_ant from catastro.r_terreno_registros where codigo = '"+codigoterreno+"'");
           }
        }
        catch(err){
            var codigo_ant = "sin información";
        }
        //console.log(codigo_ant);
        /*var tabledinamic = document.getElementById("table-dynamic");
        tabledinamic.innerHTML = "";*/
        var table = document.getElementById("tblatt");
        table.innerHTML = "";                                 
        var select = [];
        var sel = [];
        var imag = [];
        var stv = [];
        var ig = [];
        select[0] = "<b>Dirección: </b>";
        select[1] = "<b>Código: </b>";
        select[2] = "<b>Código Anterior: </b>";
        select[3] = "<b>Propietario/s: </b>";
        select[4] = "<b>Documento/s: </b>";
        select[5] = "<b>Área de Terreno: </b>";
        select[6] = "<b>Área Construida: </b>";
        select[7] = "<b>Avalúo: </b>"; 
        select[8] = "<b>Destino Económico: </b>"; 
        select[9] = "<b>Matricula inmobiliaria: </b>";
        select[10] = "<b>Tipo de avalúo: </b>";
        
        sel[0] = ui.item.direccion;
        sel[1] = ui.item.cod;
        sel[2] = codigo_ant;
        sel[3] = propietario;
        sel[4] = documento;
        sel[5] = areat + " m2";
        sel[6] = areac + " m2";
        sel[7] = "$" + formatNumber(avaluo); 
        sel[8] = destino;
        sel[9] = matricula;
        sel[10]  = tipoaval;

        for (i = 0; i < select.length; i++) {
            row = table.insertRow(i);
            cell1 = row.insertCell(0);
            cell2 = row.insertCell(1);
            cell1.innerHTML = select[i];
            cell2.innerHTML = sel[i];
         } 
            document.getElementById("panel_atr").style.display = "block";
        }
        catch(err){
            //alert("No se encontro información geografica asociada a la consulta, es posible que se trate de un predio en Omisión, a continuación se muestran los datos de la tabla de registro");
            Swal.fire({
                title: 'No se encontro información geografica asociada a la consulta',
                text: 'Es posible que se trate de un predio en Omisión, a continuación se muestran los datos de la tabla de registro',
                icon: 'info',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#013F6C'
              });
            //console.log(datosr1);
            try{
                var direccion = datosr1[0][6];
                var propietario = datosr1[0][3];
                var documento = datosr1[0][5];
                var areat = parseInt(datosr1[0][8]);
                var areac = parseInt(datosr1[0][9]);
                var avaluo = datosr1[0][10];
                var destino = datosr1[0][7];
                var matricula = datosr1[0][11];
            }
            catch(err){
                var direccion = "Sin información";
                var areat = "Sin información";
                var areac = "Sin información";
                var avaluo = "Sin información";
                var destino = "Sin información";
                var matricula = "Sin información";
                var propietario = "Sin información";
                var documento = "Sin información";
            }
            
            /*var tabledinamic = document.getElementById("table-dynamic");
            tabledinamic.innerHTML = "";*/
            var table = document.getElementById("tblattmz");
            table.innerHTML = "";                                       
            var select = [];
            var sel = [];
            var imag = [];
            var stv = [];
            var ig = [];       
            select[0] = "<b>Dirección: </b>";
            select[1] = "<b>Código: </b>";
            select[2] = "<b>Propietario/s: </b>";
            select[3] = "<b>Documento/s: </b>";
            select[4] = "<b>Área de Terreno: </b>";
            select[5] = "<b>Área Construida: </b>";
            select[6] = "<b>Avalúo: </b>"; 
            select[7] = "<b>Destino Económico: </b>"; 
            select[8] = "<b>Matricula inmobiliaria: </b>";
            select[9] = "<b>Tipo de avalúo: </b>";        
            sel[0] = direccion;
            sel[1] = ui.item.cod;
            sel[2] = propietario;
            sel[3] = documento;
            sel[4] = areat + " m2";
            sel[5] = areac + " m2";
            sel[6] = "$" + formatNumber(avaluo); 
            sel[7] = destino;
            sel[8] = matricula;
            sel[9] = tipoaval;                                 
            for (i = 0; i < select.length; i++) {
                row = table.insertRow(i);
                cell1 = row.insertCell(0);
                cell2 = row.insertCell(1);
                cell1.innerHTML = select[i];
                cell2.innerHTML = sel[i];
             }
                document.getElementById("panel_mz").style.display = "block";
                vistainicial();
            }
        }   
}


function mostrardatosmult(dire){
    dire = "'" + dire + "'";
    var dirr = document.getElementById(eval(dire)).innerHTML;        
    try{
        var view = map.getView();
        try{
        var datosr1 = select_query("select * from catastro.r1 where direccion ilike '"+dirr+"'");
        var codigo = datosr1[0][1];
        var tablerefer = "registros";
        }
        catch(err){
          var datosr1 = select_query("select * from catastro.u_terreno_registros where direccion ilike '"+dirr+"'");
          var codigo = datosr1[0][2];
          var tablerefer = "terrenos";
        }
        var codph = codigo.slice(21, 22);
        if(codph == '9' || codph == '8'){
            var codigoterreno = codigo.slice(0, 9) + '0000' + codigo.slice(13, 26) + '0000';
            var tipoaval = "Predio en propiedad horizontal o condominio";
        }
        else if(codph == '5'){
            var codigoterreno = codigo.slice(0, 9) + '0000' + codigo.slice(13, 21) + '000000000';
            var tipoaval = "Mejora (Construcción en predio ajeno)";
        }
        else{
            var codigoterreno = codigo;
            var tipoaval = "No PH";
        }
        
        var geome = select_query("select ST_AsGeoJSON(geom) from catastro.u_terreno_registros where codigo = '"+codigoterreno+"'");

        var geojsonprueba = JSON.parse(geome[0]); 
        var coord = geojsonprueba.coordinates[0][0];
        var feat = new ol.Feature({
            geometry: new ol.geom.Polygon([coord])
        });
        feat.getGeometry().transform('EPSG:4326','EPSG:3857');
        var geom = feat.getGeometry();
        
            /*highlightfeatures.setStyle(PredioStyle);
            var markerSourcenoph = highlightfeatures.getSource();
            markerSourcenoph.clear();
            markerSourcenoph.addFeature(feat);*/
            
            if (markerPredio) {
                map.removeLayer(markerPredio);
            }
            var vectorSource = new ol.source.Vector({
                features: [feat] // Asegurarse de que es un array
            });
    
            // Crear el nuevo layer vectorial
            markerPredio = new ol.layer.Vector({
                source: vectorSource,
                style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: "rgba(255,0,0,1)",
                        lineDash: null,
                        lineCap: 'butt',
                        lineJoin: 'miter',
                        width: 2
                    }),
                    fill: new ol.style.Fill({
                        color: "rgba(255,178,178,0.2)"
                    })
                })
            });
            map.addLayer(markerPredio);

            ppExtent = geom.getExtent();
            ppExtent[0] = ppExtent[0] - 40;
            ppExtent[2] = ppExtent[2] + 40;
            ppExtent[1] = ppExtent[1] - 40;
            ppExtent[3] = ppExtent[3] + 40;
    
            var featureCenter = ol.extent.getCenter(ppExtent);
            view.setCenter(featureCenter);
            view.fit(ppExtent, map.getSize());
    
            try{
                if(datosr1.length <= 1){
                var propietario = datosr1[0][3];
                var documento = datosr1[0][5];
                }
                else if(datosr1.length > 1){
                    var propietarios = []; 
                    for (i = 0; i < datosr1.length; i++) {                   
                        propietarios.push({              
                            prop: datosr1[i][3],
                            doc: datosr1[i][5]
                        });
                    }
                    var propietario = propietarios.map(function(item) {
                        return item.prop;
                    }).join(", ");
                    var documento = propietarios.map(function(item) {
                        return item.doc;
                    }).join(", ");
                }
            }
            
            catch(err){
                var propietario = "Sin información";
                var documento = "Sin información";
            }
            
            if(tablerefer == "registros"){
                try{
                    var direccion = datosr1[0][6];
                    var areat = parseInt(datosr1[0][8]);
                    var areac = parseInt(datosr1[0][9]);
                    var avaluo = datosr1[0][10];
                    var destino = datosr1[0][7];
                    var matricula = datosr1[0][11];
                }
                catch(err){
                    var direccion = "Sin Información";
                    var areat = "Sin Información";
                    var areac = "Sin Información";
                    var avaluo = "Sin Información";
                    var destino = "Sin Información";
                    var matricula = "Sin Información";
                }   
            }
            else if(tablerefer == "terrenos"){
                var direccion = datosr1[0][18];
                var areat = parseInt(datosr1[0][9]);
                var areac = parseInt(datosr1[0][10]);
                var avaluo = datosr1[0][11];
                var destino = datosr1[0][8];
                var matricula = datosr1[0][17];
            }

            try{
               var codigo_ant = select_query("select codigo_ant from catastro.u_terreno_registros where codigo = '"+codigoterreno+"'");
               //console.log(codigo_ant);
               if(codigo_ant == null){
                var codigo_ant = select_query("select codigo_ant from catastro.r_terreno_registros where codigo = '"+codigoterreno+"'");
               }
            }
            catch(err){
                var codigo_ant = "sin información";
            }
            //console.log(codigo_ant);
            var tabledinamic = document.getElementById("table-dynamic");
            tabledinamic.innerHTML = "";
            var table = document.getElementById("tblatt");
            table.innerHTML = "";                                 
            var select = [];
            var sel = [];
            var imag = [];
            var stv = [];
            var ig = [];
            select[0] = "<b>Dirección: </b>";
            select[1] = "<b>Código: </b>";
            select[2] = "<b>Código Anterior: </b>";
            select[3] = "<b>Propietario/s: </b>";
            select[4] = "<b>Documento/s: </b>";
            select[5] = "<b>Área de Terreno: </b>";
            select[6] = "<b>Área Construida: </b>";
            select[7] = "<b>Avalúo: </b>"; 
            select[8] = "<b>Destino Económico: </b>"; 
            select[9] = "<b>Matricula inmobiliaria: </b>";
            select[10] = "<b>Tipo de avalúo: </b>";
            
            sel[0] = direccion;
            sel[1] = codigoterreno;
            sel[2] = codigo_ant;
            sel[3] = propietario;
            sel[4] = documento;
            sel[5] = areat + " m2";
            sel[6] = areac + " m2";
            sel[7] = "$" + formatNumber(avaluo); 
            sel[8] = destino;
            sel[9] = matricula;
            sel[10]  = tipoaval;
              
            for (i = 0; i < select.length; i++) {
                row = table.insertRow(i);
                cell1 = row.insertCell(0);
                cell2 = row.insertCell(1);
                cell1.innerHTML = select[i];
                cell2.innerHTML = sel[i];
             } 
                document.getElementById("panel_atr").style.display = "block";
            }
            catch(err){
                //alert("No se encontro información geografica asociada a la consulta, es posible que se trate de un predio en Omisión, a continuación se muestran los datos de la tabla de registro");
                //console.log(datosr1);
                Swal.fire({
                    title: 'No se encontro información geografica asociada a la consulta',
                    text: 'Es posible que se trate de un predio en Omisión, a continuación se muestran los datos de la tabla de registro',
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#013F6C'
                  });
                try{
                    var direccion = datosr1[0][6];
                    var propietario = datosr1[0][3];
                    var documento = datosr1[0][5];
                    var areat = parseInt(datosr1[0][8]);
                    var areac = parseInt(datosr1[0][9]);
                    var avaluo = datosr1[0][10];
                    var destino = datosr1[0][7];
                    var matricula = datosr1[0][11];
                }
                catch(err){
                    var direccion = "Sin información";
                    var areat = "Sin información";
                    var areac = "Sin información";
                    var avaluo = "Sin información";
                    var destino = "Sin información";
                    var matricula = "Sin información";
                    var propietario = "Sin información";
                    var documento = "Sin información";
                }
                
                var tabledinamic = document.getElementById("table-dynamic");
                tabledinamic.innerHTML = "";
                var table = document.getElementById("tblatt");
                table.innerHTML = "";                                       
                var select = [];
                var sel = [];
                var imag = [];
                var stv = [];
                var ig = [];       
                select[0] = "<b>Dirección: </b>";
                select[1] = "<b>Código: </b>";
                select[2] = "<b>Propietario/s: </b>";
                select[3] = "<b>Documento/s: </b>";
                select[4] = "<b>Área de Terreno: </b>";
                select[5] = "<b>Área Construida: </b>";
                select[6] = "<b>Avalúo: </b>"; 
                select[7] = "<b>Destino Económico: </b>"; 
                select[8] = "<b>Matricula inmobiliaria: </b>";
                select[9] = "<b>Tipo de avalúo: </b>";        
                sel[0] = direccion;
                sel[1] = codigoterreno;
                sel[2] = propietario;
                sel[3] = documento;
                sel[4] = areat + " m2";
                sel[5] = areac + " m2";
                sel[6] = "$" + formatNumber(avaluo); 
                sel[7] = destino;
                sel[8] = matricula;
                sel[9] = tipoaval;                                 
                for (i = 0; i < select.length; i++) {
                    row = table.insertRow(i);
                    cell1 = row.insertCell(0);
                    cell2 = row.insertCell(1);
                    cell1.innerHTML = select[i];
                    cell2.innerHTML = sel[i];
                 }
                    document.getElementById("panel_atr").style.display = "block";
                    vistainicial();   
        }                                                            
}





