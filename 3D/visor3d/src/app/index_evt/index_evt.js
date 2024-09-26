function pageL(){
  document.getElementById("carga2").style.display = 'none';
}

/*function mapposi(coord, giro) { 
 var coo = coord.toString(function () {
    return(this.lat(), this.lng());
 });
 console.log(coord);
 console.log(giro);
 console.log(coo);
 backstreet();
}*/

function menuLayers() {
    /* if (document.getElementById("layertree").style.display == 'block') {
         document.getElementById("grupoherramientas").style.right = "0px";
         document.getElementById("layertree").style.display = "none";
         
     } else {
         $('#layertree').toggle('slow');
         document.getElementById("grupoherramientas").style.right = "30%";
     }*/
 
     if (document.getElementById("toolbar").style.display == 'none') {
         $('#toolbar').toggle('slow');
         document.getElementById("grupoherramientas").style.right = "30%"; 
     } else {
         document.getElementById("grupoherramientas").style.right = "0px";
         document.getElementById("toolbar").style.display = "none"; 
     }
}


function mostrarbasecatastral(anchor){
    var icon = anchor.querySelector("i");
    icon.classList.toggle('fa-folder');
    icon.classList.toggle('fa-folder-open');
  
    if (document.getElementById("layersbasecatastral").style.display == 'none'){
        document.getElementById("layersbasecatastral").style.display = 'block';
    }
    else{
        document.getElementById("layersbasecatastral").style.display = 'none';
    }
}

function mostrarbasedane(anchor){
    var icon = anchor.querySelector("i");
    icon.classList.toggle('fa-folder');
    icon.classList.toggle('fa-folder-open');
    if (document.getElementById("layersdane").style.display == 'none'){
        document.getElementById("layersdane").style.display = 'block';
    }
    else{
        document.getElementById("layersdane").style.display = 'none';
    }
}

function mostrarbaseriesgo(anchor){
    var icon = anchor.querySelector("i");
    icon.classList.toggle('fa-folder');
    icon.classList.toggle('fa-folder-open');
  
    if (document.getElementById("layersbaseriesgo").style.display == 'none'){
        document.getElementById("layersbaseriesgo").style.display = 'block';
    }
    else{
        document.getElementById("layersbaseriesgo").style.display = 'none';
    }
}

function mostrarbasepgirs(anchor){
    var icon = anchor.querySelector("i");
    icon.classList.toggle('fa-folder');
    icon.classList.toggle('fa-folder-open');
  
    if (document.getElementById("layerspgirs").style.display == 'none'){
        document.getElementById("layerspgirs").style.display = 'block';
    }
    else{
        document.getElementById("layerspgirs").style.display = 'none';
    }
}

function mostrarbaserestitucion(anchor){
    var icon = anchor.querySelector("i");
    icon.classList.toggle('fa-folder');
    icon.classList.toggle('fa-folder-open');
  
    if (document.getElementById("layersrestitucion").style.display == 'none'){
        document.getElementById("layersrestitucion").style.display = 'block';
    }
    else{
        document.getElementById("layersrestitucion").style.display = 'none';
    }
}

function mostrarbaseortofoto(anchor){
    var icon = anchor.querySelector("i");
    icon.classList.toggle('fa-folder');
    icon.classList.toggle('fa-folder-open');
  
    if (document.getElementById("layersbaseortofotos").style.display == 'none'){
        document.getElementById("layersbaseortofotos").style.display = 'block';
    }
    else{
        document.getElementById("layersbaseortofotos").style.display = 'none';
    }
}

function mostrarbasemdt(anchor){
    var icon = anchor.querySelector("i");
    icon.classList.toggle('fa-folder');
    icon.classList.toggle('fa-folder-open');
  
    if (document.getElementById("layersbasemdt").style.display == 'none'){
        document.getElementById("layersbasemdt").style.display = 'block';
    }
    else{
        document.getElementById("layersbasemdt").style.display = 'none';
    }
}

function mostrarbaseriesgocp(anchor){
    var icon = anchor.querySelector("i");
    icon.classList.toggle('fa-folder');
    icon.classList.toggle('fa-folder-open');
  
    if (document.getElementById("layersbaseriesgocp").style.display == 'none'){
        document.getElementById("layersbaseriesgocp").style.display = 'block';
    }
    else{
        document.getElementById("layersbaseriesgocp").style.display = 'none';
    }
}

function mostrarbaseriesgo25k(anchor){
    var icon = anchor.querySelector("i");
    icon.classList.toggle('fa-folder');
    icon.classList.toggle('fa-folder-open');
  
    if (document.getElementById("layersbaseriesgo25k").style.display == 'none'){
        document.getElementById("layersbaseriesgo25k").style.display = 'block';
    }
    else{
        document.getElementById("layersbaseriesgo25k").style.display = 'none';
    }
}

function mostrarcartobasica5k(anchor){
    var icon = anchor.querySelector("i");
    icon.classList.toggle('fa-folder');
    icon.classList.toggle('fa-folder-open');
  
    if (document.getElementById("layerscartobasica5k").style.display == 'none'){
        document.getElementById("layerscartobasica5k").style.display = 'block';
    }
    else{
        document.getElementById("layerscartobasica5k").style.display = 'none';
    }
}

function mostrarcartobasica25k(anchor){
    var icon = anchor.querySelector("i");
    icon.classList.toggle('fa-folder');
    icon.classList.toggle('fa-folder-open');
  
    if (document.getElementById("layerscartobasica25k").style.display == 'none'){
        document.getElementById("layerscartobasica25k").style.display = 'block';
    }
    else{
        document.getElementById("layerscartobasica25k").style.display = 'none';
    }
}

function mostrarcapasbase(anchor){
    var icon = anchor.querySelector("i");
    icon.classList.toggle('fa-folder');
    icon.classList.toggle('fa-folder-open');
  
    if (document.getElementById("capasbase").style.display == 'none'){
        document.getElementById("capasbase").style.display = 'block';
    }
    else{
        document.getElementById("capasbase").style.display = 'none';
    }
}

function changeIcon(anchor) {
    var icon = anchor.querySelector("i");
    icon.classList.toggle('fa-plus');
    icon.classList.toggle('fa-minus'); 
    anchor.querySelector("span").textContent = icon.classList.contains('fa-plus') ? "Read more" : "Read less";
}

function viewlegend(data){
    $('#modal-title').text('LEYENDA DE LA CAPA');
    /*var layer = findBy(map.getLayerGroup(), 'name', datosc);
    var ruta = layer.values_.source.params_.LAYERS;
    actividad("ver leyenda " + ruta + "");*/
    if(data == 'Mapa01_Cambios_de_Uso1997'){
     var serv = 'https://www.geomonsas.xyz:8443/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=234&HEIGHT=350&LAYER='+ data;
    }
    else{
     var serv = 'https://www.geomonsas.xyz:8443/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER='+ data;
    }
    var table = document.getElementById("tblattLegend");
    table.innerHTML = "";
    document.getElementById("table-dynamic").innerHTML = "";
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.colSpan = 2;
    cell1.innerHTML = "<h3 class='roboto-medium' style='font-size:12px;'><b>Leyenda</b></h3>";
    var row = table.insertRow(1);
    var cell2 = row.insertCell(0);
    cell2.colSpan = 2;
    cell2.innerHTML = "<img src='"+serv+"'>";                                    
    document.getElementById("panel_legend").style.display = "block";
}

function ocultarpanellegend(){
    document.getElementById("panel_legend").style.display = "none";
}

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

function lista() {
    if(document.getElementById("myDropdown").style.display == 'block'){
      document.getElementById("myDropdown").style.display = 'none';
    }
    else{
      document.getElementById("myDropdown").style.display = 'block';   
    } 
}

function mostrar(consulta) {
    document.getElementById("myDropdown").style.display='none';  
    document.getElementById('barra_sitio').style.display = 'none'; 
    document.getElementById('barra_manzana').style.display = 'none';
    document.getElementById('barra_direccion').style.display = 'none';
    document.getElementById('barra_codigo').style.display = 'none';   
    //document.getElementById('barra_matricula').style.display = 'none';
    //document.getElementById('barra_propietario').style.display = 'none';
    //document.getElementById('barra_id_propietario').style.display = 'none';
    document.getElementById('direccion').value = "";
    //document.getElementById('address1').value = "";
    //document.getElementById('propietarios').value = "";
    //document.getElementById('cedul').value = ""; 
    document.getElementById('manzana').value = "";
    //document.getElementById('matricula').value = "";
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

function cerrarPanelatr(){
    document.getElementById("panel_atr").style.display = "none";
}












