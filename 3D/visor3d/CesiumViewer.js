window.CESIUM_BASE_URL = "../../3D/Source/";
import {
  Ion,
  Cartesian3,
  createWorldTerrain,
  EllipsoidTerrainProvider,
  HeadingPitchRoll,
  Matrix4,
  WebMapServiceImageryProvider,
  defaultValue,
  knockout,
  OpenStreetMapImageryProvider,
  ArcGisMapServerImageryProvider,
  createWorldImagery,
  IonWorldImageryStyle,
  defined,
  formatError,
  Math as CesiumMath,
  objectToQuery,
  queryToObject,
  CzmlDataSource,
  GeoJsonDataSource,
  KmlDataSource,
  GpxDataSource,
  TileMapServiceImageryProvider,
  Viewer,
  viewerCesiumInspectorMixin,
  viewerDragDropMixin,
  Color,
  BoundingSphere,
  JulianDate,
  HeadingPitchRange,
  UrlTemplateImageryProvider,
  WebMercatorTilingScheme,
  VerticalOrigin,
  HeightReference
} from "../../3D/Source/Cesium.js";
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxYjk5YTYxOS02NzIwLTQwYzEtYmE0Mi03Yzk4MWE2MDJmM2EiLCJpZCI6MzE5LCJpYXQiOjE1MjUyMjExMDJ9.f_w6BfiImo91mBAjGaxRfxcWK4yzuYMtZs0Dmeij5xs';

var munsel = window.location.search.substring(1);
var munsel = munsel.split("=");
var munsel = munsel[1];
var codigopredio = "";
function main() {
  const endUserOptions = queryToObject(window.location.search.substring(1));
  let imageryProvider;
  if (defined(endUserOptions.tmsImageryUrl)) {
    imageryProvider = new TileMapServiceImageryProvider({
      url: endUserOptions.tmsImageryUrl,
    });
  }
  const loadingIndicator = document.getElementById("loadingIndicator");
let viewer;

try {
  const hasBaseLayerPicker = !defined(imageryProvider);
  viewer = new Viewer("cesiumContainer", {
    imageryProvider: imageryProvider,
    baseLayerPicker: hasBaseLayerPicker,
    scene3DOnly: endUserOptions.scene3DOnly,
    requestRenderMode: true
  });

  // Resto del código relacionado con la configuración del visor

  if (hasBaseLayerPicker) {
    const viewModel = viewer.baseLayerPicker.viewModel;
    viewModel.selectedTerrain = viewModel.terrainProviderViewModels[1];
  } else {
    viewer.terrainProvider = createWorldTerrain({
      requestWaterMask: true,
      requestVertexNormals: true,
    });
  }

} catch (exception) {
  loadingIndicator.style.display = "none";
  const message = formatError(exception);
  console.error(message);
  if (!document.querySelector(".cesium-widget-errorPanel")) {
    window.alert(message);
  }
  return;
}

//export { viewer };


  viewer.extend(viewerDragDropMixin);
  if (endUserOptions.inspector) {
    viewer.extend(viewerCesiumInspectorMixin);
  }

  const showLoadError = function (name, error) {
    const title = `An error occurred while loading the file: ${name}`;
    const message =
      "An error occurred while loading the file, which may indicate that it is invalid.  A detailed error report is below:";
    viewer.cesiumWidget.showErrorPanel(title, message, error);
  };

  viewer.dropError.addEventListener(function (viewerArg, name, error) {
    showLoadError(name, error);
  });


  const scene = viewer.scene;
  const context = scene.context;
  if (endUserOptions.debug) {
    context.validateShaderProgram = true;
    context.validateFramebuffer = true;
    context.logShaderCompilation = true;
    context.throwOnWebGLError = true;
  }

  const view = endUserOptions.view;
  const source = endUserOptions.source;
  if (defined(source)) {
    let sourceType = endUserOptions.sourceType;
    if (!defined(sourceType)) {
      // autodetect using file extension if not specified
      if (/\.czml$/i.test(source)) {
        sourceType = "czml";
      } else if (
        /\.geojson$/i.test(source) ||
        /\.json$/i.test(source) ||
        /\.topojson$/i.test(source)
      ) {
        sourceType = "geojson";
      } else if (/\.kml$/i.test(source) || /\.kmz$/i.test(source)) {
        sourceType = "kml";
      } else if (/\.gpx$/i.test(source) || /\.gpx$/i.test(source)) {
        sourceType = "gpx";
      }
    }

    let loadPromise;
    if (sourceType === "czml") {
      loadPromise = CzmlDataSource.load(source);
    } else if (sourceType === "geojson") {
      loadPromise = GeoJsonDataSource.load(source);
    } else if (sourceType === "kml") {
      loadPromise = KmlDataSource.load(source, {
        camera: scene.camera,
        canvas: scene.canvas,
        screenOverlayContainer: viewer.container,
      });
    } else if (sourceType === "gpx") {
      loadPromise = GpxDataSource.load(source);
    } else {
      showLoadError(source, "Unknown format.");
    }

    if (defined(loadPromise)) {
      viewer.dataSources
        .add(loadPromise)
        .then(function (dataSource) {
          const lookAt = endUserOptions.lookAt;
          if (defined(lookAt)) {
            const entity = dataSource.entities.getById(lookAt);
            if (defined(entity)) {
              viewer.trackedEntity = entity;
            } else {
              const error = `No entity with id "${lookAt}" exists in the provided data source.`;
              showLoadError(source, error);
            }
          } else if (!defined(view) && endUserOptions.flyTo !== "false") {
            viewer.flyTo(dataSource);
          }
        })
        .otherwise(function (error) {
          showLoadError(source, error);
        });
    }
  }

  if (endUserOptions.stats) {
    scene.debugShowFramesPerSecond = true;
  }

  const theme = endUserOptions.theme;
  if (defined(theme)) {
    if (endUserOptions.theme === "lighter") {
      document.body.classList.add("cesium-lighter");
      viewer.animation.applyThemeChanges();
    } else {
      const error = `Unknown theme: ${theme}`;
      viewer.cesiumWidget.showErrorPanel(error, "");
    }
  }

  if (defined(view)) {
    const splitQuery = view.split(/[ ,]+/);
    if (splitQuery.length > 1) {
      const longitude = !isNaN(+splitQuery[0]) ? +splitQuery[0] : 0.0;
      const latitude = !isNaN(+splitQuery[1]) ? +splitQuery[1] : 0.0;
      const height =
        splitQuery.length > 2 && !isNaN(+splitQuery[2])
          ? +splitQuery[2]
          : 300.0;
      const heading =
        splitQuery.length > 3 && !isNaN(+splitQuery[3])
          ? CesiumMath.toRadians(+splitQuery[3])
          : undefined;
      const pitch =
        splitQuery.length > 4 && !isNaN(+splitQuery[4])
          ? CesiumMath.toRadians(+splitQuery[4])
          : undefined;
      const roll =
        splitQuery.length > 5 && !isNaN(+splitQuery[5])
          ? CesiumMath.toRadians(+splitQuery[5])
          : undefined;

      viewer.camera.setView({
        destination: Cartesian3.fromDegrees(longitude, latitude, height),
        orientation: {
          heading: heading,
          pitch: pitch,
          roll: roll,
        },
      });
    }
  }

  const camera = viewer.camera;
  function saveCamera() {
    const position = camera.positionCartographic;
    let hpr = "";
    if (defined(camera.heading)) {
      hpr = `,${CesiumMath.toDegrees(camera.heading)},${CesiumMath.toDegrees(
        camera.pitch
      )},${CesiumMath.toDegrees(camera.roll)}`;
    }
    endUserOptions.view = `${CesiumMath.toDegrees(
      position.longitude
    )},${CesiumMath.toDegrees(position.latitude)},${position.height}${hpr}`;
    history.replaceState(undefined, "", `?${objectToQuery(endUserOptions)}`);
  }

  let timeout;
  if (endUserOptions.saveCamera !== "false") {
    camera.changed.addEventListener(function () {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(saveCamera, 1000);
    });
  }

  //loadingIndicator.style.display = "none";
  /*aca empiezo*/
  if (munsel == 'p8gf7hj') {
    var initialPosition = Cartesian3.fromDegrees(-72.799, 3.0267, 90200);
  }
  else {
    var initialPosition = defaultAccessToken;
  }
  var initialOrientation = new HeadingPitchRoll.fromDegrees(21.27879878293835, -21.34390550872461, 0.0716951918898415);
  viewer.scene.camera.setView({
    destination: initialPosition,
    orientation: initialOrientation,
    endTransform: Matrix4.IDENTITY
  });


  var viewModel = {
    layers: [],
    layers1: [],
    layers2: [],
    layers3: [],
    layers4: [],
    layers5: [],
    layers6: [],
    layers7: [],
    layers8: [],
    baseLayers: [],
    upLayer: true,
    downLayer: null,
    selectedLayer: null,
    isSelectableLayer: function (layer) {
      return this.baseLayers.indexOf(layer) >= 0;
    },
    raise: function (layer, index) {
      imageryLayers.raise(layer);
      viewModel.upLayer = layer;
      viewModel.downLayer = viewModel.layers[Math.max(0, index - 1)];
      updateLayerList();
      window.setTimeout(function () { viewModel.upLayer = viewModel.downLayer = null; }, 10);
    },
    lower: function (layer, index) {
      imageryLayers.lower(layer);
      viewModel.upLayer =
        viewModel.layers[Math.min(viewModel.layers.length - 1, index + 1)];
      viewModel.downLayer = layer;
      updateLayerList();
      window.setTimeout(function () {
        viewModel.upLayer =
        viewModel.downLayer = null;
      }, 10);
    },
    canRaise: function (layerIndex) {
      return layerIndex > 0;
    },
    canLower: function (layerIndex) {
      return layerIndex >= 0 && layerIndex < imageryLayers.length - 1;
    }
  };

  var capasprcatastro = [];
  var capaspriesgocm = [];
  var capasortofoto = [];
  var capasmdt = [];
  var capasdane = [];
  var capasbase = [];
  var capaspgirs = [];
  var capasrestitucion = [];

  var imageryLayers = viewer.imageryLayers;
  function setupLayersBase() {
    addAdditionalLayerOption(
      "OpenStreetMap",
      new OpenStreetMapImageryProvider({
        url: 'https://a.tile.openstreetmap.org/'
      }), 1.0, false
    );
    addAdditionalLayerOption(
      "Bing Maps Aerial with Labels",
      createWorldImagery({
        style: IonWorldImageryStyle.AERIAL_WITH_LABELS
      }), 1.0, false
    );

    addAdditionalLayerOption(
      "Esri Hillshade",
      new ArcGisMapServerImageryProvider({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer'
      }), 1.0, false
    );
    
    addAdditionalLayerOption(
      "Esri Ocean World",
      new ArcGisMapServerImageryProvider({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer'
      }), 1.0, false
    );



   
    /*addAdditionalLayerOption(
      "Recorrido 360",
      new WebMapServiceImageryProvider({
        url: 'https://www.geomonsas.xyz:8443/geoserver/buenaventura/wms',
        layers: 'buenaventura:buenaventura_360',
        credit: '3D',
        parameters: {
          transparent: 'true',
          format: 'image/png',
          styles: ''
        }
      }), 1.0, false, 
    );*/
    
    //var numLayers = 3;
    viewModel.layers8.splice(0, viewModel.layers8.length);
    for (var i = 4; i >= 1; --i) {
      viewModel.layers8.push(imageryLayers.get(i));
    }
  }

  /*function setupLayersOrtofotografias() {
    capasortofoto = select_query("select * from capas where layer = 'vias' order by id DESC");
    for (i = 0; i < capasortofoto.length; i++) {
      addAdditionalLayerOption(
        capasortofoto[i][3],
        new WebMapServiceImageryProvider({
          url: capasortofoto[i][1],
          layers: capasortofoto[i][3],
          credit: 'Aldesarrollo 3D',
          parameters: {
            transparent: 'true',
            format: 'image/png',
            styles: ''
          }
        }), 1.0, false);
    }
    var numLayers = capasortofoto.length;
    viewModel.layers6.splice(0, viewModel.layers6.length);
    for (var i = numLayers; i >= 1; --i) {
      viewModel.layers6.push(imageryLayers.get(i + 4));
    }
  }*/


  function setupLayersCatastro() {
      capasprcatastro = select_query("select * from capas where layer = 'vias' order by id DESC");
      for (i = 0; i < capasprcatastro.length; i++) {
        const layerName = capasprcatastro[i][3];
        const showByDefault = (layerName === "u_terreno_registros"); // Verificar si la capa es "u_terreno_registros"
        addAdditionalLayerOption(
          layerName,
          new WebMapServiceImageryProvider({
            url: capasprcatastro[i][1],
            layers: layerName,
            credit: 'Aldesarrollo 3D',
            parameters: {
              transparent: 'true',
              format: 'image/png',
              styles: ''
            }
          }), 
          1.0, 
          showByDefault // Establecer el estado de visibilidad
        );
      }   
      var numLayers = capasprcatastro.length;
      viewModel.layers1.splice(0, viewModel.layers1.length);
      for (var i = numLayers; i >= 1; --i) {
        viewModel.layers1.push(imageryLayers.get(i + 4));
      }
  }

    function setupLayersPgirs() {
      capaspgirs = select_query("select * from capas where layer = 'pot_casanare' order by id DESC");
      //console.log(capaspgirs);
      for (i = 0; i < capaspgirs.length; i++) {
        addAdditionalLayerOption(
          capaspgirs[i][3],
          new WebMapServiceImageryProvider({
            url: capaspgirs[i][1],
            layers: capaspgirs[i][3],
            credit: 'Aldesarrollo 3D',
            parameters: {
              transparent: 'true',
              format: 'image/png',
              styles: ''
            }
          }), 1.0, false);
      }
      var numLayers = capaspgirs.length;
      viewModel.layers2.splice(0, viewModel.layers2.length);
      for (var i = numLayers; i >= 1; --i) {
        viewModel.layers2.push(imageryLayers.get(i + 4 + capasprcatastro.length));
      }
    }

    function setupLayersGestiondelriesgo() {
      capaspriesgocm = select_query("select * from capas where layer = 'cartografia_basica' order by id DESC");
      for (i = 0; i < capaspriesgocm.length; i++) {
      addAdditionalLayerOption(
        capaspriesgocm[i][3],
        new WebMapServiceImageryProvider({
          url: capaspriesgocm[i][1],
          layers: capaspriesgocm[i][3],
          credit: 'Aldesarrollo 3D',
          parameters: {
            transparent: 'true',
            format: 'image/png',
            styles: ''
          }
        }), 1.0, false);
      }
      var numLayers = capaspriesgocm.length;
      viewModel.layers3.splice(0, viewModel.layers3.length);
      for (var i = numLayers; i >= 1; --i) {
        viewModel.layers3.push(imageryLayers.get(i + 4 + capasprcatastro.length + capaspgirs.length));
      }
    }

    function setupLayersDane() {
      capasdane = select_query("select * from capas where layer = 'mdt' order by id DESC");
      for (i = 0; i < capasdane.length; i++) {
        addAdditionalLayerOption(
          capasdane[i][3],
          new WebMapServiceImageryProvider({
            url: capasdane[i][1],
            layers: capasdane[i][3],
            credit: 'Aldesarrollo 3D',
            parameters: {
              transparent: 'true',
              format: 'image/png',
              styles: ''
            }
          }), 1.0, false);
      }
      var numLayers = capasdane.length;
      viewModel.layers4.splice(0, viewModel.layers4.length);
      for (var i = numLayers; i >= 1; --i) {
        viewModel.layers4.push(imageryLayers.get(i + 4 + capasprcatastro.length + capaspgirs.length + capaspriesgocm.length));
      }
    }

      function setupLayersRestitucion() {
        capasrestitucion = select_query("select * from capas where layer = 'vias' order by id DESC");
        for (i = 0; i < capasrestitucion.length; i++) {
          addAdditionalLayerOption(
            capasrestitucion[i][3],
            new WebMapServiceImageryProvider({
              url: capasrestitucion[i][1],
              layers: capasrestitucion[i][3],
              credit: 'Aldesarrollo 3D',
              parameters: {
                transparent: 'true',
                format: 'image/png',
                styles: ''
              }
            }), 1.0, false);
        }
        var numLayers = capasrestitucion.length;
        viewModel.layers5.splice(0, viewModel.layers5.length);
        for (var i = numLayers; i >= 1; --i) {
          viewModel.layers5.push(imageryLayers.get(i + 4 + capasprcatastro.length + capaspgirs.length + capaspriesgocm.length + capasdane.length));
        }
      }

  function setupLayersMdts() {
    capasmdt = select_query("select * from capas where layer = 'vias' order by id DESC");
    for (i = 0; i < capasmdt.length; i++) {
      addAdditionalLayerOption(
        capasmdt[i][3],
        new WebMapServiceImageryProvider({
          url: capasmdt[i][1],
          layers: capasmdt[i][3],
          credit: 'Aldesarrollo 3D',
          parameters: {
            transparent: 'true',
            format: 'image/png',
            styles: ''
          }
        }), 1.0, false);
    }
    var numLayers = capasmdt.length;
    viewModel.layers7.splice(0, viewModel.layers7.length);
    for (var i = numLayers; i >= 1; --i) {
      viewModel.layers7.push(imageryLayers.get(i + 4 + capasprcatastro.length + capaspgirs.length + capaspriesgocm.length + capasdane.length + capasrestitucion.length));
    }
  }

  function addAdditionalLayerOption(name, imageryProvider, alpha, show) {
    var layer = imageryLayers.addImageryProvider(imageryProvider);
    layer.alpha = defaultValue(alpha, 0.5);
    layer.show = defaultValue(show, true);
    layer.name = name;
    knockout.track(layer, ['alpha', 'show', 'name']);
  }

  let isConstructionsVisible = false; // Estado inicial de la visibilidad de las construcciones
  let constructionsDataSource = null; // Referencia al dataSource de las construcciones

  function toggleConstructions() {
    if (!isConstructionsVisible) {
      // Mostrar las construcciones y cambiar al elipsoide plano
      document.getElementById('loadingMessage').style.display = 'block';
      document.getElementById('leyendaPisos').style.display = 'block';
      viewer.terrainProvider = new EllipsoidTerrainProvider();
      var alturaPorPiso = 3; // Altura estimada por piso, ajusta según sea necesario
      var alturaBase = 0; // Altura base para asegurarse de que las construcciones estén por encima del terreno
      if (!constructionsDataSource) {
        // Cargar las construcciones si aún no se han cargado
        const geojsonUrl = 'https://www.geomonsas.xyz:8443/geoserver/buenaventura/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=buenaventura%3Au_construccion&outputFormat=application%2Fjson';
        constructionsDataSource = GeoJsonDataSource.load(geojsonUrl, {
          clampToGround: true
        }).then(function (dataSource) {
          viewer.dataSources.add(dataSource);
          var entities = dataSource.entities.values;
          for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            if (defined(entity.polygon)) {
              var numeroPisos = entity.properties.numero_pis.getValue();
              entity.polygon.height = alturaBase; // Establece la altura base
              entity.polygon.extrudedHeight = numeroPisos * alturaPorPiso + alturaBase;
            if (numeroPisos == "1") {
                entity.polygon.material = Color.FLORALWHITE;
            }
            else if (numeroPisos == "2") {
                entity.polygon.material = Color.ALICEBLUE;
            }
            else if (numeroPisos == "3") {
                entity.polygon.material = Color.BISQUE;
            }
            else if (numeroPisos == "4") {
                entity.polygon.material = Color.BLANCHEDALMOND;
            }
            else if (numeroPisos == "5") {
                entity.polygon.material = Color.ANTIQUEWHITE;
            }
            else if (numeroPisos == "6") {
                entity.polygon.material = Color.GAINSBORO;
            }
            else if (numeroPisos == "7") {
                entity.polygon.material = Color.FORESTGREEN;
            }
            else if (numeroPisos == "8") {
                entity.polygon.material = Color.DARKSEAGREEN;
            }
            else if (numeroPisos == "9") {
                entity.polygon.material = Color.CORAL;
            }
            else if (numeroPisos == "10") {
                entity.polygon.material = Color.DODGERBLUE;
            }
            else if (numeroPisos == "11") {
                entity.polygon.material = Color.DARKKHAKI;
            }
            else if (numeroPisos == "12") {
                entity.polygon.material = Color.FUCHSIA;
            }
            else if (numeroPisos == "13") {
                entity.polygon.material = Color.BURLYWOOD;
            }
            else if (numeroPisos == "14") {
                entity.polygon.material = Color.DARKGREY;
            }
            else if (numeroPisos == "15") {
                entity.polygon.material = Color.DEEPSKYBLUE;
            }
            else if (numeroPisos == "16") {
                entity.polygon.material = Color.DARKTURQUOISE;
            }
            else if (numeroPisos == "17") {
                entity.polygon.material = Color.DEEPPINK;
            }
            else if (numeroPisos == "18") {
                entity.polygon.material = Color.FIREBRICK;
            }
            else if (numeroPisos == "19") {
                entity.polygon.material = Color.DARKSLATEBLUE;
            }
            else if (numeroPisos == "20") {
                entity.polygon.material = Color.DIMGRAY;
            }
            else if (numeroPisos == "21") {
                entity.polygon.material = Color.CHOCOLATE;
            }
            else if (numeroPisos == "22") {
                entity.polygon.material = Color.GOLDENROD; // Más oscuro
            }
            else {
                entity.polygon.material = Color.DARKSLATEBLUE;
            }            
              entity.polygon.outline = false;
              //entity.polygon.outlineColor = Color.WHITE;
            }
          }
          setTimeout(function () {
            document.getElementById('loadingMessage').style.display = 'none';
          }, 8000);
          return dataSource; // Mantén la referencia a este dataSource
        });
      } else {
        // Si las construcciones ya están cargadas, simplemente las añade de nuevo
        viewer.dataSources.add(constructionsDataSource);
      }
      isConstructionsVisible = true;
    } else {
      document.getElementById('leyendaPisos').style.display = 'none';
      if (constructionsDataSource) {
        constructionsDataSource.then(function (dataSource) {
          viewer.dataSources.remove(dataSource, true); // Asegúrate de remover el dataSource resuelto, no la promesa
        });
        constructionsDataSource = null; // Restablece constructionsDataSource
      }
      viewer.terrainProvider = createWorldTerrain({
        requestWaterMask: true,
        requestVertexNormals: true
      });
      isConstructionsVisible = false;
    }
  }

/*
// Agregar la capa WMS
const wmsProvider = new WebMapServiceImageryProvider({
  url: 'https://www.geomonsas.xyz:8443/geoserver/buenaventura/wms',
  layers: 'buenaventura:buenaventura_360',
  credit: '3D',
  parameters: {
    transparent: 'true',
    format: 'image/png',
    styles: ''
  }
});

// Añadir la capa al viewer
viewer.imageryLayers.addImageryProvider(wmsProvider);*/



  document.addEventListener('DOMContentLoaded', (event) => {
    const switchConst = document.getElementById('bluetooth');
    if (switchConst) {
      switchConst.addEventListener('change', toggleConstructions);
    }
  });

  function updateLayerList() {
    var numLayers = imageryLayers.length;
    viewModel.layers.splice(0, viewModel.layers.length);
    for (var i = numLayers - 1; i >= 0; --i) {
      viewModel.layers.push(imageryLayers.get(i));
    }
  }

  setupLayersBase();
  //setupLayersOrtofotografias();
  setupLayersCatastro();
  setupLayersPgirs();
  setupLayersGestiondelriesgo();
  setupLayersDane();
  setupLayersRestitucion();  
  setupLayersMdts();
  
  updateLayerList();

  var toolbar = document.getElementById('toolbar');
  knockout.applyBindings(viewModel, toolbar);
  try {
    knockout.getObservable(viewModel, 'selectedLayer').subscribe(function (baseLayer) {
      var activeLayerIndex = 0;
      var numLayers = viewModel.layers.length;
      for (var i = 0; i < numLayers; ++i) {
        if (viewModel.isSelectableLayer(viewModel.layers[i])) {
          activeLayerIndex = i;
          break;
        }
      }
      var activeLayer = viewModel.layers[activeLayerIndex];
      var show = activeLayer.show;
      var alpha = activeLayer.alpha;
      imageryLayers.remove(activeLayer, false);
      imageryLayers.add(baseLayer, numLayers - activeLayerIndex - 1);
      baseLayer.show = show;
      baseLayer.alpha = alpha;
      updateLayerList();
    });
  }
  catch (err) { }

  $( function(){
    $("#direccion").autocomplete({
        /*minLength: 1,*/
        source: addressSource,
        select: addressSelectPredio
    });

    $("#manzana").autocomplete({
        minLength: 1,
        source: addressSource,
        select: addressSelectManzana
    });

    $("#address1").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            BuscarSitio();
        }
    });

    $("#codigo").autocomplete({
        minLength: 1,
        source: addressSource,
        select: addressSelectPredio
    });

    $("#matricula").autocomplete({
        minLength: 1,
        source: addressSource,
        select: addressSelectPredio
    });

    $("#propietarios").autocomplete({
        minLength: 1,
        source: addressSource,
        select: addressSelectPropietarios
    });

    $("#cedul").autocomplete({
        minLength: 1,
        source: addressSource,
        select: addressSelectCedula
    });
});


function addressSource(requestString, responseFunc) {
    if (requestString.term !== null && requestString.term !== undefined) {
        var querystr = requestString.term;      
    } else {
        var querystr = document.getElementById(requestString).value;
        var requestString = {val: 123};
    }
    if (querystr.length === 0) {
        response([]);
        return;
    }
    var viewParamsStr = viewparamsToStr({
        query: querystr
    });
    if ($("#direccion")["0"].value !== "" || requestString.val === 123) {       
        var temp = "direccion";
    }  
    else if ($("#manzana")["0"].value !== "" || requestString.val === 123) {       
        var temp = "manzana";
    }
    else if ($("#codigo")["0"].value !== "" || requestString.val === 123) {       
        var temp = "codigo";
    }
    else if ($("#matricula")["0"].value !== "" || requestString.val === 123) {       
        var temp = "matricula";
    } 
    else if ($("#propietarios")["0"].value !== "" || requestString.val === 123) {       
        var temp = "propietarios";
    } 
    else if ($("#cedul")["0"].value !== "" || requestString.val === 123) { 
        var temp = "cedul";
    }
        
    //var tamañopantalla = screen.width > 800;
    var url = "";
    $.ajax({
        url: url,
        beforeSend: function () {
            //if (tamañopantalla == true) {
                //putgif();
            //} else {
                document.getElementById("carga2").style.display = "block";
            //}
        },   
        success: function (data, status, xhr) {
            var arr = [];
            if (temp === "direccion") {    
                //var datos = select_query("SELECT initcap(a.direccion) AS direccion, a.codigo AS codigo FROM catastro.u_terreno_registros AS a, to_tsquery_partial('"+querystr+"') AS query WHERE direccion @@ query ORDER BY direccion DESC LIMIT 10");      
                //var datos = select_query("SELECT DISTINCT initcap(a.direccion) AS direccion, a.codigo AS codigo FROM catastro.r1 AS a, to_tsquery_partial('"+querystr+"') AS query WHERE direccion @@ query ORDER BY direccion DESC LIMIT 10");        	 
                  var datos = select_query("SELECT DISTINCT initcap(a.direccion) AS direccion, a.codigo AS codigo FROM catastro.r1 AS a WHERE a.direccion ILIKE '%"+querystr+"%' ORDER BY direccion DESC LIMIT 10");
                  if (datos === null) {
                    var datos = select_query("SELECT DISTINCT initcap(a.direccion) AS direccion, a.codigo AS codigo FROM catastro.u_terreno_registros AS a WHERE a.direccion ILIKE '%"+querystr+"%' ORDER BY direccion DESC LIMIT 10");
                  }
                try{
                    for (i = 0; i < datos.length; i++) {                   
                        arr.push({              
                            direccion: datos[i][0],
                            value: datos[i][0],
                            cod: datos[i][1],
                            feature: datos
                        });
                    }
                }
                catch(err){}
            }  
            else if (temp === "manzana") { 
                var datos = select_query("SELECT initcap(a.codigo) AS codigo, a.codigo_ant As codigo_ant, a.barrio_cod AS barrio_cod, a.gid AS gid FROM catastro.u_manzana AS a, to_tsquery_partial('"+querystr+"') AS query WHERE codigo @@ query ORDER BY codigo DESC LIMIT 10");             	 
                //var datos = select_query("SELECT initcap(a.codigo) AS codigo, a.codigo_ant AS codigo_ant, a.barrio_cod AS barrio_cod, a.gid AS gid FROM catastro.u_manzana AS a WHERE a.codigo ILIKE '%"+querystr+"%' ORDER BY codigo DESC LIMIT 10");       
                try{
                    for (i = 0; i < datos.length; i++) {                   
                        arr.push({  
                            value: datos[i][0],
                            cod: datos[i][0],
                            codigo_ant: datos[i][1],
                            barrio_cod: datos[i][2],
                            codigo_mun: datos[i][3],
                            gid: datos[i][4],
                            feature: datos
                        });
                    } 
                }
                catch(err){}   
            } 
            else if (temp === "codigo") { 
                var datos = select_query("SELECT DISTINCT initcap(a.codigo) AS codigo, a.direccion AS direccion FROM catastro.r1 AS a, to_tsquery_partial('"+querystr+"') AS query WHERE codigo @@ query ORDER BY codigo DESC LIMIT 10");             	 
                if (datos === null) {
                    var datos = select_query("SELECT DISTINCT initcap(a.codigo) AS codigo, a.direccion AS direccion FROM catastro.u_terreno_registros AS a, to_tsquery_partial('"+querystr+"') AS query WHERE codigo @@ query ORDER BY codigo DESC LIMIT 10");
                  } 
                try{
                    for (i = 0; i < datos.length; i++) {                   
                        arr.push({              
                            direccion: datos[i][1],
                            value: datos[i][0],
                            cod: datos[i][0],
                            feature: datos
                        });
                    }
                }
                catch(err){}  
            } 
            else if (temp === "matricula") { 
                var datos = select_query("SELECT initcap(a.matricula) AS matricula, a.codigo AS codigo FROM catastro.r1 AS a, to_tsquery_partial('"+querystr+"') AS query WHERE matricula @@ query ORDER BY matricula DESC LIMIT 10");             	 
                //var datos = select_query("SELECT initcap(a.codigo) AS codigo, a.direccion AS direccion FROM catastro.u_terreno_registros AS a, to_tsquery_partial('"+querystr+"') AS query WHERE codigo @@ query ORDER BY codigo DESC LIMIT 10"); 
                try{
                    for (i = 0; i < datos.length; i++) {                   
                        arr.push({              
                            matricula: datos[i][0],
                            value: datos[i][0],
                            cod: datos[i][1],
                            feature: datos
                        });
                    }
                }
                catch(err){}  
            } 
            else if (temp === "propietarios") {
                var datos = select_query("SELECT DISTINCT initcap(a.nombre) AS nombre, a.direccion AS direccion, a.codigo AS codigo FROM catastro.r1 AS a WHERE a.nombre ILIKE '%"+querystr+"%' ORDER BY nombre DESC LIMIT 10");
                //var datos = select_query("SELECT initcap(a.nombre) AS nombre, a.direccion AS direccion, a.codigo AS codigo FROM catastro.r1 AS a, to_tsquery_partial('"+querystr+"') AS query WHERE nombre @@ query ORDER BY nombre DESC LIMIT 10");
                if (datos === null) {
                  var datos = select_query("SELECT DISTINCT initcap(a.nombre) AS nombre, a.direccion AS direccion, a.codigo AS codigo FROM catastro.u_terreno_registros AS a WHERE a.nombre ILIKE '%"+querystr+"%' ORDER BY nombre DESC LIMIT 10");
                }
                try {
                    let uniqueValues = new Set();
                    for (let i = 0; i < datos.length; i++) {
                        if (!uniqueValues.has(datos[i][0])) {
                            uniqueValues.add(datos[i][0]);                 
                        arr.push({              
                            nombre: datos[i][0],
                            value: datos[i][0],
                            direccion: datos[i][1],
                            cod: datos[i][2],
                            feature: datos
                        });
                    }
                 }
                }  
                catch(err){
                    console.error(err); 
                }    
            }
            else if (temp === "cedul") {
                var datos = select_query("SELECT DISTINCT initcap(a.num_doc) AS num_doc, a.direccion AS direccion, a.codigo AS codigo FROM catastro.r1 AS a, to_tsquery_partial('"+querystr+"') AS query WHERE num_doc @@ query ORDER BY num_doc DESC LIMIT 10");             	 
                if (datos === null) {
                    var datos = select_query("SELECT DISTINCT initcap(a.num_doc) AS num_doc, a.direccion AS direccion, a.codigo AS codigo FROM catastro.u_terreno_registros AS a, to_tsquery_partial('"+querystr+"') AS query WHERE num_doc @@ query ORDER BY num_doc DESC LIMIT 10");
                } 
                try{
                    let uniqueValues = new Set();
                    for (let i = 0; i < datos.length; i++) {
                        if (!uniqueValues.has(datos[i][0])) {
                            uniqueValues.add(datos[i][0]);                    
                        arr.push({              
                            doc: datos[i][0],
                            value: datos[i][0],
                            direccion: datos[i][1],
                            cod: datos[i][2],
                            feature: datos
                        });
                    }
                } 
              }
                catch(err){}    
            }
            if (arr.length !== 0) {
                if (requestString.val === "direccion" || requestString.val === "codigo") {
                    var arreglado = {};
                    for (var i = 0; i < arr.length; ++i) {
                        arreglado[i] = arr[i];
                    }
                    arreglado.item = arreglado["0"];
                    addressSelectPredio(1, arreglado);
                }
                else if (requestString.val === "manzana") {
                    var arreglado = {};
                    for (var i = 0; i < arr.length; ++i) {
                        arreglado[i] = arr[i];
                    }
                    arreglado.item = arreglado["0"];
                    addressSelectManzana(1, arreglado);
                }
                else if (requestString.val === "propietarios") {
                    var arreglado = {};
                    for (var i = 0; i < arr.length; ++i) {
                        arreglado[i] = arr[i];
                    }
                    arreglado.item = arreglado["0"];
                    addressSelectPropietarios(1, arreglado);
                }
                else if (requestString.val === "cedul") {
                    var arreglado = {};
                    for (var i = 0; i < arr.length; ++i) {
                        arreglado[i] = arr[i];
                    }
                    arreglado.item = arreglado["0"];
                    addressSelectCedula(1, arreglado);
                }
                try {
                    responseFunc(arr);
                } catch (err) {
                    var arreglado = {};
                    arreglado.item = arr["0"];
                    try {
                        if (temp=='nombre'){
                            addressSelectPredio(1, arreglado);
                        }
                        else
                        {   
                        addressSelect(1, arreglado);
                         }
                    } catch (err) {
                       //alert("");
                    }
                }
            } else {
                if (temp === 'direcci') {
                    codeAddress(viewParamsStr);
                } 
            }
        },
        error: function () {
            console.log("error");
        },
        complete: function () {
            document.getElementById("carga2").style.display = "none";
        }

    });
}

  var geoJsonDataSource;   
  function addressSelectPredio(event, ui) {
    cleargeoJsonDataSource();
    try {
      var codph = ui.item.cod.slice(21, 22);
      if (codph == '9' || codph == '8') {
        var codigoterreno = ui.item.cod.slice(0, 9) + '0000' + ui.item.cod.slice(13, 26) + '0000';
        var tipoaval = "Predio en propiedad horizontal o condominio";
      }
      else if (codph == '5') {
        var codigoterreno = ui.item.cod.slice(0, 9) + '0000' + ui.item.cod.slice(13, 21) + '000000000';
        var tipoaval = "Mejora (Construcción en predio ajeno)";
      }
      else {
        var codigoterreno = ui.item.cod;
        var tipoaval = "No PH";
      }
      //var view = map.getView();
      var datosr1 = select_query("select * from catastro.r1 where codigo = '" + ui.item.cod + "'");
      var tabref = "registros";
      if (datosr1 == null) {
        var datosr1 = select_query("select * from catastro.u_terreno_registros where codigo = '" + ui.item.cod + "'");
        var tabref = "terrenos";
      }

      var geome = select_query("select ST_AsGeoJSON(geom) from catastro.u_terreno_registros where codigo = '" + codigoterreno + "'");
      if (geome == null) {
        var geome = select_query("select ST_AsGeoJSON(geom) from catastro.r_terreno_registros where codigo = '" + codigoterreno + "'");
      }

      var geojsonpredio = JSON.parse(geome[0]); // Asegúrate de que 'st_asgeojson' sea el nombre correcto del campo devuelto por tu consulta
      GeoJsonDataSource.load(geojsonpredio, {
        clampToGround: true // Asegura que las entidades se ajusten al terreno
      }).then(function (dataSource) {
        geoJsonDataSource = dataSource; // Guardar la referencia al data source
        viewer.dataSources.add(dataSource);

        var entities = dataSource.entities.values;
        if (entities.length > 0) {
          var boundingSpheres = [];
          for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            if (entity.position) {
              var position = entity.position.getValue(JulianDate.now());
              if (position && Cartesian3.magnitude(position) > 0) {
                var boundingSphere = new BoundingSphere(Cartesian3.clone(position), 0);
                boundingSpheres.push(boundingSphere);
              }
            } else if (entity.polyline) {
              var positions = entity.polyline.positions.getValue(JulianDate.now());
              if (positions && positions.length > 0) {
                var boundingSphere = BoundingSphere.fromPoints(positions);
                if (boundingSphere && Cartesian3.magnitude(boundingSphere.center) > 0) {
                  boundingSpheres.push(boundingSphere);
                }
              }
            } else if (entity.polygon) {
              entity.polygon.material = Color.RED.withAlpha(0.5); // Cambia a rojo con transparencia 50%
              
              // Obtener posiciones del polígono
              var hierarchy = entity.polygon.hierarchy.getValue(JulianDate.now());
              var positions = hierarchy.positions;
              
              // Crear un borde utilizando una línea
              if (positions && positions.length > 0) {
                /*viewer.entities.add({
                  polyline: {
                    positions: positions,
                    width: 3.0, // Grosor del borde
                    material: Color.RED, // Color del borde
                    clampToGround: true
                  }
                });*/
        
                var boundingSphere = BoundingSphere.fromPoints(positions);
                if (boundingSphere && Cartesian3.magnitude(boundingSphere.center) > 0) {
                  boundingSpheres.push(boundingSphere);
                }
              }
            }
          }
          if (boundingSpheres.length > 0) {
            var overallBoundingSphere = BoundingSphere.fromBoundingSpheres(boundingSpheres);
            // Asegurarse de que overallBoundingSphere tiene valores válidos
            if (!isNaN(overallBoundingSphere.radius) && overallBoundingSphere.radius > 0) {
              var minRange = 300; // Valor mínimo para el rango
              var range = Math.max(overallBoundingSphere.radius * 2, minRange);
              // Validar que range sea un número válido
              if (!isNaN(range) && range > 0) {
                try {
                  // Definir manualmente el valor de pitch como un número fijo
                  var pitch = -0.885398; // Aproximadamente -90 grados en radianes
                  // Validar la dirección de la cámara
                  var headingPitchRange = new HeadingPitchRange(0, pitch, range);
                  if (!isNaN(headingPitchRange.heading) && !isNaN(headingPitchRange.pitch) && !isNaN(headingPitchRange.range)) {
                    viewer.camera.flyToBoundingSphere(overallBoundingSphere, {
                      duration: 2,
                      offset: headingPitchRange // Ajusta el rango aquí
                    });
                  } else {
                    console.error('Invalid heading, pitch, or range:', headingPitchRange);
                  }
                } catch (error) {
                  console.error('Error flying to bounding sphere: ', error.message, error.stack);
                }
              } else {
                console.error('Invalid range:', range);
              }
            } else {
              console.error('Invalid overallBoundingSphere:', overallBoundingSphere);
            }
          } else {
            console.error('No valid bounding spheres found');
          }
        } else {
          console.error('No entities found in GeoJSON');
        }
      }).otherwise(function (error) {
        console.error('Error loading GeoJSON: ', error.message, error.stack);
      });


      if (tabref == "registros") {
        try {
          if (datosr1.length <= 1) {
            var propietario = datosr1[0][3];
            var documento = datosr1[0][5];
          }
          else if (datosr1.length > 1) {
            var propietarios = [];
            for (i = 0; i < datosr1.length; i++) {
              propietarios.push({
                prop: datosr1[i][3],
                doc: datosr1[i][5]
              });
            }
            var propietario = propietarios.map(function (item) {
              return item.prop;
            }).join(", ");
            var documento = propietarios.map(function (item) {
              return item.doc;
            }).join(", ");
          }
        }

        catch (err) {
          var propietario = "Sin información";
          var documento = "Sin información";
        }

        try {
          var direccion = datosr1[0][6];
          var areat = parseInt(datosr1[0][8]);
          var areac = parseInt(datosr1[0][9]);
          var avaluo = datosr1[0][10];
          var destino = datosr1[0][7];
          var matricula = datosr1[0][11];
        }
        catch (err) {
          var direccion = "Sin Información";
          var areat = "Sin Información";
          var areac = "Sin Información";
          var avaluo = "Sin Información";
          var destino = "Sin Información";
          var matricula = "Sin Información";
        }
      }

      else if (tabref == "terrenos") {
        try {
          if (datosr1.length <= 1) {
            var propietario = datosr1[0][14];
            var documento = datosr1[0][17];
          }
          else if (datosr1.length > 1) {
            var propietarios = [];
            for (i = 0; i < datosr1.length; i++) {
              propietarios.push({
                prop: datosr1[i][14],
                doc: datosr1[i][17]
              });
            }
            var propietario = propietarios.map(function (item) {
              return item.prop;
            }).join(", ");
            var documento = propietarios.map(function (item) {
              return item.doc;
            }).join(", ");
          }
        }

        catch (err) {
          var propietario = "Sin información";
          var documento = "Sin información";
        }

        try {
          var direccion = datosr1[0][18];
          var areat = parseInt(datosr1[0][21]);
          var areac = parseInt(datosr1[0][22]);
          var avaluo = datosr1[0][23];
          var destino = datosr1[0][20];
          var matricula = datosr1[0][29];
        }
        catch (err) {
          var direccion = "Sin Información";
          var areat = "Sin Información";
          var areac = "Sin Información";
          var avaluo = "Sin Información";
          var destino = "Sin Información";
          var matricula = "Sin Información";
        }
      }

      try {
        var codigo_ant = select_query("select codigo_ant from catastro.u_terreno_registros where codigo = '" + codigoterreno + "'");

        if (codigo_ant == null) {
          var codigo_ant = select_query("select codigo_ant from catastro.r_terreno_registros where codigo = '" + codigoterreno + "'");
        }
      }
      catch (err) {
        var codigo_ant = "sin información";
      }

      var tabledinamic = document.getElementById("table-dynamic");
      tabledinamic.innerHTML = "";
      var table = document.getElementById("tblatt");
      table.innerHTML = "";
      var select = [];
      var sel = [];
      var row = "";
      var cell1 = "";
      var cell2 = "";
      select[0] = "<b>Dirección: </b>";
      select[1] = "<b>Código: </b>";
      select[2] = "<b>Código Anterior: </b>";
      select[3] = "<b>Propietario/s: </b>";
      select[4] = "<b>Documento/s: </b>";
      select[5] = "<b>Área de Terreno: </b>";
      select[6] = "<b>Área Construida: </b>";
      select[7] = "<b>Avalúo: </b>";
      select[8] = "<b>Destino Económico: </b>";
      select[9] = "<b>Matricula inmobiliaria: </b>";
      select[10] = "<b>Tipo de avalúo: </b>";

      sel[0] = direccion;
      sel[1] = ui.item.cod;
      sel[2] = codigo_ant;
      sel[3] = propietario;
      sel[4] = documento;
      sel[5] = areat + " m2";
      sel[6] = areac + " m2";
      sel[7] = "$" + formatNumber(avaluo);
      sel[8] = destino;
      sel[9] = matricula;
      sel[10] = tipoaval;

      codigopredio = ui.item.cod;

      for (i = 0; i < select.length; i++) {
        row = table.insertRow(i);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell1.innerHTML = select[i];
        cell2.innerHTML = sel[i];
        cell1.className = "roboto-medium";
        cell2.className = "roboto-regular";
      }
      document.getElementById("panel_atr").style.display = "block";
    }
    catch(err) {
      Swal.fire({
        title: 'No se encontró información geográfica asociada a la consulta',
        text: 'Es posible que se trate de un predio en Omisión, a continuación se muestran los datos de la tabla de registro',
        icon: 'info',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#013F6C',
        customClass: {
          title: 'roboto-bold tamLetrasweetTitulo',
          container: 'roboto-medium tamLetrasweetCuerpo',
          confirmButton: 'roboto-regular',
          icon: 'custom-icon-font-size',
          popup: 'custom-popup'
        },
      });
      try {
        var direccion = datosr1[0][6];
        var propietario = datosr1[0][3];
        var documento = datosr1[0][5];
        var areat = parseInt(datosr1[0][8]);
        var areac = parseInt(datosr1[0][9]);
        var avaluo = datosr1[0][10];
        var destino = datosr1[0][7];
        var matricula = datosr1[0][11];
      }
      catch (err) {
        var direccion = "Sin información";
        var areat = "Sin información";
        var areac = "Sin información";
        var avaluo = "Sin información";
        var destino = "Sin información";
        var matricula = "Sin información";
        var propietario = "Sin información";
        var documento = "Sin información";
      }

      var tabledinamic = document.getElementById("table-dynamic");
      tabledinamic.innerHTML = "";
      var table = document.getElementById("tblatt");
      table.innerHTML = "";
      var select = [];
      var sel = [];
      var row = "";
      var cell1 = "";
      var cell2 = "";
      select[0] = "<b>Dirección: </b>";
      select[1] = "<b>Código: </b>";
      select[2] = "<b>Propietario/s: </b>";
      select[3] = "<b>Documento/s: </b>";
      select[4] = "<b>Área de Terreno: </b>";
      select[5] = "<b>Área Construida: </b>";
      select[6] = "<b>Avalúo: </b>";
      select[7] = "<b>Destino Económico: </b>";
      select[8] = "<b>Matricula inmobiliaria: </b>";
      select[9] = "<b>Tipo de avalúo: </b>";
      sel[0] = direccion;
      sel[1] = ui.item.cod;
      sel[2] = propietario;
      sel[3] = documento;
      sel[4] = areat + " m2";
      sel[5] = areac + " m2";
      sel[6] = "$" + formatNumber(avaluo);
      sel[7] = destino;
      sel[8] = matricula;
      sel[9] = tipoaval;
      for (i = 0; i < select.length; i++) {
        row = table.insertRow(i);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell1.innerHTML = select[i];
        cell2.innerHTML = sel[i];
        cell1.className = "roboto-medium";
        cell2.className = "roboto-regular";
      }
      vistainicial();
      document.getElementById("panel_atr").style.display = "block";
    }
  }

function addressSelectManzana(event, ui) {
  cleargeoJsonDataSource();
    try {
        var geome = select_query("select ST_AsGeoJSON(geom) from catastro.u_manzana where codigo = '" + ui.item.cod + "'");
        var geojsonmanzana = JSON.parse(geome[0]);
        GeoJsonDataSource.load(geojsonmanzana, {
          clampToGround: true // Asegura que las entidades se ajusten al terreno
        }).then(function (dataSource) {
          geoJsonDataSource = dataSource; // Guardar la referencia al data source
          viewer.dataSources.add(dataSource);      
          var entities = dataSource.entities.values;
          if (entities.length > 0) {
            var boundingSpheres = [];
            for (var i = 0; i < entities.length; i++) {
              var entity = entities[i];
              if (entity.position) {
                var position = entity.position.getValue(JulianDate.now());
                if (position && Cartesian3.magnitude(position) > 0) {
                  var boundingSphere = new BoundingSphere(Cartesian3.clone(position), 0);
                  boundingSpheres.push(boundingSphere);
                }
              } else if (entity.polyline) {
                var positions = entity.polyline.positions.getValue(JulianDate.now());
                if (positions && positions.length > 0) {
                  var boundingSphere = BoundingSphere.fromPoints(positions);
                  if (boundingSphere && Cartesian3.magnitude(boundingSphere.center) > 0) {
                    boundingSpheres.push(boundingSphere);
                  }
                }
              } else if (entity.polygon) {
                entity.polygon.material = Color.RED.withAlpha(0.5); // Cambia a rojo con transparencia 50%
                
                // Obtener posiciones del polígono
                var hierarchy = entity.polygon.hierarchy.getValue(JulianDate.now());
                var positions = hierarchy.positions;
                
                // Crear un borde utilizando una línea
                if (positions && positions.length > 0) {
                  /*viewer.entities.add({
                    polyline: {
                      positions: positions,
                      width: 3.0, // Grosor del borde
                      material: Color.RED, // Color del borde
                      clampToGround: true
                    }
                  });*/
          
                  var boundingSphere = BoundingSphere.fromPoints(positions);
                  if (boundingSphere && Cartesian3.magnitude(boundingSphere.center) > 0) {
                    boundingSpheres.push(boundingSphere);
                  }
                }
              }
            }
            if (boundingSpheres.length > 0) {
              var overallBoundingSphere = BoundingSphere.fromBoundingSpheres(boundingSpheres);
              // Asegurarse de que overallBoundingSphere tiene valores válidos
              if (!isNaN(overallBoundingSphere.radius) && overallBoundingSphere.radius > 0) {
                var minRange = 300; // Valor mínimo para el rango
                var range = Math.max(overallBoundingSphere.radius * 2, minRange);
                // Validar que range sea un número válido
                if (!isNaN(range) && range > 0) {
                  try {
                    // Definir manualmente el valor de pitch como un número fijo
                    var pitch = -0.885398; // Aproximadamente -90 grados en radianes
                    // Validar la dirección de la cámara
                    var headingPitchRange = new HeadingPitchRange(0, pitch, range);
                    if (!isNaN(headingPitchRange.heading) && !isNaN(headingPitchRange.pitch) && !isNaN(headingPitchRange.range)) {
                      viewer.camera.flyToBoundingSphere(overallBoundingSphere, {
                        duration: 2,
                        offset: headingPitchRange // Ajusta el rango aquí
                      });
                    } else {
                      console.error('Invalid heading, pitch, or range:', headingPitchRange);
                    }
                  } catch (error) {
                    console.error('Error flying to bounding sphere: ', error.message, error.stack);
                  }
                } else {
                  console.error('Invalid range:', range);
                }
              } else {
                console.error('Invalid overallBoundingSphere:', overallBoundingSphere);
              }
            } else {
              console.error('No valid bounding spheres found');
            }
          } else {
            console.error('No entities found in GeoJSON');
          }
        }).otherwise(function (error) {
          console.error('Error loading GeoJSON: ', error.message, error.stack);
        });
    }
    catch (err) {
        Swal.fire({
            title: 'No se encontro información geografica asociada a la consulta',
            text: '',
            icon: 'info',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#013F6C'
        });
    }
}

let markerSitio;
        function BuscarSitio() {
            const nombreSitio = document.getElementById('address1').value;
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: `${nombreSitio}, Casanare, Colombia` }, (results, status) => {
                if (status === 'OK') {
                    const location = results[0].geometry.location;
                    if (location.lng() == '-77.01972119999999' && location.lat() == '3.8830471') {
                        if (markerSitio) {
                            viewer.dataSources.remove(markerSitio);
                        }
                        Swal.fire({
                            title: 'No se encontró el elemento geográfico',
                            text: '',
                            icon: 'info',
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#013F6C'
                        });
                    } else {
                        const coords = [location.lng(), location.lat()];

                        const geojsonFeature = {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": coords
                            },
                            "properties": {}
                        };

                        const geojson = {
                            "type": "FeatureCollection",
                            "features": [geojsonFeature]
                        };

                        const blob = new Blob([JSON.stringify(geojson)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);

                        if (markerSitio) {
                            viewer.dataSources.remove(markerSitio);
                        }

                        GeoJsonDataSource.load(url, {
                            clampToGround: true // Asegura que las entidades se ajusten al terreno
                        }).then(function (dataSource) {
                            markerSitio = dataSource;
                            viewer.dataSources.add(markerSitio);
                            viewer.flyTo(markerSitio, {
                                offset: new HeadingPitchRange(0, -1.5, 500)
                            });
                        });
                    }
                } else {
                    Swal.fire({
                        title: 'No se encontró el elemento',
                        text: '',
                        icon: 'info',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#013F6C'
                    });
                }
            });
        }


function addressSelectPropietarios(event, ui) {
    actividad("busqueda por propietario");
    var nombre = select_query("select * from catastro.r1 where nombre ilike '" + ui.item.nombre + "'");
    var tableref = "registros";
    if (nombre === null) {
        var nombre = select_query("select * from catastro.u_terreno_registros where nombre ilike '" + ui.item.nombre + "'");
        var tableref = "terrenos";
    }
    if (nombre.length > 1) {
        var select = [];
        var sel = [];
        var tabledinamic = document.getElementById("table-dynamic");
        tabledinamic.innerHTML = "";
        var table = document.getElementById("tblattmz");
        table.innerHTML = "";
        var select = [];
        var sel = [];
        var imag = [];
        var stv = [];
        var ig = [];
        var tablaph = "<table id='tablaph' class='table table-bordered' style='width: 100%;'>";
        for (i = 0; i < nombre.length; i++) {
            var dirg = nombre[i][4];
            tablaph += "<tr>";
            if (tableref == 'registros') {
                tablaph += "<td id=tt" + i + ">" + nombre[i][6] + "</td>";
            } else if (tableref == 'terrenos') {
                tablaph += "<td id=tt" + i + ">" + nombre[i][18] + "</td>";
            }
            tablaph += "</tr>";
        }
        tablaph += "</table>";

        select[0] = "<b>Nombre del propietario: </b>";
        select[1] = "<b>Documento del propietario: </b>";
        select[2] = "<b>Número de Predios: </b>";
        if (tableref == 'registros') {
            sel[0] = nombre[0][3];
            sel[1] = nombre[0][5];
        }
        else if (tableref == 'terrenos') {
            sel[0] = nombre[0][14];
            sel[1] = nombre[0][17];
        }
        sel[2] = nombre.length;

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

        for (i = 0; i < nombre.length; i++) {
            var ell = document.getElementById("tt" + i);
            var alg = "mostrardatosmult('tt" + i + "')";
            ell.setAttribute("onclick", alg);
            ell.value = nombre[i][4];
        }
        document.getElementById("panel_mz").style.display = "block";
    }

    else {
        try {
            var view = map.getView();
            var codph = ui.item.cod.slice(21, 22);
            if (codph == '9' || codph == '8') {
                var codigoterreno = ui.item.cod.slice(0, 9) + '0000' + ui.item.cod.slice(13, 26) + '0000';
                var tipoaval = "Predio en propiedad horizontal o condominio";
            }
            else if (codph == '5') {
                var codigoterreno = ui.item.cod.slice(0, 9) + '0000' + ui.item.cod.slice(13, 21) + '000000000';
                var tipoaval = "Mejora (Construcción en predio ajeno)";
            }
            else {
                var codigoterreno = ui.item.cod;
                var tipoaval = "No PH";
            }

            if (tableref == 'registros') {
                var datosr1 = select_query("select * from catastro.r1 where codigo = '" + ui.item.cod + "'");
            }
            else if (tableref == 'terrenos') {
                var datosr1 = select_query("select * from catastro.u_terreno_registros where codigo = '" + ui.item.cod + "'");
            }
            var geome = select_query("select ST_AsGeoJSON(geom) from catastro.u_terreno_registros where codigo = '" + codigoterreno + "'");
            var geojsonprueba = JSON.parse(geome[0]);
            var coord = geojsonprueba.coordinates[0][0];
            var feat = new ol.Feature({
                geometry: new ol.geom.Polygon([coord])
            });
            feat.getGeometry().transform('EPSG:4326', 'EPSG:3857');
            var geom = feat.getGeometry();

            /*highlightfeatures.setStyle(PredioStyle);
            var markerSourcenoph = highlightfeatures.getSource();
            markerSourcenoph.clear();
            markerSourcenoph.addFeature(feat);*/

            if (markerPredio) {
                map.removeLayer(markerPredio);
            }
            var vectorSource = new ol.source.Vector({
                features: [feat] // Asegurarse de que es un array
            });
    
            // Crear el nuevo layer vectorial
            markerPredio = new ol.layer.Vector({
                source: vectorSource,
                style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: "rgba(255,0,0,1)",
                        lineDash: null,
                        lineCap: 'butt',
                        lineJoin: 'miter',
                        width: 2
                    }),
                    fill: new ol.style.Fill({
                        color: "rgba(255,178,178,0.2)"
                    })
                })
            });
            map.addLayer(markerPredio);

            ppExtent = geom.getExtent();
            ppExtent[0] = ppExtent[0] - 40;
            ppExtent[2] = ppExtent[2] + 40;
            ppExtent[1] = ppExtent[1] - 40;
            ppExtent[3] = ppExtent[3] + 40;

            var featureCenter = ol.extent.getCenter(ppExtent);
            view.setCenter(featureCenter);
            view.fit(ppExtent, map.getSize());

            try {
                if (datosr1.length <= 1) {
                    if (tableref == 'registros') {
                        var propietario = datosr1[0][3];
                        var documento = datosr1[0][5];
                    }
                    else if (tableref == 'terrenos') {
                        var propietario = datosr1[0][14];
                        var documento = datosr1[0][17];
                    }
                }
                else if (datosr1.length > 1) {
                    var propietarios = [];
                    for (i = 0; i < datosr1.length; i++) {
                        if (tableref == 'registros') {
                            propietarios.push({
                                prop: datosr1[i][3],
                                doc: datosr1[i][5]
                            });
                        }
                        else if (tableref == 'terrenos') {
                            console.log("terrenos");
                            propietarios.push({
                                prop: datosr1[i][14],
                                doc: datosr1[i][17]
                            });
                        }
                    }
                    var propietario = propietarios.map(function (item) {
                        return item.prop;
                    }).join(", ");
                    var documento = propietarios.map(function (item) {
                        return item.doc;
                    }).join(", ");
                }
            }

            catch (err) {
                var propietario = "Sin información";
                var documento = "Sin información";
            }

            try {
                if (tableref == 'registros') {
                    var direccion = datosr1[0][4];
                    var areat = parseInt(datosr1[0][8]);
                    var areac = parseInt(datosr1[0][9]);
                    var avaluo = datosr1[0][10];
                    var destino = datosr1[0][7];
                    var matricula = datosr1[0][11];
                }
                else if (tableref == 'terrenos') {
                    var direccion = datosr1[0][19];
                    var areat = parseInt(datosr1[0][8]);
                    var areac = parseInt(datosr1[0][9]);
                    var avaluo = datosr1[0][10];
                    var destino = datosr1[0][7];
                    var matricula = datosr1[0][11];
                }
            }
            catch (err) {
                var direccion = "Sin Información";
                var areat = "Sin Información";
                var areac = "Sin Información";
                var avaluo = "Sin Información";
                var destino = "Sin Información";
                var matricula = "Sin Información";
            }
            try {
                var codigo_ant = select_query("select codigo_ant from catastro.u_terreno_registros where codigo = '" + codigoterreno + "'");
                
                if (codigo_ant == null) {
                    var codigo_ant = select_query("select codigo_ant from catastro.r_terreno_registros where codigo = '" + codigoterreno + "'");
                }
            }
            catch (err) {
                var codigo_ant = "sin información";
            }
            
            var table = document.getElementById("tblatt");
            table.innerHTML = "";
            var select = [];
            var sel = [];
            var imag = [];
            var stv = [];
            var ig = [];
            select[0] = "<b>Dirección: </b>";
            select[1] = "<b>Código: </b>";
            select[2] = "<b>Código Anterior: </b>";
            select[3] = "<b>Propietario/s: </b>";
            select[4] = "<b>Documento/s: </b>";
            select[5] = "<b>Área de Terreno: </b>";
            select[6] = "<b>Área Construida: </b>";
            select[7] = "<b>Avalúo: </b>";
            select[8] = "<b>Destino Económico: </b>";
            select[9] = "<b>Matricula inmobiliaria: </b>";
            select[10] = "<b>Tipo de avalúo: </b>";

            sel[0] = ui.item.direccion;
            sel[1] = ui.item.cod;
            sel[2] = codigo_ant;
            sel[3] = propietario;
            sel[4] = documento;
            sel[5] = areat + " m2";
            sel[6] = areac + " m2";
            sel[7] = "$" + formatNumber(avaluo);
            sel[8] = destino;
            sel[9] = matricula;
            sel[10] = tipoaval;

            for (i = 0; i < select.length; i++) {
                row = table.insertRow(i);
                cell1 = row.insertCell(0);
                cell2 = row.insertCell(1);
                cell1.innerHTML = select[i];
                cell2.innerHTML = sel[i];
            }
            document.getElementById("panel_atr").style.display = "block";
        }
        catch (err) {
            Swal.fire({
                title: 'No se encontro información geografica asociada a la consulta',
                text: 'Es posible que se trate de un predio en Omisión, a continuación se muestran los datos de la tabla de registro',
                icon: 'info',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#013F6C'
            });
            try {
                var direccion = datosr1[0][6];
                var propietario = datosr1[0][3];
                var documento = datosr1[0][5];
                var areat = parseInt(datosr1[0][8]);
                var areac = parseInt(datosr1[0][9]);
                var avaluo = datosr1[0][10];
                var destino = datosr1[0][7];
                var matricula = datosr1[0][11];
            }
            catch (err) {
                var direccion = "Sin información";
                var areat = "Sin información";
                var areac = "Sin información";
                var avaluo = "Sin información";
                var destino = "Sin información";
                var matricula = "Sin información";
                var propietario = "Sin información";
                var documento = "Sin información";
            }

            var table = document.getElementById("tblattmz");
            table.innerHTML = "";
            var select = [];
            var sel = [];
            var imag = [];
            var stv = [];
            var ig = [];
            select[0] = "<b>Dirección: </b>";
            select[1] = "<b>Código: </b>";
            select[2] = "<b>Propietario/s: </b>";
            select[3] = "<b>Documento/s: </b>";
            select[4] = "<b>Área de Terreno: </b>";
            select[5] = "<b>Área Construida: </b>";
            select[6] = "<b>Avalúo: </b>";
            select[7] = "<b>Destino Económico: </b>";
            select[8] = "<b>Matricula inmobiliaria: </b>";
            select[9] = "<b>Tipo de avalúo: </b>";
            sel[0] = direccion;
            sel[1] = ui.item.cod;
            sel[2] = propietario;
            sel[3] = documento;
            sel[4] = areat + " m2";
            sel[5] = areac + " m2";
            sel[6] = "$" + formatNumber(avaluo);
            sel[7] = destino;
            sel[8] = matricula;
            sel[9] = tipoaval;
            for (i = 0; i < select.length; i++) {
                row = table.insertRow(i);
                cell1 = row.insertCell(0);
                cell2 = row.insertCell(1);
                cell1.innerHTML = select[i];
                cell2.innerHTML = sel[i];
                cell1.className = "roboto-medium";
                cell2.className = "roboto-regular";
            }
            document.getElementById("panel_mz").style.display = "block";
            vistainicial();
        }
    }
}


function addressSelectCedula(event, ui) {
    actividad("busqueda por cedula");  
    var nombre = select_query("select * from catastro.r1 where num_doc ilike '"+ui.item.doc+"'");
    var tableref = "registros";
    if (nombre === null){
     var nombre = select_query("select * from catastro.u_terreno_registros where num_doc ilike '"+ui.item.doc+"'");
     var tableref = "terrenos";
    }
          if (nombre.length > 1) {
            var select = [];
            var sel = [];
            var tabledinamic = document.getElementById("table-dynamic");
            tabledinamic.innerHTML = "";
            var table = document.getElementById("tblattmz");
            table.innerHTML = "";
            var select = [];
            var sel = [];
            var imag = [];
            var stv = [];
            var ig = [];
            var tablaph = "<table id='tablaph' class='table table-bordered' style='width: 100%;'>";
            for (i = 0; i < nombre.length; i++) {
                var dirg = nombre[i][4];
                tablaph += "<tr>";
                if (tableref == 'registros') {
                    tablaph += "<td id=tt" + i + ">" + nombre[i][6] + "</td>";
                } else if (tableref == 'terrenos') {
                    tablaph += "<td id=tt" + i + ">" + nombre[i][18] + "</td>";
                }
                tablaph += "</tr>";
            }
            tablaph += "</table>";
    
            select[0] = "<b>Nombre del propietario: </b>";
            select[1] = "<b>Documento del propietario: </b>";
            select[2] = "<b>Número de Predios: </b>";
            if (tableref == 'registros') {
                sel[0] = nombre[0][3];
                sel[1] = nombre[0][5];
            }
            else if (tableref == 'terrenos') {
                sel[0] = nombre[0][14];
                sel[1] = nombre[0][17];
            }
            sel[2] = nombre.length;
    
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
    
            for (i = 0; i < nombre.length; i++) {
                var ell = document.getElementById("tt" + i);
                var alg = "mostrardatosmult('tt" + i + "')";
                ell.setAttribute("onclick", alg);
                ell.value = nombre[i][4];
            }
            document.getElementById("panel_mz").style.display = "block";
        }

    else{
      try{
        var view = map.getView();
        var codph = ui.item.cod.slice(21, 22);
        if(codph == '9' || codph == '8'){
            var codigoterreno = ui.item.cod.slice(0, 9) + '0000' + ui.item.cod.slice(13, 26) + '0000';
            var tipoaval = "Predio en propiedad horizontal o condominio";
        }
        else if(codph == '5'){
            var codigoterreno = ui.item.cod.slice(0, 9) + '0000' + ui.item.cod.slice(13, 21) + '000000000';
            var tipoaval = "Mejora (Construcción en predio ajeno)";
        }
        else{
            var codigoterreno = ui.item.cod;
            var tipoaval = "No PH";
        }

        if(tableref=='registros'){
          var datosr1 = select_query("select * from catastro.r1 where codigo = '"+ui.item.cod+"'");
        }
        else if(tableref=='terrenos'){
          var datosr1 = select_query("select * from catastro.u_terreno_registros where codigo = '"+ui.item.cod+"'");
        }
        var geome = select_query("select ST_AsGeoJSON(geom) from catastro.u_terreno_registros where codigo = '"+codigoterreno+"'");
        var geojsonprueba = JSON.parse(geome[0]); 
        var coord = geojsonprueba.coordinates[0][0];
        var feat = new ol.Feature({
            geometry: new ol.geom.Polygon([coord])
        });
        feat.getGeometry().transform('EPSG:4326','EPSG:3857');
        var geom = feat.getGeometry();
        
        /*highlightfeatures.setStyle(PredioStyle);
        var markerSourcenoph = highlightfeatures.getSource();
        markerSourcenoph.clear();
        markerSourcenoph.addFeature(feat); */

        if (markerPredio) {
            map.removeLayer(markerPredio);
        }
        var vectorSource = new ol.source.Vector({
            features: [feat] // Asegurarse de que es un array
        });

        // Crear el nuevo layer vectorial
        markerPredio = new ol.layer.Vector({
            source: vectorSource,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "rgba(255,0,0,1)",
                    lineDash: null,
                    lineCap: 'butt',
                    lineJoin: 'miter',
                    width: 2
                }),
                fill: new ol.style.Fill({
                    color: "rgba(255,178,178,0.2)"
                })
            })
        });
        map.addLayer(markerPredio);

        ppExtent = geom.getExtent();
        ppExtent[0] = ppExtent[0] - 40;
        ppExtent[2] = ppExtent[2] + 40;
        ppExtent[1] = ppExtent[1] - 40;
        ppExtent[3] = ppExtent[3] + 40;

        var featureCenter = ol.extent.getCenter(ppExtent);
        view.setCenter(featureCenter);
        view.fit(ppExtent, map.getSize());

        try{
            if(datosr1.length <= 1){
                if(tableref=='registros'){
                var propietario = datosr1[0][3];
                var documento = datosr1[0][5];
                }
                else if(tableref=='terrenos'){
                var propietario = datosr1[0][14];
                var documento = datosr1[0][17];
                }
            }
            else if(datosr1.length > 1){
                var propietarios = []; 
                for (i = 0; i < datosr1.length; i++) { 
                  if(tableref=='registros'){                  
                    propietarios.push({              
                        prop: datosr1[i][3],
                        doc: datosr1[i][5]
                    });
                  }
                  else if(tableref=='terrenos'){
                    console.log("terrenos");               
                    propietarios.push({              
                        prop: datosr1[i][14],
                        doc: datosr1[i][17]
                    });
                  }
                }
                var propietario = propietarios.map(function(item) {
                    return item.prop;
                }).join(", ");
                var documento = propietarios.map(function(item) {
                    return item.doc;
                }).join(", ");
            }
        }
        
        catch(err){
            var propietario = "Sin información";
            var documento = "Sin información";
        }
        
        try{
          if(tableref=='registros'){
            var direccion = datosr1[0][4];
            var areat = parseInt(datosr1[0][8]);
            var areac = parseInt(datosr1[0][9]);
            var avaluo = datosr1[0][10];
            var destino = datosr1[0][7];
            var matricula = datosr1[0][11];
          }
          else if(tableref=='terrenos'){
            var direccion = datosr1[0][19];
            var areat = parseInt(datosr1[0][8]);
            var areac = parseInt(datosr1[0][9]);
            var avaluo = datosr1[0][10];
            var destino = datosr1[0][7];
            var matricula = datosr1[0][11];
          }
        }
        catch(err){
            var direccion = "Sin Información";
            var areat = "Sin Información";
            var areac = "Sin Información";
            var avaluo = "Sin Información";
            var destino = "Sin Información";
            var matricula = "Sin Información";
        }   
        try{
           var codigo_ant = select_query("select codigo_ant from catastro.u_terreno_registros where codigo = '"+codigoterreno+"'");
           //console.log(codigo_ant);
           if(codigo_ant == null){
            var codigo_ant = select_query("select codigo_ant from catastro.r_terreno_registros where codigo = '"+codigoterreno+"'");
           }
        }
        catch(err){
            var codigo_ant = "sin información";
        }
        //console.log(codigo_ant);
        /*var tabledinamic = document.getElementById("table-dynamic");
        tabledinamic.innerHTML = "";*/
        var table = document.getElementById("tblatt");
        table.innerHTML = "";                                 
        var select = [];
        var sel = [];
        var imag = [];
        var stv = [];
        var ig = [];
        select[0] = "<b>Dirección: </b>";
        select[1] = "<b>Código: </b>";
        select[2] = "<b>Código Anterior: </b>";
        select[3] = "<b>Propietario/s: </b>";
        select[4] = "<b>Documento/s: </b>";
        select[5] = "<b>Área de Terreno: </b>";
        select[6] = "<b>Área Construida: </b>";
        select[7] = "<b>Avalúo: </b>"; 
        select[8] = "<b>Destino Económico: </b>"; 
        select[9] = "<b>Matricula inmobiliaria: </b>";
        select[10] = "<b>Tipo de avalúo: </b>";
        
        sel[0] = ui.item.direccion;
        sel[1] = ui.item.cod;
        sel[2] = codigo_ant;
        sel[3] = propietario;
        sel[4] = documento;
        sel[5] = areat + " m2";
        sel[6] = areac + " m2";
        sel[7] = "$" + formatNumber(avaluo); 
        sel[8] = destino;
        sel[9] = matricula;
        sel[10]  = tipoaval;

        for (i = 0; i < select.length; i++) {
            row = table.insertRow(i);
            cell1 = row.insertCell(0);
            cell2 = row.insertCell(1);
            cell1.innerHTML = select[i];
            cell2.innerHTML = sel[i];
         } 
            document.getElementById("panel_atr").style.display = "block";
        }
        catch(err){
            //alert("No se encontro información geografica asociada a la consulta, es posible que se trate de un predio en Omisión, a continuación se muestran los datos de la tabla de registro");
            Swal.fire({
                title: 'No se encontro información geografica asociada a la consulta',
                text: 'Es posible que se trate de un predio en Omisión, a continuación se muestran los datos de la tabla de registro',
                icon: 'info',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#013F6C'
              });
            //console.log(datosr1);
            try{
                var direccion = datosr1[0][6];
                var propietario = datosr1[0][3];
                var documento = datosr1[0][5];
                var areat = parseInt(datosr1[0][8]);
                var areac = parseInt(datosr1[0][9]);
                var avaluo = datosr1[0][10];
                var destino = datosr1[0][7];
                var matricula = datosr1[0][11];
            }
            catch(err){
                var direccion = "Sin información";
                var areat = "Sin información";
                var areac = "Sin información";
                var avaluo = "Sin información";
                var destino = "Sin información";
                var matricula = "Sin información";
                var propietario = "Sin información";
                var documento = "Sin información";
            }
            
            /*var tabledinamic = document.getElementById("table-dynamic");
            tabledinamic.innerHTML = "";*/
            var table = document.getElementById("tblattmz");
            table.innerHTML = "";                                       
            var select = [];
            var sel = [];
            var imag = [];
            var stv = [];
            var ig = [];       
            select[0] = "<b>Dirección: </b>";
            select[1] = "<b>Código: </b>";
            select[2] = "<b>Propietario/s: </b>";
            select[3] = "<b>Documento/s: </b>";
            select[4] = "<b>Área de Terreno: </b>";
            select[5] = "<b>Área Construida: </b>";
            select[6] = "<b>Avalúo: </b>"; 
            select[7] = "<b>Destino Económico: </b>"; 
            select[8] = "<b>Matricula inmobiliaria: </b>";
            select[9] = "<b>Tipo de avalúo: </b>";        
            sel[0] = direccion;
            sel[1] = ui.item.cod;
            sel[2] = propietario;
            sel[3] = documento;
            sel[4] = areat + " m2";
            sel[5] = areac + " m2";
            sel[6] = "$" + formatNumber(avaluo); 
            sel[7] = destino;
            sel[8] = matricula;
            sel[9] = tipoaval;                                 
            for (i = 0; i < select.length; i++) {
                row = table.insertRow(i);
                cell1 = row.insertCell(0);
                cell2 = row.insertCell(1);
                cell1.innerHTML = select[i];
                cell2.innerHTML = sel[i];
             }
                document.getElementById("panel_mz").style.display = "block";
                vistainicial();
            }
        }   
}


function mostrardatosmult(dire){
    dire = "'" + dire + "'";
    var dirr = document.getElementById(eval(dire)).innerHTML;        
    try{
        var view = map.getView();
        try{
        var datosr1 = select_query("select * from catastro.r1 where direccion ilike '"+dirr+"'");
        var codigo = datosr1[0][1];
        var tablerefer = "registros";
        }
        catch(err){
          var datosr1 = select_query("select * from catastro.u_terreno_registros where direccion ilike '"+dirr+"'");
          var codigo = datosr1[0][2];
          var tablerefer = "terrenos";
        }
        var codph = codigo.slice(21, 22);
        if(codph == '9' || codph == '8'){
            var codigoterreno = codigo.slice(0, 9) + '0000' + codigo.slice(13, 26) + '0000';
            var tipoaval = "Predio en propiedad horizontal o condominio";
        }
        else if(codph == '5'){
            var codigoterreno = codigo.slice(0, 9) + '0000' + codigo.slice(13, 21) + '000000000';
            var tipoaval = "Mejora (Construcción en predio ajeno)";
        }
        else{
            var codigoterreno = codigo;
            var tipoaval = "No PH";
        }
        
        var geome = select_query("select ST_AsGeoJSON(geom) from catastro.u_terreno_registros where codigo = '"+codigoterreno+"'");

        var geojsonprueba = JSON.parse(geome[0]); 
        var coord = geojsonprueba.coordinates[0][0];
        var feat = new ol.Feature({
            geometry: new ol.geom.Polygon([coord])
        });
        feat.getGeometry().transform('EPSG:4326','EPSG:3857');
        var geom = feat.getGeometry();
        
            /*highlightfeatures.setStyle(PredioStyle);
            var markerSourcenoph = highlightfeatures.getSource();
            markerSourcenoph.clear();
            markerSourcenoph.addFeature(feat);*/
            
            if (markerPredio) {
                map.removeLayer(markerPredio);
            }
            var vectorSource = new ol.source.Vector({
                features: [feat] // Asegurarse de que es un array
            });
    
            // Crear el nuevo layer vectorial
            markerPredio = new ol.layer.Vector({
                source: vectorSource,
                style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: "rgba(255,0,0,1)",
                        lineDash: null,
                        lineCap: 'butt',
                        lineJoin: 'miter',
                        width: 2
                    }),
                    fill: new ol.style.Fill({
                        color: "rgba(255,178,178,0.2)"
                    })
                })
            });
            map.addLayer(markerPredio);

            ppExtent = geom.getExtent();
            ppExtent[0] = ppExtent[0] - 40;
            ppExtent[2] = ppExtent[2] + 40;
            ppExtent[1] = ppExtent[1] - 40;
            ppExtent[3] = ppExtent[3] + 40;
    
            var featureCenter = ol.extent.getCenter(ppExtent);
            view.setCenter(featureCenter);
            view.fit(ppExtent, map.getSize());
    
            try{
                if(datosr1.length <= 1){
                var propietario = datosr1[0][3];
                var documento = datosr1[0][5];
                }
                else if(datosr1.length > 1){
                    var propietarios = []; 
                    for (i = 0; i < datosr1.length; i++) {                   
                        propietarios.push({              
                            prop: datosr1[i][3],
                            doc: datosr1[i][5]
                        });
                    }
                    var propietario = propietarios.map(function(item) {
                        return item.prop;
                    }).join(", ");
                    var documento = propietarios.map(function(item) {
                        return item.doc;
                    }).join(", ");
                }
            }
            
            catch(err){
                var propietario = "Sin información";
                var documento = "Sin información";
            }
            
            if(tablerefer == "registros"){
                try{
                    var direccion = datosr1[0][6];
                    var areat = parseInt(datosr1[0][8]);
                    var areac = parseInt(datosr1[0][9]);
                    var avaluo = datosr1[0][10];
                    var destino = datosr1[0][7];
                    var matricula = datosr1[0][11];
                }
                catch(err){
                    var direccion = "Sin Información";
                    var areat = "Sin Información";
                    var areac = "Sin Información";
                    var avaluo = "Sin Información";
                    var destino = "Sin Información";
                    var matricula = "Sin Información";
                }   
            }
            else if(tablerefer == "terrenos"){
                var direccion = datosr1[0][18];
                var areat = parseInt(datosr1[0][9]);
                var areac = parseInt(datosr1[0][10]);
                var avaluo = datosr1[0][11];
                var destino = datosr1[0][8];
                var matricula = datosr1[0][17];
            }

            try{
               var codigo_ant = select_query("select codigo_ant from catastro.u_terreno_registros where codigo = '"+codigoterreno+"'");
               //console.log(codigo_ant);
               if(codigo_ant == null){
                var codigo_ant = select_query("select codigo_ant from catastro.r_terreno_registros where codigo = '"+codigoterreno+"'");
               }
            }
            catch(err){
                var codigo_ant = "sin información";
            }
            //console.log(codigo_ant);
            var tabledinamic = document.getElementById("table-dynamic");
            tabledinamic.innerHTML = "";
            var table = document.getElementById("tblatt");
            table.innerHTML = "";                                 
            var select = [];
            var sel = [];
            var imag = [];
            var stv = [];
            var ig = [];
            select[0] = "<b>Dirección: </b>";
            select[1] = "<b>Código: </b>";
            select[2] = "<b>Código Anterior: </b>";
            select[3] = "<b>Propietario/s: </b>";
            select[4] = "<b>Documento/s: </b>";
            select[5] = "<b>Área de Terreno: </b>";
            select[6] = "<b>Área Construida: </b>";
            select[7] = "<b>Avalúo: </b>"; 
            select[8] = "<b>Destino Económico: </b>"; 
            select[9] = "<b>Matricula inmobiliaria: </b>";
            select[10] = "<b>Tipo de avalúo: </b>";
            
            sel[0] = direccion;
            sel[1] = codigoterreno;
            sel[2] = codigo_ant;
            sel[3] = propietario;
            sel[4] = documento;
            sel[5] = areat + " m2";
            sel[6] = areac + " m2";
            sel[7] = "$" + formatNumber(avaluo); 
            sel[8] = destino;
            sel[9] = matricula;
            sel[10]  = tipoaval;
              
            for (i = 0; i < select.length; i++) {
                row = table.insertRow(i);
                cell1 = row.insertCell(0);
                cell2 = row.insertCell(1);
                cell1.innerHTML = select[i];
                cell2.innerHTML = sel[i];
             } 
                document.getElementById("panel_atr").style.display = "block";
            }
            catch(err){
                //alert("No se encontro información geografica asociada a la consulta, es posible que se trate de un predio en Omisión, a continuación se muestran los datos de la tabla de registro");
                //console.log(datosr1);
                Swal.fire({
                    title: 'No se encontro información geografica asociada a la consulta',
                    text: 'Es posible que se trate de un predio en Omisión, a continuación se muestran los datos de la tabla de registro',
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#013F6C'
                  });
                try{
                    var direccion = datosr1[0][6];
                    var propietario = datosr1[0][3];
                    var documento = datosr1[0][5];
                    var areat = parseInt(datosr1[0][8]);
                    var areac = parseInt(datosr1[0][9]);
                    var avaluo = datosr1[0][10];
                    var destino = datosr1[0][7];
                    var matricula = datosr1[0][11];
                }
                catch(err){
                    var direccion = "Sin información";
                    var areat = "Sin información";
                    var areac = "Sin información";
                    var avaluo = "Sin información";
                    var destino = "Sin información";
                    var matricula = "Sin información";
                    var propietario = "Sin información";
                    var documento = "Sin información";
                }
                
                var tabledinamic = document.getElementById("table-dynamic");
                tabledinamic.innerHTML = "";
                var table = document.getElementById("tblatt");
                table.innerHTML = "";                                       
                var select = [];
                var sel = [];
                var imag = [];
                var stv = [];
                var ig = [];       
                select[0] = "<b>Dirección: </b>";
                select[1] = "<b>Código: </b>";
                select[2] = "<b>Propietario/s: </b>";
                select[3] = "<b>Documento/s: </b>";
                select[4] = "<b>Área de Terreno: </b>";
                select[5] = "<b>Área Construida: </b>";
                select[6] = "<b>Avalúo: </b>"; 
                select[7] = "<b>Destino Económico: </b>"; 
                select[8] = "<b>Matricula inmobiliaria: </b>";
                select[9] = "<b>Tipo de avalúo: </b>";        
                sel[0] = direccion;
                sel[1] = codigoterreno;
                sel[2] = propietario;
                sel[3] = documento;
                sel[4] = areat + " m2";
                sel[5] = areac + " m2";
                sel[6] = "$" + formatNumber(avaluo); 
                sel[7] = destino;
                sel[8] = matricula;
                sel[9] = tipoaval;                                 
                for (i = 0; i < select.length; i++) {
                    row = table.insertRow(i);
                    cell1 = row.insertCell(0);
                    cell2 = row.insertCell(1);
                    cell1.innerHTML = select[i];
                    cell2.innerHTML = sel[i];
                 }
                    document.getElementById("panel_atr").style.display = "block";
                    vistainicial();   
        }                                                        
  }

  function cleargeoJsonDataSource() {
    if (geoJsonDataSource) {
      viewer.dataSources.remove(geoJsonDataSource, true); // Remover el data source del viewer
      geoJsonDataSource = null; // Limpiar la referencia
    }
  }

  function formatNumber(n) {
    n = String(n).replace(/\D/g, "");
    return n === '' ? n : Number(n).toLocaleString();
  }

 
  //function datosPot() {
  document.getElementById('profile-tab').addEventListener('click', function (event) {
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
//}
});

document.getElementById('botonvistainicial').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: initialPosition,
    orientation: initialOrientation,
    duration: 2.0 // Duración de la animación en segundos
  });
});

document.getElementById('botonvistacp').addEventListener('click', function (event) {
  if(document.getElementById("inputIrcentrop").style.display == 'block'){
    document.getElementById("inputIrcentrop").style.display = 'none';
    $('#botonCentrosp').removeClass('iconInfActive').addClass('iconInf');
 }
 else{
    document.getElementById("inputIrcentrop").style.display = 'block';
    $('#botonCentrosp').removeClass('iconInf').addClass('iconInfActive');
 }
});

//Ir a
document.getElementById('cabecera').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-77.0254, 3.8830, 4500), // Reemplaza con las coordenadas reales
    duration: 2.0 // Duración de la animación en segundos
  });
});

document.getElementById('aguaclara').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.9469, 3.6722, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('bajocalima').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.9751, 3.9977, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('lacontra').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-77.1467, 3.7752, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('cisneros').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.7598, 3.7809, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('cordoba').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.9284, 3.8762, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('elcrucero').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.9792, 3.9362, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('caminoviejo').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.8289, 3.8661, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('buenosaires').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-77.0014, 3.8328, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('campohermoso').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-77.0327, 3.8199, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('guaima').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.9614, 3.7262, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('juanchaco').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-77.3561, 3.9310, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('labarra').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-77.3767, 3.9585, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('ladelfina').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.7823, 3.8217, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('ellimones').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.9647, 3.7348, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('katanga').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.7992, 3.8525, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('callelarga').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.9843, 3.8214, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('ladrilleros').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-77.3642, 3.9390, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('pianguita').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-77.1981, 3.8398, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('labocana').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-77.1899, 3.8362, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('puntasoldado').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-77.1697, 3.7706, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('bendiciones').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.8171, 3.8672, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('sancipriano').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.8977, 3.8388, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0
  });
});

document.getElementById('sanmarcos').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.9611, 3.7133, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0 // Duración de la animación en segundos
  });
});

document.getElementById('labalastrera').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.9951, 3.8167, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0 // Duración de la animación en segundos
  });
});

document.getElementById('llanobajo').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.9578, 3.6988, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0 // Duración de la animación en segundos
  });
});

document.getElementById('triana').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.8056, 3.8580, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0 // Duración de la animación en segundos
  });
});

document.getElementById('umane').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-77.1669, 3.7434, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0 // Duración de la animación en segundos
  });
});

document.getElementById('villaestela').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.9578, 3.8976, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0 // Duración de la animación en segundos
  });
});

document.getElementById('elsalto').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.7930, 3.8385, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0 // Duración de la animación en segundos
  });
});

document.getElementById('sabaleta').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.9654, 3.7437, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0 // Duración de la animación en segundos
  });
});

document.getElementById('zacarias').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-77.0050, 3.8141, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0 // Duración de la animación en segundos
  });
});

document.getElementById('zaragosa').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.8547, 3.8592, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0 // Duración de la animación en segundos
  });
});

document.getElementById('quebradapericos').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-76.7938, 3.8445, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0 // Duración de la animación en segundos
  });
});

document.getElementById('laspalmas').addEventListener('click', function (event) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-77.1638, 3.7381, 1500), // Reemplaza con las coordenadas reales
    duration: 2.0 // Duración de la animación en segundos
  });
});

var icons = [
  '../imagenes/street/1.png', '../imagenes/street/2.png', '../imagenes/street/3.png',
  '../imagenes/street/4.png', '../imagenes/street/5.png', '../imagenes/street/6.png',
  '../imagenes/street/7.png', '../imagenes/street/8.png', '../imagenes/street/9.png',
  '../imagenes/street/10.png', '../imagenes/street/11.png', '../imagenes/street/12.png',
  '../imagenes/street/13.png', '../imagenes/street/14.png', '../imagenes/street/15.png',
  '../imagenes/street/16.png'
];

var marker = viewer.entities.add({
  position: Cartesian3.fromDegrees(0, 0), // Coordenadas iniciales arbitrarias
  billboard: {
      image: icons[0], // Imagen inicial del marcador
      scale: 2.0,
      verticalOrigin: VerticalOrigin.BOTTOM,
      heightReference: HeightReference.CLAMP_TO_GROUND // Asegúrate de que el marcador esté sobre el terreno
  }
});

// Función para actualizar el marcador
window.mapposi = function (coord, giro) {
  // Convertir la posición de Google Maps a coordenadas de CesiumJS
  var position = Cartesian3.fromDegrees(coord.lng(), coord.lat());

  // Determinar el índice del icono basado en el giro
  var index = Math.floor((giro + 11.25) / 22.5) % 16; // Ajusta para encontrar el índice correcto
  

  // Actualizar solo la imagen del billboard sin mover la cámara
  marker.position = position;
  marker.billboard.image = icons[index];
  
  //console.log(`Marcador actualizado en ${coord.lat()}, ${coord.lng()} con imagen ${icons[index]}`);
};

document.getElementById('limpiarM').addEventListener('click', function (event) {
  document.getElementById("marco5").style.display = "none";
  document.getElementById("container3").style.display = "none";
    if (marker) {
      viewer.entities.remove(marker);
      //marker = null;
    }
});


function switchToCatastroTab() {
    $('#home-tab').tab('show'); // Cambia a la pestaña de catastro
}

/*document.getElementById('botonCerrarpanel_atr').addEventListener('click', function (event) {
  console.log("listo");
  document.getElementById("panel_atr").style.display = "none";
});*/



}

main();
