var highlightfeatures = new ol.layer.Vector({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#00FFFF',
            width: 3
        })
    }),
    source: new ol.source.Vector()
});

var capasprvias = select_query("select * from capas where layer = 'vias' order by id DESC");
//console.log(capasprvias);
var capaspotcasanare = select_query("select * from capas where layer = 'pot_casanare' order by id DESC");
var capascartobasica = select_query("select * from capas where layer = 'cartografia_basica' order by id DESC");
var capasmdts = select_query("select * from capas where layer = 'mdt' order by id DESC");
/*var capasdane = select_query("select * from capas where layer = 'dane' order by id DESC");
var capasrestitucion = select_query("select * from capas where layer = 'restitucion' order by id DESC");
var capaspgirs = select_query("select * from capas where layer = 'pgirs' order by id DESC");*/

var capasd = [];
var capasp = [];
var capasc = [];
var capasm = [];
/*var capasort = [];
var capasmdt = [];
var capasdan = [];
var capasres = [];
var capaspg = [];*/

try{
    for (i=0; i<capasprvias.length; i++){
        capasd[i] = new ol.layer.Tile({
            visible: false,
            source: new ol.source.TileWMS({
                url: capasprvias[i][1],
                params: {LAYERS: capasprvias[i][3], STYLES: ''},
                serverType: 'geoserver',
                crossOrigin: 'anonymous'
            }), name: capasprvias[i][3],
                group: 'INVENTARIO VIAL'
        });
    }
}
catch(err){}

try{
    for (i=0; i<capaspotcasanare.length; i++){
        capasp[i] = new ol.layer.Tile({
            visible: false,
            source: new ol.source.TileWMS({
                url: capaspotcasanare[i][1],
                params: {LAYERS: capaspotcasanare[i][3], STYLES: ''},
                serverType: 'geoserver',
                crossOrigin: 'anonymous'
            }), name: capaspotcasanare[i][3],
                group: 'INVENTARIO VIAL'
        });
    }
}
catch(err){}

try{
    for (i=0; i<capascartobasica.length; i++){
        capasc[i] = new ol.layer.Tile({
            visible: false,
            source: new ol.source.TileWMS({
                url: capascartobasica[i][1],
                params: {LAYERS: capascartobasica[i][3], STYLES: ''},
                serverType: 'geoserver',
                crossOrigin: 'anonymous'
            }), name: capascartobasica[i][3],
                group: 'CARTOGRAFÍA BÁSICA'
        });
    }
}
catch(err){}

try{
    for (i=0; i<capasmdts.length; i++){
        capasm[i] = new ol.layer.Tile({
            visible: false,
            source: new ol.source.TileWMS({
                url: capasmdts[i][1],
                params: {LAYERS: capasmdts[i][3], STYLES: ''},
                serverType: 'geoserver',
                crossOrigin: 'anonymous'
            }), name: capasmdts[i][3],
                group: 'MODELOS DIGITALES DE TERRENO'
        });
    }
}
catch(err){}

try{
    var openstreetmap = new ol.layer.Tile({ 
        source: new ol.source.XYZ({ 
            url:'http://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            crossOrigin: 'anonymous'
        }),
        visible: false,
        name:'Streetmap',
        group: 'BASE'
    });
}
catch(err){}

var bingstreetmap = new ol.layer.Tile({
    // source: new ol.source.OSM(),
    source: new ol.source.BingMaps({
     key: 'AmTXzzix65q59DqR4_iobPZa9sNRcXtL4gkAsH-uww3RYpVFHGGejnUQTJev9ixC',
     imagerySet:'Road'}),
     visible: false,
     //minResolution: 2,
     //maxResolution:20,
     name: 'Bing Street Map',
     crossOrigin: 'anonymous',
     group: 'BASE'
 });

var bingsatelite = new ol.layer.Tile({
    visible: false,
    //opacity: 0,
    source: new ol.source.BingMaps({
        key: 'AmTXzzix65q59DqR4_iobPZa9sNRcXtL4gkAsH-uww3RYpVFHGGejnUQTJev9ixC',
        imagerySet: 'Aerial'
    }), name: 'Satelite',
    crossOrigin: 'anonymous',
    group: 'BASE'
});


var binglabels = new ol.layer.Tile({
    visible: false,
    //opacity: 0,
    source: new ol.source.BingMaps({
        key: 'AmTXzzix65q59DqR4_iobPZa9sNRcXtL4gkAsH-uww3RYpVFHGGejnUQTJev9ixC',
        imagerySet: 'AerialWithLabelsOnDemand'
    }), name: 'Satelite con Etiquetas',
    group: 'BASE',
    crossOrigin: 'anonymous'
});

var googleSatLayer = new ol.layer.Tile({
    visible: false,
    source: new ol.source.XYZ({
        url: 'https://mt1.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}',
    }), name: 'Satelite alta resolución',
    crossOrigin: 'anonymous',
    group: 'BASE'
});



var layervias = new ol.layer.Group({
    layers: capasd,
    name: 'INVENTARIO VIAL'
});

var layerpotcasanare = new ol.layer.Group({
    layers: capasp,
    name: 'POT'
});

var layercartobasica = new ol.layer.Group({
    layers: capasc,
    name: 'CARTOGRAFÍA BÁSICA'
});

var layermdts = new ol.layer.Group({
    layers: capasm,
    name: 'MODELOS DIGITALES DE TERRENO'
});

var layerBase = new ol.layer.Group({
    layers: [openstreetmap, bingstreetmap, bingsatelite, binglabels, googleSatLayer],
    name: 'CAPAS BASE'
});

function buildLayerTree(layer) {
    var elem;
    //console.log(layer);
    var name = layer.get('name') ? layer.get('name') : "Group";
    if (name != 'Group') {
        if (layer.values_.visible == true && layer.get('name') != 'CAPAS') {
          	 var div = "<li data-layerid='" + name + "'id='"+name+"' class='roboto-medium' style='border-radius: 5px; margin-bottom:1em; margin-left:0em; margin-right:1.5em; background-color:#f2f2f2; padding:1em; padding-bottom:0px;'>" + "<span style='cursor:pointer;'><a style='margin-right: 0.5em;'>+</a></i>  " + layer.get('name') + "</span><br><br>"; 
        } else if (layer.get('name') == 'CAPAS') {
            var div = "<li data-layerid='" + name + "'id='"+name+"'>" + "<span><img src='image/" + layer.get('name') + ".png' height='0' width='0' onclick='viewlegend()'>" + "</span></div>";            
	    } 
        else {
            if(layer.values_.group == 'BASE'){
                var nombrelayer = JSON.stringify(name);
                var idNombreLayer=name.split(" ").join("");
                var div = "<li data-layerid='" + name + "'id='"+name+"' style='display: none;'>" 
                + "<span > "
                +"<i style='padding-right:0.3em;'"+ "id='sp"+idNombreLayer+"' class='fa fa-square-o fa-lg'></i> " 
                + layer.get('name') 
                + "</span>" 
                + "<div class='row'>"
                +"<div class='col-md-7 col-xs-7'><input type='range' class='opacity PB-range-slider' min='0' max='1' step='0.1' value='1'></div></div>"
                +"</div></div><br>";
            }
            else if(layer.values_.group == 'ORTOFOTOGRAFIAS' || layer.values_.group == 'MDTS'){
                var nombrelayer = JSON.stringify(name);
                var idNombreLayer=name.split(" ").join("");
                var div = "<li data-layerid='" + name + "'id='"+name+"' style='display: none;'>"
                + "<span > "
                +"<i style='padding-right:0.3em;'"+ "id='sp"+idNombreLayer+"' class='fa fa-square-o fa-lg'></i> " 
                + layer.get('name') 
                + "</span>" 
                + "<div class='row'>"
                +"<div class='col-md-7 col-xs-7'><input type='range' class='opacity PB-range-slider' min='0' max='1' step='0.1' value='1'></div></div>"
                +"<div class='row'><div class='col-md-1 col-xs-1'><button class='btn' onclick='infocapas(" + nombrelayer + ")' title='Obtener información de la capa' data-bs-toggle='tooltip'><a class='fa fa-info-circle fa-lg buttonDisable' id='" + idNombreLayer + "ic'></a></button></div>"
                +"<div class='col-md-1 col-xs-1'><button class='btn' onclick='copiarwms(" + nombrelayer + ")' title='Copiar wms en el portapapeles' data-bs-toggle='tooltip'><a class='fa fa-copy fa-lg buttonDisable' id='" + idNombreLayer + "vl'></a></button></div>"
                +"<div class='col-md-1 col-xs-1'><button class='btn' onclick='viewlegend(" + nombrelayer + ")' title='Ver leyenda de la capa' data-bs-toggle='tooltip'><a class='fa fa-image fa-lg buttonDisable' id='" + idNombreLayer + "vl'></a></button></div>"              
                +"</div></div><br>";
            }
            else{
                var lshp = JSON.stringify("lshp");
                var lcsv = JSON.stringify("lcsv");
                var nombrelayer = JSON.stringify(name);
                var idNombreLayer=name.split(" ").join("");
                var div = "<li data-layerid='" + name + "'id='"+name+"' style='display: none;'>" 
                + "<span > "
                +"<i style='padding-right:0.3em;'"+ "id='sp"+idNombreLayer+"' class='fa fa-square-o fa-lg'></i> " 
                + layer.get('name') 
                + "</span>" 
                + "<div class='row'>"
                +"<div class='col-md-7 col-xs-7'><input type='range' class='opacity PB-range-slider' min='0' max='1' step='0.1' value='1'></div></div>"
                +"<div class='row'><div class='col-md-1 col-xs-1'><button class='btn' onclick='infocapas(" + nombrelayer + ")' title='Obtener información de la capa' data-bs-toggle='tooltip'><a class='fa fa-info-circle fa-lg buttonDisable' id='" + idNombreLayer + "ic'></a></button></div>"
                +"<div class='col-md-1 col-xs-1'><button class='btn' onclick='viewlegend(" + nombrelayer + ")' title='Ver leyenda de la capa' data-bs-toggle='tooltip'><a class='fa fa-image fa-lg buttonDisable' id='" + idNombreLayer + "vl'></a></button></div>"
                +"<div class='col-md-1 col-xs-1'><button class='btn' onclick='copiarwms(" + nombrelayer + ")' title='Copiar wms en el portapapeles' data-bs-toggle='tooltip'><a class='fa fa-copy fa-lg buttonDisable' id='" + idNombreLayer + "vl'></a></button></div>"
                +"<div class='col-md-1 col-xs-1'><button class='btn' onclick='descargarcapas(" + nombrelayer + ", " + lshp + ")' title='Descargar capa en formato shape file' data-bs-toggle='tooltip'><a class='fa fa-download fa-lg buttonDisable' id='" + idNombreLayer + "vl'></a></button></div>"
                +"<div class='col-md-1 col-xs-1'><button class='btn' onclick='descargarcapas(" + nombrelayer + ", " + lcsv + ")' title='Descargar información alfanúmerica en formato csv' data-bs-toggle='tooltip'><a class='fa fa-file-csv fa-lg buttonDisable' id='" + idNombreLayer + "vl'></a></button></div>"
                /*+"<div class='col-md-1 col-xs-1'><button onclick='datoscapas(" + nombrelayer + ")' style='background-color: Transparent; background-repeat:no-repeat; border: none; cursor:pointer;  overflow: hidden;  outline:none;'><a class='fa fa-cloud-download fa-lg buttonDisable' id='" + idNombreLayer + "dc'></a></button></div>"*/
                +"</div></div><br>";
            }
        }
   
        if (layer.getLayers) {
            var sublayersElem = '';
            var layers = layer.getLayers().getArray(),
                    len = layers.length;
            //aca escondidos 5 layers temporales (geojson)
            //console.log(layers);
            for (var i = len - 1; i >= 0; i--) {
                if(buildLayerTree(layers[i])){
                sublayersElem += buildLayerTree(layers[i]);
               }
            }
            elem = div + " <ul style='list-style-type: none; padding: 0; margin-left: 2em;'>" + sublayersElem + "</ul></li>";
        } else {
            elem = div + " </li>";
        }
      //  console.log(layers);
        return elem;
    }
}


/**
 * Initialize the tree from the map layers
 * @returns {undefined}
 */
function initializeTree() {
    var elem = buildLayerTree(map.getLayerGroup());
    $('#layertree').empty().append(elem);
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('glyphicon-plus').removeClass('glyphicon-minus');
            this.firstChild.innerHTML = "<a class='fa fa-folder fa-lg' style='color:#515e69;'></a>";
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('glyphicon-minus').removeClass('glyphicon-plus');
            this.firstChild.innerHTML = "<a class='fa fa-folder-open fa-lg' style='color:#515e69;'></a>";
        }
        e.stopPropagation();
    });
}
/**
 * Finds recursively the layer with the specified key and value.
 * @param {ol.layer.Base} layer
 * @param {String} key
 * @param {any} value
 * @returns {ol.layer.Base}
 */
function findBy(layer, key, value) {
    if (layer.get(key) === value) {
        return layer;
    }
    // Find recursively if it is a group
    if (layer.getLayers) {
        var layers = layer.getLayers().getArray(),
                len = layers.length, result;
        for (var i = 0; i < len; i++) {
            result = findBy(layers[i], key, value);
            if (result) {
                return result;
            }
        }
    }
    return null;
}
$(document).ready(function () {
    initializeTree();
    //permitir mover el orden de los layers
    $('#layertree ul').sortable({
        // Opción para manejar el evento de cambio de posición
        update: function (event, ui) {
            // Obtener el nuevo orden de los elementos de la lista
            /*var originalLayersArray = map.getLayerGroup().getLayers().getArray();
            console.log(originalLayersArray);*/
            var sortedIDs = $(this).sortable('toArray', {attribute: 'data-layerid'});     
            // Crear un nuevo array para almacenar las nuevas capas en orden inverso
            var newLayersOrder = [];
            sortedIDs.reverse().forEach(function (layerId) { // Aquí se invierte el orden
                // Encontrar la capa por su nombre y agregarla al nuevo arreglo
                var layer = findBy(map.getLayerGroup(), 'name', layerId);
                if (layer) {
                    newLayersOrder.push(layer);
                }
            });          
            // Establecer el nuevo orden de las capas en el mapa de OpenLayers
            map.getLayerGroup().setLayers(new ol.Collection(newLayersOrder));
        }
    }).disableSelection();

    //Handle opacity slider control
    $('input.opacity').change('slide', function (ev) {
        var layername = $(this).closest('li').data('layerid');
        var layer = findBy(map.getLayerGroup(), 'name', layername);
        layer.setOpacity(Number(ev.target.value));
        
        //ortofoto2017.setOpacity(Number(this.value))
    });
    //Handle visibility control
    $('i').on('click', function () {
        var layername = $(this).closest('li').data('layerid');   //prender y apagar layer       
        var layer = findBy(map.getLayerGroup(), 'name', layername);
        layer.setVisible(!layer.getVisible());
        if (layer.getVisible()) {
            $(this).removeClass('fa fa-square-o').addClass('fa fa-check-square');
            actividad("activación de layer " + layername + "");
        } else {
            $(this).removeClass('fa fa-check-square').addClass('fa fa-square-o');
        }
    });

    function setLayerVisibilityByName(layersArray, layerName, visibility) {
        for (var i = 0; i < layersArray.length; i++) {
            if (layersArray[i].get('name') === layerName) {
                layersArray[i].setVisible(visibility);
                break;  // Salir del bucle una vez que se encuentra la capa
            }
        }
    }

    //u_terreno.setVisible(true);
    //capasd[14].setVisible(true);
    setLayerVisibilityByName(capasd, 'u_terreno_registros', true);
    openstreetmap.setVisible(true);
});

var datoswmsc ="";

function infocapas(datosc) {
    datoswmsc=datosc;
    actividad("ver datos " + datosc + "");
    $('#modal-title').text('INFORMACIÓN DE LA CAPA');
    var layer = findBy(map.getLayerGroup(), 'name', datosc);
    var idNombreLayer=datosc.split(" ").join("");
    if (document.body.style.cursor !== "help") {
        $('#'+idNombreLayer+'ic').removeClass('buttonDisable').addClass('buttonActive');
        //alert('Activó la consulta de información de la capa <b><br>'+datosc);
        Swal.fire({
            title: 'Activó la consulta de información de la capa: '+datosc,
            //text: 'Clic sobre el elemento para obtener información',
            html: '<div style="text-align: center;" class="roboto-medium">Clic sobre el elemento para obtener información</div>',
            icon: 'info',
            confirmButtonText: 'Aceptar'
          })

        document.body.style.cursor = "help";
        layer.setVisible(true);
        $('#sp'+idNombreLayer).removeClass('fa fa-check-square').addClass('fa fa-check-square'); 
    } else {
        if($('#'+idNombreLayer+'ic').hasClass('buttonActive')){
            $('#'+idNombreLayer+'ic').removeClass('buttonActive').addClass('buttonDisable');
            document.body.style.cursor = "default";
            // layer.setVisible(false);
            document.getElementById("panel_atr").style.display = "none";
        }
    }
}


function viewlegend(datosc){
    $('#modal-title').text('LEYENDA DE LA CAPA');
    var layer = findBy(map.getLayerGroup(), 'name', datosc);
    var ruta = layer.values_.source.params_.LAYERS;
    actividad("ver leyenda " + ruta + "");
    if(datosc == 'Mapa01_Cambios_de_Uso1997'){
     var serv = 'https://www.geomonsas.xyz:8443/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=234&HEIGHT=350&LAYER='+ ruta;
    }
    else{
     var serv = 'https://www.geomonsas.xyz:8443/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER='+ ruta;
    }
    var table = document.getElementById("tblattwms");
    table.innerHTML = "";
    document.getElementById("table-dynamic").innerHTML = "";
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.colSpan = 2;
    cell1.innerHTML = "<H5 style='tex'><b>LEYENDA</b></H5>";
    var row = table.insertRow(1);
    var cell2 = row.insertCell(0);
    cell2.colSpan = 2;
    cell2.innerHTML = "<img src='"+serv+"'>";                                    
    document.getElementById("panel_infwms").style.display = "block";
    //document.getElementById("botonminimizar").style.display = "block";
}

function filterLayers() {
    var input = document.getElementById('searchLayer');
    var filter = input.value.toUpperCase();
    var ul = document.getElementById("layertree");
    var li = ul.getElementsByTagName('li');
    var foundMatch = false; // Variable para rastrear si se encontró alguna coincidencia

    for (var i = 0; i < li.length; i++) {
        var a = li[i].getElementsByTagName("span")[0];
        if (a) {
            var txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = ""; // Mostrar el elemento coincidente
                foundMatch = true;
                // Asegúrate de que todos los elementos padre también se muestren
                var parent = li[i].parentNode;
                while (parent && parent !== ul) {
                    if (parent.style) parent.style.display = "";
                    parent = parent.parentNode;
                }
            } else {
                li[i].style.display = "none"; // Ocultar los que no coinciden
            }
        }
    }

    // Si no se encontraron coincidencias y el campo de búsqueda está vacío, restablece la vista
    if (!foundMatch && !filter) {
        for (var i = 0; i < li.length; i++) {
            li[i].style.display = "";
        }
    }
}




