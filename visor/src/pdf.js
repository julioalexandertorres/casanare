/*function mapScal(dpi) {
    var unit = map.getView().getProjection().getUnits();
    var resolution = map.getView().getResolution();
    var inchesPerMetre = 39.37;
    return resolution * ol.proj.METERS_PER_UNIT[unit] * inchesPerMetre * dpi;
}*/

function mapScal(dpi) {
    var view = map.getView();
    var projection = view.getProjection();
    var units = projection.getUnits();
    var resolution = view.getResolution();
    var inchesPerMeter = 39.37;
    var metersPerUnit = projection.getMetersPerUnit();   
    return resolution * metersPerUnit * inchesPerMeter * dpi;
}

/*function printPdf(){
    $.ajax({
        beforeSend: function () {
                document.getElementById("carga2").style.display = "block";
        },
        success: function () {
        var norte = "";
        var escudo = "";
        const { jsPDF } = window.jspdf;
        
        map.once('rendercomplete', function() {
            var canvas = document.querySelector('.ol-layer canvas'),
                context = canvas.getContext('2d');
            
            if (canvas && context) {
                var imageData = canvas.toDataURL('image/png'); 
                canvas.toBlob(function(blob) {
                    
                    options = {
                        columnStyles: {
                            0: {columnWidth: 180},
                            
                    }
                };
              })
            }
        
            escudo = new Image();
            escudo.setAttribute('crossOrigin', 'anonymous');
            escudo.crossOrigin = "anonymous";
            escudo.src = 'image/logo_buenaventura.png';

            norte = new Image();
            norte.setAttribute('crossOrigin', 'anonymous');
            norte.crossOrigin = "anonymous";
            norte.src = 'image/norte.png';

             var scale = mapScal(150);
            var escala = Math.round(scale).toString();
            var doc = new jsPDF('l', 'mm', 'letter');
            doc.addImage(imageData, 'JPEG', 10, 10, 261, 163);
            doc.addImage(escudo, 'PNG', 11, 177, 27, 27);
            doc.addImage(norte, 'PNG', 241, 177, 27, 27);

            doc.rect(8,8,265,200);

            doc.setDrawColor(178, 178, 178);
            
            doc.rect(10,176,261,30);
            
            doc.setFontSize(10);
            doc.setFont('calibri', ''); 
            doc.setTextColor(102, 102, 102);
            doc.text("REPÚBLICA DE COLOMBIA", 44, 182);

            doc.setFontSize(10);
            doc.setFont('calibri', ''); 
            doc.setTextColor(51, 51, 51);
            doc.text("Departamento de Valle del Cauca", 42, 187);

            var hoy = new Date();
            var dia = hoy.getDate(); // Devuelve el día del mes (de 1 a 31)
            var mes = hoy.getMonth() + 1; // Devuelve el mes (de 1 a 12)
            var año = hoy.getFullYear(); // Devuelve el año (formato de cuatro dígitos)
            //console.log(dia + '/' + mes + '/' + año);

            doc.setFontSize(10);
            doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
            doc.setTextColor(51, 51, 51);
            doc.text("Distrito de Buenaventura", 48, 192);

            doc.setFontSize(10);
            doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
            doc.setTextColor(102, 102, 102);
            doc.text("Geovisor "+dia + "/" + mes + "/" + año+"", 53, 197);

            doc.setFontSize(10);
            doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
            doc.setTextColor(102, 102, 102);
            doc.text("INFORMACIÓN DE REFERENCIA", 105, 182);

            doc.setFontSize(10);
            doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
            doc.setTextColor(51, 51, 51);
            doc.text("Sistema de proyección WGS84", 108, 187);

            doc.setFontSize(10);
            doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
            doc.setTextColor(51, 51, 51);
            doc.text("Sistema nacional de referencia MAGNA - SIRGAS", 96, 192);

            var view = map.getView();
            var center = view.getCenter();
            var centerLonLat = ol.proj.transform(center, 'EPSG:3857', 'EPSG:4326');
            //console.log(centerLonLat);

            doc.setFontSize(10);
            doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
            doc.setTextColor(102, 102, 102);
            doc.text("COORDENADA CENTRAL DEL MAPA", 175, 182);

            doc.setFontSize(10);
            doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
            doc.setTextColor(51, 51, 51);
            doc.text("Coordenadas", 196, 187);

            doc.setFontSize(10);
            doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
            doc.setTextColor(51, 51, 51);
            doc.text("Latitud: "+centerLonLat[0].toFixed(4)+"", 193, 192);

            doc.setFontSize(10);
            doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
            doc.setTextColor(51, 51, 51);
            doc.text("Longitud: "+centerLonLat[1].toFixed(4)+"", 193, 197);

            doc.save('mapa.pdf'); // Guarda el mapa como PDF.
        });
       },
        complete: function () {
          map.updateSize();
          document.getElementById("carga2").style.display = "none";
    }
  });     
}*/





function printPdf() {
    map.once('rendercomplete', function(event) {
        var mapCanvas = document.createElement('canvas');
        var size = map.getSize();
        mapCanvas.width = size[0];
        mapCanvas.height = size[1];
        var mapContext = mapCanvas.getContext('2d');
        
        Array.prototype.forEach.call(document.querySelectorAll('.ol-layer canvas'), function(canvas) {
            if (canvas.width > 0) {
                var opacity = canvas.parentNode.style.opacity;
                mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                var transform = canvas.style.transform;
                // Get the transform parameters from the style's transform matrix
                var matrix = transform.match(/^matrix\(([^\(]*)\)$/)[1].split(',').map(Number);
                // Apply the transform to the export map context
                CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
                mapContext.drawImage(canvas, 0, 0);
            }
        });

        // Dibujar el canvas en la página para inspección visual
        var dataURL = mapCanvas.toDataURL('image/png');
        var img = new Image();
        img.src = dataURL;
        img.onload = function() {
            // Añade el elemento de imagen al cuerpo del documento para visualización
            document.body.appendChild(img);

            // Aquí puedes pausar la ejecución para verificar la imagen, 
            // y luego continuar con la creación del PDF si todo se ve bien
            const { jsPDF } = window.jspdf;
            var pdf = new jsPDF('landscape', undefined, 'a4');
            pdf.addImage(dataURL, 'PNG', 10, 10, 280, 210);
            pdf.save('map.pdf');

            // Opcional: remover la imagen del DOM si ya no la necesitas visible
            document.body.removeChild(img);
        };
    });
    // Trigger the map render cycle
    map.renderSync();
}



function menuPrintDialog(){
    actividad("imprimir pdf");
    var dialog = document.querySelector('.ol-ext-print-dialog');
    // Cambia la propiedad 'display' para que se muestre
    dialog.style.display = 'block';
    var printTitle = document.querySelector('.ol-print-title');
    printTitle.style.display = 'block';
    printDialog.print();
}
        

/*function createAndSavePDF(imgData) {
    var doc = new jspdf.jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [841, 1189] // Ajusta esto según el tamaño del canvas del mapa
    });

    doc.addImage(imgData, 'JPEG', 0, 0, 841, 1189);
    doc.save('map.pdf');
}*/

function createAndSavePDF(opt) {
    //console.log(opt);
    var orientacion = opt.orient;
    var tamano = opt.size;
    var formato = opt.format;
    var titulomapa = document.getElementById('inputTitulomapa').value;
    map.once('rendercomplete', function(event) {
    var mapCanvas = document.createElement('canvas');
    var size = map.getSize();
    mapCanvas.width = size[0];
    mapCanvas.height = size[1];
    var mapContext = mapCanvas.getContext('2d');
        
        Array.prototype.forEach.call(document.querySelectorAll('.ol-layer canvas'), function(canvas) {
            if (canvas.width > 0) {
                var opacity = canvas.parentNode.style.opacity;
                mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                var transform = canvas.style.transform;
                // Get the transform parameters from the style's transform matrix
                var matrix = transform.match(/^matrix\(([^\(]*)\)$/)[1].split(',').map(Number);
                // Apply the transform to the export map context
                CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
                mapContext.drawImage(canvas, 0, 0);
            }
        });

        // Dibujar el canvas en la página para inspección visual
        var dataURL = mapCanvas.toDataURL('image/png');
        var img = new Image();
        img.src = dataURL;
        img.onload = function() {
            // Añade el elemento de imagen al cuerpo del documento para visualización
            document.body.appendChild(img);
            const { jsPDF } = window.jspdf;
            var doc = new jsPDF(orientacion, 'mm', formato);
            var scale = mapScal(150);
            var escala = document.getElementById("escalamap").value;

                if(formato == 'A0' && orientacion == 'portrait'){
                    //mapa
                    doc.addImage(dataURL, 'PNG', 30, 40, 780, 1140);
                    //rectangulo exterior
                    doc.rect(20,30,800,1149);
                    doc.setDrawColor(178, 178, 178);
                    //rectangulo interior
                    doc.setFillColor(255, 255, 255);    
                    doc.rect(25,1042,790,124,'FD');
                    //titulo
                    doc.setFontSize(40);
                    doc.setFont('calibri', 'bold'); 
                    doc.setTextColor(102, 102, 102);
                    doc.text(titulomapa, 30, 25);

                    escudo = new Image();
                    escudo.setAttribute('crossOrigin', 'anonymous');
                    escudo.crossOrigin = "anonymous";
                    escudo.src = 'image/logo_buenaventura.png';
        
                    norte = new Image();
                    norte.setAttribute('crossOrigin', 'anonymous');
                    norte.crossOrigin = "anonymous";
                    norte.src = 'image/norte.png';

                    doc.addImage(escudo, 'PNG', 28, 1050, 105, 105);
                    doc.addImage(norte, 'PNG', 705, 1050, 105, 105);

                    doc.setFontSize(34);
                    //doc.setFont('calibri', ''); 
                    doc.setTextColor(102, 102, 102);
                    doc.text("REPÚBLICA DE COLOMBIA", 184, 1065);
        
                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); 
                    doc.setTextColor(51, 51, 51);
                    doc.text("Departamento de Valle del Cauca", 184, 1085);
        
                    var hoy = new Date();
                    var dia = hoy.getDate(); // Devuelve el día del mes (de 1 a 31)
                    var mes = hoy.getMonth() + 1; // Devuelve el mes (de 1 a 12)
                    var año = hoy.getFullYear(); // Devuelve el año (formato de cuatro dígitos)
                    //console.log(dia + '/' + mes + '/' + año);
        
                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Distrito de Buenaventura", 204, 1100);
        
                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Fuente: Sistema de información geográfica", 164, 1115);

                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Fecha: "+dia + "/" + mes + "/" + año+"", 220, 1130);
        
                    doc.setFontSize(34);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(102, 102, 102);
                    doc.text("INFORMACIÓN DE REFERENCIA", 464, 1065);
        
                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Sistema de proyección WGS84", 484, 1085);
        
                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Sistema nacional de referencia MAGNA - SIRGAS", 444, 1100);

                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Escala 1: "+escala+"", 520, 1115);
        
                    /*var view = map.getView();
                    var center = view.getCenter();
                    var centerLonLat = ol.proj.transform(center, 'EPSG:3857', 'EPSG:4326');
                    //console.log(centerLonLat);
        
                    doc.setFontSize(10);
                    doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(102, 102, 102);
                    doc.text("COORDENADA CENTRAL DEL MAPA", 175, 182);
        
                    doc.setFontSize(10);
                    doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Coordenadas", 196, 187);
        
                    doc.setFontSize(10);
                    doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Latitud: "+centerLonLat[0].toFixed(4)+"", 193, 192);
        
                    doc.setFontSize(10);
                    doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Longitud: "+centerLonLat[1].toFixed(4)+"", 193, 197);*/
                }

                else if(formato == 'A0' && orientacion == 'landscape'){
                    console.log("A0 y landscape");
                    //mapa
                    doc.addImage(dataURL, 'PNG', 30, 40, 1130, 780);
                    //rectangulo exterior
                    doc.rect(20,30,1150,800);
                    doc.setDrawColor(178, 178, 178);
                    //rectangulo interior    
                    doc.setFillColor(255, 255, 255);
                    doc.rect(1060,40,100,780, 'FD');
                    //titulo
                    doc.setFontSize(40);
                    doc.setFont('calibri', 'bold'); 
                    doc.setTextColor(102, 102, 102);
                    doc.text(titulomapa, 30, 25);

                    escudo = new Image();
                    escudo.setAttribute('crossOrigin', 'anonymous');
                    escudo.crossOrigin = "anonymous";
                    escudo.src = 'image/logo_buenaventura.png';
        
                    norte = new Image();
                    norte.setAttribute('crossOrigin', 'anonymous');
                    norte.crossOrigin = "anonymous";
                    norte.src = 'image/norte.png';

                    doc.addImage(escudo, 'PNG', 1058, 700, 105, 105);
                    doc.addImage(norte, 'PNG', 1058, 40, 105, 105);

                    doc.setFontSize(34);
                    //doc.setFont('calibri', ''); 
                    doc.setTextColor(102, 102, 102);
                    doc.text("REPÚBLICA", 1075, 185);

                    doc.setFontSize(34);
                    //doc.setFont('calibri', ''); 
                    doc.setTextColor(102, 102, 102);
                    doc.text("DE COLOMBIA", 1065, 200);
        
                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); 
                    doc.setTextColor(51, 51, 51);
                    doc.text("Departamento", 1075, 225);

                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); 
                    doc.setTextColor(51, 51, 51);
                    doc.text("de Valle del Cauca", 1065, 240);
        
                    var hoy = new Date();
                    var dia = hoy.getDate(); // Devuelve el día del mes (de 1 a 31)
                    var mes = hoy.getMonth() + 1; // Devuelve el mes (de 1 a 12)
                    var año = hoy.getFullYear(); // Devuelve el año (formato de cuatro dígitos)
                    //console.log(dia + '/' + mes + '/' + año);
        
                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Distrito de", 1083, 260);

                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Buenaventura", 1075, 275);
        
                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Fuente: SIG", 1082, 295);

                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Fecha: "+dia + "/" + mes + "/" + año+"", 220, 1130);
        
                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(102, 102, 102);
                    doc.text("INFORMACIÓN", 1068, 345);

                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(102, 102, 102);
                    doc.text("DE REFERENCIA", 1063, 360);
        
                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Sistema de", 1082, 385);

                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("proyección WGS84", 1063, 400);
        
                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Sistema nacional", 1068, 420);

                    doc.setFontSize(32);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("MAGNA - SIRGAS", 1063, 435);

                    doc.setFontSize(34);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(102, 102, 102);
                    doc.text("Escala 1:"+escala+"", 1065, 650);
        
                }

                else if(formato == 'A2' && orientacion == 'portrait'){
                    console.log("A2 y portrait");
                    //mapa
                    doc.addImage(dataURL, 'PNG', 15, 20, 390, 570);
                    //rectangulo exterior
                    doc.rect(10,15,400,575);
                    doc.setDrawColor(178, 178, 178);
                    //rectangulo interior
                    doc.setFillColor(255, 255, 255);    
                    doc.rect(13,526,395,62,'FD');
                    //titulo
                    doc.setFontSize(24);
                    doc.setFont('calibri', 'bold'); 
                    doc.setTextColor(102, 102, 102);
                    doc.text(titulomapa, 15, 12);

                    escudo = new Image();
                    escudo.setAttribute('crossOrigin', 'anonymous');
                    escudo.crossOrigin = "anonymous";
                    escudo.src = 'image/logo_buenaventura.png';
        
                    norte = new Image();
                    norte.setAttribute('crossOrigin', 'anonymous');
                    norte.crossOrigin = "anonymous";
                    norte.src = 'image/norte.png';

                    doc.addImage(escudo, 'PNG', 14, 530, 50, 50);
                    doc.addImage(norte, 'PNG', 352, 530, 50, 50);

                    doc.setFontSize(17);
                    //doc.setFont('calibri', ''); 
                    doc.setTextColor(102, 102, 102);
                    doc.text("REPÚBLICA DE COLOMBIA", 92, 540);
        
                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); 
                    doc.setTextColor(51, 51, 51);
                    doc.text("Departamento de Valle del Cauca", 92, 550);
        
                    var hoy = new Date();
                    var dia = hoy.getDate(); // Devuelve el día del mes (de 1 a 31)
                    var mes = hoy.getMonth() + 1; // Devuelve el mes (de 1 a 12)
                    var año = hoy.getFullYear(); // Devuelve el año (formato de cuatro dígitos)
                    //console.log(dia + '/' + mes + '/' + año);
        
                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Distrito de Buenaventura", 102, 557);
        
                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Fuente: Sistema de información geográfica", 82, 564);

                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Fecha: "+dia + "/" + mes + "/" + año+"", 112, 571);
        
                    doc.setFontSize(17);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(102, 102, 102);
                    doc.text("INFORMACIÓN DE REFERENCIA", 232, 540);
        
                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Sistema de proyección WGS84", 242, 550);
        
                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Sistema nacional de referencia MAGNA - SIRGAS", 222, 557);

                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Escala 1: "+escala+"", 260, 567);                  
                }
               
                else if(formato == 'A2' && orientacion == 'landscape'){
                    console.log("A2 y landscape");
                    //mapa
                    doc.addImage(dataURL, 'PNG', 15, 20, 566, 390);
                    //rectangulo exterior
                    doc.rect(10,15,575,400);
                    doc.setDrawColor(178, 178, 178);
                    //rectangulo interior    
                    doc.setFillColor(255, 255, 255);
                    doc.rect(530,20,50,390, 'FD');
                    //titulo
                    doc.setFontSize(20);
                    doc.setFont('calibri', 'bold'); 
                    doc.setTextColor(102, 102, 102);
                    doc.text(titulomapa, 10, 12);

                    escudo = new Image();
                    escudo.setAttribute('crossOrigin', 'anonymous');
                    escudo.crossOrigin = "anonymous";
                    escudo.src = 'image/logo_buenaventura.png';
        
                    norte = new Image();
                    norte.setAttribute('crossOrigin', 'anonymous');
                    norte.crossOrigin = "anonymous";
                    norte.src = 'image/norte.png';

                    doc.addImage(escudo, 'PNG', 529, 350, 52, 52);
                    doc.addImage(norte, 'PNG', 529, 20, 52, 52);

                    doc.setFontSize(17);
                    //doc.setFont('calibri', ''); 
                    doc.setTextColor(102, 102, 102);
                    doc.text("REPÚBLICA", 537, 92);

                    doc.setFontSize(17);
                    //doc.setFont('calibri', ''); 
                    doc.setTextColor(102, 102, 102);
                    doc.text("DE COLOMBIA", 533, 100);
        
                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); 
                    doc.setTextColor(51, 51, 51);
                    doc.text("Departamento", 537, 120);

                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); 
                    doc.setTextColor(51, 51, 51);
                    doc.text("de Valle del Cauca", 533, 128);
        
                    var hoy = new Date();
                    var dia = hoy.getDate(); // Devuelve el día del mes (de 1 a 31)
                    var mes = hoy.getMonth() + 1; // Devuelve el mes (de 1 a 12)
                    var año = hoy.getFullYear(); // Devuelve el año (formato de cuatro dígitos)
                    //console.log(dia + '/' + mes + '/' + año);
        
                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Distrito de", 542, 142);

                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Buenaventura", 537, 150);
        
                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Fuente: SIG", 539, 170);

                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Fecha: "+dia + "/" + mes + "/" + año+"", 537, 190);
        
                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(102, 102, 102);
                    doc.text("INFORMACIÓN", 534, 210);

                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(102, 102, 102);
                    doc.text("DE REFERENCIA", 532, 218);
        
                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Sistema de", 542, 238);

                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("proyección WGS84", 532, 246);
        
                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Sistema nacional", 535, 266);

                    doc.setFontSize(16);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("MAGNA - SIRGAS", 531, 274);

                    doc.setFontSize(17);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(102, 102, 102);
                    doc.text("Escala 1:"+escala+"", 534, 298);    
                }

                else if(formato == 'A4' && orientacion == 'portrait'){
                    console.log("A4 y portrait");
                    //mapa
                    doc.addImage(dataURL, 'PNG', 7, 10, 196, 280);
                    //rectangulo exterior
                    doc.rect(5,8,200,284);
                    doc.setDrawColor(178, 178, 178);
                    //rectangulo interior
                    doc.setFillColor(255, 255, 255);    
                    doc.rect(7,260,196,31,'FD');
                    //titulo
                    doc.setFontSize(12);
                    doc.setFont('calibri', 'bold'); 
                    doc.setTextColor(102, 102, 102);
                    doc.text(titulomapa, 6, 6);

                    escudo = new Image();
                    escudo.setAttribute('crossOrigin', 'anonymous');
                    escudo.crossOrigin = "anonymous";
                    escudo.src = 'image/logo_buenaventura.png';
        
                    norte = new Image();
                    norte.setAttribute('crossOrigin', 'anonymous');
                    norte.crossOrigin = "anonymous";
                    norte.src = 'image/norte.png';

                    doc.addImage(escudo, 'PNG', 7, 263, 25, 25);
                    doc.addImage(norte, 'PNG', 177, 263, 25, 25);

                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); 
                    doc.setTextColor(102, 102, 102);
                    doc.text("REPÚBLICA DE COLOMBIA", 48, 265);
        
                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); 
                    doc.setTextColor(51, 51, 51);
                    doc.text("Departamento de Valle del Cauca", 47, 270);
        
                    var hoy = new Date();
                    var dia = hoy.getDate(); // Devuelve el día del mes (de 1 a 31)
                    var mes = hoy.getMonth() + 1; // Devuelve el mes (de 1 a 12)
                    var año = hoy.getFullYear(); // Devuelve el año (formato de cuatro dígitos)
                    //console.log(dia + '/' + mes + '/' + año);
        
                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Distrito de Buenaventura", 52, 274);
        
                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Fuente: Sistema de información geográfica", 44, 279);

                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Fecha: "+dia + "/" + mes + "/" + año+"", 58, 284);
        
                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(102, 102, 102);
                    doc.text("INFORMACIÓN DE REFERENCIA", 116, 265);
        
                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Sistema de proyección WGS84", 121, 270);
        
                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Sistema nacional de referencia MAGNA - SIRGAS", 111, 274);

                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Escala 1:"+escala+"", 130, 280);                  
                }

                else if(formato == 'A4' && orientacion == 'landscape'){
                    //mapa
                    doc.addImage(dataURL, 'PNG', 7, 10, 283, 195);
                    //rectangulo exterior
                    doc.rect(5,8,287,199);
                    doc.setDrawColor(178, 178, 178);
                    //rectangulo interior    
                    doc.setFillColor(255, 255, 255);
                    doc.rect(265,10,25,195, 'FD');
                    //titulo
                    doc.setFontSize(16);
                    doc.setFont('calibri', 'bold'); 
                    doc.setTextColor(102, 102, 102);
                    doc.text(titulomapa, 5, 6);

                    escudo = new Image();
                    escudo.setAttribute('crossOrigin', 'anonymous');
                    escudo.crossOrigin = "anonymous";
                    escudo.src = 'image/logo_buenaventura.png';
        
                    norte = new Image();
                    norte.setAttribute('crossOrigin', 'anonymous');
                    norte.crossOrigin = "anonymous";
                    norte.src = 'image/norte.png';

                    doc.addImage(escudo, 'PNG', 265, 175, 26, 26);
                    doc.addImage(norte, 'PNG', 265, 10, 26, 26);

                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); 
                    doc.setTextColor(102, 102, 102);
                    doc.text("REPÚBLICA", 269, 46);

                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); 
                    doc.setTextColor(102, 102, 102);
                    doc.text("DE COLOMBIA", 267, 49);
        
                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); 
                    doc.setTextColor(51, 51, 51);
                    doc.text("Departamento", 269, 55);

                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); 
                    doc.setTextColor(51, 51, 51);
                    doc.text("de Valle del Cauca", 266, 58);
        
                    var hoy = new Date();
                    var dia = hoy.getDate(); // Devuelve el día del mes (de 1 a 31)
                    var mes = hoy.getMonth() + 1; // Devuelve el mes (de 1 a 12)
                    var año = hoy.getFullYear(); // Devuelve el año (formato de cuatro dígitos)
                    //console.log(dia + '/' + mes + '/' + año);
        
                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Distrito de", 271, 64);

                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Buenaventura", 269, 67);
        
                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Fuente: SIG", 270, 72);

                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Fecha: "+dia + "/" + mes + "/" + año+"", 268, 77);
        
                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(102, 102, 102);
                    doc.text("INFORMACIÓN", 267, 90);

                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(102, 102, 102);
                    doc.text("DE REFERENCIA", 266, 93);
        
                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Sistema de", 271, 98);

                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("proyección WGS84", 266, 101);
        
                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("Sistema nacional", 268, 106);

                    doc.setFontSize(8);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(51, 51, 51);
                    doc.text("MAGNA - SIRGAS", 266, 109);

                    doc.setFontSize(9);
                    //doc.setFont('calibri', ''); // El segundo parámetro puede ser 'normal', 'bold', 'italic', etc.
                    doc.setTextColor(102, 102, 102);
                    doc.text("Escala 1:"+escala+"", 266, 146);    
                }

                else{   
                  doc.addImage(dataURL, 'PNG', 10, 10, 280, 210); 
                  doc.rect(8,8,265,200);
                  doc.setDrawColor(178, 178, 178);       
                  doc.rect(10,176,261,30);
                }
     
                doc.save('mapa.pdf'); // Guarda el mapa como PDF.

            // Opcional: remover la imagen del DOM si ya no la necesitas visible
            document.body.removeChild(img);
        };
    });
    // Trigger the map render cycle
    map.renderSync();
}
