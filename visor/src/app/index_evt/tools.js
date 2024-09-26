
$(document).ready(function () {
    function loadShpZip() {
        var epsg = ($('#epsg').val() == '') ? 4326 : $('#epsg').val(),
                encoding = ($('#encoding').val() == '') ? 'UTF-8' : $('#encoding').val();
        if (file.name.split('.')[1] == 'zip') {
            if (file)
                $('.dimmer').addClass('active');
            loadshp({
                url: file,
                encoding: encoding,
                EPSG: epsg
            }, function (data) {


                var feature = new ol.format.GeoJSON().readFeatures(data, {
                    featureProjection: 'EPSG:3857'
                });
                var layer = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: feature
                    })
                });
                map.addLayer(layer);

                var extent = layer.getSource().getExtent();
                //map.getView().fit(extent, map.getSize());



                var URL = window.URL || window.webkitURL || window.mozURL || window.msURL,
                        url = URL.createObjectURL(new Blob([JSON.stringify(data)], {type:
                                    "application/json"}));

                $('#link').attr('href', url);
                $('#link').html(file.name + '.geojson' + '<i class="download icon"></i>').attr('download', file.name + '.geojson');

                $('#downloadLink').slideDown(400);

                $('.shp-modal').toggleClass('effect');
                $('.overlay').toggleClass('effect');
                $('#wrap').toggleClass('blur');
        
//vector.addData(data);
                /*map.fitBounds([
                 [data.bbox[1], data.bbox[0]], [data.bbox[3], data.bbox[2]]
                 ]);*/
                $('.dimmer').removeClass('active');
                $('#preview').addClass('disabled');
                $('#epsg').val('');
                $('#encoding').val('');
                $('#info').addClass('picInfo');
                $('#option').slideUp(500);
            });
        } else {
            $('.modal').modal('show');
        }
    }
//initVector();

    $("#file").change(function (evt) {
        console.log(evt);
        file = evt.target.files[0];
        if (file.size > 0) {
            $('#dataInfo').text(' ').append(file.name + ' , ' + file.size + ' kb');
            $('#option').slideDown(500);
            $('#preview').removeClass('disabled');
        }
    });

    $('#preview').click(function () {
        loadShpZip();
    });

   /* $('.button').popup({
        inline: true,
        position: 'bottom left'
    });*/
    try{
        $('.tips').popup({
            target: '#addZipfile',
            position: 'top center',
            title: 'Getting started !',
            variation: 'huge'
        });
    }
    catch(err){}
    $('#entireLayer').click(function () {
        map.fitBounds(vector.getBounds());
    });
    $('#downloadfile').click(function () {
        window.location.href = 'demo/10tnvillage.zip';
    });
    $('#addZipfile').click(function () {
        $('.shp-modal').toggleClass('effect');
        $('.overlay').toggleClass('effect');
        $('#wrap').toggleClass('blur');
    });
    $('#cancel').click(function () {
        $('.shp-modal').toggleClass('effect');
        $('.overlay').toggleClass('effect');
        $('#wrap').toggleClass('blur');
    });
    $('#removeLayer').click(function () {
        
           // $('#attr').fadeOut(300);
           /* map.getLayers().getArray().slice().forEach(layer => {
                if (layer && layer.get('name') === 'shpLoader') {map.removeLayer(layer)}
            })*/
             window.location.reload();
        
    });
    try{
        $('#encoding').dropdown();
    }
    catch(err){}
    $('.v').change(function () {
        var msg = '<div class="msg" id="msg" style="display: none;"><div class="ui primary inverted red segment">' + '<p>You can find the EPSG Code of your Shapefile on <strong>spatialreference.org</strong></p></div><br /></div>';
        if ($('#epsg').val().match(/^\d{4}$/) != null) {
            $('#zipfile').removeClass('disabled');
            $('.msg').slideUp(750);
        } else {
            if ($('.msg')[0] == undefined) {
                $('#epsgField').after(msg);
                $('.msg').slideDown(1500);
            }
        }
    });

    $("#attr").draggable({containment: $(this).parent().parent(), scroll:
                false, cursor: "move"});
    $('#cancelAttr').click(function () {
        $('#attr').slideUp(300);
    });

});

function removerly(){
   /* map.getLayers().getArray().slice().forEach(layer => {
        if (layer && layer.get('name') === 'shpLoader') {map.removeLayer(layer)}
    })*/
    window.location.reload();
}


function menucapasbase() {
    if (document.getElementById('menucapasbase').style.display == 'block') {
        document.getElementById('menucapasbase').style.display = 'none';
    } else {
        document.getElementById('menucapasbase').style.display = 'block';
    }
}

function changemaps(basemap) {
    if (basemap == 'bosm') {
        streetmap.setVisible(true);
        ortofotopereira.setVisible(false);
        bing.setVisible(false);
        binglabels.setVisible(false);
        mapabase.setVisible(false);
    } else if (basemap == 'bamco') {
        streetmap.setVisible(false);
        ortofotopereira.setVisible(false);
        bing.setVisible(false);
        binglabels.setVisible(false);
        mapabase.setVisible(true);
    } else if (basemap == 'bort') {
        streetmap.setVisible(false);
        ortofotopereira.setVisible(true);
        bing.setVisible(false);
        binglabels.setVisible(false);
        mapabase.setVisible(false);
    } else if (basemap == 'bsat') {
        streetmap.setVisible(false);
        ortofotopereira.setVisible(false);
        bing.setVisible(true);
        binglabels.setVisible(false);
        mapabase.setVisible(false);
    } else if (basemap == 'bsatl') {
        streetmap.setVisible(false);
        ortofotopereira.setVisible(false);
        bing.setVisible(false);
        binglabels.setVisible(true);
        mapabase.setVisible(false);
    }
     else if (basemap == 'smb') {
        streetmap.setVisible(false);
        ortofotopereira.setVisible(false);
        bing.setVisible(false);
        binglabels.setVisible(false);
        mapabase.setVisible(false);
    }
}

function fextent() {
    var pgetextent = [-8251958.568990, 663097.874878, -8174716.557064, 707498.799724];
    map.getView().fitExtent(pgetextent, map.getSize());
}
//comparacion = new ol.control.Swipe;
function comp() {
    if (document.getElementById('layerscomparacion').style.display == 'block') {
        construcciones.setVisible(true);
        document.getElementById('layerscomparacion').style.display = 'none';
        map.removeControl(comparacion);
    } else {
        construcciones.setVisible(false);
        document.getElementById('layerscomparacion').style.display = 'block';
        streetmap.setVisible(true);
        binglabels.setVisible(false);
        mapabase.setVisible(false);
        ortofotopereira.setVisible(true);
        bing.setVisible(true);
        map.addControl(comparacion);
        comparacion.addLayer(bing);
        comparacion.addLayer(ortofotopereira, true);
    }
}

function botonescomp() {
    map.removeControl(comparacion);

    if (document.getElementById('satizq').checked == true && document.getElementById('satder').checked == true) {
        map.addControl(comparacion);
        console.log("listo1");
        bing.setVisible(true);
        comparacion.addLayer(ortofotopereira);
        comparacion.addLayer(bing, true);


    } else if (document.getElementById('ortizq').checked == true && document.getElementById('satder').checked == true) {
        console.log("listo2");
        ortofotopereira.setVisible(true);
        bing.setVisible(false);
        openstreetmap.setVisible(false);
        comparacion.addLayer(bing, true);
        comparacion.addLayer(ortofotopereira);

    }
}
var draw;

function selinteraction(type) {
    //construcciones.setVisible(false);
    draw = new ol.interaction.Draw({
        type: type
    });
    map.addInteraction(draw);
    draw.on('drawend', function (evt) {
        var coordenadas = evt.feature.values_.geometry.flatCoordinates;
        //console.log(evt);
        if (type == "Point") {
            var coo = ol.proj.transform(coordenadas, 'EPSG:3857', 'EPSG:4326');
            predio.getSource().updateParams({'CQL_FILTER': 'INTERSECTS(geom,POINT(' + coo[0] + ' ' + coo[1] + '))'});
            var select = select_query("SELECT * FROM terreno_rural WHERE st_intersects(geom, 'SRID=4326;POINT(" + coo[0] + ' ' + coo[1] + ")')");
                  
            var columnas = search("cimitarra:nombre_columnas", "terreno_rural");    
            var tablaatrib="<table style='max-width:90%; overflow:scroll; padding:10px;'>";    
            tablaatrib+="<tr><td></td>";
            for(j=0;j<columnas.length;j++){ 
        tablaatrib+="<td style='background-color:#FFC934; padding:10px; text-align:center; border:0.2px solid black; width:10px; color:black'><b>"+(columnas[j])+ "</td>";
    }
    tablaatrib+="</tr>";
    
    for(i=0;i<select.length;i++){
        tablaatrib+="<tr>";
        tablaatrib+="<td style='background-color:white; border:1px solid black;'>"+(i+1)+"</td>";
        //for(j=0;j<select.length;j++){ 
          for(j=0;j<columnas.length;j++){ 
            tablaatrib+='<td style="background:white; text-align:center; border:1px solid black; max-width:30px; overflow:hidden; text-overflow:ellipsis; white-space:nowraw;">' + select[i][j] + '</td>';
          }  
        //}
        tablaatrib+="</tr>";
    }
    tablaatrib+="</table>";
    document.getElementById("resultadotabla").innerHTML=tablaatrib;
    //predio.getSource().updateParams({'STYLES': "seleccion_predios_amco"}); 
    selectelement(select);               
} 
        
        else {
            var co = [];
            for (i = 0; i < coordenadas.length; i = i + 2) {
                var a = ol.proj.transform([coordenadas[i], coordenadas[(i + 1)]], 'EPSG:3857', 'EPSG:4326');
                co += a[0] + " " + a[1] + ",";
            }
            var coo = co.slice(0, -1);
            if (type == "LineString") {
                var select = select_query("SELECT * FROM terreno_rural WHERE st_intersects(geom, 'SRID=4326;LINESTRING(" + coo + ")')");
            	 predio.getSource().updateParams({'CQL_FILTER': 'INTERSECTS(geom,LINESTRING(' + coo + '))'});
            var columnas = search("cimitarra:nombre_columnas", "terreno_rural");      
            var tablaatrib="<table style='max-width:90%; overflow:scroll; padding:10px;'>";    
            tablaatrib+="<tr><td></td>";
            for(j=0;j<columnas.length;j++){ 
              tablaatrib+="<td style='background-color:#FFC934; padding:10px; text-align:center; border:0.2px solid black; width:10px; color:black'><b>"+(columnas[j])+ "</td>";
            }
        tablaatrib+="</tr>";
    
    for(i=0;i<select.length;i++){
        tablaatrib+="<tr>";
        tablaatrib+="<td style='background-color:white; border:1px solid black;'>"+(i+1)+"</td>";
        //for(j=0;j<select.length;j++){ 
          for(j=0;j<columnas.length;j++){ 
            tablaatrib+='<td style="background:white; text-align:center; border:1px solid black; max-width:30px; overflow:hidden; text-overflow:ellipsis; white-space:nowraw;">' + select[i][j] + '</td>';
          }  
        //}
        tablaatrib+="</tr>";
    }
    tablaatrib+="</table>";
    document.getElementById("resultadotabla").innerHTML=tablaatrib;
    //predio.getSource().updateParams({'STYLES': "seleccion_predios_amco"});    
    selectelement(select);     
} 
            
else if (type == "Polygon") {                  
            var select = select_query("SELECT * FROM terreno_rural WHERE st_intersects(geom, 'SRID=4326;POLYGON((" + coo + "))')");             
            predio.getSource().updateParams({'CQL_FILTER': 'INTERSECTS(geom,POLYGON((' + coo + ')))'});    
            var columnas = search("cimitarra:nombre_columnas", "terreno_rural");       
            var tablaatrib="<table style='max-width:90%; overflow:scroll; padding:10px;'>";    
            tablaatrib+="<tr><td></td>";
            for(j=0;j<columnas.length;j++){ 
        tablaatrib+="<td style='background-color:#FFC934; padding:10px; text-align:center; border:0.2px solid black; width:10px; color:black'><b>"+(columnas[j])+ "</td>";
    }
    tablaatrib+="</tr>";
    
    for(i=0;i<select.length;i++){
        tablaatrib+="<tr>";
        tablaatrib+="<td style='background-color:white; border:1px solid black;'>"+(i+1)+"</td>";
        //for(j=0;j<select.length;j++){ 
          for(j=0;j<columnas.length;j++){ 
            tablaatrib+='<td style="background:white; text-align:center; border:1px solid black; max-width:30px; overflow:hidden; text-overflow:ellipsis; white-space:nowraw;">' + select[i][j] + '</td>';
          }  
        //}
        tablaatrib+="</tr>";
    }
    tablaatrib+="</table>";
    document.getElementById("resultadotabla").innerHTML=tablaatrib;
    selectelement(select);
        }
        map.removeInteraction(draw);
       }
    });
}

function dibinteractionz(type) {
  //  alert("listo");
    map.removeInteraction(interaction);
    interactionSelect.getFeatures().clear();
    map.removeInteraction(interactionSelect);
    interaction = new ol.interaction.Draw({
        type: type,
        source: layerWFS.getSource()
    });
    map.addInteraction(interaction);
    interaction.on('drawend', function (e) {
        obsfeature = e;
        document.getElementById("panel_atr").style.visibility = "visible";
        document.getElementById("panel_atr").style.display = "initial";
        document.getElementById("panel_atr").style.height = "auto";
        /*document.getElementById("contenedorg").style.display = "initial";
        document.getElementById("contenedorg").style.visibility = "visible";
        document.getElementById("contenedorg").style.height = "auto";*/
        var table = document.getElementById("tblatt");
         $(".modal-dialog").css("width", "250px");
        table.style.visibility = "visible";
        table.style.display = "initial";
        table.style.height = "auto";
        table.innerHTML = "";
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        cell1.colSpan = 2;
        cell1.innerHTML = "<H5><b>ZONA DE INFLUENCIA</b></H5>";
        var row = table.insertRow(1);
        var cell2 = row.insertCell(0);
        cell2.colSpan = 2;
        cell2.style = "background-color: white; color:black; font-size: 15px; border:0; text-align:left;";
        cell2.innerHTML = "<b>Ingrese un valor en metros:</b>";
        var row = table.insertRow(2);
        var cell3 = row.insertCell(0);
        var row = table.insertRow(2);
        var cell3 = row.insertCell(0);
        cell3.colSpan = 2;
        cell3.style = "background-color: white; border:0; margin:0;";
        cell3.innerHTML = "<input type='text' id='valorbuffer' name='valorbuffer' style='background-color: #white; color:black; font-size: 15px; border-top:0px; border-left:0px; border-right:0px; border-bottom:1px solid #62BAD3; text-align:center; width:100%; height:2em;' placeholder='Ejemplo: 200'>";
        var row = table.insertRow(3);
        var cell4 = row.insertCell(0);
        cell4.colSpan = 2;
        cell4.style = "background-color: white; color:black; font-size: 10px; border:0; text-align:left;";
        //cell3.innerHTML = "<button type='button' onclick='loadobs();' class='btn btn-primary btn-md btn-block'>Guardar</button>";
        if (type == 'Point'){
            cell4.innerHTML = "<button type='button' onclick=calcularbuffer('Point') class='btn btn-primary btn-md btn-block'>Calcular</button>";
        }else if (type == 'MultiLineString'){
            cell4.innerHTML = "<button type='button' onclick=calcularbuffer('MultiLineString') class='btn btn-primary btn-md btn-block'>Calcular</button>";
        }else if(type == 'MultiPolygon'){
            cell4.innerHTML = "<button type='button' onclick=calcularbuffer('MultiPolygon') class='btn btn-primary btn-md btn-block'>Calcular</button>";
        }
        
        //InserGeom(type, e.feature);
        
    });
}



function dibinteraction(type) {
    map.removeInteraction(interaction);
    interactionSelect.getFeatures().clear();
    map.removeInteraction(interactionSelect);
    interaction = new ol.interaction.Draw({
        type: type,
        source: layerWFS.getSource()
    });
    map.addInteraction(interaction);
    interaction.on('drawend', function (e) {
        obsfeature = e;
        document.getElementById("panel_atr").style.visibility = "visible";
        document.getElementById("panel_atr").style.display = "initial";
        document.getElementById("panel_atr").style.height = "auto";
        /*document.getElementById("contenedorg").style.display = "initial";
        document.getElementById("contenedorg").style.visibility = "visible";
        document.getElementById("contenedorg").style.height = "auto";*/
        var table = document.getElementById("tblatt");
         $(".modal-dialog").css("width", "250px");
        table.style.visibility = "visible";
        table.style.display = "initial";
        table.style.height = "auto";
        table.innerHTML = "";
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        cell1.colSpan = 2;
        cell1.innerHTML = "<H5><b>INFORMACION DEL DIBUJO</b></H5>";
        var row = table.insertRow(1);
        var cell2 = row.insertCell(0);
        cell2.colSpan = 2;
        cell2.style = "background-color: white; border:0; margin:0;";
        cell2.innerHTML = "<input type='text' id='observaciones' name='observaciones' style='background-color: #white; color:black; font-size: 15px; border-top:0px; border-left:0px; border-right:0px; border-bottom:1px solid #62BAD3; text-align:center; width:100%; height:6em;' placeholder='Diligencie cualquier tipo de información'>";
        var row = table.insertRow(2);
        var cell3 = row.insertCell(0);
        cell3.colSpan = 2;
        cell3.style = "background-color: white; color:black; font-size: 10px; border:0; text-align:left;";
        //cell3.innerHTML = "<button type='button' onclick='loadobs();' class='btn btn-primary btn-md btn-block'>Guardar</button>";
        if (type == 'Point'){
            cell3.innerHTML = "<button type='button' onclick=InserGeom('Point') class='btn btn-primary btn-md btn-block'>Guardar</button>";
        }else if (type == 'MultiLineString'){
            cell3.innerHTML = "<button type='button' onclick=InserGeom('MultiLineString') class='btn btn-primary btn-md btn-block'>Guardar</button>";
        }else if(type == 'MultiPolygon'){
            cell3.innerHTML = "<button type='button' onclick=InserGeom('MultiPolygon') class='btn btn-primary btn-md btn-block'>Guardar</button>";
        }
        
        //InserGeom(type, e.feature);
        
    });
}



function DownGjson() {
    var format = new ol.source.GeoJSON({featureProjection: 'EPSG:3857'});
    var featuresp = highlighdrawp.getSource().getFeatures();
    var featuresl = highlighdrawl.getSource().getFeatures();
    var featuresm = highlighdrawm.getSource().getFeatures();
    var jsonp = format.format.__proto__.writeFeaturesObject(featuresp);
    var jsonl = format.format.__proto__.writeFeaturesObject(featuresl);
    var jsonm = format.format.__proto__.writeFeaturesObject(featuresm);
    jsonp = JSON.stringify(jsonp);
    jsonl = JSON.stringify(jsonl);
    jsonm = JSON.stringify(jsonm);
    if (jsonp != '{"type":"FeatureCollection","features":[]}') {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonp);
        var a = document.createElement('a');
        a.href = dataStr;
        a.download = "Punto.json";
        a.click();
    }
    if (jsonl != '{"type":"FeatureCollection","features":[]}') {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonl);
        var a = document.createElement('a');
        a.href = dataStr;
        a.download = "Linea.json";
        a.click();
    }
    if (jsonm != '{"type":"FeatureCollection","features":[]}') {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonm);
        var a = document.createElement('a');
        a.href = dataStr;
        a.download = "Poligono.json";
        a.click();
    }
    /*
     var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonp);
     var a = document.createElement('a');
     a.href = dataStr;
     a.download = "myObj.json";
     a.click();
     */
}
function menuseleccioncapa() {
    predio.setVisible(true);
    document.getElementById('listadibujo').style.display = 'none';
    if (document.getElementById('listadib').style.display == 'block') {
        document.getElementById('listadib').style.display = 'none';
        map.removeInteraction(draw);
        construcciones.setVisible(true);
        predio.getSource().updateParams({'STYLES': 'predios_sin_consulta_soledad', 'CQL_FILTER': eval(filtro)});
    } else {
        document.getElementById('listadib').style.display = 'block';
    }
}
function menudibujocapa() {
    //predio.setVisible(true);
    document.getElementById('listadib').style.display = 'none';
    if (document.getElementById('listadibujo').style.display == 'block') {
        document.getElementById('listadibujo').style.display = 'none';
        map.removeInteraction(draw);
        predio.setVisible(true);
        capalinea.setVisible(false);
        capapunto.setVisible(false);
        capapoligono.setVisible(false);
        //construcciones.setVisible(true);
        //predio.getSource().updateParams({'STYLES': 'predios_sin_consulta_soledad', 'CQL_FILTER': eval(filtro)});
    } else {
        document.getElementById('listadibujo').style.display = 'block';
    }
}

function menudibujozona() {
 //predio.setVisible(true);
    document.getElementById('listazonainfluencia').style.display = 'none';
    if (document.getElementById('listazonainfluencia').style.display == 'block') {
        document.getElementById('listazonainfluencia').style.display = 'none';
        map.removeInteraction(draw);
        
        //construcciones.setVisible(true);
        //predio.getSource().updateParams({'STYLES': 'predios_sin_consulta_soledad', 'CQL_FILTER': eval(filtro)});
    } else {
        document.getElementById('listazonainfluencia').style.display = 'block';
    }
}

function menuLayers() {
    if (document.getElementById("layertree").style.display == 'none' || document.getElementById("layertree").style.display == "") {
        /*$('#layertree').toggle('slow');*/
        /*$('#layer-control').toggle('slow');*/
        document.getElementById("layertree").style.display = 'block';
        document.getElementById("layer-control").style.display = 'block';
        var tamanopantalla = screen.width;
        //console.log(tamanopantalla);
        if(tamanopantalla<='767'){
         document.getElementById("grupoherramientas").style.right = "75%";      
        }
        else{
         document.getElementById("grupoherramientas").style.right = "30%";   
        } 
    } else {
        document.getElementById("grupoherramientas").style.right = "0px";
        document.getElementById("layertree").style.display = "none";
        document.getElementById("layer-control").style.display = "none";
    }
}

function paneo() {
    if (document.body.style.cssText == 'cursor: all-scroll;') {
        document.body.style.cursor = 'auto';
        var valorbuffer = 15;
predio.getSource().updateParams({'STYLES': "", viewparams: "query:" + valorbuffer + "" });
    } else {
        document.body.style.cursor = 'all-scroll';
    }

}

function wmsload() {
    var tamañopantalla = true;
    //if (tamañopantalla==true){putgif();}else{document.getElementById("carga3").style.display = "block";}

    var longlist = document.getElementById("nombresserv").options.length;
    for (let i = longlist; i >= 0; i--) {
        var sel = document.getElementById("nombresserv");
        sel.remove(sel.selectedIndex[i]);
    }

    var urlwms = document.getElementById("urlservice").value;
    var parser = new ol.format.WMSCapabilities();
    var nombreswms = [];    
    urlwms = "'"+ urlwms + 'SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities' + "'";  
    //console.log(urlwms); 
    fetch(eval(urlwms)/*, { mode: 'no-cors'}*/).then(function (response) {
        // console.log('Response' ,response );
        return response.text();
    }).then(function (text) {
        // console.log('TEXT', text);
        var result = parser.read(text);
        //console.log(result);
        select = document.getElementById("nombresserv");
        //console.log(select);
        for (var j = 0; j < result.Capability.Layer.Layer.length; j++) {
            nombreswms[j] = [result.Capability.Layer.Layer[j].Name];
            option = document.createElement("option");
            option.value = result.Capability.Layer.Layer[j].Name;
            option.text = result.Capability.Layer.Layer[j].Title;
            select.appendChild(option);
        }
        document.getElementById("listawms").style.display = "block";
        if (tamañopantalla==true){quitgif(); }
        else{document.getElementById("carga3").style.display = "none";  }
    }).catch(function(){
        //alert('La URL no es válida')
        Swal.fire({
            title: 'La URL no es válida',
            text: '',
            icon: 'info',
            confirmButtonText: 'Aceptar'
          });
        if (tamañopantalla==true){quitgif(); }
        else{document.getElementById("carga3").style.display = "none";  }
    });

}

function esriload() {
  const url = document.getElementById('urlesriservice').value; // Obtener la URL del input
  console.log(url);
  if (!url) {
    Swal.fire({
        title: 'La URL no es válida',
        text: '',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
    }
    fetch(`${url}?f=json`)
        .then(response => response.json())
        .then(data => {
            const layers = data.layers; // Obtener las capas del servicio
            const select = document.getElementById('nombresservesri');
            select.innerHTML = ''; // Limpiar opciones existentes
            layers.forEach(layer => {
                const option = new Option(layer.name, layer.id); // Nombre de la capa, ID como valor
                select.add(option);
            });
            document.getElementById("listaesri").style.display = "block";
        })
        .catch(error => {
            console.error('Error al cargar las capas:', error);
            alert('Error al cargar las capas. Asegúrate de que la URL es correcta y accesible.');
    });
}

function ocultarpanelpest() {
    document.getElementById("modalservicios").style.display = "none";
}

var wms1 = "";
function loadwms() {
        var urlwms2 = document.getElementById("urlservice").value;
        var layer2 = document.getElementById("nombresserv").value;
    
        wms1 = new ol.layer.Tile({
            visible: true,
            source: new ol.source.TileWMS({
                url: urlwms2,
                params: { LAYERS: layer2},
                crossOrigin: 'anonymous'
            }),
            name: 'Servicio de Mapas Web'
        });
    
        //console.log(wms1);
        map.addLayer(wms1);



    /*var wmsSource = new ol.source.TileWMS({
        url: eval(urlwms2),
        params: { LAYERS: eval(layer2), STYLES: '' },
        format: new ol.format.GeoJSON(),
        crossOrigin: 'anonymous'
    });*/
    //console.log(wmsSource);
    //map.addLayer(wmsSource);
}

function removewms() {
    //console.log(wms1);
    wms1.setVisible(false);
    var longlist = document.getElementById("nombresserv").options.length;
    for (let i = longlist; i >= 0; i--) {
        var sel = document.getElementById("nombresserv");
        sel.remove(sel.selectedIndex[i]);
    }
}

function ident() {
    if (document.body.style.cursor !== "pointer") {
        document.body.style.cursor = "pointer";
    } else {
        document.body.style.cursor = "default";
    }
}

function lookaddress(){
    var centerdat = search("chia:datostab2");
    //console.log(centerdat);

                            var table = document.getElementById("tblatt");
                            $(".modal-dialog").css("width", "600px");
                            table.innerHTML = "";
                            var row = table.insertRow(0);
                            var cell1 = row.insertCell(0);
                            cell1.colSpan = 2;
                            cell1.innerHTML = "<H5><b>DIRECCIONES</b></H5>";

    var select = [];
    var sel = [];
    var imag = [];
    var stv = [];
    var ig = [];
    for (i = 0; i < centerdat.length; i++) {
      //console.log(direccion);
        var tablaph = ("<table max-width=20 border=1 id='tablaph'>");
        for (i = 0; i < centerdat.length; i++) {
            //var req = {term: direccion[i], val:123};
            dirg = centerdat[i][4];
            tablaph += ("<tr>");
            tablaph += ("<td id=tt" + i + ">" + centerdat[i][4] + "</td>");
            tablaph += ("</tr>");
        }
        tablaph += ("</table>");
    }
    select[0] = "<b>Número de Puntos</b>";
    select[1] = "<b>Direcciones</b>";
    
    sel[0] = centerdat.length;
    sel[1] = tablaph;
    
    for (i = 0; i < select.length; i++) {
        row = table.insertRow(i + 1);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell1.innerHTML = select[i];
        cell2.innerHTML = sel[i];
    }
    for (i = 0; i < centerdat.length; i++) {
        var ell = document.getElementById("tt" + i);
        var alg = "mostrardatosph('tt" + i + "')";
      //  console.log(alg);
        ell.setAttribute("onclick", alg);
        ell.value = centerdat[i];
        //ell.onclick = function() {addressSource(direccion[i]);};
    }

    document.getElementById("panel_atr").style.display = "block";
                        document.getElementById("botonminimizar").style.display = "block";

}

var locations = [];

function ocultarbarra(){
    if(document.getElementById("barrabuscar").style.display == "block"){
        document.getElementById("barrabuscar").style.display = "none";
        document.getElementById("myDropdown").style.display = 'none';      
    }
    else{
        /*$('#barrabuscar').toggle('slow');*/
        document.getElementById("barrabuscar").style.display = "block";
    }
}

function tablasbase(opcion){
    if(opcion == 'estat'){
        var esquema = document.getElementById("estmap").value;
    }
    else if(opcion == 'IA1'){
        var esquema = document.getElementById("primerListEsq").value;
    }
    else if(opcion == 'IA2'){
        var esquema = document.getElementById("segundoListEsq").value;
    }
    else{
        var esquema = document.getElementById("esquema").value;
    }
    var tablas = select_query("SELECT table_name FROM information_schema.tables WHERE table_schema='"+esquema+"' AND table_type='BASE TABLE' order by table_name");
    return tablas;
    
}

function datostabl(tabladb, tipo) {
    if(tipo == 'est'){
        var esquema = document.getElementById("estmap").value;
    }
    else if(tipo == 'IA1'){
        var esquema = document.getElementById("primerListEsq").value;
    }
    else if(tipo == 'IA2'){
        var esquema = document.getElementById("segundoListEsq").value;
    }
    else{
        var esquema = document.getElementById("esquema").value;    
    }
    var tablas1 = select_query("SELECT column_name FROM information_schema.columns WHERE table_schema='"+esquema+"' AND table_name='"+tabladb+"'");
    return tablas1;
}

function datrib(column, tabla, control){
   if(control == 'estat'){
    var esquema = document.getElementById("estmap").value;
   }
   else if(control == 'IA1'){
    var esquema = document.getElementById("primerListEsq").value;
   }
   else if(control == 'IA2'){
    var esquema = document.getElementById("segundoListEsq").value;
   }
   else{ 
    var esquema = document.getElementById("esquema").value;
   }
    document.getElementById("botonesReportest").style.display = "flex";
    var tablas1 = select_query("SELECT distinct "+column+" FROM "+esquema+"."+tabla+" where "+column+" is not null limit 5");
    return tablas1; 
}
var wms360 = "";
var estado360 = "off";
function load360(){
    if(estado360 == "off"){
        actividad("ver fotográfias 360");
        $('#menuActivar360').removeClass('menusupder').addClass('menusupderActive');
        wms360 = new ol.layer.Tile({
            visible: true,
            source: new ol.source.TileWMS({
                url: 'https://www.geomonsas.xyz:8443/geoserver/buenaventura/wms',
                //params: {LAYERS: 'buenaventura:copybuenaventura_360', STYLES: '', CQL_FILTER: "fecha = '2023-10-11'"},
                params: { LAYERS: 'buenaventura:buenaventura_360', STYLES: '' },
                serverType: 'geoserver',
                crossOrigin: 'anonymous'
            }), name: 'recorrido 360'
        });
        map.addLayer(wms360);
        estado360 = "on";
    }
    else if(estado360=="on"){
        map.removeLayer(wms360);
        $('#menuActivar360').removeClass('menusupderActive').addClass('menusupder');
        estado360 = "off";
        document.getElementById('container3').style.display = 'none';
        document.getElementById('marco5').style.display = 'none';
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
    } 
}