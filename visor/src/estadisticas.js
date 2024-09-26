function generarGraficos(tipo){
  limpiar();
  actividad("generación de gráficos estadísticos");
  capasd[11].setVisible(false);
  var dataset = document.getElementById("estmap").value;
  var tabla = document.getElementById("tablasbaseEst").value;
  var columnaSel = document.getElementById("datosatribest").value;
  var titulo = document.getElementById("datosatribest").value;
  var select = select_query("select count(*) from " + dataset + "." + tabla + "");
  var param = select_query("select distinct(" + columnaSel + ") from " + dataset + "." + tabla + " where " + columnaSel + " is not null");
  var totalesQuery = "SELECT COUNT(*) as total FROM " + dataset + "." + tabla + " GROUP BY " + columnaSel;
  var totales = select_query(totalesQuery);
  //var geometria = select_query("select ST_AsGeoJSON(geom) from "+dataset+"."+tabla+" where "+columnaSel+ " is not null");
  var geometria = select_query("SELECT json_build_object('geom', ST_AsGeoJSON(geom)::json,'categoria', " + columnaSel + ") FROM " + dataset + "." + tabla + " WHERE " + columnaSel + " IS NOT NULL;");
  generarEstat(select, titulo, param, totales, tipo, geometria);
}

var color = "";
var mapTematic = "";
function generarEstat(select, titulo, param, totales, tipo, resultado) {
  document.getElementById("estadisticmap").style.display = 'none';
  var backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.style.display = 'none';
  }
  document.getElementById("EstatModal").style.display = 'flex';
  color = new Array(param.length);
  var dat = new Array(param.length);
  for (i = 0; i < param.length; i++) {
    color[i] = generarColorAleatorio(); 
    dat[i] = new Array(param.length);
    for (j = 0; j < param.length; j++) {
        if (i === j) {
            dat[i][j] = totales[i][0];
        } else {
            dat[i][j] = 0;
        }
    }
}
var serie = "[";
for (i = 0; i < param.length; i++) {
  serie = serie + "{name: '" + param[i][0] + "',color: '" + color[i] + "',data: [" + dat[i] + "]";
  if (i === param.length - 1) {
      serie = serie + "}]";
  } else {
      serie = serie + "},";
  }
}
var seriep = "[{name: '" + titulo + "',data:[";
for (i = 0; i < param.length; i++) {
  seriep = seriep + "{name: '" + param[i][0] + "',color: '" + color[i] + "',y: " + Math.round(dat[i][i] * 100 / select[0]) + "";
  if (i === param.length - 1) {
      seriep = seriep + "}]}]";
  } else {
      seriep = seriep + "},";
  }
}
//console.log(color);
  subtitulo='<span style="color: gray">Total de registros: ' + select[0] + '</span>';
if(tipo == 'chartEst'){
  Highcharts.chart('contEst', {
    chart: {
      type: 'column'
  },
  title: {
      text: titulo
  },
  subtitle: {
      text: subtitulo
  },
  xAxis: {
      categories: param
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
  series: eval(serie),

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
  });
}
else if(tipo == 'pieEst'){
    Highcharts.chart('contEst', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
      text: titulo
    },
    subtitle: {
      text: subtitulo
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: eval(seriep)
  });  
 }


 let coloresCategorias = {};
 param.forEach((categoria, index) => {
     coloresCategorias[categoria] = color[index]; // Asumiendo que 'color' es tu array de colores
 });

 // Preparación de la fuente de datos vectorial
 var vectorSourceEst = new ol.source.Vector({
     features: [] // Array vacío para las características
 });


 resultado.forEach(function(record) {
  var objeto = JSON.parse(record);

  var geojsonFeature = {
      type: 'Feature',
      geometry: objeto.geom,
      properties: {
          categoria: objeto.categoria
      }
  };

  //console.log(geojsonFeature);

  var feature = (new ol.format.GeoJSON()).readFeature(geojsonFeature, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
  });

  // Aplica el estilo basado en la categoría de la característica directamente
  var categoria = feature.get('categoria');
  var color = coloresCategorias[categoria] || '#FFFFFF'; // Color por defecto si la categoría no se encuentra
  var style = new ol.style.Style({
      fill: new ol.style.Fill({
          color: color
      }),
      stroke: new ol.style.Stroke({
          color: '#000000', // Puedes cambiar el color del borde si es necesario
          width: 1
      })
  });

  feature.setStyle(style); // Asigna el estilo directamente a la característica
  vectorSourceEst.addFeature(feature); // Añade la característica al vectorSource
});

// Continúa con la creación de la capa vectorial y añadiéndola al mapa como antes
mapTematic = new ol.layer.Vector({
  source: vectorSourceEst
  // No necesitas definir 'style' aquí ya que cada característica tiene su propio estilo
});

    //var view = map.getView();
    map.addLayer(mapTematic);
    // Ajusta la vista para incluir todas las características
    var pgetextent = vectorSourceEst.getExtent();
    //view.fitExtent(extent, map.getSize());
    map.getView().fit(pgetextent, {size: map.getSize()});
}

function generarColorAleatorio() {
  // Generar un color aleatorio en formato hexadecimal
  var letras = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letras[Math.floor(Math.random() * 16)];
  }
  return color;
}


  









































function generarMapariesgo(){
  var selectmap = document.getElementById("estmap").value;
  if ( selectmap == "amm") {
    var orderterren = capasd.length - 1;
    //console.log(orderterren);
    capasd[orderterren].setVisible(true);
    var titulo = "Amenaza por movimientos en masa";
    var select = select_query("select count(*) from "+mun+"_catastro.u_terreno");
    var param = [['Amenaza Alta'], ['Amenaza Media'], ['Amenaza Baja']];
    var total1 = select_query("select count(*) from "+mun+"_catastro.u_terreno where amm = 'Alta'");
    var total2 = select_query("select count(*) from "+mun+"_catastro.u_terreno where amm = 'Media'");
    var total3 = select_query("select count(*) from "+mun+"_catastro.u_terreno where amm = 'Baja'");
    var totales = total1.concat(total2, total3);
    capasd[orderterren].getSource().updateParams({'STYLES': "terreno_amm"});        
    estdistica(select, titulo, param, totales, id);
    var dt = select_query("select amm, codigo_ant from "+mun+"_catastro.u_terreno");
    //var datostablas = select_query("SELECT column_name FROM information_schema.columns WHERE table_schema='"+mun+"_catastro' AND table_name='u_terreno'");
    var datostablas =[["Tipo de Amenaza"], ["Código"]];
    //console.log(datostablas);
    buildTableSelectEst(dt, datostablas);
      //map.getView().fitExtent(pgetextent, map.getSize());
  }
  else if ( selectmap == "smm") {
    var orderterren = capasd.length - 1;
    capasd[orderterren].setVisible(true);
    var titulo = "Susceptibilidad por movimientos en masa";
    var select = select_query("select count(*) from "+mun+"_catastro.u_terreno");
    var param = [['Muy baja'], ['Baja'], ['Media'], ['Alta'], ['Muy alta']];
    var total1 = select_query("select count(*) from "+mun+"_catastro.u_terreno where smm = 'Muy baja'");
    var total2 = select_query("select count(*) from "+mun+"_catastro.u_terreno where smm = 'Baja'");
    var total3 = select_query("select count(*) from "+mun+"_catastro.u_terreno where smm = 'Media'");
    var total4 = select_query("select count(*) from "+mun+"_catastro.u_terreno where smm = 'Alta'");
    var total5 = select_query("select count(*) from "+mun+"_catastro.u_terreno where smm = 'Muy alta'");
    var totales = total1.concat(total2, total3, total4, total5);
    capasd[orderterren].getSource().updateParams({'STYLES': "terreno_smm"});        
    estdistica(select, titulo, param, totales, id);
    var dt = select_query("select smm, codigo_ant from "+mun+"_catastro.u_terreno");
    //var datostablas = select_query("SELECT column_name FROM information_schema.columns WHERE table_schema='"+mun+"_catastro' AND table_name='u_terreno'");
    var datostablas =[["Tipo de Amenaza"], ["Código"]];
    console.log(datostablas);
    buildTableSelectEst(dt, datostablas);
      //map.getView().fitExtent(pgetextent, map.getSize());
  }
  else if ( selectmap == "api") {
    var orderterren = capasd.length - 1;
    capasd[orderterren].setVisible(true);
    var titulo = "Áreas potencialmente inundables";
    var select = select_query("select count(*) from "+mun+"_catastro.u_terreno");
    var param = [['Área potencialmente inundable'], ['Área no potencialmente inundable']];
    var total1 = select_query("select count(*) from "+mun+"_catastro.u_terreno where api is not null");
    var total2 = select_query("select count(*) from "+mun+"_catastro.u_terreno where api is null");
    var totales = total1.concat(total2);
    capasd[orderterren].getSource().updateParams({'STYLES': "terreno_api"});        
    estdistica(select, titulo, param, totales, id);
    var dt = select_query("select smm, codigo_ant from "+mun+"_catastro.u_terreno");
    //var datostablas = select_query("SELECT column_name FROM information_schema.columns WHERE table_schema='"+mun+"_catastro' AND table_name='u_terreno'");
    var datostablas =[["Tipo de inundación"], ["Código"]];
    console.log(datostablas);
    buildTableSelectEst(dt, datostablas);
      //map.getView().fitExtent(pgetextent, map.getSize());
  }
}


function estdistica(select, titulo, param, totales, id) {
  document.getElementById("containerhc1").style.display = "block";
  document.getElementById("containerhc2").style.display = "block";

  var color = new Array(param.length);
  var dat = new Array(param.length);
  for (i = 0; i < param.length; i++) {
      if (param[i][0] === 'Amenaza Alta') {
          color[i] = '#FF2200';
      } else if (param[i][0] === 'Amenaza Media') {
          color[i] = '#FFFF00';
      } else if (param[i][0] === 'Amenaza Baja') {
          color[i] = '#006100';
      } else if (param[i][0] === 'Muy baja') {
        color[i] = '#006100';
      } else if (param[i][0] === 'Baja') {
        color[i] = '#7AAB00';
      } else if (param[i][0] === 'Media') {
        color[i] = '#FFFF00';
      } else if (param[i][0] === 'Alta') {
        color[i] = '#FF9900';
      } else if (param[i][0] === 'Muy alta') {
        color[i] = '#FF2200';
      } else if (param[i][0] === 'Área potencialmente inundable') {
        color[i] = '#E8E828';
      } else if (param[i][0] === 'Área no potencialmente inundable') {
        color[i] = '#e5e5e5';
      }
           

      

      dat[i] = new Array(param.length);
      for (j = 0; j < param.length; j++) {
          if (i === j) {
              dat[i][j] = totales[i][0];
          } else {
              dat[i][j] = 0;
          }
      }
  }

var serie = "[";
for (i = 0; i < param.length; i++) {
  serie = serie + "{name: '" + param[i][0] + "',color: '" + color[i] + "',data: [" + dat[i] + "]";
  if (i === param.length - 1) {
      serie = serie + "}]";
  } else {
      serie = serie + "},";
  }
}
var seriep = "[{name: '" + titulo + "',data:[";
for (i = 0; i < param.length; i++) {
  seriep = seriep + "{name: '" + param[i][0] + "',color: '" + color[i] + "',y: " + Math.round(dat[i][i] * 100 / select[0]) + "";
  if (i === param.length - 1) {
      seriep = seriep + "}]}]";
  } else {
      seriep = seriep + "},";
  }
}
  
  subtitulo='<span style="color: gray">Total de registros: ' + select[0] + '</span>'
  Highcharts.chart('containerhc1', {
    chart: {
      type: 'column'
  },
  title: {
      text: titulo
  },
  subtitle: {
      text: subtitulo
  },
  xAxis: {
      categories: param
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
  series: eval(serie),

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

  });
    Highcharts.chart('containerhc2', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: ''
        /*align: 'left'*/
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: eval(seriep)
});
  
}


function buildTableSelectEst(select, datostablas) {
  //var tabladb = document.getElementById("tablasbase").value; 
  //var datostablas = datostabl(tabladb);
  var properties = [];
 
for (i = 0; i < datostablas.length; i++) {  
   properties[i] = {
   value: i,
   label: datostablas[i][0],
 }
}

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
       var esquema = document.getElementById("esquema").value;
       var tabladb = document.getElementById("tablasbase").value;
       var tipogeom = select_query("SELECT ST_GeometryType(geom) as tipo FROM "+ mun + esquema + "." + tabladb +" limit 1");  
       if (tipogeom){
       if (tipogeom[0][0] == "ST_MultiPolygon"){
         var centroide = select_query("SELECT ST_CENTROID("+tabladb+".geom) AS geom FROM "+ mun + esquema + "." + tabladb +" where gid = "+row[0]+"");
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
         var coordenadas = select_query("SELECT geom FROM "+ mun + esquema + "." + tabladb +" where gid = "+row[0]+""); 
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
         var centroide = select_query("SELECT ST_CENTROID("+tabladb+".geom) AS geom FROM "+ mun + esquema + "." + tabladb +" where gid = "+row[0]+"");
         console.log(centroide);
            var coordenadas = select_query("SELECT geom FROM "+tabladb+" where gid = "+row[0]+"");
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
 height: $("#tablecontainer").height(),
 locale: "es-ES",
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
 $("#feature-count").html($("#table").bootstrapTable("getData").length + " Registro");
} else {
 $("#feature-count").html($("#table").bootstrapTable("getData").length + " Registros");
}

}