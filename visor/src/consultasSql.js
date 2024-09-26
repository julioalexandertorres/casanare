 filters = [];
function menuconsultassql(){
    
    $('#filterModal').modal('toggle');
    $(".modal-dialog").css("max-width", "1000px");
    //var filters2 = search("amco:listatablas");
    //console.log(filters2);
    
    var tablasbase = search("amco:listatablas"); //Tu array de provincias
    tablasbase.sort();
    var select = document.getElementById("tablasbase"); //Seleccionamos el select
    
    for(var i=0; i < tablasbase.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = tablasbase[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    }
    
   //console.log(select);
    
   /* filters.push({
        id: filters2
      });*/
   // buildFilters();
}

/*function buildFilters() {
    /*var filters = search("amco:listatablas");
    console.log(filters);
  $("#query-builder").queryBuilder({
    allow_empty: true,
    filters: filters
  });
}*/

function datostab(){
  //alert("listo");
    document.getElementById("datostablasbase").style.display = "block";
    document.getElementById("labeldatostablasbase").style.display = "block";
    document.getElementById("datostablasbase").innerHTML = "";
    var select = document.getElementById("datostablasbase");
    var tabladb = document.getElementById("tablasbase").value;
    var datostablas = search("amco:listacolumnas", tabladb);  
    for(var i=0; i < datostablas.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = datostablas[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    }   
}

function datostabatrib(){
   // document.getElementById("operador").style.display = "block";
   // document.getElementById("labeloperador").style.display = "block";
    document.getElementById("calculator").style.display = "block";
    document.getElementById("tablasbaseatributos").style.display = "block";
    document.getElementById("tablasbaseatributos").innerHTML = "";
    var select = document.getElementById("tablasbaseatributos");
    var tabladb = document.getElementById("tablasbase").value;
    var tabladbcolumn = document.getElementById("datostablasbase").value; 
    var datostablasatributos = select_query("SELECT distinct "+tabladbcolumn+" FROM "+tabladb+" limit 20");        
    for(var i=0; i < datostablasatributos.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = datostablasatributos[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    }  
}

function expresionsql(){
    var tabladb = document.getElementById("tablasbase").value;
    var tabladbcolumn = document.getElementById("datostablasbase").value;
    var tablasatributos = document.getElementById("tablasbaseatributos").value;
    
    document.getElementById("fname").value = "SELECT * FROM " + tabladb + " WHERE " + tabladbcolumn + "=" + "'" + tablasatributos + "'";
}

function datosoperador(oper){
    var tabladb = document.getElementById("tablasbase").value;
    var tabladbcolumn = document.getElementById("datostablasbase").value;
    var tablasatributos = document.getElementById("tablasbaseatributos").value;
    /*var operador = document.getElementById("operador").value;
    if(operador == 'igual'){
       operador = "=";
       }
    else if(operador == 'diferente'){
       operador = "<>";           
     }
    else if(operador == 'mayor'){
       operador = ">";           
     }
    else if(operador == 'menor'){
       operador = "<";           
     }
    else if(operador == 'menorigual'){
       operador = "<=";           
     }
    else if(operador == 'mayorigual'){
       operador = ">=";           
     }*/
    var operador = oper;
    document.getElementById("fname").value = "SELECT * FROM " + tabladb + " WHERE " + tabladbcolumn + operador + "'" + tablasatributos + "'";
}

function aplicarFilter(){
    document.getElementById("filterModal").style.display = "none";
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    var consultsql = document.getElementById("fname").value;
    //console.log(consultsql);
   
    var resultsql = select_query(""+consultsql+" limit 500");
    console.log(resultsql);
    
       if (resultsql){
         buildTableSelect(resultsql);   
       }
       else{
        //alert("Error al ejecutar la Consulta, por favor revise la expresión");
        Swal.fire({
          title: 'Error al ejecutar la Consulta, por favor revise la expresión',
          text: '',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
       }
    
   
   /* var table = document.getElementById("tblatt");
    $(".modal-dialog").css("max-width", "400px");
    $(".modal-dialog").css("max-height", "400px");
    table.innerHTML = "";
    
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.colSpan = 2;
    cell1.style = "background-color: #3B5998; color:white; text-align:center;";
    cell1.innerHTML = "<b>Número de Registros: </b>" + resultsql.length;
    
    var select = [];
    var sel = [];
    var tabladb = document.getElementById("tablasbase").value;
    var datoscolumnas = search("amco:listacolumnas", tabladb); 
    
    for (i = 0; i < resultsql.length; i++){
        for (j = 0; j < datoscolumnas.length; j++){
        select[j] = datoscolumnas[j];
        if(select[j]=='geom' || select[j]=='wkb_geometry'){    
        sel[j] = "Geometria";
        }
        else{
        sel[j] = resultsql[i][j];  
        }
     }
    }
   
    
    for (i = 0; i < select.length; i++) {
        row = table.insertRow(i + 1);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell1.innerHTML = select[i];           
        cell2.innerHTML = sel[i];
    }
    
  
  document.getElementById("panel_atr").style.display = "block";
  document.getElementById("botonminimizar").style.display = "block";*/
}


function buildTableSelect(select) {
     var tabladb = document.getElementById("tablasbase").value;
     var datostablas = search("amco:listacolumnas", tabladb);  
     var properties = [];
    
    
    
   for (i = 0; i < datostablas.length; i++) {  
      properties[i] = {
      value: i,
      label: datostablas[i][0],
    }
   }
  //console.log(select);  

    
    var index = select.length;
    var row = select[0];   
    
    
    filters = [];
    table = [{
    field: "action",
    title: "<i class='fa fa-gear'></i>&nbsp;Acciónes",
    align: "center",
    valign: "middle",
    width: "75px",
    cardVisible: false,
    switchable: false,
    formatter: function(value, row, index) {
      return [
        '<a class="zoom" href="javascript:void(0)" title="Zoom" style="margin-right: 10px;">',
          '<i class="fa fa-search-plus"></i>',
        '</a>'/*,
        '<a class="identify" href="javascript:void(0)" title="Identify">',
          '<i class="fa fa-info-circle"></i>',
        '</a>'*/
      ].join("");
    },
    events: {
      "click .zoom": function (e, value, row, index) {
        
         /* console.log(e);
          console.log(row);
          console.log(index);*/
          
    /*for (i = 0; i < datostablas.length; i++) { 
        console.log(datostablas[i][0]);
          if(datostablas[i][0]=='geom' || datostablas[i][0]=='wkb_geometry'){   
          var tgeom = "si"; 
        }
        else{
          var tgeom = "no"; 
        }
    }
          console.log(tgeom);*/
    
    
          var tabladb = document.getElementById("tablasbase").value;
          var tipogeom = select_query("SELECT ST_GeometryType(geom) as tipo FROM "+ tabladb + " limit 1");  
          if (tipogeom){
          if (tipogeom[0][0] == "ST_MultiPolygon"){
            var centroide = select_query("SELECT ST_CENTROID("+tabladb+".geom) AS geom FROM "+tabladb+" where gid = "+row[0]+"");
              //console.log(centroide);
            var coordenadas = select_query("SELECT ST_AsText('"+centroide+"')");
              //console.log(coordenadas);
              var coord = String(coordenadas[0][0]);
              var coord = coord.replace("POINT(", "");
              var coord = coord.replace(")", "");
               //console.log(coord);
              var coord = coord.split(" ");
              //console.log(coord);
              var y = coord[0];
              var x = coord[1];
              
              var view = map.getView();
              map.getView().setCenter(ol.proj.transform([eval(y), eval(x)], 'EPSG:4326', 'EPSG:3857'));
              map.getView().setZoom(18);
              var iconFeatures = [];
              var iconFeature = new ol.Feature({
              geometry: new ol.geom.Point(ol.proj.transform([eval(y), eval(x)], 'EPSG:4326',
                    'EPSG:3857')),
              name: 'wgs84d',
              population: 4000,
              rainfall: 500
        });
 
         highlight.setStyle(flagStyle);
         var markerSource = highlight.getSource();
         markerSource.clear();
         markerSource.addFeature(iconFeature);
 }       
        
          
          else if (tipogeom[0][0] == "ST_Point"){
            var coordenadas = select_query("SELECT geom FROM "+tabladb+" where gid = "+row[0]+""); 
            var coordenadas = select_query("SELECT ST_AsText('"+coordenadas+"')");
            var coord = String(coordenadas[0][0]);
              var coord = coord.replace("POINT(", "");
              var coord = coord.replace(")", "");
              var y = coord[0];
              var x = coord[1];
              
              
              var view = map.getView();
              map.getView().setCenter(ol.proj.transform([eval(y), eval(x)], 'EPSG:4326', 'EPSG:3857'));
              map.getView().setZoom(18);
              var iconFeatures = [];
              var iconFeature = new ol.Feature({
              geometry: new ol.geom.Point(ol.proj.transform([eval(y), eval(x)], 'EPSG:4326',
                    'EPSG:3857')),
              name: 'wgs84d',
              population: 4000,
              rainfall: 500
        });
 
         highlight.setStyle(flagStyle);
         var markerSource = highlight.getSource();
         markerSource.clear();
         markerSource.addFeature(iconFeature);
 }
              
              
          else if (tipogeom[0][0] == "ST_MultiLineString"){
               var coordenadas = select_query("SELECT geom FROM "+tabladb+" where gid = "+row[0]+"");
              console.log(coordenadas);
               var coordenadas = select_query("SELECT ST_AsText('"+coordenadas+"')");
               //var coord = String(coordenadas[0][0]);
               
          }
   
}
          else{
              //alert("No es posible ubicar este objeto en el mapa");
              Swal.fire({
                title: 'No es posible ubicar este objeto en el mapa',
                text: '',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
          }
        

      }/*,
      "click .identify": function (e, value, row, index) {
        identifyFeature(row.leaflet_stamp);
        highlightLayer.clearLayers();
        highlightLayer.addData(featureLayer.getLayer(row.leaflet_stamp).toGeoJSON());
      }*/
    }
  }];
    
    $.each(properties, function(index, value) {
    // Filter config
    if (value.filter) {
      var id;
      if (value.filter.type == "integer") {
        id = "cast(properties->"+ value.value +" as int)";
      }
      else if (value.filter.type == "double") {
        id = "cast(properties->"+ value.value +" as double)";
      }
      else {
        id = "properties->" + value.value;
      }
      filters.push({
        id: id,
        label: value.label
      });
     /* $.each(value.filter, function(key, val) {
        if (filters[index]) {
          // If values array is empty, fetch all distinct values
          if (key == "values" && val.length === 0) {
            alasql("SELECT DISTINCT(properties->"+value.value+") AS field FROM ? ORDER BY field ASC", [geojson.features], function(results){
              distinctValues = [];
              $.each(results, function(index, value) {
                distinctValues.push(value.field);
              });
            });
            filters[index].values = distinctValues;
          } else {
            filters[index][key] = val;
          }
        }
      });*/
    }
    // Table config
 
      table.push({
        field: value.value,
        title: value.label
      });
      $.each(value.table, function(key, val) {
        if (table[index+1]) {
          table[index+1][key] = val;
        }
      });
      //console.log(table);
  })
    
  $("#table").bootstrapTable('destroy').bootstrapTable({
    cache: false,
    height: $("#tablecontainer").height(),
    undefinedText: "",
    striped: false,
    pagination: false,
    minimumCountColumns: 1,
    sortName: "Código Nuevo",
    sortOrder: "desc",
    toolbar: "#toolbar",
    search: true,
    trimOnSearch: false,
    showColumns: true,
    showToggle: true,
    columns: table,
    onClickRow: function (row) {
      // do something!
    },
    onDblClickRow: function (row) {
      // do something!
    }
  });
    
  document.getElementById("tablecontainer").style.display = "block";
  document.getElementById("botonocultarselect").style.display = "block";
  tableFeatures = [];
 
  for (i=0; i< select.length; i++) {
  tableFeatures.push(select[i]);
  }
  //console.log(tableFeatures);
  $("#table").bootstrapTable("load", JSON.parse(JSON.stringify(tableFeatures)));
  var featureCount = $("#table").bootstrapTable("getData").length;
  if (featureCount == 1) {
    $("#feature-count").html($("#table").bootstrapTable("getData").length + " visible feature");
  } else {
    $("#feature-count").html($("#table").bootstrapTable("getData").length + " visible features");
  }
 
}

function switchView(view) {
  if (view == "split") {
    $("#view").html("Split View");
    location.hash = "#split";
    $("#table-container").show();
    $("#table-container").css("height", "55%");
    $("#map-container").show();
    $("#map-container").css("height", "45%");
    $(window).resize();
    if (map) {
      map.invalidateSize();
    }
  } else if (view == "map") {
    $("#view").html("Map View");
    location.hash = "#map";
    $("#map-container").show();
    $("#map-container").css("height", "100%");
    $("#table-container").hide();
    if (map) {
      map.invalidateSize();
    }
  } else if (view == "table") {
    $("#view").html("Table View");
    location.hash = "#table";
    $("#table-container").show();
    $("#table-container").css("height", "100%");
    $("#map-container").hide();
    $(window).resize();
  }
}

$("[name='view']").click(function() {
  $(".in,.open").removeClass("in open");
  if (this.id === "map-graph") {
    switchView("split");
    return false;
  } else if (this.id === "map-only") {
    switchView("map");
    return false;
  } else if (this.id === "graph-only") {
    switchView("table");
    return false;
  }
});

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#filter-btn").click(function() {
  $("#filterModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#chart-btn").click(function() {
  $("#chartModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#view-sql-btn").click(function() {
  alert($("#query-builder").queryBuilder("getSQL", false, false).sql);
});

$("#apply-filter-btn").click(function() {
  applyFilter();
});

$("#reset-filter-btn").click(function() {
  $("#query-builder").queryBuilder("reset");
  applyFilter();
});

$("#extent-btn").click(function() {
  map.fitBounds(featureLayer.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-csv-btn").click(function() {
  $("#table").tableExport({
    type: "csv",
    ignoreColumn: [0],
    fileName: "data"
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-excel-btn").click(function() {
  $("#table").tableExport({
    type: "excel",
    ignoreColumn: [0],
    fileName: "data"
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-pdf-btn").click(function() {
  $("#table").tableExport({
    type: "pdf",
    ignoreColumn: [0],
    fileName: "data",
    jspdf: {
      format: "bestfit",
      margins: {
        left: 20,
        right: 10,
        top: 20,
        bottom: 20
      },
      autotable: {
        extendWidth: false,
        overflow: "linebreak"
      }
    }
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#chartModal").on("shown.bs.modal", function (e) {
  drawCharts();
});

function exportexcel(){
  $("#table").tableExport({
    type: "excel",
    ignoreColumn: [0],
    fileName: "data"
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
}


    
    
    
    
 
 






