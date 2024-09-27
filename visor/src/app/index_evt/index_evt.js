function comparacion()
{ 
    actividad("comparación de imagenes");
    document.getElementById('marco4').style.width = '100%';
    document.getElementById('marco4').style.height = '100%';
    document.getElementById('marco4').style.display = 'block';
    document.getElementById("marco4").src = "./control/comp/compare.html?mun=p8gf7hj";
    document.getElementById("panel_iframe").style.display = "block";
    document.getElementById("tituloModal3D").innerHTML = "Comparación Multitemporal";
}

function cerrariframe() {
    document.getElementById("marco2").style.display = "none";
    document.getElementById("closeframe").style.display = "none";
    document.getElementById("grupoherramientas").style.display = "block";
}

function vistainicial(){
   var pgetextent = [-8361081.855184, 397777.568603, -7571524.554926, 806478.065083];
   map.getView().fit(pgetextent, map.getSize());
}

function descargarmapa(){
    actividad("Ver mapa en pdf");
    var plano = document.getElementById("gpdf").value;
    var opt = document.getElementById("gmapas").value;
    document.getElementById("marco").style.display = 'block';
    if(opt == 'invvial'){
     document.getElementById("marco").src = 'pdfs/inventario_vial/'+plano+'.pdf';
    }
    else if(opt == 'pot'){
        document.getElementById("marco").src = 'pdfs/pot/'+plano+'.pdf';
    }
}

function mostrar(consulta) {
    document.getElementById("myDropdown").style.display='none';  
    document.getElementById('barra_sitio').style.display = 'none'; 
    document.getElementById('barra_manzana').style.display = 'none';
    document.getElementById('barra_direccion').style.display = 'none';
    document.getElementById('barra_codigo').style.display = 'none';   
    document.getElementById('barra_matricula').style.display = 'none';
    document.getElementById('barra_propietario').style.display = 'none';
    document.getElementById('barra_id_propietario').style.display = 'none';
    document.getElementById('direccion').value = "";
    //document.getElementById('address1').value = "";
    document.getElementById('propietarios').value = "";
    document.getElementById('cedul').value = ""; 
    document.getElementById('manzana').value = "";
    document.getElementById('matricula').value = "";
    document.getElementById('direccion').value = "";
    document.getElementById('codigo').value = "";
    if (consulta === 'consulta_direccion') {
        document.getElementById('barra_direccion').style.display = 'flex';
    } else if (consulta === 'consulta_sitio') {
        document.getElementById('barra_sitio').style.display = 'flex';
    } else if (consulta === 'consulta_propietario') {
        document.getElementById('barra_propietario').style.display = 'flex';
    } else if (consulta === 'consulta_id_propietario') {
        document.getElementById('barra_id_propietario').style.display = 'flex';
    } else if (consulta === 'consulta_codigo') {
        document.getElementById('barra_codigo').style.display = 'flex';
    } else if (consulta === 'consulta_matricula') {
        document.getElementById('barra_matricula').style.display = 'flex';
    } else if (consulta === 'consulta_manzana') {
        document.getElementById('barra_manzana').style.display = 'flex';
    }
}

function limpiar() {
    //actividad("limpiar mapa");
	document.getElementById('marco').style.display = 'none';
	document.body.style.cursor = "default";            
    document.getElementById('panel_atr').style.display = 'none';
    document.getElementById('panel_mz').style.display = 'none';
    document.getElementById('panel_iframe').style.display = 'none';
    document.getElementById('EstatModal').style.display = 'none';
    document.getElementById('marco4').style.display = 'none';
    document.getElementById('marco5').style.display = 'none';
    document.getElementById('container3').style.display = 'none';
    document.getElementById('containerhc1').style.display = 'none';
    document.getElementById('containerhc2').style.display = 'none'; 
    try{
        for (var b = 0; b< capasr.length; b++){
            capasr[b].values_.visible = false;
        }
        for (var c = 0; c< capasd.length; c++){
          if(capasd[c].values_.name!=='u_terreno_registros'){
            capasd[c].values_.visible = false;
          }
        }
        for (var d = 0; d< capasort.length; d++){
            capasort[d].values_.visible = false;
        }
        for (var e = 0; e< capasmdt.length; e++){
            capasmdt[e].values_.visible = false;
        }
        for (var f = 0; f< capasdan.length; f++){
            capasdan[f].values_.visible = false;
        }
        for (var g = 0; g< capasres.length; g++){
            capasres[g].values_.visible = false;
        }
        for (var h = 0; h< capaspg.length; h++){
            capaspg[h].values_.visible = false;
        }
    }
    catch(err){}
    try{
        /*wmsCapa.values_.visible = false;*/
        capaloadwms.setVisible(false)
    }
    catch(err){}
    try{    
        var markerSource = highlightfeatures.getSource();
        markerSource.clear();
        markerSource.addFeature();
    }
    catch(err){}
    try{  
        var markerSource2 = highlight.getSource();
        markerSource2.clear();
        markerSource2.addFeature();
    }
    catch(err){}
    try{
        mapTematic.setVisible(false);
    }
    catch(err){}
    if (markerSitio) {
        map.removeLayer(markerSitio);
    }
    if (vectorLayer) {
        map.removeLayer(vectorLayer);
    }
    if (markerPredio) {
        map.removeLayer(markerPredio);
    }
}

function metadatos() {
 window.open("http://35.202.214.242:8080/geonetwork");
}

function phselect(ui) {
    var view = map.getView();
    try {
    var feat = ui[0].feature;
    }
    catch (err) {
     //alert("No existe poligono geográfico asociado a este código catastral");
     Swal.fire({
        title: 'No existe poligono geográfico asociado a este código catastral',
        text: '',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
    }
    var geom = feat.getGeometry();    
    //console.log(coord);
    
    highlightfeatures.setStyle(PredioStyle);
    var markerSourceAlineamiento = highlightfeatures.getSource();
    markerSourceAlineamiento.clear();
    markerSourceAlineamiento.addFeature(feat);
    ppExtent = geom.getExtent();
    ppExtent[0] = ppExtent[0] - 40;
    ppExtent[2] = ppExtent[2] + 40;
    ppExtent[1] = ppExtent[1] - 40;
    ppExtent[3] = ppExtent[3] + 40;
    var featureExtent = geom.getExtent();
    var featureCenter = ol.extent.getCenter(ppExtent);
    view.setCenter(featureCenter);
    view.fitExtent(ppExtent, map.getSize());
    var viewResolution = map.getView().getResolution();
}

function busqueda(id) {
//document.getElementById('barra_busqueda_direccion').style.display = 'none';
    document.getElementById('barra_busqueda_matricula').style.display = 'none';
    document.getElementById('barra_codigo').style.display = 'none';
    document.getElementById('barra_alineamiento').style.display = 'none';
    document.getElementById('barra_predioshasusos').style.display = 'none';
    document.getElementById('matricula').value = "";
    document.getElementById('direccion').value = "";
    document.getElementById('codigo').value = "";
    document.getElementById('cedul').value = "";
    document.getElementById('propietarios').value = "";
    document.getElementById('input_ladomanzana').value = "";
    document.getElementById('direccion_gestor').value = "";
    if (id === "propietar") {
        document.getElementById('direccion_gestor').style.display = 'none';
        document.getElementById('codigo').style.display = 'none';
        document.getElementById('cedul').style.display = 'none';
        document.getElementById('barra_codigo').style.display = 'block';
        document.getElementById('propietarios').style.display = 'block';
    } else if (id === "cedula") {
        document.getElementById('direccion_gestor').style.display = 'none';
        document.getElementById('propietarios').style.display = 'none';
        document.getElementById('codigo').style.display = 'none';
        document.getElementById('barra_codigo').style.display = 'block';
        document.getElementById('cedul').style.display = 'block';
    } else if (id === "personalizada1") {
        document.getElementById('barra_busqueda_matricula').style.display = 'block';
    } else if (id === "personalizada2") {
        document.getElementById('direccion_gestor').style.display = 'none';
        document.getElementById('propietarios').style.display = 'none';
        document.getElementById('cedul').style.display = 'none';
        document.getElementById('barra_codigo').style.display = 'block';
        document.getElementById('codigo').style.display = 'block';
    } else if (id === "alineamiento") {
        document.getElementById('barra_alineamiento').style.display = 'block';
    } else if (id === "Usos_Permitidos") {
        document.getElementById('barra_predioshasusos').style.display = 'block';
    } else if (id === "boton_geocoder") {
        document.getElementById('propietarios').style.display = 'none';
        document.getElementById('cedul').style.display = 'none';
        document.getElementById('codigo').style.display = 'none';
        document.getElementById('barra_codigo').style.display = 'block';
        document.getElementById('direccion_gestor').style.display = 'none';
        document.getElementById('tabladir').style.display = 'block';
    }
}

function cerrar_menu() {
    document.getElementById('mensaje').style.display = 'none';
    document.getElementById('botones').style.display = 'none';
    document.getElementById('barra_codigo').style.display = 'none';
    // document.getElementById('barra_busqueda_direccion').style.display = 'none';
    document.getElementById('barra_busqueda_matricula').style.display = 'none';
    document.getElementById('cerrar_submenu').style.display = 'none';
    document.getElementById('cerrar_submenu_cafe').style.display = 'none';
    document.getElementById('cerrar_submenu_verde').style.display = 'none';
    document.getElementById('boton_capas').style.display = 'none';
    document.getElementById('submenu').style.display = 'none';
    document.getElementById('boton_principal').style.display = 'block';
    document.getElementById('lupa_pequeña').style.display = 'none';
    document.getElementById('busqueda_personalizada').style.display = 'none';
    document.getElementById('transicion_capas').style.display = 'none';
    document.getElementById('herramientas').style.display = 'none';
}
$(document).ready(function () {
    $('#marco').load(function () {
        $(this).contents().find("img").css({'height': '100%', 'width': '100%'});
        //$(this).contents().find("img").css({'background-color':'red','font-weight':'bolder','color':'white'});
    });
    $('#marco2').load(function () {
        $(this).contents().find("img").css({'height': '100%', 'width': '100%'});
    });
});
function open_streetview() {
    document.getElementById('marco').style.display = 'block';
    document.getElementById('botoncerrarstreetview').style.display = 'block';
    //document.getElementById('marco2').style.display = 'block';
    //document.getElementById('mover_streetview').style.display = 'block';
    //document.getElementById('label_street').style.display = 'block';
}/*
 function close_streetview() {
 console.log(algo);
 //console.log(algo);
 //algo = 'none';
 //document.getElementById('marco').style.display = 'none';
 }*/
function lista() {
    //document.getElementById("panelbarra").style.display = 'block';
    //document.getElementById("myDropdown").classList.toggle("show");
    if(document.getElementById("myDropdown").style.display == 'block'){
      document.getElementById("myDropdown").style.display = 'none';
    }
    else{
      document.getElementById("myDropdown").style.display = 'block';   
    }
    
}

function abrir_manual() {
    document.getElementById("documentos").style.display = 'block';
      //window.open('./documentos/manual.pdf', '_blank');
        
}

function cerrar_documentos(){
document.getElementById("documentos").style.display = 'none';
}

function ocultarstreetview() {
    document.getElementById("marco").style.display = "none";  
    document.getElementById("botoncerrarstreetview").style.display = "none";
    document.getElementById("botonmostrarstreetview").style.display = "block";
}

function mostrarstreetview() {
    document.getElementById("marco").style.display = "block"; 
    document.getElementById("botoncerrarstreetview").style.display = "block";
    document.getElementById("botonmostrarstreetview").style.display = "none";
}

function ocultarstatistics() {
    document.getElementById("botonmostrarstatistics").style.display = "block";
    document.getElementById("botonocultarstatistics").style.display = "none";
    document.getElementById("statistics").style.display = "none";
}

function mostrarstatistics() {
    document.getElementById("statistics").style.display = "block";
    document.getElementById("botonmostrarstatistics").style.display = "none";
    document.getElementById("botonocultarstatistics").style.display = "block";
    //document.getElementById('mensaje').style.display = 'none';
}

function ocultarpanelatributos() {
  try{  
    document.getElementById("panel_atr").style.display = "none";
  }
  catch(err){}
  try{
    document.getElementById("panel_infwms").style.display = "none";
  }
  catch(err){}
  try{
    document.getElementById("panel_iframe").style.display = "none";
  }
  catch(err){}
  try{
    document.getElementById("panelDownloadwms").style.display = "none";
  }
  catch(err){}
  try{
    document.getElementById("panel_mz").style.display = "none";
  }
  catch(err){}
}

function ocultarpanelatributosstatics(){
    document.getElementById("botonmaximizar").style.display = "block";
    document.getElementById("contenedorg").style.display = "none";
}

function mostrarpanelatributos() {
    document.getElementById("contenedorg").style.display = "block";  
    document.getElementById("botonmaximizar").style.display = "none";
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

function habilitar(id, value)
{
    if (document.getElementById(id).checked === true)
    {
        document.getElementById(value).style.display = "block";
    } else {
        document.getElementById(value).style.display = "none";
    }
}

function existeUrl(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status !== 404;
}

function ajaxRequest() {
    try {
        var request = new XMLHttpRequest();
    } catch (e1) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e2) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e3) {
                request = false;
            }
        }
    }
    return request;
}

function formatNumber(n) {
    n = String(n).replace(/\D/g, "");
    return n === '' ? n : Number(n).toLocaleString();
}

function cambiarPestanna(pestannas,pestanna) { 
    if (pestanna.id == 'pestana1'){
        document.getElementById("cpestana1").style.display = "block";
        document.getElementById("cpestana2").style.display = "none";
        document.getElementById("pestana1").style.backgroundColor = "#EAC102";
        document.getElementById("pestana2").style.backgroundColor = "#A9A9A9";
    }
    else if (pestanna.id == 'pestana2'){ 
        document.getElementById("cpestana2").style.display = "block";
        document.getElementById("cpestana1").style.display = "none";
        document.getElementById("pestana2").style.backgroundColor = "#EAC102";
        document.getElementById("pestana1").style.backgroundColor = "#A9A9A9";
    }   
}

var measureVector = "";

/*function medir() {
    actividad("realizar medición");
    if (document.getElementById("medidas").style.display == "block") {
        document.getElementById("medidas").style.display = "none";
        map.removeInteraction(draw);
        var tooltips = document.querySelectorAll('.tooltip.hidden');
        tooltips.forEach(function(tooltip) {
           tooltip.style.display = 'none';
        });
        measureVector.setVisible(false);
        try{
            var tooltips = document.querySelectorAll('.tooltip.tooltip-static');
            tooltips.forEach(function(tooltip) {
               tooltip.style.display = 'none';
           });
           }
        catch(err){}
    } 
    else {
        document.getElementById("medidas").style.display = "block";
        var source = new ol.source.Vector();
        var vector = new ol.layer.Vector({
            source: source,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });

        var sketch;
        var helpTooltipElement;
        var helpTooltip;
        var measureTooltipElement;
        var measureTooltip;
        var continuePolygonMsg = 'Click para añadir punto';
        var continueLineMsg = 'Click para añadir punto';
        var pointerMoveHandler = function (evt) {
            if (evt.dragging) {
                return;
            }
            

            var helpMsg = 'Click para añadir punto';

            if (sketch) {
                var geom = (sketch.getGeometry());
                if (geom instanceof ol.geom.Polygon) {
                    var helpMsg = continuePolygonMsg;
                } else if (geom instanceof ol.geom.LineString) {
                    helpMsg = continueLineMsg;
                }
            }

            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(evt.coordinate);
            if (document.getElementById("medidas").style.display == "block") {
                helpTooltipElement.classList.remove('hidden');
            }
        };

        map.on('pointermove', pointerMoveHandler);
        map.getViewport().addEventListener('mouseout', function () {
            helpTooltipElement.classList.add('hidden');
        });

        var typeSelect = document.getElementById('medidas');
        var formatLength = function (line) {
            var length;
            length = Math.round(line.getLength() * 100) / 100;
            var output;
            if (length > 1000) {
                output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
            } 
            else {
               output = Number(Math.round(length * 100) / 100).toLocaleString('de-DE') + ' ' + 'm';
            }
            return output;
        };

        var formatArea = function (polygon) {
            var area;
            area = Math.round(polygon.getArea() * 100) / 100;
            var output;
            if (area > 1000000) {
                output = (Math.round(area / 1000000 * 100) / 100) +
                ' ' + 'km<sup>2</sup>';
            } 
            else {
               output = Number(Math.round(area * 100) / 100).toLocaleString('de-DE') +
                       ' ' + 'm<sup>2</sup>';
            }
            return output;
        };

        function addInteraction() {
            var radioSelect = $('input[name=gender]:checked', '#medidas').val();
            var type = (radioSelect == 'area' ? 'Polygon' : 'LineString');
            draw = new ol.interaction.Draw({
                source: source,
                type: type,
                //estilo poligono area
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    //estilo poligono linea
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.5)',
                        lineDash: [10, 10],
                        width: 2
                    }),
                    image: new ol.style.Circle({
                        radius: 5,
                        stroke: new ol.style.Stroke({
                            color: 'rgba(0, 0, 0, 0.7)'
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 255, 0.2)'
                        })
                    })
                })
            });
            map.addInteraction(draw);

            var sourceForMeasureDrawing = new ol.source.Vector();

            measureVector = new ol.layer.Vector({
                source: source,
                name:'medicion2dmap',
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffcc33',
                        width: 2
                    }),
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: '#ffcc33'
                        })
                    })
                })
            });

            map.addLayer(measureVector);

            createMeasureTooltip();
            createHelpTooltip();

            var listener;
            draw.on('drawstart',
                    function (evt) {
                        // set sketch
                        sketch = evt.feature;

                        var tooltipCoord = evt.coordinate;

                        listener = sketch.getGeometry().on('change', function (evt) {
                            var geom = evt.target;
                            var output;
                            if (geom instanceof ol.geom.Polygon) {
                                output = formatArea(geom);
                                tooltipCoord = geom.getInteriorPoint().getCoordinates();
                            } else if (geom instanceof ol.geom.LineString) {
                                output = formatLength(geom);
                                tooltipCoord = geom.getLastCoordinate();
                            }
                            measureTooltipElement.innerHTML = output;
                            measureTooltip.setPosition(tooltipCoord);
                        });
                    }, this);

            draw.on('drawend',
                    function () {

                        measureTooltipElement.className = 'tooltip tooltip-static';
                        measureTooltip.setOffset([0, -7]);
                        // unset sketch
                        sketch = null;
                        // unset tooltip so that a new one can be created
                        measureTooltipElement = null;
                        createMeasureTooltip();
                        ol.Observable.unByKey(listener);

                    }, this);
        }


        function createHelpTooltip() {
            if (helpTooltipElement) {
                helpTooltipElement.parentNode.removeChild(helpTooltipElement);
            }
            helpTooltipElement = document.createElement('div');
            helpTooltipElement.className = 'tooltip hidden';
            helpTooltip = new ol.Overlay({
                element: helpTooltipElement,
                offset: [15, 0],
                positioning: 'center-left'
            });
            map.addOverlay(helpTooltip);
        }


        function createMeasureTooltip() {
            if (measureTooltipElement) {
                measureTooltipElement.parentNode.removeChild(measureTooltipElement);
            }
            measureTooltipElement = document.createElement('div');
            measureTooltipElement.className = 'tooltip tooltip-measure';
            measureTooltip = new ol.Overlay({
                element: measureTooltipElement,
                offset: [0, -15],
                positioning: 'bottom-center'
            });
            map.addOverlay(measureTooltip);
        }

        
        typeSelect.onchange = function () {
            map.removeInteraction(draw);
            addInteraction();
        };
        addInteraction();
        // var vector = highlightfeatures.getSource();
    }
}*/

// Variables globales para tooltips
var measureTooltipElement;
var measureTooltip;
var helpTooltipElement;
var helpTooltip;
var sketch;  // para la geometría actual
var measureVector;  // para la capa de medición
var draw;  // para la interacción de dibujo


function medir() {
    actividad("realizar medición");
    if (document.getElementById("medidas").style.display == "block") {
        document.getElementById("medidas").style.display = "none";
        $('#botonMedir').removeClass('iconInfActive').addClass('iconInf');
        
        // Remover la interacción de dibujo
        map.removeInteraction(draw);
        
        // Remover las geometrías de la capa vectorial
        measureVector.getSource().clear();

        // Ocultar tooltips
        var tooltips = document.querySelectorAll('.tooltip.hidden');
        tooltips.forEach(function(tooltip) {
           tooltip.style.display = 'none';
        });

        // Remover la capa de medición si ya no se necesita
        map.removeLayer(measureVector);

        // Intentar ocultar cualquier tooltip estático restante
        try {
            var staticTooltips = document.querySelectorAll('.tooltip.tooltip-static');
            staticTooltips.forEach(function(tooltip) {
               tooltip.style.display = 'none';
            });
        } catch (err) {
            console.error("Error al intentar ocultar tooltips estáticos:", err);
        }
        
    } else {
        document.getElementById("medidas").style.display = "block";

        $('#botonMedir').removeClass('iconInf').addClass('iconInfActive');
        
        // Crear una nueva fuente y capa vectorial
        var source = new ol.source.Vector();
        measureVector = new ol.layer.Vector({
            source: source,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });

        map.addLayer(measureVector);
        addInteraction();  // Llamar a la función para agregar la interacción de dibujo
    }
}

// Función para actualizar la interacción de dibujo
function addInteraction() {
    var radioSelect = document.querySelector('input[name="gender"]:checked').value;
    var type = (radioSelect === 'area') ? 'Polygon' : 'LineString';
    
    // Remover la interacción anterior si existe
    if (draw) {
        map.removeInteraction(draw);
    }

    // Crear la nueva interacción de dibujo
    draw = new ol.interaction.Draw({
        source: measureVector.getSource(),
        type: type,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 0, 0.5)',
                lineDash: [10, 10],
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.7)'
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                })
            })
        })
    });
    
    map.addInteraction(draw);
    
    var listener;

    draw.on('drawstart', function (evt) {
        sketch = evt.feature;
        var tooltipCoord = evt.coordinate;

        // Crear un nuevo measureTooltipElement para cada medición
        createMeasureTooltip();

        listener = sketch.getGeometry().on('change', function (evt) {
            var geom = evt.target;
            var output;
            if (geom instanceof ol.geom.Polygon) {
                output = formatArea(geom);
                tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof ol.geom.LineString) {
                output = formatLength(geom);
                tooltipCoord = geom.getLastCoordinate();
            }

            // Asegurarse de que measureTooltipElement esté definido
            if (measureTooltipElement) {
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
            }
        });
    });

    draw.on('drawend', function () {
        measureTooltipElement.className = 'tooltip tooltip-static';
        measureTooltip.setOffset([0, -7]);
        sketch = null;
        measureTooltipElement = null;
        ol.Observable.unByKey(listener);
    });
}

// Escuchar el cambio en los radio buttons para actualizar la interacción
document.querySelectorAll('input[name="gender"]').forEach(function(elem) {
    elem.addEventListener('change', function() {
        if (document.getElementById("medidas").style.display == "block") {
            addInteraction();  // Actualizar la interacción cuando se cambia el tipo de medición
        }
    });
});



// Funciones adicionales
function formatLength(line) {
    var length = Math.round(line.getLength() * 100) / 100;
    var output;
    if (length > 1000) {
        output = (Math.round(length / 1000 * 100) / 100) + ' km';
    } else {
        output = Number(Math.round(length * 100) / 100).toLocaleString('de-DE') + ' m';
    }
    return output;
}

function formatArea(polygon) {
    var area = Math.round(polygon.getArea() * 100) / 100;
    var output;
    if (area > 1000000) {
        output = (Math.round(area / 1000000 * 100) / 100) + ' km<sup>2</sup>';
    } else {
        output = Number(Math.round(area * 100) / 100).toLocaleString('de-DE') + ' m<sup>2</sup>';
    }
    return output;
}

function createMeasureTooltip() {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'tooltip tooltip-measure';
    measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
    });
    map.addOverlay(measureTooltip);
}

function createHelpTooltip() {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'tooltip hidden';
    helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
    });
    map.addOverlay(helpTooltip);
}







/*function medir_off() {
    map.removeInteraction(draw);
    draw.values_.active = false;
    document.getElementById("boton_medir").style.display = "none";
    document.getElementById("boton_medir_off").style.display = "block";  
    document.getElementById("medidas").style.display = "none";
}*/

function mostraredicion() {
   document.getElementById("boton_menuedicion_off").style.display = "block";
   document.getElementById("boton_menuedicion").style.display = "none";
   document.getElementById("menu_edicion").style.display = "block";
   poligonosedicion.setVisible(true);
}

function ocultaredicion() {
    document.getElementById("boton_menuedicion").style.display = "block";
    document.getElementById("boton_menuedicion_off").style.display = "none";  
    document.getElementById("menu_edicion").style.display = "none";  
    map.removeInteraction(interaction);
    interactionSelect.getFeatures().clear();
    map.removeInteraction(interactionSelect);
}

function actlin(foto) {
        PSV.clearMarkers();

PSV.addMarker({

/*id: 'flecha',
      x: 4043,
      y: 2335,
      /*flecha_rad: [
        [6.072759010604292, -1.3639841393632546] ],*/
   /*   image: 'flecha_adelante.png',
      width: 36,
      height: 36,
      anchor: 'bottom center',
      tooltip: '<b>Siguiente Foto</b>',
      //content: alert("listo")
    */
});

if(texty3 == 0){
textx1 = textx;
textx2 = textx;
textx3 = textx;
texty1 = 3905;
texty2 = 3905;
texty3 = 3905;
}       

PSV.addMarker({

      // polyline marker
  /*    id: 'eje' + Math.random(),

      polyline_px: [
        [textx, 3905], [textx, 2493], [textx, 2320], [textx1, texty1],
[textx2, texty2], [textx3, texty3]
      ],
      svgStyle: {
        stroke: 'rgba(140, 190, 10, 0.7)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '4px'
      },
      tooltip: 'Eje Vial'*/

  });


  try{
 var nummark = search2("pasadena:totalmarcas", foto);
   }
        catch (err) {
    }

for (i = 0; i < nummark.length; i++) {
PSV.addMarker({
    id: '#' + Math.random(),
    x: nummark[i][0],
    y: nummark[i][1],
    circle: 5,
    svgStyle: {
    fill       : 'rgba(0, 0, 0, 0.5)',
    stroke     : '#ff0000',
    strokeWidth: '2px'
},
    tooltip: 'Haga clic para ver los atributos',
    data: {
      generated: true
    }
  });

}
}

function giropsv(giropsv) {
    var currZoom = map.getView().getZoom();
    currZoom = Math.round(currZoom);
    var res2 = [parseFloat(fotopan2[0][4]), parseFloat(fotopan2[0][5])]; 
    var heading = parseFloat(fotopan2[0][3]);
    //console.log(heading);
    var featpsv = new ol.Feature({
        geometry: new ol.geom.Point(res2)
    });
    var geom = featpsv.getGeometry();
    var view = map.getView();
    
    var markerSource = highlightfeatures.getSource();
    var escala = "";
    //console.log(currZoom);
    if(currZoom == 21){
        escala = 0.40;
    }
    else if(currZoom == 20){
        escala = 0.30;
    }
    else if(currZoom == 19){
        escala = 0.20;
    }
    else if(currZoom == 18){
        escala = 0.10;
    }
    else if(currZoom < 18){
        escala = 0.05;
    }
    //console.log(escala); 
    map.on('moveend', function(e) {
    if(document.getElementById("marco5").style.display == 'block'){
        var newZoom = map.getView().getZoom();
        //console.log(newZoom);
        if (currZoom != newZoom) {
            if(newZoom == 21){
                escala = 0.40;
                 
            }
            else if(newZoom == 20){
                escala = 0.30;
                
            }
            else if(newZoom == 19){
                escala = 0.20;
                
            }
            else if(newZoom == 18){
                escala = 0.10;
                
            }
            else if(currZoom < 18){
                escala = 0.05;        
            }  
        }  
          //console.log(escala);
          iconpsvgiro.image_.scale_ = escala;

          iconpsvgiro = new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                opacity: 0.75,
                scale: escala,
                rotation: rotacion,
                src: './imagenes/psvgiros.png'
                })
            });      
                street1.image_.scale_ = escala + 0.6;
                street2.image_.scale_ = escala + 0.6;
                street3.image_.scale_ = escala + 0.6;
                street4.image_.scale_ = escala + 0.6;
                street5.image_.scale_ = escala + 0.6;
                street6.image_.scale_ = escala + 0.6;
                street7.image_.scale_ = escala + 0.6;
                street8.image_.scale_ = escala + 0.6;
                street9.image_.scale_ = escala + 0.6;
                street10.image_.scale_ = escala + 0.6;
                street11.image_.scale_ = escala + 0.6;
                street12.image_.scale_ = escala + 0.6;
                street13.image_.scale_ = escala + 0.6;
                street14.image_.scale_ = escala + 0.6;
                street15.image_.scale_ = escala + 0.6;
                street16.image_.scale_ = escala + 0.6;
        
            markerSource.clear();
            
            highlightfeatures.setStyle(iconpsvgiro);
            markerSource.addFeature(featpsv); 
        }    
    });

    if(heading<0){
        heading = heading * (-1);
    }
    if(heading>=360){
        heading = heading - 360;
    }
    //console.log(heading);
    if (heading >= 0 && heading < 90) {
        var rotacion = giropsv + 4.32;
      }
      else if(heading >= 90 && heading < 180){
        var rotacion = giropsv + 6.15; 
      }
      else if(heading >= 180 && heading < 270){
        var rotacion = giropsv + 6.7176;
      }
      else if(heading >= 270 && heading < 360){
        var rotacion = giropsv + 2.7217;
      }
    //console.log(heading);
    
    var iconpsvgiro = new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            opacity: 0.75,
            scale: escala,
            rotation: rotacion,
            src: './imagenes/psvgiros.png'
        })
    });
    //console.log(iconpsvgiro);
    markerSource.clear();
    
    highlightfeatures.setStyle(iconpsvgiro);
    markerSource.addFeature(featpsv);
}

function mapposi(coord, giro) {
    //console.log(coord);
    var coo = coord.toString(function () {
        return(this.lat(), this.lng());
    });
    var res = coo.substr(1, coo.length - 2).split(",");
    var a = res[0];
    res[0] = +res[1];
    res[1] = +a;
    var feat = new ol.Feature({
        geometry: new ol.geom.Point(res)
    });
    feat.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    var geom = feat.getGeometry();
    var view = map.getView();
    //view.setCenter(geom.getFirstCoordinate());
    //view.setZoom(19);
    
    var markerSource = highlight.getSource();
    markerSource.clear();
    if (giro >= 348.75 && giro <= 11.25) {
        highlight.setStyle(street1);
        console.log(street1);
    } else if (giro >= 11.25 && giro <= 33.75) {
        highlight.setStyle(street2);
    } else if (giro >= 33.75 && giro <= 56.25) {
        highlight.setStyle(street3);
    } else if (giro >= 56.25 && giro <= 78.75) {
        highlight.setStyle(street4);
    } else if (giro >= 78.75 && giro <= 101.25) {
        highlight.setStyle(street5);
    } else if (giro >= 101.25 && giro <= 123.75) {
        highlight.setStyle(street6);
    } else if (giro >= 123.75 && giro <= 146.25) {
        highlight.setStyle(street7);
    } else if (giro >= 146.25 && giro <= 168.75) {
        highlight.setStyle(street8);
    } else if (giro >= 168.75 && giro <= 191.25) {
        highlight.setStyle(street9);
    } else if (giro >= 191.25 && giro <= 213.75) {
        highlight.setStyle(street10);
    } else if (giro >= 213.75 && giro <= 236.25) {
        highlight.setStyle(street11);
    } else if (giro >= 236.25 && giro <= 258.75) {
        highlight.setStyle(street12);
    } else if (giro >= 258.75 && giro <= 281.25) {
        highlight.setStyle(street13);
    } else if (giro >= 281.25 && giro <= 303.75) {
        highlight.setStyle(street14);
    } else if (giro >= 303.75 && giro <= 326.25) {
        highlight.setStyle(street15);
    } else if (giro >= 326.25 && giro <= 348.75) {
        highlight.setStyle(street16);
    }
    markerSource.addFeature(feat);
}

function cerrarOtros(){
    document.getElementById("panelbarra").style.display = 'none';
}


function cargarmultip(){
    if (document.getElementById('marco3').style.display == 'block'){
        document.getElementById('marco3').style.display = 'none';
    }
    else{
    document.getElementById('marco3').style.display = 'block';
    document.getElementById('marco3').src = "../geocod.html";   
    }
}

function eliminarCookies() {
    document.cookie.split(";").forEach(function(c) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");       
})}

function cerrarsesion(){
    eliminarCookies();
    window.location.href="../index.html";
}

function datoscapas(datosc){
    var layer = findBy(map.getLayerGroup(), 'name', datosc);
    var ruta = layer.values_.source.params_.LAYERS; 
    //document.getElementById("labelTablaDescargarwms").innerHTML = datosc;
    // Contenedor para el select y el botón
    var contenedor = document.getElementById("contenedorSelectYBoton");
    contenedor.innerHTML = ""; // Limpia el contenedor
    var rutalayer = JSON.stringify(ruta);
    var lshp = "lshp";
    var lshplayer = JSON.stringify(lshp);
    var lkml = "lkml";
    var lkmllayer = JSON.stringify(lkml);
    var lcsv = "lcsv";
    var lcsvlayer = JSON.stringify(lcsv);
    var selectHTML = "<div class='main'>" +
                    "<div class='up'>" +
                    "<button class='card1' onclick='copiarwms("+rutalayer+")'>" +
                    "<i class='fa-regular fa-clipboard' style='color:#000000'></i><br>" +
                    "&nbsp;wms</button>" +
                    "<button class='card2' onclick='descargarcapas("+rutalayer+", "+lshplayer+")'>" +
                    "<i class='fa-solid fa-vector-square' style='color:#000000'></i><br>" +
                    "&nbsp;shp</button>" +
                    "</div>" +
                    "<div class='down'>" +
                    "<button class='card3' onclick='descargarcapas("+rutalayer+", "+lkmllayer+")'>" +
                    "<i class='fa-solid fa-route' style='color:#000000'></i><br>" +
                    "&nbsp;kml</button>" +
                    "<button class='card4' onclick='descargarcapas("+rutalayer+", "+lcsvlayer+")'>" +
                    "<i class='fa-regular fa-file-excel' style='color:#000000'></i><br>" +
                    "&nbsp;csv</button>" +
                    "</div>" +
                    "</div>";

    contenedor.innerHTML += selectHTML;  
    document.getElementById("panelDownloadwms").style.display = "block";
}

function copiarwms(datosc){	
    actividad("copiar wms " + datosc + "");
    //var text = "https://www.geomonsas.xyz:8443/geoserver/buenaventura/"+datosc+"/wms?";
    var text = "http://35.232.57.213:8080/geoserver/buenaventura/"+datosc+"/wms?";
    console.log(text);
    document.getElementById("inputinvisible").value=text;
    var copyText = document.getElementById("inputinvisible");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    Swal.fire({
        title: 'El wms de la capa: <br><b>' + datosc + ' </b><br>fue copiado en el portapapeles',
        text: '',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
      /*var text = "https://www.geomonsas.xyz:8443/geoserver/buenaventura/" + datosc + "/wms?";
      var inputInvisible = document.getElementById("inputinvisible");
      inputInvisible.value = text;
      
      navigator.clipboard.writeText(text).then(function() {
          Swal.fire({
              title: 'El WMS de la capa: <br><b>' + datosc + '</b><br>fue copiado en el portapapeles',
              text: '',
              icon: 'info',
              confirmButtonText: 'Aceptar'
          });
      }).catch(function(error) {
          console.error('Error al copiar el texto: ', error);
          Swal.fire({
              title: 'Error',
              text: 'No se pudo copiar el texto al portapapeles',
              icon: 'error',
              confirmButtonText: 'Aceptar'
          });
      });*/

      //var idNombreLayer=datosc.split(":");
    // console.log(datosc,idNombreLayer);
    
}


function descargarcapas(datosc, tipo){
   console.log(datosc, tipo);
   var mi_ventana = window.open("");
   mi_ventana.addEventListener('onload',()=>{
   });
   function cierra_mi_ventana(){
       mi_ventana.close();
   }
   if (tipo == 'lshp') {    
    mi_ventana.location.href = "https://www.geomonsas.xyz:8443/geoserver/buenaventura/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="+datosc+"&outputFormat=SHAPE-ZIP";    
    actividad("descargar shp " + datosc + "");
   }    
   else if (tipo == 'lkml') {
     mi_ventana.location.href = "https://www.geomonsas.xyz:8443/geoserver/buenaventura/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="+datosc+"&outputFormat=application/vnd.google-earth.kml+xml";   
     actividad("descargar kml " + datosc + "");
   }
   else if (tipo == 'lcsv') {
     mi_ventana.location.href = "https://www.geomonsas.xyz:8443/geoserver/buenaventura/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="+datosc+"&outputFormat=csv";  
     actividad("descargar csv " + datosc + "");
   }
   try{
    sleep(20000);
   }
   catch(err){}
   //cierra_mi_ventana();
}

function NumText(string){//solo letras y numeros
    var out = '';
    //Se añaden las letras validas
    var filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890';//Caracteres validos
	
    for (var i=0; i<string.length; i++)
       if (filtro.indexOf(string.charAt(i)) != -1) 
	     out += string.charAt(i);
    return out;
}

function mostrarContrasena(){
    var tipo = document.getElementById("passchang");
    if(tipo.type == "password"){
        tipo.type = "text";
    }else{
        tipo.type = "password";
    }
}

//function enviarnuevacontrasena(){
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('enviarnuevacontrasena').addEventListener('click', function(event) {
    event.preventDefault();
    var newpass = document.getElementById("passchang").value;
    if(newpass.length < 4){
        Swal.fire({
            title: 'Debe ingresar alguna contraseña',
            text: '',
            icon: 'info',
            confirmButtonText: 'Aceptar'
          });       
    }
    else{
        let token = localStorage.getItem('jwt');
        let decoded = parseJwt(token);
        let useract = decoded.sub;
        var bcrypt = dcodeIO.bcrypt;
        var salt = bcrypt.genSaltSync(12); // 10 es el número de rondas de salting
        var hash = bcrypt.hashSync(newpass, salt);
        var datosUser = select_query("select email, nombre from usuario where usuario = '"+ useract +"'");
        update_query("update usuario set contrasena = '"+hash+"' where usuario = '"+useract+"'");
        let htmlContent = `<p style="font-size: 14px; color: #000000">Hola <b>${datosUser[0][1]}</b></p><p style="font-size: 14px; color: #000000">Su contraseña ha sido modificada y sus nuevas credenciales para acceder a la plataforma WebGis Buenaventura son:</p><p style="font-size: 14px; color: #000000">Usuario: <a style="font-size: 14px; color: #000066;"><b> ${useract}</b></a></p><p style="font-size: 14px; color: #000000">Contraseña: <a style="font-size: 14px; color: #000066;"><b>${newpass}</b></a></p><p><a style="font-size: 14px; color: #000000">el link de acceso es: </a>webgis-buenaventura.com</p>`;  
        fetch('https://us-central1-risaralda-324519.cloudfunctions.net/send_email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ from: "soportewebgis@gmail.com", to: datosUser[0][0], subject: "Cambio de Contraseña en plataforma WebGis Buenaventura", text: htmlContent, isHtml: true})
          })
            .then(response => response.text()).then(data => {
                Swal.fire({
                    title: 'La nueva contraseña fue guardada y se envio al correo electrónico:',
                    //text: '' + datosUser[0][0] + '',
                    html: '<div style="text-align: center;" class="roboto-medium">' + datosUser[0][0] + '</div>',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                  }); 
            }).catch(error => {
              Swal.fire({
                title: 'No se pudo enviar el correo electrónico a:',
                text: '' + datosUser[0][0] + '',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
              }); 
            }); 
        document.getElementById("cambiarcontrasena").style.display = "none";
        $('.modal-backdrop').remove();
    }
});
});
//}

function llenarlistmapas(){
    if(document.getElementById("gmapas").value == 'seleccione'){
     document.getElementById("seglist").style.display = 'none';
    }
    else if(document.getElementById("gmapas").value == 'invvial'){
     document.getElementById("seglist").style.display = 'block';
     var tb = select_query("select codigo, categoria, nombre_del_plano from mapas_pdf where categoria = 'inventario vial'");
     var select = document.getElementById("gpdf");
     select.options.length = 0;
     for(var i=0; i < tb.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = tb[i][2]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
     }
    }
    else if(document.getElementById("gmapas").value == 'pot'){
     document.getElementById("seglist").style.display = 'block';
     var tb = select_query("select codigo, categoria, nombre_del_plano from mapas_pdf where categoria = 'pot'");
     var select = document.getElementById("gpdf");
     select.options.length = 0;
     for(var i=0; i < tb.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = tb[i][2]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
     }
    }
}

function openmanual(){
    /*document.getElementById("marco").style.display = 'block';
    document.getElementById("marco").src = "./pdfs/Manual_Usuario.pdf";*/
}

function openmdt(){   
    document.getElementById('only2d').style.top = '2em';
    document.getElementById('only2d').style.display = 'block';
    document.getElementById('marco4').style.display = 'block';
    document.getElementById('marco4').style.top = '0px';
    document.getElementById('marco4').style.width = '100%';
    document.getElementById('marco4').style.height = '100%';
    document.getElementById('marco4').src = "../3D/visor3d/index.html?mun="+mun+"";
}

function openmdtpart(){ 
    actividad("visor 3D");
    document.getElementById('marco4').style.width = '100%';
    document.getElementById('marco4').style.height = '100%';
    document.getElementById('marco4').style.display = 'block';
    document.getElementById('marco4').src = "../3D/visor3d/index.html?mun=p8gf7hj";
    document.getElementById("panel_iframe").style.display = "block";
    document.getElementById("tituloModal3D").innerHTML = "Visor 3D";
}

function cerrar3d(){
    document.getElementById('only2d').style.display = 'none';
    document.getElementById('marco4').style.display = 'none';
}

function openRepository(){
    document.getElementById("foldersrepo").innerHTML = "";
    document.getElementById("descargarInforepo").disabled = true;
    var select = document.getElementById("foldersrepo");
    document.getElementById("descargarInforepo").disabled = true;
    if (mun == 'marsella' || mun == 'la_celia' || mun == 'santa_rosa'){
        var option = document.createElement("option");
        option.innerHTML = "Seleccionar...";
        select.appendChild(option);
        var option = document.createElement("option");
        option.innerHTML = "Cártografia Básica";
        option.value = "CARTOGRAFIA_BASICA";
        select.appendChild(option);
        var option = document.createElement("option");
        option.innerHTML = "Cártografia Temática";
        option.value = "CARTOGRAFIA_TEMATICA";
        select.appendChild(option);
        var option = document.createElement("option");
        option.innerHTML = "Raster";
        option.value = "RASTER";
        select.appendChild(option);
    }
    else{
        //alert("No se ha configurado un repositorio para el municipio de: "+ mun);
        Swal.fire({
            title: 'No se ha configurado un repositorio para el municipio',
            text: '',
            icon: 'info',
            confirmButtonText: 'Aceptar'
          });
    }
}

function verInforepo(){
    document.getElementById("downloadInforepo").innerHTML = "";
    document.getElementById("descargarInforepo").disabled = true;
    if(document.getElementById("foldersrepo").value == 'CARTOGRAFIA_BASICA'){
        document.getElementById("downloadInforepo").style.display = "block";
        var select = document.getElementById("downloadInforepo");
        var option = document.createElement("option");
        option.innerHTML = "Carto_General_25K.gdb.rar";
        select.appendChild(option);
        option.value = "Carto_General_25K.gdb.rar";
        var option = document.createElement("option");
        option.innerHTML = "Carto_General_5k.gdb.rar";
        option.value = "Carto_General_5k.gdb.rar";
        select.appendChild(option);
    }
    else if(document.getElementById("foldersrepo").value == 'CARTOGRAFIA_TEMATICA'){
        document.getElementById("downloadInforepo").style.display = "block";
        var select = document.getElementById("downloadInforepo");
        var option = document.createElement("option");
        if(mun == 'marsella'){
            option.innerHTML = "GDB_EOT_MARSELLA.gdb.rar";
            select.appendChild(option);
            option.value = "GDB_EOT_MARSELLA.gdb.rar";
        }
        else if(mun == 'la_celia'){
            option.innerHTML = "GDB_EOT_LA_CELIA.gdb.rar";
            select.appendChild(option);
            option.value = "GDB_EOT_LA_CELIA.gdb.rar";
        }
        else if(mun == 'santa_rosa'){
            option.innerHTML = "GDB_EOT_SANTA_ROSA.gdb.rar";
            select.appendChild(option);
            option.value = "GDB_EOT_SANTA_ROSA.gdb.rar";
        }
    }
    else if(document.getElementById("foldersrepo").value == 'RASTER'){
        document.getElementById("downloadInforepo").style.display = "block";
        var select = document.getElementById("downloadInforepo");
        if(mun == 'marsella'){
            var option = document.createElement("option");
            option.innerHTML = "DEM_Alto_Cauca.rar";
            select.appendChild(option);
            option.value = "DEM_Alto_Cauca.rar";
            var option = document.createElement("option");
            option.innerHTML = "DEM_EL_Kiosco.rar";
            select.appendChild(option);
            option.value = "DEM_EL_Kiosco.rar";
            var option = document.createElement("option");
            option.innerHTML = "DEM_El_Rayo.rar";
            select.appendChild(option);
            option.value = "DEM_El_Rayo.rar";
            var option = document.createElement("option");
            option.innerHTML = "DEM_Estacion_pereira.rar";
            select.appendChild(option);
            option.value = "DEM_Estacion_pereira.rar";
            var option = document.createElement("option");
            option.innerHTML = "DEM_Marsella_25k.tif";
            select.appendChild(option);
            option.value = "DEM_Marsella_25k.tif";
            var option = document.createElement("option");
            option.innerHTML = "DEM_Marsella_cabecera.rar";
            select.appendChild(option);
            option.value = "DEM_Marsella_cabecera.rar";
            var option = document.createElement("option");
            option.innerHTML = "Ortofoto_Alto_Cauca.rar";
            select.appendChild(option);
            option.value = "Ortofoto_Alto_Cauca.rar";
            var option = document.createElement("option");
            option.innerHTML = "Ortofoto_El_Kiosco.rar";
            select.appendChild(option);
            option.value = "Ortofoto_El_Kiosco.rar";
            var option = document.createElement("option");
            option.innerHTML = "Ortofoto_El_Rayo.rar";
            select.appendChild(option);
            option.value = "Ortofoto_El_Rayo.rar";
            var option = document.createElement("option");
            option.innerHTML = "Ortofoto_Estacion_Pereira.rar";
            select.appendChild(option);
            option.value = "Ortofoto_Estacion_Pereira.rar";
            var option = document.createElement("option");
            option.innerHTML = "Ortofoto_Marsella_Cabecera.rar";
            select.appendChild(option);
            option.value = "Ortofoto_Marsella_Cabecera.rar";
            var option = document.createElement("option");
            option.innerHTML = "relieve_sombreado_alto_cauca.rar";
            select.appendChild(option);
            option.value = "relieve_sombreado_alto_cauca.rar";
            var option = document.createElement("option");
            option.innerHTML = "relieve_sombreado_el_kiosko.rar";
            select.appendChild(option);
            option.value = "relieve_sombreado_el_kiosko.rar";
            var option = document.createElement("option");
            option.innerHTML = "relieve_sombreado_el_rayo.rar";
            select.appendChild(option);
            option.value = "relieve_sombreado_el_rayo.rar";
            var option = document.createElement("option");
            option.innerHTML = "relieve_sombreado_estacion_pereira.rar";
            select.appendChild(option);
            option.value = "relieve_sombreado_estacion_pereira.rar";
            var option = document.createElement("option");
            option.innerHTML = "relieve_sombreado_marsella_cabecera.rar";
            select.appendChild(option);
            option.value = "relieve_sombreado_marsella_cabecera.rar";
        }
        else if(mun == 'la_celia'){
            var option = document.createElement("option");
            option.innerHTML = "Ortofoto_la_celia.rar";
            select.appendChild(option);
            option.value = "Ortofoto_la_celia.rar";
            var option = document.createElement("option");
            option.innerHTML = "relieve_sombreado_la_celia.rar";
            select.appendChild(option);
            option.value = "relieve_sombreado_la_celia.rar";
        }
        else if(mun == 'santa_rosa'){
            var option = document.createElement("option");
            option.innerHTML = "DEM_Espanol_florida.rar";
            select.appendChild(option);
            option.value = "DEM_Espanol_florida.rar";
            var option = document.createElement("option");
            option.innerHTML = "DEM_Las_mangas.rar";
            select.appendChild(option);
            option.value = "DEM_Las_mangas.rar";
            var option = document.createElement("option");
            option.innerHTML = "DEM_Santa_barbara.rar";
            select.appendChild(option);
            option.value = "DEM_Santa_barbara.rar";
            var option = document.createElement("option");
            option.innerHTML = "DEM_La_capilla.rar";
            select.appendChild(option);
            option.value = "DEM_La_capilla.rar";
            var option = document.createElement("option");
            option.innerHTML = "MDT_La_Florida.rar";
            select.appendChild(option);
            option.value = "MDT_La_Florida.rar";
            var option = document.createElement("option");
            option.innerHTML = "ORTO_SANTAROSA.tif";
            select.appendChild(option);
            option.value = "ORTO_SANTAROSA.tif";
            var option = document.createElement("option");
            option.innerHTML = "Ortofoto_Espanol.rar";
            select.appendChild(option);
            option.value = "Ortofoto_Espanol.rar";
            var option = document.createElement("option");
            option.innerHTML = "Ortofoto_La_capilla.rar";
            select.appendChild(option);
            option.value = "Ortofoto_La_capilla.rar";
            var option = document.createElement("option");
            option.innerHTML = "Ortofoto_La_florida.rar";
            select.appendChild(option);
            option.value = "Ortofoto_La_florida.rar";
            var option = document.createElement("option");
            option.innerHTML = "Ortofoto_Las_mangas.rar";
            select.appendChild(option);
            option.value = "Ortofoto_Las_mangas.rar";
            var option = document.createElement("option");
            option.innerHTML = "Ortofoto_Santa_barbara.rar";
            select.appendChild(option);
            option.value = "Ortofoto_Santa_barbara.rar";
        }
    }      
    document.getElementById("descargarInforepo").style.display = "block";
}

function descargarRepo(){
    var dataset = document.getElementById("foldersrepo").value;
    var capa = document.getElementById("downloadInforepo").value;
    window.open("https://storage.googleapis.com/"+mun+"/"+dataset+"/"+capa+"");
}

function activeButtonrepo(){
    document.getElementById("descargarInforepo").disabled = false;
}









