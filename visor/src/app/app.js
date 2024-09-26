var url = 'https://www.geomonsas.xyz:8443/geoserver/ows?';
var featurePrefix = 'buenaventura';
var featureType = ['u_terreno_registros', 'buenaventura_360'];
var featureNS = 'http://buenaventura.co';
var srsName = 'EPSG:4326';
var geometryName = 'geom';
var geometryType = 'MultiPolygon';
var fields = ['*'];
var infoFormat = 'application/vnd.ogc.gml/3.1.1';
var zoom = 8;
var wms360 = "";
var codigopredio = "";
var center = [-8007494, 601379];

var proj = new ol.proj.Projection({
    code: 'http://www.opengis.net/gml/srs/epsg.xml#4326',
    axis: 'enu'
});

conteo = 1;
wfsupdate = "";
var format = [];
var wmsSource = [];
var wms_layer = [];
var markerPredio = "";

function putgif() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 0);
        document.getElementById('carga2').style.display = "block";
    });
}

function quitgif() {
    document.getElementById('carga2').style.display = "none";
}

var rangoarea = async function (x) { // async function expression assigned to a variable
    await putgif();
    await rango(x);
    await quitgif();
};

for (var i = 0; i <= featureType.length - 1; i++) {
    format[i] = new ol.format.GML({ featureNS: featureNS, featureType: featureType[i] });
    wmsSource[i] = new ol.source.TileWMS({
        url: url,
        params: {
            'LAYERS': featurePrefix + ':' + featureType[i],
            'TILED': true
        },
        serverType: 'geoserver'
    });
};

var highlight = new ol.layer.Vector({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#00FFFF',
            width: 3
        })
    }),
    source: new ol.source.Vector()
});


var highlighdrawp = new ol.layer.Vector({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#00FFFF',
            width: 3
        })
    }),
    source: new ol.source.Vector()
});
var highlighdrawl = new ol.layer.Vector({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#00FFFF',
            width: 3
        })
    }),
    source: new ol.source.Vector()
});
var highlighdrawm = new ol.layer.Vector({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#00FFFF',
            width: 3
        })
    }),
    source: new ol.source.Vector()
});


var markStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        //opacity: 0.75,
        scale: 0.25,
        src: './imagenes/marca.png'
    })
});

var PuntoStyle = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 10,
        stroke: new ol.style.Stroke({
            color: 'white',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: '#00FFFF'
        })
    })
});

proj4.defs("EPSG:3115", "+proj=tmerc +lat_0=4.59620041666667 +lon_0=-77.0775079166667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
ol.proj.proj4.register(proj4);
proj4.defs("EPSG:9377", "+proj=tmerc +lat_0=4 +lon_0=-73 +k=0.9992 +x_0=5000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
ol.proj.proj4.register(proj4);

var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
});

map = new ol.Map({
    controls: ol.control.defaults.defaults().extend([mousePositionControl]),
    target: document.getElementById('map'),
    renderer: 'canvas',
    layers: [layerBase, layermdts, layercartobasica, layerpotcasanare, layervias],
    view: new ol.View({
        center: center,
        zoom: zoom,
        maxZoom: 21, minZoom: 1
    })
});

  var plink = new ol.control.Permalink({ visible: false, localStorage: 'position' });
  map.addControl(plink);
  if (plink.hasUrlParam('edugeo')) $('.options button').show();

  var cap = new ol.control.WMSCapabilities({ 
    target: document.body,
    srs: ['EPSG:2154'],
    cors: true,
    optional: 'token',
    services: {
      'Amenaza Sismica': 'https://srvags.sgc.gov.co/arcprod/services/Amenaza_Sismica/Amenaza_Sismica/MapServer/WMSServer',  
      'Información Petrolera': 'https://srvags.sgc.gov.co/arcgis/services/EPIS/EPIS_V2/MapServer/WMSServer?',
      'BRGM': 'https://geoservices.brgm.fr/geologie',
      'OSM': 'https://wms.openstreetmap.fr/wms',
      'Sandre': 'https://services.sandre.eaufrance.fr/geo/sandre', //'http://services.sandre.eaufrance.fr/geo/eth_FXX',
      'Cartorisque': 'https://mapsref.brgm.fr/wxs/refcom-env/refign',
      'Swiss Topo': 'https://wms.geo.admin.ch/',
      'IFREMER*': 'http://tds0.ifremer.fr/thredds/wms/CORIOLIS-GLOBAL-NRTOA-OBS_TIME_SERIE?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&LAYERS=PSAL&CRS=EPSG%3A3857',
      'Géorisque': 'https://mapsref.brgm.fr/wxs/georisques/risques',
      'BDRisques': 'https://mapsref.brgm.fr/wxs/risques/bdrisques',
      'Risques': 'https://geoservices.brgm.fr/risques',
      'Natura 2000*': 'http://ws.carmencarto.fr/WMS/119/fxx_inpn?language=fre&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&LAYERS=Zones_de_protection_speciale&CRS=EPSG%3A3857',
      // https://www.cigalsace.org/portail/fr/page/723/flux-donnees -->
      'Cigalsace': 'https://www.cigalsace.org/geoserver/cigal/ows',
      'CG93-raster': 'https://geoportail93.fr/cgi-bin/mapserv?map=SIGD/raster.map',
      'CG93-fond': 'https://geoportail93.fr/cgi-bin/mapserv?map=SIGD/fond_SIGD.map',
      'CG94*': 'https://geo.valdemarne.fr/viewer/index.php?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&LAYERS=parcelles&CRS=EPSG%3A2154',
      'GeoFoncier':'https://api.geofoncier.fr/referentielsoge/ogc/wxs',
      // http://www.geolittoral.equipement.gouv.fr/rubrique.php3?id_rubrique=39 -->
      // 'GeoLittoral*': 'http://geolittoral.application.equipement.gouv.fr/wms/metropole',
      // http://www.sogefi-sig.com/sogefi-diffuse-des-donnees-en-wms/ -->
      'SOGEFI': 'http://ws.sogefi-web.com/wms',
      // http://inspire-geoportal.ec.europa.eu/discovery/ -->
      'Photos anciennes litto': 'http://www.ifremer.fr/services/photos_anciennes',
      'Geobretagne': 'https://geobretagne.fr/geoserver/dir_ouest/wms',
      'Venise*': 'http://cigno.atlantedellalaguna.it/geoserver/ows?SERVICE=WMS&VERSION=1.3.0&FORMAT=image%2Fpng&LAYERS=carta_base',
      // 'Geoportail': 'https://wxs.ign.fr/choisirgeoportail/geoportail/r/wms',
      'Geoplateforme raster': 'https://data.geopf.fr/wms-r/ows',
      'Geoplateforme vecteur': 'https://data.geopf.fr/wms-v/ows'
    },
    // Show trace in the console
    trace: true
  });
  map.addControl(cap);

  cap.on('load', function(e) {
    map.addLayer(e.layer);
    e.layer.set('legend', e.options.data.legend);
    plink.setUrlParam('url', e.options.source.url);
    plink.setUrlParam('layer', e.options.source.params.LAYERS);
  });

  var url = plink.getUrlParam('url');
  var layerName = plink.getUrlParam('layer');
  if (url) {
    cap.loadLayer(url, layerName);
  }

  /* Export .carte file */
  function exportCarte() {
    var lonlat = ol.proj.toLonLat(map.getView().getCenter());
    var carte = {
      "param": {
        "lon": lonlat[0],
        "lat": lonlat[1],
        "rot": 0,
        "zoom": map.getView().getZoom(),
        "titre": "WMS",
        "description": ""
      },
      "layers": []
    }
    map.getLayers().getArray().forEach(function(l) {
      if (l.getSource() instanceof ol.source.TileWMS) {
        var wms = {
          "wms": true,
          "type": "WMS",
          "name": l.get('title'),
          "titre": l.get('title'),
          "visibility": l.getVisible(),
          "opacity": l.getOpacity(),
          "copyright": l.getSource().getAttributions()()[0] || '&copy;',
          "wmsparam": {
            "layer": {
              "title": l.get('title'),
              "extent": l.get('extent'),
              "minResolution": l.getMinResolution(),
              "maxResolution": l.getMaxResolution()
            },
            "source": {
            "url": l.getSource().getUrls()[0],
            "projection": "EPSG:3857",
            "crossOrigin": "anonymous",
            "params": {
              "LAYERS": l.getSource().getParams().LAYERS,
              "FORMAT": l.getSource().getParams().FORMAT,
              "VERSION": l.getSource().getParams().VERSION
            }
            },
            "attribution": {
              "html": l.getSource().getAttributions()()[0] || '&copy;'
            },
            "originator": [],
            "legend": []
          },
          "maxZoomCluster": 20,
          "radiusCluster": 40
        }
        if (l.getSource().getParams().MAP) wms.wmsparam.source.params.MAP = l.getSource().getParams().MAP;
        carte.layers.push(wms)
      }
    });
    var blob = new Blob([JSON.stringify(carte, null, ' ')], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'carte.carte');
  }

const projectionSelect = document.getElementById('projection');
projectionSelect.addEventListener('change', function (event) {
    mousePositionControl.setProjection(event.target.value);
});

var printDialog = new ol.control.PrintDialog({
    // opciones para el control de diálogo de impresión, según tus necesidades
});

map.addControl(printDialog);
map.getLayerGroup().set('name', 'CAPAS');
map.on('singleclick', function (evt) {
    var markerSource = highlight.getSource();
    markerSource.clear();
    coordinates = evt;
    var layer = findBy(map.getLayerGroup(), 'name', datoswmsc);
    var viewResolution = map.getView().getResolution();
    var url = wmsSource[0].getFeatureInfoUrl(
        evt.coordinate, viewResolution, map.getView().getProjection(),
        { 'INFO_FORMAT': infoFormat }
    );
    var url2 = wmsSource[1].getFeatureInfoUrl(
        evt.coordinate, viewResolution, map.getView().getProjection(),
        { 'INFO_FORMAT': infoFormat }
    );

    if (document.body.style.cursor == "help") {
        var table = document.getElementById("tblattwms");
        table.innerHTML = "";
        document.getElementById("table-dynamic").innerHTML = "";
        var resolution = map.getView().getResolution();
        var url3 = layer.getSource().getFeatureInfoUrl(evt.coordinate, resolution, 'EPSG:3857', { 'INFO_FORMAT': 'application/json' });
        if (layer.values_.name == 'shp01' || layer.values_.name == 'shp02' || layer.values_.name == 'shp04' || layer.values_.name == 'shp05' || layer.values_.name == 'shp07' || layer.values_.name == 'shp08' || layer.values_.name == 'shp10' || layer.values_.name == 'shp11' || layer.values_.name == 'shp12' || layer.values_.name == 'shp13' || layer.values_.name == 'shp14' || layer.values_.name == 'shp15'  || layer.values_.name == 'shp16' || layer.values_.name == 'shp17') {
            var tipotabla = "confoto";
        }
        else {
            var tipotabla = "sinfoto";
        }
        $.ajax({
            url: url3,
            beforeSend: function () {
                document.getElementById("carga2").style.display = "block";
            },
            success: function (response) {
                if (response.numberReturned > 0) {
                    var datos = [];
                    var properties = response.features[0].properties;
                    for (var key in properties) {
                        if (properties.hasOwnProperty(key)) {
                            var dato = {
                                Nombre: key,
                                Valor: properties[key]
                            };
                            datos.push(dato);
                        }
                    }
                    if (tipotabla == 'confoto') {
                        datos.push({ Nombre: "filaImagen", Valor: properties.rut_foto + properties.foto});
                    }
                    
                    var table = new Tabulator("#table-dynamic", {
                        data: datos, // asigna los datos a la tabla
                        layout: "fitColumns", // ajusta las columnas al ancho de la tabla
                        columns: [
                            { title: "Nombre", field: "Nombre" },
                            { title: "Valor", field: "Valor" }
                        ],
                        rowFormatter: function (row) {
                            if (tipotabla = "confoto") {
                                var data = row.getData();
                                if (data.Nombre === "filaImagen") {
                                    row.getElement().innerHTML = "<td colspan='2'><img src='" + data.Valor + "' style='height:300px; width:auto; display:block; margin:auto;'></td>";
                                    row.getElement().style.padding = "0";
                                }
                            }
                        },
                        movableColumns: true, // permite cambiar el orden de las columnas
                        resizableRows: true // permite cambiar el orden de las filas
                    });

                    $(".modal-dialog").css("width", "80%");
                    document.getElementById("panel_infwms").style.display = "block";
                } else {
                    Swal.fire({
                        title: 'No hay información asociada a la capa',
                        text: '',
                        icon: 'info',
                        confirmButtonText: 'Aceptar'
                    });
                }
            },
            complete: function () {
                document.getElementById("carga2").style.display = "none";
            }
        });
    }

    //consulta coordenada
    if (document.body.style.cursor == "crosshair") {
        var coordwgs84 = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        var coordorigens = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:3115');
        var coordorigenn = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:9377');
        var table = document.getElementById("tblattwms");
        table.innerHTML = "";
        document.getElementById("table-dynamic").innerHTML = "";
        var select = [];
        var sel = [];
        select[0] = "<b>WGS84(EPSG:4326): </b>";
        select[1] = "<b>MAGNA-SIRGAS-OESTE: </b>";
        select[2] = "<b>ORIGEN UNICO NACIONAL: </b>";
        sel[0] = "Latitud: " + coordwgs84[1].toFixed(5) + ", Longitud: " + coordwgs84[0].toFixed(5);
        sel[1] = "X: " + coordorigens[0].toFixed(2) + ", Y: " + coordorigens[1].toFixed(2);
        sel[2] = "X: " + coordorigenn[0].toFixed(2) + ", Y: " + coordorigenn[1].toFixed(2);
        for (i = 0; i < select.length; i++) {
            row = table.insertRow(i);
            cell1 = row.insertCell(0);
            cell2 = row.insertCell(1);
            cell1.innerHTML = select[i];
            cell2.innerHTML = sel[i];
        }
        var row = table.insertRow(3);
        var cell3 = row.insertCell(0);
        cell3.colSpan = 2;
        cell3.innerHTML = "<div class='d-grid gap-2 col-6 mx-auto'><button class='btn btn-secondary btn-sm' type='button' onclick='copiarCoordenadas(" + coordwgs84[0] + ", "+ coordwgs84[1] + ")'>Copiar Coordenadas &nbsp;<i class='fa-regular fa-copy'></i></button></div>";

        document.getElementById("panel_infwms").style.display = "block";
        
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(evt.coordinate_),
            name: '',
            rainfall: 500
        });
        highlight.setStyle(flagStyle);
        var markerSource = highlight.getSource();
        markerSource.clear();
        markerSource.addFeature(iconFeature);
    }

    //var tamañopantalla = screen.width > 800;
    //if (url && document.body.style.cursor !== "help" && document.body.style.cursor !== "crosshair" && document.getElementById('medidas').style.display !== 'block' && capasd[11].values_.visible == true) {
    //console.log(capasd.length);
    for(i=0; i<capasd.length; i++){
        if(capasd[i].values_.name == 'u_terreno_registros'){
            var indiceterreno = i;
        }
    }

    //console.log(indiceterreno);
    if (url && document.body.style.cursor !== "help" && document.body.style.cursor !== "crosshair" && document.getElementById('medidas').style.display !== 'block' && capasd[indiceterreno].values_.visible == true) {
        $.ajax({
            url: url,
            beforeSend: function () {
                //if (tamañopantalla == true) {
                //putgif();
                //} else {
                document.getElementById("carga2").style.display = "block";
                //}
            },
            success: function (data) {
                data = data.split("urn:x-ogc:def:crs:EPSG:3857").join("http://www.opengis.net/gml/srs/epsg.xml#4326");
                var features = format[0].readFeatures(data);
                //console.log(features);  
                if (features && features.length >= 1 && features[0]) {
                    var feature = features[0];
                    var values = feature.getProperties();
                    var geom = feature.getGeometry();
                    var coord = values.geom.flatCoordinates;
                    var transf = coord;
                    var transf2 = (transf[0]);
                    var transf = [transf[0], transf[1], 0];
                    var transf = [values.latitud, values.longitud, 0];
                    var datosr1 = select_query("select * from catastro.r1 where codigo = '" + features[0].values_.codigo + "'");
                    var tabref = "registros";
                    if(datosr1==null){
                      var datosr1 = select_query("select * from catastro.u_terreno_registros where codigo = '" + features[0].values_.codigo + "'");
                      var tabref = "terrenos"; 
                    }
                    switchToCatastroTab();
                    try {
                      if(tabref=="registros"){
                        var direccion = datosr1[0][6];
                      }
                      else if(tabref=="terrenos"){
                        var direccion = datosr1[0][18];
                      }
                    }
                    catch (err) {
                        var direccion = "Sin Información";
                    }

                    try {
                      if(tabref=="registros"){
                        var codigo = datosr1[0][1];
                      }
                      else if(tabref=="terrenos"){
                        var codigo = datosr1[0][2];
                      }
                    }
                    catch (err) {
                        var codigo = "Sin Información";
                    }

                    try {
                      if(tabref=="registros"){
                        var propietarios = datosr1[0][3];
                      }
                      else if(tabref=="terrenos"){
                        var propietarios = datosr1[0][14];
                      }
                    }
                    catch (err) {
                        var propietarios = "Sin Información";
                    }

                    try {
                      if(tabref=="registros"){
                        var documento = datosr1[0][5];
                      }
                      else if(tabref=="terrenos"){
                        var documento = datosr1[0][17];
                      }
                    }
                    catch (err) {
                        var documento = "Sin Información";
                    }

                    try {
                       if(tabref=="registros"){
                        var areat = datosr1[0][8];
                       }
                       else if(tabref=="terrenos"){
                        var areat = datosr1[0][21];
                       }
                    }
                    catch (err) {
                        var areat = "Sin Información";
                    }

                    try {
                       if(tabref=="registros"){
                        var areac = datosr1[0][9];
                       }
                       else if(tabref=="terrenos"){
                        var areac = datosr1[0][22];
                       }
                    }
                    catch (err) {
                        var areac = "Sin Información";
                    }

                    try {
                      if(tabref=="registros"){
                        var avaluo = datosr1[0][10];
                      }
                      else if(tabref=="terrenos"){
                        var avaluo = datosr1[0][23];
                      }
                    }
                    catch (err) {
                        var avaluo = "Sin Información";
                    }

                    try {
                      if(tabref=="registros"){
                        var destinoeconomico = datosr1[0][7];
                      }
                      else if(tabref=="terrenos"){
                        var destinoeconomico = datosr1[0][20];
                      }
                    }
                    catch (err) {
                        var destinoeconomico = "Sin Información";
                    }

                    try {
                      if(tabref=="registros"){
                        var matricula = datosr1[0][11];
                      }
                      else if(tabref=="terrenos"){
                        var matricula = datosr1[0][29];
                      }
                    }
                    catch (err) {
                        var matricula = "Sin Información";
                    }
                    try {
                        var codph = codigo.slice(21, 22);
                        if (codph == '9' || codph == '8') {
                            var codigoterreno = codigo.slice(0, 9) + '0000' + codigo.slice(13, 26) + '0000';
                            var tipoaval = "Predio en propiedad horizontal o condominio";
                        }
                        else if (codph == '5') {
                            var codigoterreno = codigo.slice(0, 9) + '0000' + codigo.slice(13, 21) + '000000000';
                            var tipoaval = "Mejora (Construcción en predio ajeno)";
                        }
                        else {
                            var codigoterreno = codigo;
                            var tipoaval = "No PH";
                        }
                    }
                    catch (err) {
                        var tipoaval = "Sin Información";
                    }

                    actividad("clic en predio");
                    var tabledinamic = document.getElementById("table-dynamic");
                    tabledinamic.innerHTML = "";
                    var table = document.getElementById("tblatt");
                    table.innerHTML = "";

                     if(tipoaval == "Predio en propiedad horizontal o condominio"){
                        var codmatriz = values.codigo;
                        var codmodif = codmatriz.substring(0, 22);
                        var direccionesph = select_query("SELECT direccion FROM catastro.r1 WHERE substring(codigo FROM 1 FOR 22) = '"+codmodif+"'");                      
                        var select = [];
                        var sel = [];
                        var tabledinamic = document.getElementById("table-dynamic");
                        tabledinamic.innerHTML = "";
                        var table = document.getElementById("tblattmz");
                        table.innerHTML = "";
                        var select = [];
                        var sel = [];
                        var tablaph = "<table id='tablaph' class='table table-bordered' style='width: 100%;'>";
                        try{
                            for (i = 0; i < direccionesph.length; i++) {
                                var dirg = direccionesph[i][0];
                                tablaph += "<tr>";                           
                                tablaph += "<td id=tt" + i + ">" + direccionesph[i][0] + "</td>";                          
                                tablaph += "</tr>";
                            }
                        }
                        catch(err){
                            var direccionesph = select_query("SELECT direccion FROM catastro.u_terreno_registros WHERE codigo = '"+codmatriz+"'");
                        }
                        tablaph += "</table>";
                        select[0] = "<b>Codigo matriz: </b>";
                        select[1] = "<b>Número de predios: </b>";
                        
                        sel[0] = codmatriz;
                        sel[1] = direccionesph.length;                       
                        
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
                        try{
                            for (i = 0; i < direccionesph.length; i++) {
                                var ell = document.getElementById("tt" + i);
                                var alg = "mostrardatosmult('tt" + i + "')";
                                ell.setAttribute("onclick", alg);
                                ell.value = direccionesph[i][0];
                            }
                        }
                        catch(err){
                            for (i = 0; i < direccionesph.length - 1; i++) {
                                var ell = document.getElementById("tt" + i);
                                var alg = "mostrardatosmult('tt" + i + "')";
                                ell.setAttribute("onclick", alg);
                                ell.value = direccionesph[i][0];
                            }
                        }
                        document.getElementById("panel_mz").style.display = "block";
                                              
                     }   
                    else{
                        var select = [];
                        var sel = [];
                        var imag = [];
                        var stv = [];
                        var ig = [];
                        codigopredio = values.codigo;
                        select[0] = "Dirección";
                        select[1] = "Código";
                        select[2] = "Código Anterior";
                        select[3] = "Propietario";
                        select[4] = "Documento";
                        select[5] = "Área de Terreno";
                        select[6] = "Área Construida";
                        select[7] = "Avalúo";
                        select[8] = "Destino Económico";
                        select[9] = "Matricula Inmobiliaria";
                        select[10] = "Tipo de Avalúo";
                        sel[0] = direccion;
                        sel[1] = codigo;
                        sel[2] = values.codigo_ant;
                        sel[3] = propietarios;
                        sel[4] = documento;
                        sel[5] = parseInt(areat) + " m2";
                        sel[6] = parseInt(areac) + " m2";
                        sel[7] = "$" + formatNumber(avaluo);
                        sel[8] = destinoeconomico;
                        sel[9] = matricula;
                        sel[10] = tipoaval;
                    
                        for (i = 0; i < select.length; i++) {
                            row = table.insertRow(i);
                            cell1 = row.insertCell(0);
                            cell2 = row.insertCell(1);
                            cell1.innerHTML = select[i];
                            cell2.innerHTML = sel[i];
                            cell1.className = "roboto-medium";
                            cell2.className = "roboto-regular";
                            //cell1.style.color = "#013F6C";
                        }
                        document.getElementById("titulotabla").innerHTML = "Información del Predio";
                        document.getElementById("panel_atr").style.display = "block";
                    }

                    var c = feature.values_.geom.flatCoordinates.length - 1;
                    for (var i = 0; i <= c; i = i + 3) {
                        var a = feature.values_.geom.flatCoordinates[i];
                        feature.values_.geom.flatCoordinates[i] = feature.values_.geom.flatCoordinates[i + 1];
                        feature.values_.geom.flatCoordinates[i + 1] = a;
                    }
                    
                    //feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
                    feature.getGeometry();
                    /*highlightfeatures.setStyle(PredioStyle);
                    var markerSourcenoph = highlightfeatures.getSource();
                    markerSourcenoph.clear();
                    markerSourcenoph.addFeature(feature);*/

                    // Crear un nuevo vector source con un array de features
                    if (markerPredio) {
                        map.removeLayer(markerPredio);
                    }
                    var vectorSource = new ol.source.Vector({
                        features: [feature] // Asegurarse de que es un array
                    });
                    // Crear el nuevo layer vectorial
                    markerPredio = new ol.layer.Vector({
                        source: vectorSource,
                        style: new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: "rgba(255,165,0,1)",
                                lineDash: null,
                                lineCap: 'butt',
                                lineJoin: 'miter',
                                width: 4
                            }),
                            fill: new ol.style.Fill({
                                color: "rgba(255,165,0,0.2)"
                            })
                        })
                    });
                    map.addLayer(markerPredio);
                }
            },
            complete: function () {
                document.getElementById("carga2").style.display = "none";
            }
        });
    }

   try{
    if (url2 && document.body.style.cursor != "help" && document.body.style.cursor != "crosshair" && document.getElementById('medidas').style.display != 'block' && wms360.values_.visible == true) {
        $.ajax({
            url: url2,
            beforeSend: function () {
                //if (tamañopantalla==true){
                //putgif();}
                //else{
                document.getElementById("carga2").style.display = "block";
                //}
            },
            success: function (data) {
                data = data.split("urn:x-ogc:def:crs:EPSG:3857").join("http://www.opengis.net/gml/srs/epsg.xml#4326");
                var features = format[1].readFeatures(data);
                try {
                    //var temp = features["0"].actualEventTarget_.actualEventTarget_.geometryName_;
                    var temp = features[0].geometryName_;
                }
                catch (err) {
                    var temp = "nogeom";
                }
                if (temp == "geom") {
                    actividad("clic en foto 360");
                    document.getElementById('marco5').style.display = 'block';
                    document.getElementById('container3').style.display = 'block';
                    var feature = features[0];
                    var values = feature.getProperties();
                    //console.log(values);
                    //var features = format[1].readFeatures(data);
                    var marca = values.panoramas;
                    //console.log(marca);
                    panorama1(marca);
                    panoramica = values.nombre;
                    //console.log(values);
                    var coordinatesStreet = [values.latitud, values.longitud, 0];
                    //console.log(coordinatesStreet);
                    var urlsv = "street_view.html?coordenadas=" + coordinatesStreet;
                    //console.log(urlsv);
                    window.open(urlsv, target = "marco5");

                    var c = feature.values_.geom.flatCoordinates.length - 1;;
                    for (var i = 0; i <= c; i = i + 3) {
                        var a = feature.values_.geom.flatCoordinates[i];
                        feature.values_.geom.flatCoordinates[i] = feature.values_.geom.flatCoordinates[i + 1];
                        feature.values_.geom.flatCoordinates[i + 1] = a;
                    }
                    //feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
                    
                    highlightfeatures.setStyle(PuntoStyle);
                    var markerSourcenoph = highlightfeatures.getSource();
                    markerSourcenoph.clear();
                    markerSourcenoph.addFeature(feature);
         
                    /*if (markerSitio) {
                        map.removeLayer(markerSitio);
                    }
                    var vectorSource = new ol.source.Vector({
                        features: [feature] // Asegurarse de que es un array
                    });
                    markerSitio = new ol.layer.Vector({
                        source: vectorSource,
                        style: new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: "rgba(0,255,255,1)",
                        
                            }),
                            fill: new ol.style.Fill({
                                color: "rgba(0,255,255,0.3)"
                            })
                        })
                    });
                    map.addLayer(markerSitio);*/
                }
            },
            complete: function () {
                document.getElementById("carga2").style.display = "none";
            }
        });
    }

}
catch(err){}

});


function datosPot() {
    document.getElementById("carga2").style.display = "block";
    const queries = [
        {
            name: "zonainund",
            query: `SELECT DISTINCT gestion_del_riesgo.zona_inundable_deslizable.amenazas 
                    FROM gestion_del_riesgo.zona_inundable_deslizable 
                    INNER JOIN catastro.u_terreno_registros 
                    ON ST_Intersects(gestion_del_riesgo.zona_inundable_deslizable.geom, catastro.u_terreno_registros.geom) 
                    WHERE catastro.u_terreno_registros.codigo = '${codigopredio}'`
        },
        {
            name: "denshhect",
            query: `SELECT DISTINCT gestion_del_riesgo.densidad_vivienda_poblacion_habitantes_por_hectarea.habit_hect 
                    FROM gestion_del_riesgo.densidad_vivienda_poblacion_habitantes_por_hectarea 
                    INNER JOIN catastro.u_terreno_registros 
                    ON ST_Intersects(gestion_del_riesgo.densidad_vivienda_poblacion_habitantes_por_hectarea.geom, catastro.u_terreno_registros.geom) 
                    WHERE catastro.u_terreno_registros.codigo = '${codigopredio}'`
        },
        {
            name: "densparedladri",
            query: `SELECT DISTINCT gestion_del_riesgo.densidad_vivienda_poblacion_vivienda_con_paredes_de_ladrillo.viv_par_ld 
                    FROM gestion_del_riesgo.densidad_vivienda_poblacion_vivienda_con_paredes_de_ladrillo 
                    INNER JOIN catastro.u_terreno_registros 
                    ON ST_Intersects(gestion_del_riesgo.densidad_vivienda_poblacion_vivienda_con_paredes_de_ladrillo.geom, catastro.u_terreno_registros.geom) 
                    WHERE catastro.u_terreno_registros.codigo = '${codigopredio}'`
        },
        {
            name: "densparedmadera",
            query: `SELECT DISTINCT gestion_del_riesgo.densidad_vivienda_poblacion_vivienda_con_paredes_de_madera.viv_pard_m 
                    FROM gestion_del_riesgo.densidad_vivienda_poblacion_vivienda_con_paredes_de_madera 
                    INNER JOIN catastro.u_terreno_registros 
                    ON ST_Intersects(gestion_del_riesgo.densidad_vivienda_poblacion_vivienda_con_paredes_de_madera.geom, catastro.u_terreno_registros.geom) 
                    WHERE catastro.u_terreno_registros.codigo = '${codigopredio}'`
        },
        {
            name: "denvivhect",
            query: `SELECT DISTINCT gestion_del_riesgo.densidad_vivienda_poblacion_viviendas_por_hectarea.vivienda_h 
                    FROM gestion_del_riesgo.densidad_vivienda_poblacion_viviendas_por_hectarea 
                    INNER JOIN catastro.u_terreno_registros 
                    ON ST_Intersects(gestion_del_riesgo.densidad_vivienda_poblacion_viviendas_por_hectarea.geom, catastro.u_terreno_registros.geom) 
                    WHERE catastro.u_terreno_registros.codigo = '${codigopredio}'`
        },
        {
            name: "formgeolsup",
            query: `SELECT DISTINCT gestion_del_riesgo.formaciones_geologicas_superficiales.unidades 
                    FROM gestion_del_riesgo.formaciones_geologicas_superficiales 
                    INNER JOIN catastro.u_terreno_registros 
                    ON ST_Intersects(gestion_del_riesgo.formaciones_geologicas_superficiales.geom, catastro.u_terreno_registros.geom) 
                    WHERE catastro.u_terreno_registros.codigo = '${codigopredio}'`
        },
    ];

    const fetchQuery = (queryObj) => {
        return fetch('src/app/back/querys.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: queryObj.query })
        })
        .then(response => response.json())
        .then(data => {
            //console.log(`Query for ${queryObj.name} returned:`, data);
            if (data.success) {
                return { name: queryObj.name, result: data.result };
            } else {
                return { name: queryObj.name, result: `No se encuentra información para ${queryObj.name}` };
            }
        })
        .catch(error => {
            console.error('Error:', error);
            return { name: queryObj.name, result: `Error en la consulta para ${queryObj.name}` };
        });
    };

    Promise.all(queries.map(fetchQuery))
        .then(results => {
            const tablepot = document.getElementById("tblattpot");
            tablepot.innerHTML = "";

            const labels = [
                "Zona inundable deslizable: ",
                "Densidad vivienda poblacion habitantes por hectarea: ",
                "Densidad vivienda poblacion vivienda con paredes de ladrillo: ",
                "Densidad vivienda poblacion vivienda con paredes de madera: ",
                "Densidad vivienda poblacion vivienda por hectárea: ",
                "Formaciones geológicas superficiales: "
            ];

            results.forEach((result, index) => {
                let row = tablepot.insertRow(index);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                cell1.innerHTML = labels[index];
                cell2.innerHTML = Array.isArray(result.result) ? result.result.map(item => {
                    return item.amenazas || item.habit_hect || item.viv_par_ld || item.viv_pard_m || item.vivienda_h || item.unidades;
                }).join(", ") : result.result;
                cell1.className = "roboto-medium";
                cell2.className = "roboto-regular";
            });

            document.getElementById("carga2").style.display = "none";
        });
}

function switchToCatastroTab() {
    $('#home-tab').tab('show'); // Cambia a la pestaña de catastro
}
