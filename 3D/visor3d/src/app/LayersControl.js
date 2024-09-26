

var capasprcatastro = select_query("select * from capas where layer = 'apia_catastro'");
/*var capasprriesgo = select_query("select * from capas where layer = '"+mun+"_riesgo_25k'");
var capaspriesgocm = select_query("select * from capas where layer = '"+mun+"_cm_riesgo_5k'");
var capaspriesgocp = select_query("select * from capas where layer = '"+mun+"_cp_riesgo_5k'");
var capaspbasica5k = select_query("select * from capas where layer = '"+mun+"_cartografia_basica_5k'");
var capaspbasica25k = select_query("select * from capas where layer = '"+mun+"_cartografia_basica_25k'");*/

var capasd = [];
var capasr =[];
var capasrcm = [];
var capasrcp = [];
var capasrcb5 = [];
var capasrcb25 = [];

/*for (i=0; i<capasprcatastro.length; i++){
    capasd[i] = new ol.layer.Tile({
        visible: false,
        source: new ol.source.TileWMS({
            url: capasprcatastro[i][1],
            params: {LAYERS: capasprcatastro[i][3], STYLES: ''}
        }), name: capasprcatastro[i][3]
    });
}*/








/*for (i=0; i<capasprriesgo.length; i++){
    capasr[i] = new ol.layer.Tile({
        visible: false,
        source: new ol.source.TileWMS({
            url: capasprriesgo[i][1],
            params: {LAYERS: capasprriesgo[i][3], STYLES: ''}
        }), name: capasprriesgo[i][3]
    });
}

for (i=0; i<capaspriesgocm.length; i++){
    capasrcm[i] = new ol.layer.Tile({
        visible: false,
        source: new ol.source.TileWMS({
            url: capaspriesgocm[i][1],
            params: {LAYERS: capaspriesgocm[i][3], STYLES: ''}
        }), name: capaspriesgocm[i][3]
    });
}

for (i=0; i<capaspriesgocp.length; i++){
    capasrcp[i] = new ol.layer.Tile({
        visible: false,
        source: new ol.source.TileWMS({
            url: capaspriesgocp[i][1],
            params: {LAYERS: capaspriesgocp[i][3], STYLES: ''}
        }), name: capaspriesgocp[i][3]
    });
}

for (i=0; i<capaspbasica5k.length; i++){
    capasrcb5[i] = new ol.layer.Tile({
        visible: false,
        source: new ol.source.TileWMS({
            url: capaspbasica5k[i][1],
            params: {LAYERS: capaspbasica5k[i][3], STYLES: ''}
        }), name: capaspbasica5k[i][3]
    });
}

for (i=0; i<capaspbasica25k.length; i++){
    capasrcb25[i] = new ol.layer.Tile({
        visible: false,
        source: new ol.source.TileWMS({
            url: capaspbasica25k[i][1],
            params: {LAYERS: capaspbasica25k[i][3], STYLES: ''}
        }), name: capaspbasica25k[i][3]
    });
}

/*var openstreetmap = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: false,
        //minResolution: 2,
        //maxResolution:20,
        name: 'Open Street Map',
        crossOrigin: 'anonymous'
});  */  

