async function fetchQuery(query) {
  try {
      const response = await fetch('./visor/src/app/back/querys.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: query })
      });
      const data = await response.json();
      if (data.success) {
          return data.result;
      } else {
          console.error("Error al ejecutar la consulta:", data.error);
          return null;
      }
  } catch (error) {
      console.error('Error:', error);
      return null;
  }
}

async function dataEst() {
  document.getElementById("loading").style.display = 'flex';
  try {
      const numIngresosQuery = "select count(*) from reguser where actividad = 'ingreso'";
      const numUsuariosQuery = "select count(*) from usuario";
      const numCapasQuery = "select count(*) from capas";
      const ingdistincQuery = "select usuario, count(*) from reguser where usuario is not null group by usuario";
      const totalcapasQuery = "select count(*) from capas";
      const capsdistincQuery = "select layer, count(*) from capas where layer is not null group by layer order by layer";
      const numActividadesQuery = "select count(*) from reguser where actividad <> 'ingreso'";
      const ingdistincclicsQuery = "select actividad, count(*) as total from reguser where actividad is not null and actividad <> 'ingreso' group by actividad order by total DESC LIMIT 10";

      const [numIngresos, numUsuarios, numCapas, ingdistinc, totalcapas, capsdistinc, numActividades, ingdistincclics] = await Promise.all([
          fetchQuery(numIngresosQuery),
          fetchQuery(numUsuariosQuery),
          fetchQuery(numCapasQuery),
          fetchQuery(ingdistincQuery),
          fetchQuery(totalcapasQuery),
          fetchQuery(capsdistincQuery),
          fetchQuery(numActividadesQuery),
          fetchQuery(ingdistincclicsQuery)
      ]);

      document.getElementById("numIng").innerHTML = numIngresos[0].count;
      document.getElementById("numUsers").innerHTML = numUsuarios[0].count;
      document.getElementById("numCaps").innerHTML = numCapas[0].count;

      const final = ingdistinc.map(item => ({
          name: item.usuario,
          y: parseInt(item.count)
      }));

      Highcharts.setOptions({
          global: {
              useUTC: false
          }
      });

      Highcharts.chart('ipuchart', {
          chart: {
              type: 'column'
          },
          title: {
              text: 'Total de ingresos: ' + numIngresos[0].count
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
                  format: '{point.y:1f}',
                  y: 10,
                  style: {
                      fontSize: '11px',
                      fontFamily: 'Verdana, sans-serif'
                  }
              }
          }]
      });

      Highcharts.chart('ipupie', {
          chart: {
              type: 'pie',
              borderWidth: 0
          },
          title: {
              text: 'Total ingresos: ' + numIngresos[0].count,
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

      const finalcaps = capsdistinc.map(item => ({
          name: item.layer,
          y: parseInt(item.count)
      }));

      Highcharts.chart('cctchart', {
          chart: {
              type: 'column'
          },
          title: {
              text: 'Total de capas geográficas: ' + totalcapas[0].count
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
                  text: 'Número de capas'
              }
          },
          legend: {
              enabled: false
          },
          tooltip: {
              pointFormat: '{point.y:1f}'
          },
          series: [{
              name: 'Capas',
              data: finalcaps,
              dataLabels: {
                  enabled: true,
                  rotation: -90,
                  color: '#FFFFFF',
                  align: 'right',
                  format: '{point.y:1f}',
                  y: 10,
                  style: {
                      fontSize: '11px',
                      fontFamily: 'Verdana, sans-serif'
                  }
              }
          }]
      });

      Highcharts.chart('cctpie', {
          chart: {
              type: 'pie',
              borderWidth: 0
          },
          title: {
              text: 'Total de capas geográficas: ' + totalcapas[0].count,
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          series: [{
              name: "Representa",
              colorByPoint: true,
              data: finalcaps
          }],
          exporting: {
              enabled: true
          }
      });

      const finalclics = ingdistincclics.map(item => ({
          name: item.actividad,
          y: parseInt(item.total)
      }));

      Highcharts.chart('clicschart', {
          chart: {
              type: 'column'
          },
          title: {
              text: 'Clics por actividad (solo las 10 mayores): ' + numActividades[0].count
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
                  text: 'Número de clics'
              }
          },
          legend: {
              enabled: false
          },
          tooltip: {
              pointFormat: '{point.y:1f}'
          },
          series: [{
              name: 'Clics',
              data: finalclics,
              dataLabels: {
                  enabled: true,
                  rotation: -90,
                  color: '#FFFFFF',
                  align: 'right',
                  format: '{point.y:1f}',
                  y: 10,
                  style: {
                      fontSize: '11px',
                      fontFamily: 'Verdana, sans-serif'
                  }
              }
          }]
      });

      Highcharts.chart('clicspie', {
          chart: {
              type: 'pie',
              borderWidth: 0
          },
          title: {
              text: 'Clics por actividad (solo las 10 mayores): ' + numActividades[0].count,
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          series: [{
              name: "Representa",
              colorByPoint: true,
              data: finalclics
          }],
          exporting: {
              enabled: true
          }
      });

  } catch (err) {
      console.error('Error ejecutando las consultas:', err);
  }

  try{
    var resultados = document.getElementById('table');
    resultados.innerHTML = '';
    table = [];
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    
        var datausuariosQuery = "select id, usuario, fecha, actividad from reguser order by fecha DESC";
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
            
            buildTableSelectReg(dataus);
            } else {
            alert("Error al ejecutar la consulta, por favor revise la expresión");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error al ejecutar la consulta, por favor revise la expresión");
        });

  } catch (err){}
  document.getElementById("loading").style.display = 'none';
}


function buildTableSelectReg(select) {
    //console.log(select);
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
     visible: false,  // Ocultar la columna "Acciones"
     formatter: function(value, row, index) {
       // Solo mostrar el ícono de zoom si la propiedad geom está presente
       //if (hasGeomColumn && 'geom' in row) {
        return [    
          '<a class="estados" href="javascript:void(0)" data-toggle="modal" data-target="#generarmapa" title="Editar">',
            '<i class="fas fa-edit" style="color: #37A0F4"></i>&nbsp;Editar',
          '</a>'
        ].join("");
       //}
       return '';
    },
     events: {
       "click .estados": function (e, value, row, index) {
        
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

  try{
    document.getElementById('vsalir').addEventListener('click', function (event) {
      window.open('index.html', '_self');
    }); 
  }
  catch(err){}

  try{
    document.getElementById('osalir').addEventListener('click', function (event) {
      window.open('/buenaventura/index.html', '_self');
    });
  }
  catch(err){}