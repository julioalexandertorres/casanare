function pageL(){
 document.getElementById("carga2").style.display = 'none';
 map.addLayer(highlightfeatures);
 map.addLayer(highlight);
 startTour();
}

function startTour(){
   //lista();
   const backdrop = document.getElementById('modal-backdropshepherdpro');
   const tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: {
          enabled: true
        },
        classes: 'shepherd-theme-arrows',
        scrollTo: { behavior: 'smooth', block: 'center' }
      }
    });

    tour.on('start', showBackdrop);
      tour.on('cancel', () => {
        hideBackdrop();
        removeHighlights();
      });
      tour.on('complete', () => {
        hideBackdrop();
        removeHighlights();
      });
      tour.on('hide', removeHighlights);

    function showBackdrop() {
      backdrop.style.display = 'block'; // Mostrar fondo oscuro
    }

    function hideBackdrop() {
      backdrop.style.display = 'none'; // Ocultar fondo oscuro
    }

 
    function highlightElement(element) {
      if (element) {
        element.classList.add('highlight');
      }
    }

    function unhighlightElement(element) {
      if (element) {
        element.classList.remove('highlight');
      }
    }

    function removeHighlights() {
      const highlights = document.querySelectorAll('.highlight');
      highlights.forEach(el => el.classList.remove('highlight'));
    }

    tour.addStep({
      id: 'intro',
      text: '<div style="text-align: center;"><img src="./imagenes/logo_pequeno.png"></div><h3 style="text-align: center; margin:0px;" class="roboto-bold"></h3><br><p style="text-align: justify; margin-left:2em; margin-right:2em;" class="roboto-regular">Al centralizar la información geográfica, esta plataforma facilita una gestión más efectiva del territorio del distrito, promueve la transparencia y participación de diferentes actores, y soportan una toma de decisiones informada y basada en datos precisos y actualizados.<p/><br>',
      attachTo: {
        element: '#center-element',
        on: 'bottom'
      },
      buttons: [
         {
          action: tour.complete,
          text: 'Omitir tutorial',
          classes: 'shepherd-button-skip'
         },
        {
          action: tour.next,
          text: 'Siguiente',
          classes: 'shepherd-button-siguiente',
        }
      ],
      when: {
        show: function() {
          const el = document.querySelector('#center-element');
          el.style.visibility = 'visible';
        },
        hide: function() {
          const el = document.querySelector('#center-element');
          el.style.visibility = 'hidden';
        }
      },
      classes: 'shepherd-theme-arrows shepherd-centered'
    });

    tour.addStep({
      id: 'step2',
      text: '<h3 style="text-align: center; margin:0px;" class="roboto-bold">Búsqueda por atributos</h3><br><p style="text-align: justify; margin-left:2em; margin-right:2em;" class="roboto-regular"><a>A través de esta herramienta puede consultar un predio por:</a><br> •	 Dirección<br> •	 Código de la manzana catastral<br> •	 Código catastral del predio<br> •	 Nombre de propietario<br> •	 Documento de propietario<br> •	 Sitio de interés</p><br>',
      attachTo: {
        element: '#center-element',
        on: 'bottom'
      },
      buttons: [
        {
          action: tour.back,
          text: 'Atrás',
          classes: 'shepherd-button-siguiente'
        },
        {
         action: tour.next,
         text: 'Siguiente',
         classes: 'shepherd-button-siguiente'
        }      
      ],
      when: {
        show: function() {
          //lista();
          ocultarbarra();
          highlightElement(document.querySelector('#barrabuscar'));
          highlightElement(document.querySelector('#buscarporAtrib'));
        },
        hide: function() {
          unhighlightElement(document.querySelector('#barrabuscar'));
          unhighlightElement(document.querySelector('#buscarporAtrib'));
          ocultarbarra();
          //lista();
        }
      },
      classes: 'shepherd-theme-arrows shepherd-centered'
    });

    tour.addStep({
      id: 'step3',
      text: '<h3 style="text-align: center; margin:0px;" class="roboto-bold">Consultas avanzadas</h3><br><p style="text-align: justify; margin-left:2em; margin-right:2em;" class="roboto-regular"><a>A través de esta herramienta puede realizar análisis avanzado sobre las capas disponibles en la plataforma usando sentencias SQL.</a></p><br>',
      attachTo: {
        element: '#center-element',
        on: 'bottom'
      },
      buttons: [
        {
          action: tour.back,
          text: 'Atrás',
          classes: 'shepherd-button-siguiente'
        },
        {
          action: tour.next,
          text: 'Siguiente',
          classes: 'shepherd-button-siguiente'
        }
      ],
      when: {
        show: function() { 
          highlightElement(document.querySelector('#menuConsultasavanzadas'));
        },
        hide: function() {
          unhighlightElement(document.querySelector('#menuConsultasavanzadas'));
        }
      },
      classes: 'shepherd-theme-arrows shepherd-centered'
    });

    tour.addStep({
      id: 'step4',
      text: '<h3 style="text-align: center; margin:0px;" class="roboto-bold">Consultas usando inteligencia artificial</h3><br><p style="text-align: justify; margin-left:2em; margin-right:2em;" class="roboto-regular"><a>A través de esta herramienta puede realizar análisis avanzado sobre las capas disponibles en la plataforma usando lenguaje natural.</a></p><br>',
      attachTo: {
        element: '#center-element',
        on: 'bottom'
      },
      buttons: [
        {
          action: tour.back,
          text: 'Atrás',
          classes: 'shepherd-button-siguiente'
        },
        {
          action: tour.next,
          text: 'Siguiente',
          classes: 'shepherd-button-siguiente'
        }
      ],
      when: {
        show: function() { 
          highlightElement(document.querySelector('#menuConsultasia'));
        },
        hide: function() {
          unhighlightElement(document.querySelector('#menuConsultasia'));
        }
      },
      classes: 'shepherd-theme-arrows shepherd-centered'
    });

    tour.addStep({
      id: 'step5',
      text: '<h3 style="text-align: center; margin:0px;" class="roboto-bold">Ver mapas en pdf</h3><br><p style="text-align: justify; margin-left:2em; margin-right:2em;" class="roboto-regular"><a>A través de esta herramienta puede visualizar los mapas o documentos oficiales en pdf.</a></p><br>',
      attachTo: {
        element: '#center-element',
        on: 'bottom'
      },
      buttons: [
        {
          action: tour.back,
          text: 'Atrás',
          classes: 'shepherd-button-siguiente'
        },
        {
          action: tour.next,
          text: 'Siguiente',
          classes: 'shepherd-button-siguiente'
        }
      ],
      when: {
        show: function() { 
          highlightElement(document.querySelector('#menuMapaspdf'));
        },
        hide: function() {
          unhighlightElement(document.querySelector('#menuMapaspdf'));
        }
      },
      classes: 'shepherd-theme-arrows shepherd-centered'
    });

    tour.addStep({
      id: 'step5',
      text: '<h3 style="text-align: center; margin:0px;" class="roboto-bold">Cargar Servicios geográficos externos</h3><br><p style="text-align: justify; margin-left:2em; margin-right:2em;" class="roboto-regular"><a>A través de esta herramienta puede incorporar al mapa capas geográficas provenientes de servicios como WMS, WFS, WCS etc.</a></p><br>',
      attachTo: {
        element: '#center-element',
        on: 'bottom'
      },
      buttons: [
        {
          action: tour.back,
          text: 'Atrás',
          classes: 'shepherd-button-siguiente'
        },
        {
          action: tour.next,
          text: 'Siguiente',
          classes: 'shepherd-button-siguiente'
        }
      ],
      when: {
        show: function() { 
          highlightElement(document.querySelector('#menuCargarwms'));
        },
        hide: function() {
          unhighlightElement(document.querySelector('#menuCargarwms'));
        }
      },
      classes: 'shepherd-theme-arrows shepherd-centered'
    });

    tour.addStep({
      id: 'step6',
      text: '<h3 style="text-align: center; margin:0px;" class="roboto-bold">Fotográfias panoramicas 360</h3><br><p style="text-align: justify; margin-left:2em; margin-right:2em;" class="roboto-regular"><a>A través de esta herramienta puede activar la capa del recorrido donde se tomarón fotográfias 360.</a></p><br>',
      attachTo: {
        element: '#center-element',
        on: 'bottom'
      },
      buttons: [
        {
          action: tour.back,
          text: 'Atrás',
          classes: 'shepherd-button-siguiente'
        },
        {
          action: tour.next,
          text: 'Siguiente',
          classes: 'shepherd-button-siguiente'
        }
      ],
      when: {
        show: function() { 
          highlightElement(document.querySelector('#menuActivar360'));
        },
        hide: function() {
          unhighlightElement(document.querySelector('#menuActivar360'));
        }
      },
      classes: 'shepherd-theme-arrows shepherd-centered'
    });

    tour.addStep({
      id: 'step7',
      text: '<h3 style="text-align: center; margin:0px;" class="roboto-bold">Reportes estadísticos</h3><br><p style="text-align: justify; margin-left:2em; margin-right:2em;" class="roboto-regular"><a>A través de esta herramienta puede generar reportes estadísticos y mapas temáticoas acerca de la información geográfica disponible en el visor.</a></p><br>',
      attachTo: {
        element: '#center-element',
        on: 'bottom'
      },
      buttons: [
        {
          action: tour.back,
          text: 'Atrás',
          classes: 'shepherd-button-siguiente'
        },
        {
          action: tour.next,
          text: 'Siguiente',
          classes: 'shepherd-button-siguiente'
        }
      ],
      when: {
        show: function() { 
          highlightElement(document.querySelector('#menuReportesestadisticos'));
        },
        hide: function() {
          unhighlightElement(document.querySelector('#menuReportesestadisticos'));
        }
      },
      classes: 'shepherd-theme-arrows shepherd-centered'
    });

    tour.addStep({
      id: 'step8',
      text: '<h3 style="text-align: center; margin:0px;" class="roboto-bold">Visor 3D</h3><br><p style="text-align: justify; margin-left:2em; margin-right:2em;" class="roboto-regular"><a>Esta herramienta proporciona una visualización en 3 dimensiones de las capas geográficas disponibles en el visor.</a></p><br>',
      attachTo: {
        element: '#center-element',
        on: 'bottom'
      },
      buttons: [
        {
          action: tour.back,
          text: 'Atrás',
          classes: 'shepherd-button-siguiente'
        },
        {
          action: tour.next,
          text: 'Siguiente',
          classes: 'shepherd-button-siguiente'
        }
      ],
      when: {
        show: function() { 
          highlightElement(document.querySelector('#menuVisor3d'));
        },
        hide: function() {
          unhighlightElement(document.querySelector('#menuVisor3d'));
        }
      },
      classes: 'shepherd-theme-arrows shepherd-centered'
    });

    tour.addStep({
      id: 'step9',
      text: '<h3 style="text-align: center; margin:0px;" class="roboto-bold">Comparación de imágenes</h3><br><p style="text-align: justify; margin-left:2em; margin-right:2em;" class="roboto-regular"><a>Esta herramienta proporciona una comparación temporal entre las ortofotográfias de la ciudad y servicios satelitales de caracter público.</a></p><br>',
      attachTo: {
        element: '#center-element',
        on: 'bottom'
      },
      buttons: [
        {
          action: tour.back,
          text: 'Atrás',
          classes: 'shepherd-button-siguiente'
        },
        {
          action: tour.next,
          text: 'Siguiente',
          classes: 'shepherd-button-siguiente'
        }
      ],
      when: {
        show: function() { 
          highlightElement(document.querySelector('#menuComparacionimagenes'));
        },
        hide: function() {
          unhighlightElement(document.querySelector('#menuComparacionimagenes'));
        }
      },
      classes: 'shepherd-theme-arrows shepherd-centered'
    });

    tour.addStep({
      id: 'step10',
      text: '<h3 style="text-align: center; margin:0px;" class="roboto-bold">Herramientas básicas de navegación</h3><br><p style="text-align: justify; margin-left:2em; margin-right:2em;" class="roboto-regular"><a>Esta barra de herramientas contiene las siguientes opciones:</a><br> •	 Barra de transparencia para visualizar la ortofotográfia<br> •	 Zoom más y Zoom menos sobre el mapa<br> •	 Centrar el mapa en la cabecera del municipio<br> •	 Centrar el mapa en alguno de los centros poblados<br> •	 Realizar mediciones de distancias y áreas<br> •	 Imprimir la vista actual del mapa en un plano en formato pdf<br> •	 Conocer la coordenada de un punto en el mapa<br> •  Ir a una coordenada especifica en el mapa</p><br>',
      attachTo: {
        element: '#center-element',
        on: 'bottom'
      },
      buttons: [
        {
          action: tour.back,
          text: 'Atrás',
          classes: 'shepherd-button-siguiente'
        },
        {
          action: tour.next,
          text: 'Siguiente',
          classes: 'shepherd-button-siguiente'
        }
      ],
      when: {
        show: function() { 
          highlightElement(document.querySelector('#barraInferior'));
        },
        hide: function() {
          unhighlightElement(document.querySelector('#barraInferior'));
        }
      },
      classes: 'shepherd-theme-arrows shepherd-centered'
    });

    tour.addStep({
      id: 'step11',
      text: '<h3 style="text-align: center; margin:0px;" class="roboto-bold">Control de capas</h3><br><p style="text-align: justify; margin-left:2em; margin-right:2em;" class="roboto-regular"><a>Esta herramienta permite encender las capas, descargar las capas vectoriales, compartirlas a traves de servicios geograficos y obtener información alfanumérica</p><br>',
      attachTo: {
        element: '#center-element',
        on: 'bottom'
      },
      buttons: [
        {
          action: tour.back,
          text: 'Atrás',
          classes: 'shepherd-button-siguiente'
        },
        {
          action: tour.next,
          text: 'Siguiente',
          classes: 'shepherd-button-siguiente'
        }
      ],
      when: {
        show: function() {
          menuLayers();
          highlightElement(document.querySelector('#menuControlcapas'));
        },
        hide: function() {
          menuLayers();
          unhighlightElement(document.querySelector('#menuControlcapas'));
        }
      },
      classes: 'shepherd-theme-arrows shepherd-centered'
    });

    tour.addStep({
      id: 'step12',
      text: '<h3 style="text-align: center; margin:0px;" class="roboto-bold">Cambiar contraseña</h3><br><p style="text-align: justify; margin-left:2em; margin-right:2em;" class="roboto-regular"><a>Con esta herramienta puede cambiar su contraseña de acceso el número de veces que sea necesario</p><br>',
      attachTo: {
        element: '#center-element',
        on: 'bottom'
      },
      buttons: [
        {
          action: tour.back,
          text: 'Atrás',
          classes: 'shepherd-button-siguiente'
        },
        {
          action: tour.next,
          text: 'Siguiente',
          classes: 'shepherd-button-siguiente'
        }
      ],
      when: {
        show: function() {
          highlightElement(document.querySelector('#menuCambiarcontrasena'));
        },
        hide: function() {
          unhighlightElement(document.querySelector('#menuCambiarcontrasena'));
        }
      },
      classes: 'shepherd-theme-arrows shepherd-centered'
    });

    tour.addStep({
      id: 'step13',
      text: '<h3 style="text-align: center; margin:0px;" class="roboto-bold">Repositorio de información</h3><br><p style="text-align: justify; margin-left:2em; margin-right:2em;" class="roboto-regular"><a>Desde acá puede descargar información cartografica como Ortofotográfias, Modelo digitales de terreno, información vectorial etc.</p><br>',
      attachTo: {
        element: '#center-element',
        on: 'bottom'
      },
      buttons: [
        {
          action: tour.back,
          text: 'Atrás',
          classes: 'shepherd-button-siguiente'
        },
        {
          action: tour.next,
          text: 'Siguiente',
          classes: 'shepherd-button-siguiente'
        }
      ],
      when: {
        show: function() {
          highlightElement(document.querySelector('#menuRepositorio'));
        },
        hide: function() {
          unhighlightElement(document.querySelector('#menuRepositorio'));
        }
      },
      classes: 'shepherd-theme-arrows shepherd-centered'
    });

    tour.addStep({
      id: 'step14',
      text: '<h3 style="text-align: center; margin:0px;" class="roboto-bold">Ayuda</h3><br><p style="text-align: justify; margin-left:2em; margin-right:2em;" class="roboto-regular"><a>Desde acá puede descargar el manual de usuario o activar el tutorial de ayuda</p><br>',
      attachTo: {
        element: '#center-element',
        on: 'bottom'
      },
      buttons: [
        {
          action: tour.back,
          text: 'Atrás',
          classes: 'shepherd-button-siguiente'
        },
        {
          action: tour.next,
          text: 'Siguiente',
          classes: 'shepherd-button-siguiente'
        }
      ],
      when: {
        show: function() {
          highlightElement(document.querySelector('#menuManual'));
        },
        hide: function() {
          unhighlightElement(document.querySelector('#menuManual'));
        }
      },
      classes: 'shepherd-theme-arrows shepherd-centered'
    });

    tour.addStep({
      id: 'step15',
      text: '<h3 style="text-align: center; margin:0px;" class="roboto-bold">Salir</h3><br><p style="text-align: justify; margin-left:2em; margin-right:2em;" class="roboto-regular"><a>Este botón le permite salir del visor geográfico y volver al menu de registro de usuario y contraseña</p><br>',
      attachTo: {
        element: '#center-element',
        on: 'bottom'
      },
      buttons: [
        {
          action: tour.back,
          text: 'Atrás',
          classes: 'shepherd-button-siguiente'
        },
        {
          action: tour.next,
          text: 'Siguiente',
          classes: 'shepherd-button-siguiente'
        }
      ],
      when: {
        show: function() {
          highlightElement(document.querySelector('#menuCerrarsesion'));
        },
        hide: function() {
          unhighlightElement(document.querySelector('#menuCerrarsesion'));
        }
      },
      classes: 'shepherd-theme-arrows shepherd-centered'
    });

    tour.start();
}

function zoomIn() {
 var view = map.getView();
 var zoom = view.getZoom();
 view.setZoom(zoom + 1);
 tooltip.disable();
}
  
function zoomOut() {
 var view = map.getView();
 var zoom = view.getZoom();
 view.setZoom(zoom - 1);
}

function gotoCP(cp) {
 actividad("navegar a centro poblado");
 if(cp=='cabecera'){
    var pgetextent = [-8577577.242673, 430415.180093, -8570988.574544, 433654.199654];
    map.getView().fit(pgetextent, {size: map.getSize()});
 }
 else if(cp=='aguaclara'){
  var pgetextent = [-8566649.398872, 408623.699733, -8565122.634873, 409745.839573];
  map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='lacontra'){
  var pgetextent = [-8588172.344238, 420368.895785, -8587700.082438, 420716.075821];
  map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='bajocalima'){
    var pgetextent = [-8569841.308454, 444826.052688, -8567720.004517, 445981.747501];
    map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='cisneros'){
    var pgetextent = [-8546109.816534, 420353.145134, -8543535.016843, 421755.543091];
    map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='cordoba'){
    var pgetextent = [-8564784.077793, 431060.894889, -8562160.256079, 432490.153697];
    map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='elcrucero'){
    var pgetextent = [-8569987.339048, 438099.374370, -8568686.039104, 438808.274310];
    map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='caminoviejo'){
    var pgetextent = [-8552897.876482, 430351.482625, -8552005.993630, 430837.306596];
    map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='buenosaires'){
  var pgetextent = [-8572709.592983, 426374.393361, -8571427.371549, 427316.951154];
  map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='campohermoso'){
    var pgetextent = [-8576020.480755, 425045.967976, -8574386.792344, 425935.818515];
    map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='guaima'){
  var pgetextent = [-8567893.102374, 414839.215233, -8566486.186624, 415873.321064];
  map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='juanchaco'){
  var pgetextent = [-8611911.826433, 437271.312841, -8610463.631323, 438336.244790];
  map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='labarra'){
  var pgetextent = [-8614577.553284, 440250.365797, -8612196.305965, 442001.488842];
  map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='ladelfina'){
    var pgetextent = [-8548455.165078, 424910.234481, -8546166.375653, 426156.911265];
    map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='ellimones'){
  var pgetextent = [-8567931.366548, 415900.199443, -8567332.717900, 416340.219440];
  map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='katanga'){
    var pgetextent = [-8550004.665711, 428723.535887, -8548558.541777, 429511.252259];
    map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='callelarga'){
  var pgetextent = [-8570177.762364, 425471.871258, -8569406.331126, 426038.935548];
  map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='ladrilleros'){
  var pgetextent = [-8613265.843187, 438129.799149, -8611124.637454, 439704.361279];
  map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='pianguita'){
  var pgetextent = [-8594002.291290, 427502.029766, -8593276.119481, 428035.917918];
  map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='bendiciones'){
    var pgetextent = [-8551799.807735, 430510.900802, -8550904.864156, 430998.392829];
    map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='sancipriano'){
  var pgetextent = [-8560924.042635, 427283.659771, -8559655.068512, 428177.481461];
  map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='sanmarcos'){
  var pgetextent = [-8567872.328178, 413055.087567, -8566370.681438, 414112.735541];
  map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='labalastrera'){
  var pgetextent = [-8571255.794813, 425046.258720, -8570811.959232, 425358.900904];
  map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='llanobajo'){
  var pgetextent = [-8567433.042644, 411712.474303, -8566313.598064, 412500.917102];
  map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='labocana'){
  var pgetextent = [-8593400.176775, 426506.335577, -8591352.274173, 428011.953950];
  map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='puntasoldado'){
  var pgetextent = [-8590777.972835, 419876.547251, -8590245.879897, 420251.398933];
  map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='triana'){
    var pgetextent = [-8550570.592373, 429473.563333, -8549263.532581, 430185.535594];
    map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='umane'){
    var pgetextent = [-8590682.545027, 416736.367632, -8589618.516656, 417315.880435];
    map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='villaestela'){
    var pgetextent = [-8567801.461000, 433691.475312, -8565818.350339, 434771.751591];
    map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='elsalto'){
    var pgetextent = [-8549326.896439, 427186.254413, -8547905.328292, 427960.582463];
    map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='sabaleta'){
  var pgetextent = [-8568487.523276, 416368.308693, -8567001.207229, 417415.190601];
  map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='zacarias'){
  var pgetextent = [-8572354.669264, 424727.378618, -8571812.840739, 425005.494399];
  map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='zaragosa'){
    var pgetextent = [-8556087.512345, 429561.936432, -8554639.514978, 430350.680256];
    map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='quebradapericos'){
    var pgetextent = [-8549607.059510, 427852.343379, -8547866.270768, 428800.558361];
    map.getView().fit(pgetextent, map.getSize());
 }
 else if(cp=='laspalmas'){
  var pgetextent = [-8590154.687602, 416269.306862, -8589547.848924, 416580.791778];
  map.getView().fit(pgetextent, map.getSize());
 }
 document.getElementById("inputIrcentrop").style.display = 'none';
}

function vistaCentrosp(){
 if(document.getElementById("inputIrcentrop").style.display == 'block'){
    document.getElementById("inputIrcentrop").style.display = 'none';
    $('#botonCentrosp').removeClass('iconInfActive').addClass('iconInf');
 }
 else{
    document.getElementById("inputIrcentrop").style.display = 'block';
    $('#botonCentrosp').removeClass('iconInf').addClass('iconInfActive');
 }
}

function menuVercoordenada(){
   //console.log(document.body.style.cursor);
   if (document.body.style.cursor !== "crosshair") {
      document.body.style.cursor = "crosshair";
      $('#botonVercoordenada').removeClass('iconInf').addClass('iconInfActive');
      actividad("ver coordenada");
   }
   else if (document.body.style.cursor == "crosshair"){    
      $('#botonVercoordenada').removeClass('iconInfActive').addClass('iconInf');
      document.body.style.cursor = "default";
      document.getElementById("panel_infwms").style.display = "none";
      var markerSource = highlight.getSource();
      markerSource.clear();
   }
}

function copiarCoordenadas(coorden1, coorden2){
   var coordwgs84 = [coorden1, coorden2];
   var coordorigens = ol.proj.transform(coordwgs84, 'EPSG:4326', 'EPSG:3115');
   var coordorigenn = ol.proj.transform(coordwgs84, 'EPSG:4326', 'EPSG:9377');
   var textCop = "wgs84: " + coordwgs84 + ", " + "magna-sirgas-oeste: " + coordorigens + ", " + "origen unico nacional: " + coordorigenn;
   copiarAlPortapapeles(textCop);
    //alert("El wms de la capa: <br><b>" + datosc + " </b><br>fue copiado en el portapapeles");
    Swal.fire({
        title: 'Las coordenadas fueron copiadas en el portapapeles',
        text: '',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
}

function copiarAlPortapapeles(texto) {
   /*navigator.clipboard.writeText(texto).then(() => {
   }).catch(err => {
   });*/
   var text = texto;
   /* document.getElementById("inputinvisible").value=text;
   //var copyText = "http://35.184.176.7:8081/geoserver/amco/wms?service=WMS&version=1.1.0&request=GetMap&layers=amco:"+nombresc;
    var copyText = document.getElementById("inputinvisible");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    //alert("El wms de la capa: <br><b>" + datosc + " </b><br>fue copiado en el portapapeles");
    Swal.fire({
        title: 'Las coordenadas fueron copiadas en el portapapeles',
        text: '',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });*/
      var inputInvisible = document.getElementById("inputinvisible");
      inputInvisible.value = text;
      
      navigator.clipboard.writeText(text).then(function() {
          Swal.fire({
              title: 'Las coordenadas fueron copiadas en el portapapeles',
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
      });
 }

 function selEpsg(){
   if(document.getElementById("selecEpsg").value == 'epsg4326'){
      document.getElementById("menuEpsg4326").style.display = 'flex';
      document.getElementById("menuEpsg3115").style.display = 'none';
      document.getElementById("menuEpsg9377").style.display = 'none';
   }
   else if(document.getElementById("selecEpsg").value == 'epsg3115'){
      document.getElementById("menuEpsg4326").style.display = 'none';
      document.getElementById("menuEpsg3115").style.display = 'flex';
      document.getElementById("menuEpsg9377").style.display = 'none';
   }
   else if(document.getElementById("selecEpsg").value == 'epsg9377'){
      document.getElementById("menuEpsg4326").style.display = 'none';
      document.getElementById("menuEpsg3115").style.display = 'none';
      document.getElementById("menuEpsg9377").style.display = 'flex';
   }
 }

 function buscarCoorEpsg(){
      var view = map.getView();
      if(document.getElementById("selecEpsg").value == 'epsg4326'){
         var lat = parseFloat(document.getElementById("inputLat4326").value);
         var lon = parseFloat(document.getElementById("inputLon4326").value);
         var coordin = [lon, lat];
         var transf = ol.proj.transform(coordin, 'EPSG:4326', 'EPSG:3857');
         actividad("buscar coordenada epsg4326");
      }
      else if(document.getElementById("selecEpsg").value == 'epsg3115'){
         var lat = parseFloat(document.getElementById("inputLat3115").value);
         var lon = parseFloat(document.getElementById("inputLon3115").value);
         var coordin = [lon, lat];
         var transf = ol.proj.transform(coordin, 'EPSG:3115', 'EPSG:3857');
         actividad("buscar coordenada epsg3115");
      }
      else if(document.getElementById("selecEpsg").value == 'epsg9377'){
         var lat = parseFloat(document.getElementById("inputLat9377").value);
         var lon = parseFloat(document.getElementById("inputLon9377").value);
         var coordin = [lon, lat];
         var transf = ol.proj.transform(coordin, 'EPSG:9377', 'EPSG:3857');
         actividad("buscar coordenada epsg9377");
      }
      
      view.setCenter(transf);
      view.setZoom(18);
      var iconFeature = new ol.Feature({
         geometry: new ol.geom.Point(transf)
      });
      
      highlight.setStyle(flagStyle);
      var markerSource = highlight.getSource();
      markerSource.clear();
      markerSource.addFeature(iconFeature);
 }

 function cargarWms(){
    actividad("cargar WMS");
    cap.showDialog();
 }

 function cerrar3D(){
  document.getElementById("panel_iframe").style.display = "none";
 }
