filters = [];
function menuconsultassql(){
    document.getElementById('filterModal').style.display='block';
}

function datosesq(id){
  if(id=='estmap'){
    document.getElementById("tablasbaseEst").innerHTML = "";
    document.getElementById("tablasbaseEst").style.display = "block";
    document.getElementById("labeltablasbaseEst").style.display = "block"; 
    var tb = tablasbase("estat");
    var select = document.getElementById("tablasbaseEst"); //Seleccionamos el select
    var defaultOption = document.createElement("option");
    defaultOption.innerHTML = "Seleccione..."; // Texto de la opción
    defaultOption.selected = true; // Hacer que esta opción esté seleccionada por defecto
    defaultOption.disabled = true; // Hacer que esta opción no sea seleccionable
    select.appendChild(defaultOption); // Agregar la opción al select
    for(var i=0; i < tb.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = tb[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    }
  }
  else if(id=='primerIA'){
    document.getElementById("listnomtabla1").innerHTML = "";
    document.getElementById("labellistnomtabla1").style.display = "block";
    document.getElementById("listnomtabla1").style.display = "block"; 
    var tb = tablasbase("IA1");
    //console.log(tb);
    var select = document.getElementById("listnomtabla1"); //Seleccionamos el select
    var defaultOption = document.createElement("option");
    defaultOption.innerHTML = "Seleccione..."; // Texto de la opción
    defaultOption.selected = true; // Hacer que esta opción esté seleccionada por defecto
    defaultOption.disabled = true; // Hacer que esta opción no sea seleccionable
    select.appendChild(defaultOption); // Agregar la opción al select
    for(var i=0; i < tb.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = tb[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    }
  }
  else if(id=='segundoIA'){
    document.getElementById("listnomtabla2").innerHTML = "";
    document.getElementById("labellistnomtabla2").style.display = "block";
    document.getElementById("listnomtabla2").style.display = "block"; 
    var tb = tablasbase("IA2");
    //console.log(tb);
    var select = document.getElementById("listnomtabla2"); //Seleccionamos el select
    var defaultOption = document.createElement("option");
    defaultOption.innerHTML = "Seleccione..."; // Texto de la opción
    defaultOption.selected = true; // Hacer que esta opción esté seleccionada por defecto
    defaultOption.disabled = true; // Hacer que esta opción no sea seleccionable
    select.appendChild(defaultOption); // Agregar la opción al select
    for(var i=0; i < tb.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = tb[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    }
  }
  else{
    document.getElementById("tablasbase").innerHTML = "";
    document.getElementById("tablasbase").style.display = "block";
    document.getElementById("labeltablasbase").style.display = "block";
    var tb = tablasbase();
    var select = document.getElementById("tablasbase"); //Seleccionamos el select
    var defaultOption = document.createElement("option");
    defaultOption.innerHTML = "Seleccione..."; // Texto de la opción
    defaultOption.selected = true; // Hacer que esta opción esté seleccionada por defecto
    defaultOption.disabled = true;
    select.appendChild(defaultOption);
    for(var i=0; i < tb.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = tb[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    }
  }
}

/*function datosesqEst(){
  document.getElementById("tablasbaseEst").innerHTML = "";
  document.getElementById("tablasbaseEst").style.display = "block";
  document.getElementById("labeltablasbaseEst").style.display = "block"; 
  var tb = tablasbaseEst();
  var select = document.getElementById("tablasbaseEst"); //Seleccionamos el select
  
  for(var i=0; i < tb.length; i++){ 
      var option = document.createElement("option"); //Creamos la opcion
      option.innerHTML = tb[i]; //Metemos el texto en la opción
      select.appendChild(option); //Metemos la opción en el select
  }
}*/

function datostab(id){
  if(id=='tablasbaseEst'){
    document.getElementById("datosatribest").style.display = "block";
    document.getElementById("labeldatosatribest").style.display = "block";
    document.getElementById("datosatribest").innerHTML = "";
    var defaultOption = document.createElement("option");
    var select = document.getElementById("datosatribest");
    defaultOption.innerHTML = "Seleccione..."; // Texto de la opción
    defaultOption.selected = true; // Hacer que esta opción esté seleccionada por defecto
    defaultOption.disabled = true; // Hacer que esta opción no sea seleccionable
    select.appendChild(defaultOption); // 
    var tabladb = document.getElementById("tablasbaseEst").value;
    var datostablas = datostabl(tabladb, "est");
    for(var i=0; i < datostablas.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = datostablas[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    }   
}

else if(id=='datostabIA1'){
    document.getElementById("columnAI1").style.display = "block";
    document.getElementById("labelcolumnAI1").style.display = "block";
    document.getElementById("columnAI1").innerHTML = "";
    var select = document.getElementById("columnAI1");
    var defaultOption = document.createElement("option");
    defaultOption.innerHTML = "Seleccione..."; // Texto de la opción
    defaultOption.selected = true; // Hacer que esta opción esté seleccionada por defecto
    defaultOption.disabled = true; // Hacer que esta opción no sea seleccionable
    select.appendChild(defaultOption); // 
    var tabladb = document.getElementById("listnomtabla1").value;
    var datostablas = datostabl(tabladb, "IA1");
    for(var i=0; i < datostablas.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = datostablas[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    }
}

else if(id=='datostabIA2'){
  document.getElementById("columnAI2").style.display = "block";
  document.getElementById("labelcolumnAI2").style.display = "block";
  document.getElementById("columnAI2").innerHTML = "";
  var select = document.getElementById("columnAI2");
  var defaultOption = document.createElement("option");
  defaultOption.innerHTML = "Seleccione..."; // Texto de la opción
  defaultOption.selected = true; // Hacer que esta opción esté seleccionada por defecto
  defaultOption.disabled = true; // Hacer que esta opción no sea seleccionable
  select.appendChild(defaultOption); // 
  var tabladb = document.getElementById("listnomtabla2").value;
  var datostablas = datostabl(tabladb, "IA2");
  for(var i=0; i < datostablas.length; i++){ 
      var option = document.createElement("option"); //Creamos la opcion
      option.innerHTML = datostablas[i]; //Metemos el texto en la opción
      select.appendChild(option); //Metemos la opción en el select
  }
}

else{
    document.getElementById("datostablasbase").style.display = "block";
    document.getElementById("labeldatostablasbase").style.display = "block";
    document.getElementById("datostablasbase").innerHTML = "";
    var select = document.getElementById("datostablasbase");
    var defaultOption = document.createElement("option");
    defaultOption.innerHTML = "Seleccione..."; // Texto de la opción
    defaultOption.selected = true; // Hacer que esta opción esté seleccionada por defecto
    defaultOption.disabled = true; // Hacer que esta opción no sea seleccionable
    select.appendChild(defaultOption); // 
    var tabladb = document.getElementById("tablasbase").value;
    var datostablas = datostabl(tabladb, "conssql");
    for(var i=0; i < datostablas.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = datostablas[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    }   
  }
}

function datostabatrib(id){
  if(id == 'datosatribest'){
    document.getElementById("labelejemColumn").style.display = "block";
    document.getElementById("ejemColumn").style.display = "block";
    document.getElementById("ejemColumn").innerHTML = "";
    var select = document.getElementById("ejemColumn");
    var tabladb = document.getElementById("tablasbaseEst").value;
    var tabladbcolumn = document.getElementById("datosatribest").value;
    var datostablasatributos = datrib(tabladbcolumn, tabladb, "estat");    
    for(var i=0; i < datostablasatributos.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = datostablasatributos[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    } 
  }
  else if(id == 'AI1'){
    //document.getElementById("labelejemColumn").style.display = "block";
    document.getElementById("ejemColumnAI1").style.display = "block";
    document.getElementById("ejemColumnAI1").innerHTML = "";
    var select = document.getElementById("ejemColumnAI1");
    var tabladb = document.getElementById("listnomtabla1").value;
    var tabladbcolumn = document.getElementById("columnAI1").value;
    var datostablasatributos = datrib(tabladbcolumn, tabladb, "IA1");    
    for(var i=0; i < datostablasatributos.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = datostablasatributos[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    } 
  }
  else if(id == 'AI2'){
    //document.getElementById("labelejemColumn").style.display = "block";
    document.getElementById("ejemColumnAI2").style.display = "block";
    document.getElementById("ejemColumnAI2").innerHTML = "";
    var select = document.getElementById("ejemColumnAI2");
    var tabladb = document.getElementById("listnomtabla2").value;
    var tabladbcolumn = document.getElementById("columnAI2").value;
    var datostablasatributos = datrib(tabladbcolumn, tabladb, "IA2");    
    for(var i=0; i < datostablasatributos.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = datostablasatributos[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    } 
  }
  else{
      document.getElementById("calculator").style.display = "block";
      document.getElementById("tablasbaseatributos").style.display = "block";
      document.getElementById("tablasbaseatributos").innerHTML = "";
      var select = document.getElementById("tablasbaseatributos");
      var tabladb = document.getElementById("tablasbase").value;
      var tabladbcolumn = document.getElementById("datostablasbase").value; 
      var datostablasatributos = datrib(tabladbcolumn, tabladb, "conssql");      
      for(var i=0; i < datostablasatributos.length; i++){ 
          var option = document.createElement("option"); //Creamos la opcion
          option.innerHTML = datostablasatributos[i]; //Metemos el texto en la opción
          select.appendChild(option); //Metemos la opción en el select
      } 
    } 
}

function expresionsql(){
    var esquema = document.getElementById("esquema").value;
    var tabladb = document.getElementById("tablasbase").value;
    var tabladbcolumn = document.getElementById("datostablasbase").value;
    var tablasatributos = document.getElementById("tablasbaseatributos").value; 
    document.getElementById("fname").value = "SELECT * FROM " + esquema + "." + tabladb + " WHERE " + tabladbcolumn + "=" + "'" + tablasatributos + "'"  + "";
}

function datosoperador(oper){
    var esquema = document.getElementById("esquema").value;
    var tabladb = document.getElementById("tablasbase").value;
    var tabladbcolumn = document.getElementById("datostablasbase").value;
    var tablasatributos = document.getElementById("tablasbaseatributos").value;
    var operador = oper;
    document.getElementById("fname").value = "SELECT * FROM " + esquema + "." + tabladb + " WHERE " + tabladbcolumn + operador + "'" + tablasatributos + "'" + "";
}

function cerrarSQL(){
  try{
    document.getElementById('filterModal').style.display='none';
  }
  catch(err){}
  try{
    document.getElementById('EstatModal').style.display='none';
  }
  catch(err){}
  try{
    document.getElementById('generarIA').style.display='none';
  }
  catch(err){}
}

function cerrarResult(){
  document.getElementById('tablecontainer').style.display='none';
}

/*function aplicarFilter(){
    actividad("consulta SQL");
    cerrarSQL();
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    var consultsql = document.getElementById("fname").value;
    //console.log(consultsql);
    var resultsql = select_query(""+consultsql);
    //console.log(resultsql);
       if (resultsql){
         buildTableSelect(resultsql);   
       }
       else{
        alert("Error al ejecutar la Consulta, por favor revise la expresión");
       }
}*/

function aplicarFilter() {
  actividad("consulta SQL");
  cerrarSQL();
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();

  var consultsql = document.getElementById("fname").value;
  
  fetch('src/app/back/querys.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: consultsql })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
        //console.log(data.result);
          buildTableSelect(data.result);
      } else {
          alert("Error al ejecutar la consulta, por favor revise la expresión");
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert("Error al ejecutar la consulta, por favor revise la expresión");
  });
}

var vectorLayer = "";
function buildTableSelect(select) {
   if (select.length === 0) {
    alert("No se encontraron resultados.");
    return;
   }
  var properties = Object.keys(select[0]).map(function(key, index) {
      return {
          value: key,
          label: key
      };
  });    

  properties = properties.filter(function(property) {
    return property.value !== "geom";
  });

  // Verificar si existe la columna geom
  const hasGeomColumn = select.some(row => 'geom' in row);


    filters = [];
    table = [{
    field: "action",
    title: "<i class='fa fa-cog'></i>&nbsp;Acciónes",
    align: "center",
    valign: "middle",
    width: "75px",
    cardVisible: false,
    switchable: false,
    formatter: function(value, row, index) {
      // Solo mostrar el ícono de zoom si la propiedad geom está presente
      //if (hasGeomColumn && 'geom' in row) {
         return [
            '<a class="zoom" href="javascript:void(0)" title="Zoom" style="margin-right: 10px;">',
            '<i class="fa fa-search-plus fa-2x" style="color: #134375"></i>',
            '</a>'
         ].join("");
      //}
      return '';
   },
    events: {
      "click .zoom": function (e, value, row, index) { 
      try{
        map.removeLayer(vectorLayer);
        //vectorLayer = null;
      }
      catch(err){};
      if(row.geom){ 
        var wkb = row.geom; 
      }
      else if(row.st_buffer){
        var wkb = row.st_buffer;
      }
      else if(row.st_makeline){
        var wkb = row.st_makeline;
      }

      var format = new ol.format.WKB();
      var feature = format.readFeature(wkb, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857',
      });
      
        // Crear una fuente vectorial y agregar la característica
        var vectorSource = new ol.source.Vector({
          features: [feature]
      });

      // Definir un estilo general para las características vectoriales
      var styleFunction = function(feature) {
          var geometryType = feature.getGeometry().getType();
          let style;
          switch (geometryType) {
              case 'Point':
                  style = new ol.style.Style({
                      image: new ol.style.Circle({
                          radius: 7,
                          fill: new ol.style.Fill({ color: 'red' }),
                          stroke: new ol.style.Stroke({
                              color: 'white', width: 2
                          })
                      })
                  });
                  break;
              case 'LineString':
                  style = new ol.style.Style({
                      stroke: new ol.style.Stroke({
                          color: 'red',
                          width: 3
                      })
                  });
                  break;
              case 'Polygon':
              case 'MultiPolygon':
                  style = new ol.style.Style({
                      stroke: new ol.style.Stroke({
                          color: 'blue',
                          width: 2
                      }),
                      fill: new ol.style.Fill({
                          color: 'rgba(0, 0, 255, 0.1)'
                      })
                  });
                  break;
              default:
                  style = new ol.style.Style({
                      stroke: new ol.style.Stroke({
                          color: 'black',
                          width: 1
                      }),
                      fill: new ol.style.Fill({
                          color: 'rgba(0, 0, 0, 0.1)'
                      })
                  });
          }
          return style;
      };

      vectorLayer = new ol.layer.Vector({
          source: vectorSource,
          style: styleFunction,
      });
      // Agregar la capa vectorial al mapa
      map.addLayer(vectorLayer);
      // Centrar y hacer zoom en la característica
      const extent = feature.getGeometry().getExtent();
      map.getView().fit(extent, { duration: 1000 });
 
      }
    }
  }];
    
      properties.forEach(function(property) {
        filters.push({
            id: property.value,
            label: property.label
        });
        
        table.push({
            field: property.value,
            title: property.label
        });
    });
    
  $("#table").bootstrapTable('destroy').bootstrapTable({
    cache: false,
    //height: $("#tablecontainer").height(),
    height: undefined,
    locale: "es-ES",
    undefinedText: "",
    striped: false,
    pagination: true,
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
  //document.getElementById("botonocultarselect").style.display = "block";
  //tableFeatures = [];

  var tableFeatures = select.map(function(row) {
    return row;
});
 
  /*for (i=0; i< select.length; i++) {
   tableFeatures.push(select[i]);
  }*/
 /* console.log(tableFeatures);
  $("#table").bootstrapTable("load", JSON.parse(JSON.stringify(tableFeatures)));
  var featureCount = $("#table").bootstrapTable("getData").length;
  if (featureCount == 1) {
    $("#feature-count").html($("#table").bootstrapTable("getData").length + " Registro");
  } else {
    $("#feature-count").html($("#table").bootstrapTable("getData").length + " Registros");
  }*/

    $("#table").bootstrapTable("load", tableFeatures);
    var featureCount = $("#table").bootstrapTable("getData").length;
    if (featureCount === 1) {
        $("#feature-count").html(featureCount + " Registro");
    } else {
        $("#feature-count").html(featureCount + " Registros");
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
  $("#query-builder").queryBuilder("getSQL", false, false).sql;
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


function drawCharts() {
  
  // Aquí va tu código para dibujar los gráficos
  // Por ejemplo, si estás usando Chart.js, aquí inicializarías el gráfico.
  // Obtén los datos de la tabla que necesitas para los gráficos.
  var tableData = $("#table").bootstrapTable("getData");
  
  
  // Prepara los datos para los gráficos. Por ejemplo, supongamos que quieres contar
  // la frecuencia de alguna categoría en tus datos de tabla para hacer un gráfico.
  var categories = {}; // Un objeto para contar las frecuencias.
  var totales = []; // Un arreglo para los totales de cada categoría.
  var param = []; // Un arreglo para los parámetros (nombres de categorías).
  
  tableData.forEach(function(row) {
    //console.log(row);
    var categoria = row.categoria; // Asumiendo que 'categoria' es una columna en tu tabla.
    if (!categories[categoria]) {
      categories[categoria] = 0;
      param.push([categoria]); // Añade la categoría al arreglo de parámetros.
    }
    categories[categoria]++;
  });
  
  // Convierte los conteos en un arreglo para Highcharts.
  for (var categoria in categories) {
    totales.push(categories[categoria]);
  }
  
  // Ahora llama a la función `estdistica()` con los datos preparados.
  // Asumiendo que 'select' es un arreglo con el número total de registros o algo relevante para tus gráficos.
  var select = [tableData.length]; // Número total de registros en la tabla.
  var titulo = "Título del Gráfico"; // El título para tus gráficos.
  var id = "idDelElemento"; // El ID del contenedor del gráfico.
  
  // Llama a la función que genera el gráfico.
  estdistica(select, titulo, param, totales, id);
}

function aplicarFilterIA(){
  actividad("consulta IA");
  cerrarSQL();
  //var radioSeleccionado = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
  //console.log(radioSeleccionado);
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();
  var consultsql = document.getElementById("inputIA").value;
  const OPENAI_API_KEY = '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';
  
  var esquema1 = document.getElementById("primerListEsq").value;
  var tabla1 = document.getElementById("listnomtabla1").value;
  var columna1 = document.getElementById("columnAI1").value;
  //console.log(esquema1, tabla1, columna1);
  //if(radioSeleccionado == 'selectCol1'){
    var promt2 = consultsql + ", el esquema tiene el nombre "+esquema1+" el nombre de la tabla es "+tabla1+" y la columna tiene el nombre "+columna1+"";
  //}
  /*else{
    var esquema2 = document.getElementById("segundoListEsq").value;
    var tabla2 = document.getElementById("listnomtabla2").value;
    var columna2 = document.getElementById("columnAI2").value;
    var promt2 = consultsql + ", la sentencia involucra dos tablas el esquema de la primera tabla tiene el nombre "+esquema1+" el nombre de la primera tabla es "+tabla1+" y la columna de la primera tabla tiene el nombre "+columna1+" , el esquema de la segunda tabla tiene el nombre "+esquema2+" el nombre de la segunda tabla es "+tabla2+" y la columna de la segunda tabla tiene el nombre "+columna2+"";
  }*/


fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + OPENAI_API_KEY
},
body: JSON.stringify({
  "model": "gpt-4",
  "messages": [
    {
      "role": "system",
      "content": "Su trabajo consiste en escribir solo sentencias SQL para ejecutarse en postgres basadas en las solicitudes de los usuarios, la respuesta solo debe ser la sentencia sin ;, no escriba nada mas, tenga en cuenta que la columna de geometria para las capas geograficas tiene el nombre geom y todas las capas geograficas estan en SRID 4326, osea que para geoprocesos como buffer u otros las consultas que se hagan en metros deben ser pasadas a coordenadas planas"
      //"content": "Su trabajo consiste en escribir solo sentencias SQL basadas en las solicitudes de los usuarios, la respuesta solo debe ser la sentencia. Además, separe y devuelva los nombres de los esquemas y tablas involucradas en una línea aparte."
    },
    {
      "role": "user",
      "content": promt2
    }
    // Aquí puedes añadir más mensajes si es necesario
  ]
})
})
.then(response => response.json())
.then(data => {
    var resultado = data.choices[0].message.content;
    //console.log(resultado);
    var resultadocompr = data.choices[0].message.content.trim();
    //console.log(resultadocompr);
    if(resultadocompr === null){
      alert("la consulta no arrojo resultados, intente redactarla de otra forma");
    }
    if (!resultadocompr.startsWith("SELECT")) {
      alert(resultado);
    }
    else{ 
      resultado = resultado.replace(/\n/g, "");
    }
    try{
      resultado = resultado.replace("WHERE", " WHERE");
    }
    catch(err){}
    try{
      resultado = resultado.replace("FROM", " FROM");
    }
    catch(err){}
    try{
      resultado = resultado.replace("LIMIT", " LIMIT");
    }
    catch(err){}
    try{
      resultado = resultado.replace("JOIN", " JOIN");
    }
    catch(err){}
    
    //console.log(resultado);
    //var resultsql = select_query(""+resultado);


    fetch('src/app/back/querys.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: resultado })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
        //console.log(data.result);
          buildTableSelect(data.result);
      } else {
          alert("Error al ejecutar la consulta, por favor revise la expresión");
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert("Error al ejecutar la consulta, por favor revise la expresión");
  });




 
   /* if(resultsql.length == 1){
    //alert("El resultado de la consulta es: <br><b>" +resultsql+"");
    };

     if (resultsql){

       buildTableSelectIA(resultsql);
     }
     else{
      //alert("Error al ejecutar la Consulta, por favor revise la expresión");
     }*/
  })
  .catch(error => console.error(error));
}


function buildTableSelectIA(select){
  var tabladb = document.getElementById("listnomtabla1").value; 
  var datostablas = datostabl(tabladb, 'IA1');
  //console.log(datostablas);
  var properties = [];
 
for (i = 0; i < datostablas.length; i++) {  
   properties[i] = {
   value: i,
   label: datostablas[i][0],
 }
}


  document.getElementById("generarIA").style.display = 'none';
  /*var properties = [];
for (i = 0; i < select[0].length; i++) {  
   properties[i] = {
   value: i,
   label: "Columna " + [i],
 }
}*/

 var index = select.length;
 var row = select[0];   
   
 filters = [];
 table = [{
 field: "action",
 title: "<i class='fa fa-cog'></i>&nbsp;Acciónes",
 align: "center",
 valign: "middle",
 width: "75px",
 cardVisible: false,
 switchable: false,
 formatter: function(value, row, index) {
   return [
     '<a class="zoom" href="javascript:void(0)" title="Zoom" style="margin-right: 10px;">',
       '<i class="fa fa-search-plus fa-2x" style="color: #134375"></i>',
     '</a>'/*,
     '<a class="identify" href="javascript:void(0)" title="Identify">',
       '<i class="fa fa-info-circle"></i>',
     '</a>'*/
   ].join("");
 },
 events: {
   "click .zoom": function (e, value, row, index) { 
       /*var esquema = document.getElementById("esquema").value;
       var tabladb = document.getElementById("tablasbase").value;*/
       //console.log(row);
       var arrayResult = row;
       var lastColumn = arrayResult[arrayResult.length - 1];
       //console.log(lastColumn);   
       /*para geometria puntos*/
       try{
        var coordenadas = select_query("SELECT ST_AsText('"+lastColumn+"')");
        console.log(coordenadas);
        var coord = String(coordenadas[0][0]);
         //console.log(coordenadas);
           var coord = coord.replace("POINT(", "");
           var coord = coord.replace(")", "");
           //console.log(coord);
           var coord = coord.split(" ");
           var y = coord[0];
           var x = coord[1];             
           var view = map.getView();
           //console.log(y , x);
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
      catch(err){}


       /*para geometria poligonos*/
       try{
        console.log(lastColumn);
        var coordenadas = select_query("SELECT ST_AsText(ST_CENTROID('"+lastColumn+"'))");
        console.log(coordenadas);
        var coord = String(coordenadas[0][0]);
         //console.log(coordenadas);
           var coord = coord.replace("POINT(", "");
           var coord = coord.replace(")", "");
           //console.log(coord);
           var coord = coord.split(" ");
           var y = coord[0];
           var x = coord[1];             
           var view = map.getView();
           //console.log(y , x);
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
       catch(err){}


   }
 }
}];
 
 $.each(properties, function(index, value) {
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
 //height: $("#tablecontainer").height(),
 height: undefined,
 locale: "es-ES",
 undefinedText: "",
 striped: false,
 pagination: true,
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
//document.getElementById("botonocultarselect").style.display = "block";
tableFeatures = [];

for (i=0; i< select.length; i++) {
tableFeatures.push(select[i]);
}
//console.log(tableFeatures);
$("#table").bootstrapTable("load", JSON.parse(JSON.stringify(tableFeatures)));
var featureCount = $("#table").bootstrapTable("getData").length;
if (featureCount == 1) {
 $("#feature-count").html($("#table").bootstrapTable("getData").length + " Registro");
} else {
 $("#feature-count").html($("#table").bootstrapTable("getData").length + " Registros");
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
$("#query-builder").queryBuilder("getSQL", false, false).sql;
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


function drawCharts() {

// Aquí va tu código para dibujar los gráficos
// Por ejemplo, si estás usando Chart.js, aquí inicializarías el gráfico.
// Obtén los datos de la tabla que necesitas para los gráficos.
var tableData = $("#table").bootstrapTable("getData");


// Prepara los datos para los gráficos. Por ejemplo, supongamos que quieres contar
// la frecuencia de alguna categoría en tus datos de tabla para hacer un gráfico.
var categories = {}; // Un objeto para contar las frecuencias.
var totales = []; // Un arreglo para los totales de cada categoría.
var param = []; // Un arreglo para los parámetros (nombres de categorías).

tableData.forEach(function(row) {
 //console.log(row);
 var categoria = row.categoria; // Asumiendo que 'categoria' es una columna en tu tabla.
 if (!categories[categoria]) {
   categories[categoria] = 0;
   param.push([categoria]); // Añade la categoría al arreglo de parámetros.
 }
 categories[categoria]++;
});

// Convierte los conteos en un arreglo para Highcharts.
for (var categoria in categories) {
 totales.push(categories[categoria]);
}

// Ahora llama a la función `estdistica()` con los datos preparados.
// Asumiendo que 'select' es un arreglo con el número total de registros o algo relevante para tus gráficos.
var select = [tableData.length]; // Número total de registros en la tabla.
var titulo = "Título del Gráfico"; // El título para tus gráficos.
var id = "idDelElemento"; // El ID del contenedor del gráfico.

// Llama a la función que genera el gráfico.
estdistica(select, titulo, param, totales, id);
}  
    
function actividad(activity){
  var f = new Date();
  if ((f.getMonth() + 1) < 10) {
     var month = '0' + (f.getMonth() + 1);
  } else {
     var month = (f.getMonth() + 1);
  }
  if (f.getDate() < 10) {
     var day = '0' + f.getDate();
  } else {
     var day = f.getDate();
  }
  var hour = f.getHours();
  if (f.getMinutes() < 10) {
     var minute = '0' + f.getMinutes();
  } else {
     var minute = f.getMinutes();
  }
  if (f.getSeconds() < 10) {
     var second = '0' + f.getSeconds();
  } else {
     var second = f.getSeconds();
  }
  var fecha = f.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second + "Z";
  const token = localStorage.getItem('jwt');
  const decoded = parseJwt(token);
  //update_query("insert into reguser(usuario, fecha, actividad) values ('"+decoded.sub+"', '"+fecha+"', '"+activity+"')");
  /*var query = `insert into reguser(usuario, fecha, actividad) values ('${decoded.sub}', '${fecha}', '${activity}')`;

  fetch('src/app/back/querys.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: query })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          //console.log('Actividad registrada exitosamente');
      } else {
          //console.error('Error al ejecutar la consulta:', data.error);
      }
  })
  .catch(error => {
      //console.error('Error:', error);
      alert("aca Error al ejecutar la consulta, por favor revise la expresión");
  });*/
}

function fetchQuery(query) {
  return fetch('src/app/back/querys.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: query })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          return data.result;
      } else {
          console.error('Error al ejecutar la consulta:', data.error);
          return null;
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert("Error al ejecutar la consulta, por favor revise la expresión");
      return null;
  });
}
    
    
 
 






