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

function aplicarFilterInf(id) {
  var resultados = document.getElementById('table');
  resultados.innerHTML = '';
  table = [];
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();
  if (id == 'usuarios') {
    //var datostablas = [['Nombre'], ['Nombre'], ['Usuario'], ['Email'], ['Role'], ['Municipio']];
    //var select = select_query("SELECT estado, nombre, usuario, email, tipo, municipio FROM usuario order by usuario");
    var datausuariosQuery = "select nombre, email, usuario, tipo, estado from usuario";
    //console.log(datausuariosQuery);
    fetch('/buenaventura/visor/src/app/back/querys.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: datausuariosQuery })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          //console.log(data.result);
          var dataus = data.result;
          dataus.forEach(item => {
            if (item.estado === "t") {
                item.estado = "<i class='fas fa-power-off' style='color: #6BD098'></i>&nbsp;<span style='color: #6BD098'>Activo</span>";         
            } else {
                item.estado = "<i class='fas fa-power-off' style='color: #EF8157'>&#xe5d3;</i>&nbsp;<span style='color: #EF8157'>Inactivo</span>";
            }
        });
          buildTableSelect(dataus);
        } else {
          alert("Error al ejecutar la consulta, por favor revise la expresión");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert("Error al ejecutar la consulta, por favor revise la expresión");
      });
  }

  else if (id == 'infing') {
    var datostablas = search("fhg:listacolumnas", "reguseramco");
    var select = search("fh:consultaregusuer");
  }
}

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
   title: "<i class='fa fa-cog'></i>&nbsp;Acciones",
   align: "center",
   valign: "middle",
   width: "75px",
   cardVisible: false,
   switchable: false,
   //visible: true,
   formatter: function(value, row, index) {
      return [    
        '<a class="estado" href="javascript:void(0)" data-toggle="modal" data-target="#generarmapa" title="Editar">',
          '<i class="fas fa-edit" style="color: #37A0F4"></i>&nbsp;Editar',
        '</a>'
      ].join("");
     return '';
  },
   events: {
     "click .estado": function (e, value, row, index) {
       var userid = row.usuario;
       var vemail =  row.email;
       var vrole = "role";
       var tabledinamic = document.getElementById("table-dynamic");
       tabledinamic.innerHTML = "";
       var table = document.getElementById("tblatt");
       table.innerHTML = "";
       document.getElementById("titulotabla").innerHTML = "EDITAR";
       var select = [];
       var sel = [];
       var imag = [];
       var stv = [];
       var ig = [];
       select[0] = "<b>Usuario: </b>";
       select[1] = "<b>Estado: </b>";
       select[2] = "<b>email: </b>";
       select[3] = "<b>Role: </b>";
       select[4] = "";
       sel[0] = "<input type='text' id='fuser' name='fuser' class='form-control' disabled>";
       sel[1] = "<select id='festado' class='form-select'><option value='activo'>Activo</option><option value='inactivo'>Inactivo</option></select>";
       sel[2] = "<input type='text' id='femail' class='form-control' name='femail'/>";
       sel[3] = "<select id='frole' class='form-select'><option value='general'>Usuario Municipio</option><option value='Administrador'>Administrador</option></select>";
       sel[4] = "<button type='button' class='btn btn-outline-danger' onclick='deleteuser()'>Eliminar Usuario</button>&nbsp;&nbsp;&nbsp;&nbsp;<button type='button' class='btn btn-outline-primary' onclick='saveuser()'>Guardar</button>";
       for (i = 0; i < select.length; i++) {
         row = table.insertRow(i);
         cell1 = row.insertCell(0);
         cell2 = row.insertCell(1);
         cell1.innerHTML = select[i];
         cell2.innerHTML = sel[i];
       }
       document.getElementById("fuser").value = userid;
       document.getElementById("femail").value = vemail;
       $("#panel_atr").modal('show');
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
   
var tableFeatures = select.map(function(row) {
   return row;
});

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
    fileName: "reporte"
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-excel-btn").click(function() {
  $("#table").tableExport({
    type: "excel",
    ignoreColumn: [0],
    fileName: "reporte"
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-pdf-btn").click(function() {
  $("#table").tableExport({
    type: "pdf",
    ignoreColumn: [0],
    fileName: "reporte",
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
    fileName: "reporte"
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
}

function ocultarpanelatributos(){
  try{
    $("#panel_atr").modal('hide');
  }
  catch(err){}
  try{
    $("#divform").modal('hide');
  }
  catch(err){}
}

function saveuser(){
  var userid = document.getElementById('fuser').value;
  var festado = document.getElementById('festado').value;
  var frole = document.getElementById('frole').value;
  if(festado == 'activo'){
    festado = true;
  }
  else if(festado == 'inactivo'){
    festado = false;
  }
  var femail = document.getElementById('femail').value; 
  update_query("update usuario set email = '"+ femail +"', estado = "+ festado +", tipo = '"+ frole +"' where usuario = '"+userid+"'");
  location.reload();
}

try{
  document.getElementById('createuser').addEventListener('click', function (event) {
    $("#divform").modal('show');
  }); 
}
catch(err){}

function showAlert(alertType, message) {
  const alertContainer = document.getElementById('alert-container');
  alertContainer.innerHTML = `
    <div class="alert ${alertType} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}

function adduser(){
  if(document.getElementById("addfuser").value == ''){
    alert("Debe ingresar un nombre de usuario");
  }
  else if(document.getElementById("addfemail").value == ''){
    alert("Debe ingresar un correo electronico");
  }
  else if(document.getElementById("addfnombre").value == ''){
    alert("Debe ingresar un Nombre");
  }
  else{
      var adduserid = document.getElementById('addfuser').value;
      var addnombre = document.getElementById('addfnombre').value;
      var addfestado = document.getElementById('addfestado').value;
      var addfrole = document.getElementById('addfrole').value;
      var addmunicipio = document.getElementById('addfmunicipio').value;
      //console.log(frole);
      if(addfestado == 'activo'){
        addfestado = true;
      }
      else if(addfestado == 'inactivo'){
        addfestado = false;
      }     
      var addfemail = document.getElementById('addfemail').value;
      var addfrole = document.getElementById('addfrole').value;
      //var addfmunicipio = document.getElementById('addfmunicipio').value;
      var cont = adduserid + "2021";
      var addcontrasena = hex_md5(cont);
      var num1 = Math.random() * (10000 - 1) + 512;
      var num2 = Math.random() * (5000 + 1) + 412;
      var num = num1 + num2;
      update_query("insert into usuario (nombre, email, usuario, contrasena, estado, id, tipo, municipio) values ('"+addnombre+"', '"+addfemail+"', '"+adduserid+"', '"+addcontrasena+"', '"+addfestado+"', '"+num+"', '"+addfrole+"', '"+addmunicipio+"')");

      location.reload();
  }
  
}

function deleteuser(){
  var userid = document.getElementById('fuser').value;
  console.log(userid);
  update_query("delete from usuario where usuario = '"+userid+"'");
  location.reload();
}

try{
  document.getElementById('tsalir').addEventListener('click', function (event) {
    window.open('/buenaventura/index.html', '_self');
  });
}
catch(err){}

function addcapageo(){
  var tabledinamic = document.getElementById("table-dynamic");
  tabledinamic.innerHTML = "";
  var table = document.getElementById("tblatt");
  table.innerHTML = "";
  document.getElementById("titulotabla").innerHTML = "AGREGAR CAPA GEOGRÁFICA";                 
  var select = [];
  var sel = [];
  var imag = [];
  var stv = [];
  var ig = [];
  select[0] = "<b>Nombre de la Capa en Geoserver: </b>";
  select[1] = "<b>Grupo de Capas: </b>"; 
  select[2] = "";
  sel[0] = "<input type='text' class='input-100' id='namecapa' name='namecapa'>";
  sel[1] = "<select id='tipocapa' class='list_form'><option value='catastro'>Catastro</option><option value='dane'>Dane</option><option value='gestion_del_riesgo'>Gestión del Riesgo</option><option value='pgirs'>Plan de gestión integral de residuos solidos</option><option value='restitucion'>Restitución</option><option value='mdts'>MDTS</option><option value='ortofotos'>Ortofotográfias</option></select>"; 
  sel[2] = "<button type='button' class='btn btn-outline-primary' onclick='addcapa()'>Agregar Capa al Visor Geográfico</button>";
  for (i = 0; i < select.length; i++) {
    row = table.insertRow(i);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = select[i];
    cell2.innerHTML = sel[i];       
  }              
  document.getElementById("panel_atr").style.display = "block";
}

function delcapageo(){
  var tabledinamic = document.getElementById("table-dynamic");
  tabledinamic.innerHTML = "";
  var table = document.getElementById("tblatt");
  table.innerHTML = "";
  document.getElementById("titulotabla").innerHTML = "ELIMINAR CAPA GEOGRÁFICA";                 
  var select = [];
  var sel = [];
  var imag = [];
  var stv = [];
  var ig = [];
  select[0] = "<b>Grupo de Capas: </b>"; 
  select[1] = "<b>Seleccione la Capa a Eliminar: </b>";
  select[2] = "";
  sel[0] = "<select id='tipocapadelete' class='list_form' onchange='cargarcapasdel()'><option value='seleccione' disabled selected>Seleccione...</option><option value='catastro'>Catastro</option><option value='dane'>Dane</option><option value='gestion_del_riesgo'>Gestión del Riesgo</option><option value='pgirs'>Plan de gestión integral de residuos solidos</option><option value='restitucion'>Restitución</option><option value='mdts'>MDTS</option><option value='ortofotos'>Ortofotográfias</option></select>"; 
  sel[1] = "<select id='capadisponible' class='list_form'></select>";
  sel[2] = "<button type='button' class='btn btn-outline-danger' onclick='deletecapa()'>Eliminar Capa del Visor Geográfico</button>"; 
  for (i = 0; i < select.length; i++) {
    row = table.insertRow(i);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = select[i];
    cell2.innerHTML = sel[i];       
  }               
  document.getElementById("panel_atr").style.display = "block";
}

function cargarcapasdel(){
  $("#capadisponible").find('option').remove();
  var dataset = document.getElementById("tipocapadelete").value;
  var capasdisp = select_query("select nombre from capas where layer ='"+dataset+"'");
  var select = document.getElementsByName(capadisponible)[0];
  for (i=0; i<capasdisp.length; i++) {
    var option = document.createElement("option");
    option.text = capasdisp[i][0];
    capadisponible.add(option);
  }
}

function addcapa(){
  if(document.getElementById("namecapa").value == ''){
    alert("Debe ingresar un nombre de Capa");
  }
  else{
    var nombrec = document.getElementById("namecapa").value;
    var layer = document.getElementById("tipocapa").value;
    var vurl = "https://www.geomonsas.xyz:8443/geoserver/buenaventura/"+nombrec+"/wms";
    var vpermisos = "general";
    var num1 = Math.random() * (1000000 - 1) + 512;
    var num2 = Math.random() * (7000 + 1) + 412;
    var num = parseInt(num1 + num2);
    update_query("insert into capas (url, layer, nombre, permisos, id) values ('"+vurl+"', '"+layer+"', '"+nombrec+"', '"+vpermisos+"', '"+num+"')");
    location.reload();
  }
}

function deletecapa(){
  var capab = document.getElementById("capadisponible").value;
  var layerb = document.getElementById("tipocapadelete").value;
  update_query("delete from capas where nombre ='"+capab+"' and layer ='"+layerb+"'");
  location.reload();
}

function divtoggle(){
  document.getElementById("divform").style.display ="none";
  document.getElementById("divstaticsm").style.display ="none";
}

function openmanualadmin(){
  document.getElementById("divmanual").style.display = 'block';
  document.getElementById("marco").src = "visor/pdfs/manual_de_administrador.pdf";
}

function cerrarpdf(){
  document.getElementById("divmanual").style.display = 'none';
}

function viewstatics(){
  $.ajax({
    beforeSend: function () {   
            document.getElementById("carga2").style.display = "block";     
    },
  success: function (response) {
  document.getElementById("divstaticsm").style.display = "block";
  var totalingresos = select_query("select count(*) from reguser");
  var ingdistinc = select_query("select usuario, count(*) from reguser where usuario is not null group by usuario");
  var final = [];
  var mes = [];

    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
  
  
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
  
    var chart;
    
  $('#graf1').highcharts({
    chart: {
      type: 'pie',
      borderWidth: 0
    },
          title: {
              text: 'Porcentaje de ingresos por usuario',
          },
          subtitle: {
              text: 'Total ingresos: ' + totalingresos,
          },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    series: [{
      name: "Representa",
      colorByPoint: true,
      data: final
    }],
    exporting: {
      enabled: true
    }
    });
  
    $('#graf2').highcharts({
      chart: {
        type: 'column'
    },
    title: {
        text: 'Total de ingresos por usuario'
    },
    subtitle: {
        text: 'Número de ingresos: ' + totalingresos
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Número de ingresos'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '{point.y:1f}'
    },
    series: [{
        name: 'Ingresos',
        data: final,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
      }],
      exporting: {
        enabled: true
      }
    });
  });
  },
complete: function () { 
        document.getElementById("carga2").style.display = "none";
    }
  });
  var param = "inguser";
  buildTableSelect2(param);

}

function changegraf(lista){
  $.ajax({
    beforeSend: function () {      
            document.getElementById("carga2").style.display = "block";     
    },
  success: function (response) {
  if(lista == 'graf1'){
    var val = document.getElementById("sel1").value;
  }
  else if(lista == 'graf2'){
    var val = document.getElementById("sel2").value;
  }
  
  if(val == 'ipup'){
    var totalingresos = select_query("select count(*) from reguser");
    var ingdistinc = select_query("select usuario, count(*) from reguser where usuario is not null group by usuario");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart;
    $('#'+lista+'').highcharts({
      chart: {
        type: 'pie',
        borderWidth: 0
      },
            title: {
                text: 'Porcentaje de ingresos por usuario',
            },
            subtitle: {
                text: 'Total ingresos: ' + totalingresos,
            },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      series: [{
        name: "Representa",
        colorByPoint: true,
        data: final
      }]
      });
    });
  
    var param = "inguser";
    buildTableSelect2(param);
  }


  else if(val == 'ipun'){
    var totalingresos = select_query("select count(*) from reguser");
    var ingdistinc = select_query("select usuario, count(*) from reguser where usuario is not null group by usuario");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
    $('#'+lista+'').highcharts({
      chart: {
        type: 'column'
    },
    title: {
        text: 'Total de ingresos por usuario'
    },
    subtitle: {
        text: 'Número de ingresos: ' + totalingresos
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Número de ingresos'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '{point.y:1f}'
    },
    series: [{
        name: 'Ingresos',
        data: final,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
  });
  var param = "inguser";
  buildTableSelect2(param);
  }

  else if(val == 'ceditp'){
    var totalcambios = select_query("select count(*) from reguser_edit");
    var ingdistinc = select_query("select actividad, count(*) from reguser_edit where actividad is not null group by actividad");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart;
    $('#'+lista+'').highcharts({
      chart: {
        type: 'pie',
        borderWidth: 0
      },
            title: {
                text: 'Porcentaje de cambios por actividad',
            },
            subtitle: {
                text: 'Total cambios: ' + totalcambios,
            },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      series: [{
        name: "Representa",
        colorByPoint: true,
        data: final
      }]
      });
    });
    var param = "changeedit";
    buildTableSelect2(param);
  }

  else if(val == 'ceditn'){
    var totalcambios = select_query("select count(*) from reguser_edit");
    var ingdistinc = select_query("select actividad, count(*) from reguser_edit where actividad is not null group by actividad");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart;
    $('#'+lista+'').highcharts({
      chart: {
        type: 'column'
    },
    title: {
        text: 'Número de cambios por actividad'
    },
    subtitle: {
        text: 'Número de cambios: ' + totalcambios
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Número de cambios'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '{point.y:1f}'
    },
    series: [{
        name: 'Tipo de cambio',
        data: final,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
      });
    });
    var param = "changeedit";
    buildTableSelect2(param);
  }


  else if(val == 'ccpmn'){
   
    var totalcapas = select_query("select count(*) from capas");
    var ingdistinc = select_query("select layer, count(*) from capas where layer is not null group by layer order by layer");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart;
    $('#'+lista+'').highcharts({
      chart: {
        type: 'column'
    },
    title: {
        text: 'Número de capas por tématica'
    },
    subtitle: {
        text: 'Número de capas públicadas en la plataforma: ' + totalcapas
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Número de cambios'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '{point.y:1f}'
    },
    series: [{
        name: 'Tipo de cambio',
        data: final,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
      });
    });
    var param = "capaspublicadas";
    buildTableSelect2(param);
  }

  else if(val == 'ccpmp'){
    var totalcapas = select_query("select count(*) from capas");
    var ingdistinc = select_query("select layer, count(*) from capas where layer is not null group by layer order by layer");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart;
    $('#'+lista+'').highcharts({
      chart: {
        type: 'pie',
        borderWidth: 0
      },
            title: {
                text: 'Número de capas por tématica',
            },
            subtitle: {
                text: 'Total capas: ' + totalcapas,
            },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      series: [{
        name: "Representa",
        colorByPoint: true,
        data: final
      }]
      });
    });
    var param = "capaspublicadas";
    buildTableSelect2(param);
  }

  else if(val == 'catvn'){
   
    var totalcapas = select_query("select count(*) from reguser");
    var ingdistinc = select_query("select actividad, count(*) as total from reguser where actividad is not null group by actividad order by total DESC LIMIT 10");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart;
    $('#'+lista+'').highcharts({
      chart: {
        type: 'column'
    },
    title: {
        text: 'Número de clics por actividad (solo las 10 mayores)'
    },
    subtitle: {
        text: 'Número de clics en la plataforma: ' + totalcapas
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Número de cambios'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '{point.y:1f}'
    },
    series: [{
        name: 'Tipo de cambio',
        data: final,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
      });
    });
    var param = "inguser";
    buildTableSelect2(param);
  }
  
  else if(val == 'catvp'){
    var totalcapas = select_query("select count(*) from reguser");
    var ingdistinc = select_query("select actividad, count(*) as total from reguser where actividad is not null group by actividad order by total DESC LIMIT 10");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart;
    $('#'+lista+'').highcharts({
      chart: {
        type: 'pie',
        borderWidth: 0
      },
            title: {
                text: 'Número de clics por actividad (solo las 10 mayores)',
            },
            subtitle: {
                text: 'Total clics: ' + totalcapas,
            },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      series: [{
        name: "Representa",
        colorByPoint: true,
        data: final
      }]
      });
    });
    var param = "inguser";
    buildTableSelect2(param);
  }

},
complete: function () { 
        document.getElementById("carga2").style.display = "none";
    }
  });
}


function datosesq(id){
  if(id=='esquema'){
    document.getElementById("tablasbase").innerHTML = "";
    document.getElementById("tablasbase").disabled = false;
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
  else if(id=='esquemaVisor'){
    document.getElementById("tablasbaseVisor").innerHTML = "";
    document.getElementById("tablasbaseVisor").disabled = false;
    var tb = tablasbase("Geop");
    var select = document.getElementById("tablasbaseVisor"); //Seleccionamos el select
    var defaultOption = document.createElement("option");
    defaultOption.innerHTML = "Seleccione..."; // Texto de la opción
    defaultOption.selected = true; // Hacer que esta opción esté seleccionada por defecto
    defaultOption.disabled = true;
    select.appendChild(defaultOption);
    for(var l=0; l < tb.length; l++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = tb[l]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    }
  }
}

function datostab(id){
  if(id=="tablasbase"){
    document.getElementById("datostablasbase").disabled = false;
    document.getElementById("deletetable").disabled = false;
    document.getElementById("datostablasbase").innerHTML = "";
    var select = document.getElementById("datostablasbase");
    var tabladb = document.getElementById("tablasbase").value;
    var datostablas = datostabl(tabladb, "conssql");
    for(var i=0; i < datostablas.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = datostablas[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    }  
  }  
  else if(id=="tablasbaseGeo"){
    document.getElementById("createLayerButton").disabled = false;    
  }
}

function tablasbase(id){
  if(id=='Geop'){
    var esquema = document.getElementById("esquemaVisor").value;
    var tablas = select_query("SELECT table_name FROM information_schema.tables WHERE table_schema='"+esquema+"' AND table_type='BASE TABLE' order by table_name");
    return tablas;
  }
  else{
    var esquema = document.getElementById("esquema").value;
    var tablas = select_query("SELECT table_name FROM information_schema.tables WHERE table_schema='"+esquema+"' AND table_type='BASE TABLE' order by table_name");
    return tablas;
  }
}

function datostabl(tabladb, tipo) {
  if(tipo == 'Geop'){
    var esquema = document.getElementById("esquemaGeo").value;  
    var tablas1 = select_query("SELECT column_name FROM information_schema.columns WHERE table_schema='"+esquema+"' AND table_name='"+tabladb+"'");
    return tablas1;
  }
  else{
    var esquema = document.getElementById("esquema").value;    
    var tablas1 = select_query("SELECT column_name FROM information_schema.columns WHERE table_schema='"+esquema+"' AND table_name='"+tabladb+"'");
    return tablas1;
  }
}

function datrib(column, tabla, control){
  var esquema = document.getElementById("esquema").value;
  document.getElementById("botonesReportest").style.display = "flex";
  var tablas1 = select_query("SELECT distinct "+column+" FROM "+esquema+"."+tabla+" where "+column+" is not null limit 5");
  return tablas1; 
}

try{
  document.getElementById('esq').addEventListener('change', function (event) {
    document.getElementById("botonLoadshp").disabled = false;
  }); 
}
catch(err){}

function actloadVisor(){
  document.getElementById("botonLoadvisor").disabled = false;
}

function actdeleteVisor(){
  document.getElementById("botonDeletevisor").disabled = false;
}

function datosiniVisor(){
  document.getElementById("tablasbaseVisor").innerHTML = "";
  document.getElementById("tablasbaseVisor").disabled = false;
  document.getElementById("botonDeletevisor").disabled = false;
  var layerc = document.getElementById("esquemaVisor").value;
  var tb = select_query("select nombre from capas where layer = '" + layerc + "'");
  var select = document.getElementById("tablasbaseVisor"); //Seleccionamos el select
  var defaultOption = document.createElement("option");
  defaultOption.innerHTML = "Seleccione..."; // Texto de la opción
  defaultOption.selected = true; // Hacer que esta opción esté seleccionada por defecto
  defaultOption.disabled = true;
  select.appendChild(defaultOption);
  for(var l=0; l < tb.length; l++){ 
      var option = document.createElement("option"); //Creamos la opcion
      option.innerHTML = tb[l]; //Metemos el texto en la opción
      select.appendChild(option); //Metemos la opción en el select
  }
}


