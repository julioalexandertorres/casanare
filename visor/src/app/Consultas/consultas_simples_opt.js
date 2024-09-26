// Estilos para diferentes tipos de geometrías
var BarrioStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: "rgba(0,255,255,1)",
        width: 3
    }),
    text: new ol.style.Text({
        font: '12px helvetica,sans-serif',
        scale: 1.5,
        fill: new ol.style.Fill({
            color: '#000000'
        }),
        stroke: new ol.style.Stroke({
            color: '#FFFFFF',
            width: 3.5
        })
    })
});

var PredioStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: "rgba(0,255,255,1)",
        width: 3
    }),
    fill: new ol.style.Fill({
        color: "rgba(0,255,255,0.1)"
    })
});

var PredioDebe = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: "rgb(255, 0, 0, 1)",
        width: 3
    }),
    fill: new ol.style.Fill({
        color: "rgb(255, 0, 0, 0.1)"
    })
});

var PuntoStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: "rgba(0,255,255,1)"
    }),
    fill: new ol.style.Fill({
        color: "rgba(0,255,255,0.3)"
    })
});

var flagStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        opacity: 0.75,
        scale: 0.25,
        src: './imagenes/flag.png'
    })
});

var alerta = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 0, 0, 0.8)',
            width: 3
        })
    })
});

var alertc = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
            color: 'rgba(214, 147, 12, 0.8)',
            width: 3
        })
    })
});

var txt = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255,255,255,0.4)'
    }),
    stroke: new ol.style.Stroke({
        color: '#3399CC',
        width: 1.25
    }),
    text: new ol.style.Text({
        font: '12px Calibri,sans-serif',
        fill: new ol.style.Fill({ color: '#000' }),
        stroke: new ol.style.Stroke({ color: '#fff', width: 2 }),
        text: ''
    })
});

// Estilos para diferentes íconos de calles
var streetStyles = [];
for (let i = 1; i <= 16; i++) {
    streetStyles.push(new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [1, 1],
            scale: 1,
            src: `./imagenes/street/${i}.png`
        })
    }));
}

var ubicacion = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 1],
        opacity: 1,
        scale: 0.3,
        src: './imagenes/ubicacion.png'
    })
});

// Inicialización de autocompletar
function initializeAutocomplete() {
    const autocompleteConfig = {
        minLength: 1,
        source: addressSource,
        select: addressSelectPredio
    };

    $("#direccion, #codigo, #matricula, #propietarios, #cedul").autocomplete(autocompleteConfig);
    $("#manzana").autocomplete({ ...autocompleteConfig, select: addressSelectManzana });

    $("#address1").keypress(function (event) {
        if (event.keyCode === 13) {
            BuscarSitio();
        }
    });
}

initializeAutocomplete();

// Fuente de direcciones para autocompletar
function addressSource(requestString, responseFunc) {
    let querystr = requestString.term || document.getElementById(requestString).value;
    if (!querystr) {
        response([]);
        return;
    }

    let temp;
    if ($("#direccion").val() || requestString.val === 123) temp = "direccion";
    else if ($("#manzana").val() || requestString.val === 123) temp = "manzana";
    else if ($("#codigo").val() || requestString.val === 123) temp = "codigo";
    else if ($("#matricula").val() || requestString.val === 123) temp = "matricula";
    else if ($("#propietarios").val() || requestString.val === 123) temp = "propietarios";
    else if ($("#cedul").val() || requestString.val === 123) temp = "cedul";

    $.ajax({
        url: url,
        beforeSend: () => document.getElementById("carga2").style.display = "block",
        success: (data, status, xhr) => {
            let arr = [];
            let datos;

            switch (temp) {
                case "direccion":
                    datos = select_query(`SELECT DISTINCT initcap(a.direccion) AS direccion, a.codigo AS codigo FROM catastro.r1 AS a WHERE a.direccion ILIKE '%${querystr}%' ORDER BY direccion DESC LIMIT 10`);
                    if (!datos) {
                        datos = select_query(`SELECT DISTINCT initcap(a.direccion) AS direccion, a.codigo AS codigo FROM catastro.u_terreno_registros AS a WHERE a.direccion ILIKE '%${querystr}%' ORDER BY direccion DESC LIMIT 10`);
                    }
                    if (datos) {
                        datos.forEach(d => {
                            arr.push({ direccion: d[0], value: d[0], cod: d[1], feature: datos });
                        });
                    }
                    break;
                case "manzana":
                    datos = select_query(`SELECT initcap(a.codigo) AS codigo, a.codigo_ant AS codigo_ant, a.barrio_cod AS barrio_cod, a.gid AS gid FROM catastro.u_manzana AS a WHERE a.codigo ILIKE '%${querystr}%' ORDER BY codigo DESC LIMIT 10`);
                    if (datos) {
                        datos.forEach(d => {
                            arr.push({ value: d[0], cod: d[0], codigo_ant: d[1], barrio_cod: d[2], codigo_mun: d[3], gid: d[4], feature: datos });
                        });
                    }
                    break;
                case "codigo":
                    datos = select_query(`SELECT DISTINCT initcap(a.codigo) AS codigo, a.direccion AS direccion FROM catastro.r1 AS a WHERE a.codigo ILIKE '%${querystr}%' ORDER BY codigo DESC LIMIT 10`);
                    if (!datos) {
                        datos = select_query(`SELECT DISTINCT initcap(a.codigo) AS codigo, a.direccion AS direccion FROM catastro.u_terreno_registros AS a WHERE a.codigo ILIKE '%${querystr}%' ORDER BY codigo DESC LIMIT 10`);
                    }
                    if (datos) {
                        datos.forEach(d => {
                            arr.push({ direccion: d[1], value: d[0], cod: d[0], feature: datos });
                        });
                    }
                    break;
                case "matricula":
                    datos = select_query(`SELECT initcap(a.matricula) AS matricula, a.codigo AS codigo FROM catastro.r1 AS a WHERE a.matricula ILIKE '%${querystr}%' ORDER BY matricula DESC LIMIT 10`);
                    if (datos) {
                        datos.forEach(d => {
                            arr.push({ matricula: d[0], value: d[0], cod: d[1], feature: datos });
                        });
                    }
                    break;
                case "propietarios":
                    datos = select_query(`SELECT DISTINCT initcap(a.nombre) AS nombre, a.direccion AS direccion, a.codigo AS codigo FROM catastro.r1 AS a WHERE a.nombre ILIKE '%${querystr}%' ORDER BY nombre DESC LIMIT 10`);
                    if (!datos) {
                        datos = select_query(`SELECT DISTINCT initcap(a.nombre) AS nombre, a.direccion AS direccion, a.codigo AS codigo FROM catastro.u_terreno_registros AS a WHERE a.nombre ILIKE '%${querystr}%' ORDER BY nombre DESC LIMIT 10`);
                    }
                    if (datos) {
                        datos.forEach(d => {
                            arr.push({ nombre: d[0], value: d[0], direccion: d[1], cod: d[2], feature: datos });
                        });
                    }
                    break;
                case "cedul":
                    datos = select_query(`SELECT DISTINCT initcap(a.num_doc) AS num_doc, a.direccion AS direccion, a.codigo AS codigo FROM catastro.r1 AS a WHERE a.num_doc ILIKE '%${querystr}%' ORDER BY num_doc DESC LIMIT 10`);
                    if (!datos) {
                        datos = select_query(`SELECT DISTINCT initcap(a.num_doc) AS num_doc, a.direccion AS direccion, a.codigo AS codigo FROM catastro.u_terreno_registros AS a WHERE a.num_doc ILIKE '%${querystr}%' ORDER BY num_doc DESC LIMIT 10`);
                    }
                    if (datos) {
                        datos.forEach(d => {
                            arr.push({ doc: d[0], value: d[0], direccion: d[1], cod: d[2], feature: datos });
                        });
                    }
                    break;
                default:
                    break;
            }

            if (arr.length) {
                if (requestString.val === "direccion" || requestString.val === "codigo") {
                    let arreglado = {};
                    arr.forEach((item, index) => arreglado[index] = item);
                    arreglado.item = arreglado["0"];
                    addressSelectPredio(1, arreglado);
                } else if (requestString.val === "manzana") {
                    let arreglado = {};
                    arr.forEach((item, index) => arreglado[index] = item);
                    arreglado.item = arreglado["0"];
                    addressSelectManzana(1, arreglado);
                } else if (requestString.val === "propietarios") {
                    let arreglado = {};
                    arr.forEach((item, index) => arreglado[index] = item);
                    arreglado.item = arreglado["0"];
                    addressSelectPropietarios(1, arreglado);
                } else if (requestString.val === "cedul") {
                    let arreglado = {};
                    arr.forEach((item, index) => arreglado[index] = item);
                    arreglado.item = arreglado["0"];
                    addressSelectCedula(1, arreglado);
                }
                responseFunc(arr);
            } else if (temp === 'direcci') {
                codeAddress(viewParamsStr);
            }
        },
        error: () => console.log("error"),
        complete: () => document.getElementById("carga2").style.display = "none"
    });
}

// Función para buscar y mostrar el sitio en el mapa
let markerSitio;
function BuscarSitio() {
    const nombreSitio = document.getElementById('address1').value;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: `${nombreSitio}, Buenaventura, Valle del Cauca, Colombia` }, (results, status) => {
        if (status === 'OK') {
            const location = results[0].geometry.location;           
            const coords = ol.proj.fromLonLat([location.lng(), location.lat()]);
            if (markerSitio) {
                map.removeLayer(markerSitio);
            }
            markerSitio = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [
                        new ol.Feature({
                            geometry: new ol.geom.Point(coords)
                        })
                    ]
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 1],
                        src: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
                    })
                })
            });
            
            map.addLayer(markerSitio);
            map.getView().setCenter(coords);
            map.getView().setZoom(18);
        } else {
            document.getElementById('resultado').innerText = 'Sitio no encontrado';
        }
    });
}

// Funciones de selección de direcciones para predios, manzanas, propietarios y cédulas
function addressSelectPredio(event, ui) {
    actividad("busqueda por dirección, código o matricula");
    try {
        var codph = ui.item.cod.slice(21, 22);
        var codigoterreno, tipoaval;
        if (codph == '9' || codph == '8') {
            codigoterreno = ui.item.cod.slice(0, 9) + '0000' + ui.item.cod.slice(13, 26) + '0000';
            tipoaval = "Predio en propiedad horizontal o condominio";
        } else if (codph == '5') {
            codigoterreno = ui.item.cod.slice(0, 9) + '0000' + ui.item.cod.slice(13, 21) + '000000000';
            tipoaval = "Mejora (Construcción en predio ajeno)";
        } else {
            codigoterreno = ui.item.cod;
            tipoaval = "No PH";
        }

        var view = map.getView();
        var datosr1 = select_query("select * from catastro.r1 where codigo = '" + ui.item.cod + "'");
        var tabref = "registros";
        if (datosr1 == null) {
            datosr1 = select_query("select * from catastro.u_terreno_registros where codigo = '" + ui.item.cod + "'");
            tabref = "terrenos";
        }

        var geome = select_query("select ST_AsGeoJSON(geom) from catastro.u_terreno_registros where codigo = '" + codigoterreno + "'");
        if (geome == null) {
            geome = select_query("select ST_AsGeoJSON(geom) from catastro.r_terreno_registros where codigo = '" + codigoterreno + "'");
        }
        var geojsonprueba = JSON.parse(geome[0]);
        var coord = geojsonprueba.coordinates[0][0];
        var feat = new ol.Feature({
            geometry: new ol.geom.Polygon([coord])
        });
        feat.getGeometry().transform('EPSG:4326', 'EPSG:3857');
        var geom = feat.getGeometry();

        highlightfeatures.setStyle(PredioStyle);
        var markerSourcenoph = highlightfeatures.getSource();
        markerSourcenoph.clear();
        markerSourcenoph.addFeature(feat);
        ppExtent = geom.getExtent();
        ppExtent[0] = ppExtent[0] - 40;
        ppExtent[2] = ppExtent[2] + 40;
        ppExtent[1] = ppExtent[1] - 40;
        ppExtent[3] = ppExtent[3] + 40;

        var featureCenter = ol.extent.getCenter(ppExtent);
        view.setCenter(featureCenter);
        view.fit(ppExtent, map.getSize());

        if (tabref == "registros") {
            var propietario = "Sin información";
            var documento = "Sin información";
            if (datosr1.length > 1) {
                var propietarios = datosr1.map(d => ({ prop: d[3], doc: d[5] }));
                propietario = propietarios.map(item => item.prop).join(", ");
                documento = propietarios.map(item => item.doc).join(", ");
            } else if (datosr1.length == 1) {
                propietario = datosr1[0][3];
                documento = datosr1[0][5];
            }

            var direccion = datosr1[0][6] || "Sin Información";
            var areat = parseInt(datosr1[0][8]) || "Sin Información";
            var areac = parseInt(datosr1[0][9]) || "Sin Información";
            var avaluo = datosr1[0][10] || "Sin Información";
            var destino = datosr1[0][7] || "Sin Información";
            var matricula = datosr1[0][11] || "Sin Información";
        } else {
            var propietario = "Sin información";
            var documento = "Sin información";
            if (datosr1.length > 1) {
                var propietarios = datosr1.map(d => ({ prop: d[14], doc: d[17] }));
                propietario = propietarios.map(item => item.prop).join(", ");
                documento = propietarios.map(item => item.doc).join(", ");
            } else if (datosr1.length == 1) {
                propietario = datosr1[0][14];
                documento = datosr1[0][17];
            }

            var direccion = datosr1[0][18] || "Sin Información";
            var areat = parseInt(datosr1[0][21]) || "Sin Información";
            var areac = parseInt(datosr1[0][22]) || "Sin Información";
            var avaluo = datosr1[0][23] || "Sin Información";
            var destino = datosr1[0][20] || "Sin Información";
            var matricula = datosr1[0][29] || "Sin Información";
        }

        var codigo_ant = select_query("select codigo_ant from catastro.u_terreno_registros where codigo = '" + codigoterreno + "'") || "sin información";
        if (codigo_ant == null) {
            codigo_ant = select_query("select codigo_ant from catastro.r_terreno_registros where codigo = '" + codigoterreno + "'") || "sin información";
        }

        var table = document.getElementById("tblatt");
        table.innerHTML = "";
        var select = ["<b>Dirección: </b>", "<b>Código: </b>", "<b>Código Anterior: </b>", "<b>Propietario/s: </b>", "<b>Documento/s: </b>", "<b>Área de Terreno: </b>", "<b>Área Construida: </b>", "<b>Avalúo: </b>", "<b>Destino Económico: </b>", "<b>Matricula inmobiliaria: </b>", "<b>Tipo de avalúo: </b>"];
        var sel = [direccion, ui.item.cod, codigo_ant, propietario, documento, `${areat} m2`, `${areac} m2`, `$${formatNumber(avaluo)}`, destino, matricula, tipoaval];

        for (let i = 0; i < select.length; i++) {
            let row = table.insertRow(i);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.innerHTML = select[i];
            cell2.innerHTML = sel[i];
        }
        document.getElementById("panel_atr").style.display = "block";
    } catch (err) {
        Swal.fire({
            title: 'No se encontro información geografica asociada a la consulta',
            text: 'Es posible que se trate de un predio en Omisión, a continuación se muestran los datos de la tabla de registro',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });

        var datosr1 = select_query("select * from catastro.u_terreno_registros where codigo = '" + ui.item.cod + "'");
        var direccion = datosr1[0][6] || "Sin información";
        var propietario = datosr1[0][3] || "Sin información";
        var documento = datosr1[0][5] || "Sin información";
        var areat = parseInt(datosr1[0][8]) || "Sin información";
        var areac = parseInt(datosr1[0][9]) || "Sin información";
        var avaluo = datosr1[0][10] || "Sin información";
        var destino = datosr1[0][7] || "Sin información";
        var matricula = datosr1[0][11] || "Sin información";

        var table = document.getElementById("tblatt");
        table.innerHTML = "";
        var select = ["<b>Dirección: </b>", "<b>Código: </b>", "<b>Propietario/s: </b>", "<b>Documento/s: </b>", "<b>Área de Terreno: </b>", "<b>Área Construida: </b>", "<b>Avalúo: </b>", "<b>Destino Económico: </b>", "<b>Matricula inmobiliaria: </b>", "<b>Tipo de avalúo: </b>"];
        var sel = [direccion, ui.item.cod, propietario, documento, `${areat} m2`, `${areac} m2`, `$${formatNumber(avaluo)}`, destino, matricula, tipoaval];

        for (let i = 0; i < select.length; i++) {
            let row = table.insertRow(i);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.innerHTML = select[i];
            cell2.innerHTML = sel[i];
        }
        document.getElementById("panel_atr").style.display = "block";
    }
}

function addressSelectManzana(event, ui) {
    actividad("busqueda por manzana");
    try {
        var view = map.getView();
        var geome = select_query("select ST_AsGeoJSON(geom) from catastro.u_manzana where codigo = '" + ui.item.cod + "'");
        var geojsonprueba = JSON.parse(geome[0]);
        var coord = geojsonprueba.coordinates[0][0];
        var feat = new ol.Feature({
            geometry: new ol.geom.Polygon([coord])
        });
        feat.getGeometry().transform('EPSG:4326', 'EPSG:3857');
        var geom = feat.getGeometry();

        highlightfeatures.setStyle(PredioStyle);
        var markerSourcenoph = highlightfeatures.getSource();
        markerSourcenoph.clear();
        markerSourcenoph.addFeature(feat);
        ppExtent = geom.getExtent();
        ppExtent[0] = ppExtent[0] - 40;
        ppExtent[2] = ppExtent[2] + 40;
        ppExtent[1] = ppExtent[1] - 40;
        ppExtent[3] = ppExtent[3] + 40;

        var featureCenter = ol.extent.getCenter(ppExtent);
        view.setCenter(featureCenter);
        view.fit(ppExtent, map.getSize());

        var table = document.getElementById("tblattmz");
        table.innerHTML = "";
        var select = ["<b>Código Manzana: </b>", "<b>Código Anterior: </b>", "<b>Código Barrio: </b>"];
        var sel = [ui.item.cod, ui.item.codigo_ant, ui.item.barrio_cod];

        for (let i = 0; i < select.length; i++) {
            let row = table.insertRow(i);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.innerHTML = select[i];
            cell2.innerHTML = sel[i];
        }
        document.getElementById("panel_mz").style.display = "block";
    } catch (err) {
        Swal.fire({
            title: 'No se encontro información geografica asociada a la consulta',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    }
}

function addressSelectPropietarios(event, ui) {
    actividad("busqueda por propietario");
    var nombre = select_query("select * from catastro.r1 where nombre ilike '" + ui.item.nombre + "'");
    var tableref = "registros";
    if (nombre == null) {
        nombre = select_query("select * from catastro.u_terreno_registros where nombre ilike '" + ui.item.nombre + "'");
        tableref = "terrenos";
    }

    if (nombre.length > 1) {
        var table = document.getElementById("tblattmz");
        table.innerHTML = "";
        var select = ["<b>Número de Predios</b>", "<b>Direcciones</b>"];
        var sel = [nombre.length];
        var tablaph = "<table border=1 id='tablaph'>";
        nombre.forEach((d, i) => {
            tablaph += `<tr><td id=tt${i}>${d[tableref == 'registros' ? 6 : 18]}</td></tr>`;
        });
        tablaph += "</table>";
        sel.push(tablaph);

        for (let i = 0; i < select.length; i++) {
            let row = table.insertRow(i);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.innerHTML = select[i];
            cell2.innerHTML = sel[i];
        }
        nombre.forEach((d, i) => {
            let ell = document.getElementById(`tt${i}`);
            ell.setAttribute("onclick", `mostrardatosmult('tt${i}')`);
            ell.value = d[4];
        });
        document.getElementById("panel_mz").style.display = "block";
    } else {
        addressSelectPredio(event, ui);
    }
}

function addressSelectCedula(event, ui) {
    actividad("busqueda por cedula");
    var nombre = select_query("select * from catastro.r1 where num_doc ilike '" + ui.item.doc + "'");
    var tableref = "registros";
    if (nombre == null) {
        nombre = select_query("select * from catastro.u_terreno_registros where num_doc ilike '" + ui.item.doc + "'");
        tableref = "terrenos";
    }

    if (nombre.length > 1) {
        var table = document.getElementById("tblattmz");
        table.innerHTML = "";
        var select = ["<b>Número de Predios</b>", "<b>Direcciones</b>"];
        var sel = [nombre.length];
        var tablaph = "<table border=1 id='tablaph'>";
        nombre.forEach((d, i) => {
            tablaph += `<tr><td id=tt${i}>${d[tableref == 'registros' ? 6 : 18]}</td></tr>`;
        });
        tablaph += "</table>";
        sel.push(tablaph);

        for (let i = 0; i < select.length; i++) {
            let row = table.insertRow(i);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.innerHTML = select[i];
            cell2.innerHTML = sel[i];
        }
        nombre.forEach((d, i) => {
            let ell = document.getElementById(`tt${i}`);
            ell.setAttribute("onclick", `mostrardatosmult('tt${i}')`);
            ell.value = d[4];
        });
        document.getElementById("panel_mz").style.display = "block";
    } else {
        addressSelectPredio(event, ui);
    }
}

function mostrardatosmult(dire) {
    var dirr = document.getElementById(dire).innerHTML;
    try {
        var view = map.getView();
        var datosr1 = select_query("select * from catastro.r1 where direccion ilike '" + dirr + "'");
        var codigo, tablerefer;
        if (datosr1 && datosr1.length > 0) {
            codigo = datosr1[0][1];
            tablerefer = "registros";
        } else {
            datosr1 = select_query("select * from catastro.u_terreno_registros where direccion ilike '" + dirr + "'");
            if (datosr1 && datosr1.length > 0) {
                codigo = datosr1[0][2];
                tablerefer = "terrenos";
            } else {
                Swal.fire({
                    title: 'No se encontró información asociada a la consulta',
                    icon: 'info',
                    confirmButtonText: 'Aceptar'
                });
                return;
            }
        }

        var codph = codigo.slice(21, 22);
        var codigoterreno, tipoaval;
        if (codph == '9' || codph == '8') {
            codigoterreno = codigo.slice(0, 9) + '0000' + codigo.slice(13, 26) + '0000';
            tipoaval = "Predio en propiedad horizontal o condominio";
        } else if (codph == '5') {
            codigoterreno = codigo.slice(0, 9) + '0000' + codigo.slice(13, 21) + '000000000';
            tipoaval = "Mejora (Construcción en predio ajeno)";
        } else {
            codigoterreno = codigo;
            tipoaval = "No PH";
        }

        var geome = select_query("select ST_AsGeoJSON(geom) from catastro.u_terreno_registros where codigo = '" + codigoterreno + "'");
        var geojsonprueba = JSON.parse(geome[0]);
        var coord = geojsonprueba.coordinates[0][0];
        var feat = new ol.Feature({
            geometry: new ol.geom.Polygon([coord])
        });
        feat.getGeometry().transform('EPSG:4326', 'EPSG:3857');
        var geom = feat.getGeometry();

        highlightfeatures.setStyle(PredioStyle);
        var markerSourcenoph = highlightfeatures.getSource();
        markerSourcenoph.clear();
        markerSourcenoph.addFeature(feat);
        ppExtent = geom.getExtent();
        ppExtent[0] = ppExtent[0] - 40;
        ppExtent[2] = ppExtent[2] + 40;
        ppExtent[1] = ppExtent[1] - 40;
        ppExtent[3] = ppExtent[3] + 40;

        var featureCenter = ol.extent.getCenter(ppExtent);
        view.setCenter(featureCenter);
        view.fit(ppExtent, map.getSize());

        var propietario = "Sin información";
        var documento = "Sin información";
        if (datosr1.length > 1) {
            var propietarios = datosr1.map(d => ({
                prop: tablerefer == "registros" ? d[3] : d[14],
                doc: tablerefer == "registros" ? d[5] : d[17]
            }));
            propietario = propietarios.map(item => item.prop).join(", ");
            documento = propietarios.map(item => item.doc).join(", ");
        } else if (datosr1.length == 1) {
            propietario = tablerefer == "registros" ? datosr1[0][3] : datosr1[0][14];
            documento = tablerefer == "registros" ? datosr1[0][5] : datosr1[0][17];
        }

        var direccion = tablerefer == "registros" ? datosr1[0][4] : datosr1[0][18] || "Sin Información";
        var areat = parseInt(tablerefer == "registros" ? datosr1[0][8] : datosr1[0][21]) || "Sin Información";
        var areac = parseInt(tablerefer == "registros" ? datosr1[0][9] : datosr1[0][22]) || "Sin Información";
        var avaluo = tablerefer == "registros" ? datosr1[0][10] : datosr1[0][23] || "Sin Información";
        var destino = tablerefer == "registros" ? datosr1[0][7] : datosr1[0][20] || "Sin Información";
        var matricula = tablerefer == "registros" ? datosr1[0][11] : datosr1[0][29] || "Sin Información";

        var codigo_ant = select_query("select codigo_ant from catastro.u_terreno_registros where codigo = '" + codigoterreno + "'") || "sin información";
        if (codigo_ant == null) {
            codigo_ant = select_query("select codigo_ant from catastro.r_terreno_registros where codigo = '" + codigoterreno + "'") || "sin información";
        }

        var table = document.getElementById("tblatt");
        table.innerHTML = "";
        var select = ["<b>Dirección: </b>", "<b>Código: </b>", "<b>Código Anterior: </b>", "<b>Propietario/s: </b>", "<b>Documento/s: </b>", "<b>Área de Terreno: </b>", "<b>Área Construida: </b>", "<b>Avalúo: </b>", "<b>Destino Económico: </b>", "<b>Matricula inmobiliaria: </b>", "<b>Tipo de avalúo: </b>"];
        var sel = [direccion, codigoterreno, codigo_ant, propietario, documento, `${areat} m2`, `${areac} m2`, `$${formatNumber(avaluo)}`, destino, matricula, tipoaval];

        for (let i = 0; i < select.length; i++) {
            let row = table.insertRow(i);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.innerHTML = select[i];
            cell2.innerHTML = sel[i];
        }
        document.getElementById("panel_atr").style.display = "block";
    } catch (err) {
        Swal.fire({
            title: 'No se encontro información geografica asociada a la consulta',
            text: 'Es posible que se trate de un predio en Omisión, a continuación se muestran los datos de la tabla de registro',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });

        var datosr1 = select_query("select * from catastro.u_terreno_registros where direccion ilike '" + dirr + "'");
        var direccion = datosr1[0][6] || "Sin información";
        var propietario = datosr1[0][3] || "Sin información";
        var documento = datosr1[0][5] || "Sin información";
        var areat = parseInt(datosr1[0][8]) || "Sin información";
        var areac = parseInt(datosr1[0][9]) || "Sin información";
        var avaluo = datosr1[0][10] || "Sin información";
        var destino = datosr1[0][7] || "Sin información";
        var matricula = datosr1[0][11] || "Sin información";

        var table = document.getElementById("tblatt");
        table.innerHTML = "";
        var select = ["<b>Dirección: </b>", "<b>Código: </b>", "<b>Propietario/s: </b>", "<b>Documento/s: </b>", "<b>Área de Terreno: </b>", "<b>Área Construida: </b>", "<b>Avalúo: </b>", "<b>Destino Económico: </b>", "<b>Matricula inmobiliaria: </b>", "<b>Tipo de avalúo: </b>"];
        var sel = [direccion, codigoterreno, propietario, documento, `${areat} m2`, `${areac} m2`, `$${formatNumber(avaluo)}`, destino, matricula, tipoaval];

        for (let i = 0; i < select.length; i++) {
            let row = table.insertRow(i);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.innerHTML = select[i];
            cell2.innerHTML = sel[i];
        }
        document.getElementById("panel_atr").style.display = "block";
    }
}


function BuscarDirAprox() {
    var sitio = "Colombia, Pereira, " + document.getElementById("ubicardir").value;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': sitio }, function (results, status) {
        if (status === 'OK') {
            var lat = (results[0].geometry.viewport.Ua.i + results[0].geometry.viewport.Ua.j) / 2;
            var lont = (results[0].geometry.viewport.Ya.i + results[0].geometry.viewport.Ya.j) / 2;
            var coords = ol.proj.transform([lat, lont], 'EPSG:4326', 'EPSG:3857');

            map.getView().setCenter(coords);
            map.getView().setZoom(18);

            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(coords)
            });

            highlight.setStyle(flagStyle);
            var markerSource = highlight.getSource();
            markerSource.clear();
            markerSource.addFeature(iconFeature);
        } else {
            alert("Tampoco se encontro esta dirección en el georeferenciador");
        }
    });
}
