document.getElementById('upload-form').addEventListener('submit', function(event) {
  event.preventDefault();
  document.getElementById("botonLoadshp").style.display = "none";
  document.getElementById("botonCargandoshp").style.display = "flex";
  const formData = new FormData(this);
  fetch('https://us-central1-risaralda-324519.cloudfunctions.net/upload_shapefile_function', {
    method: 'POST',
    body: formData
  }).then(response => response.text()).then(data => {
    let alertType = data.error ? 'alert-danger' : 'alert-primary';
    let alertMessage = data.error ? data.error : data;
    showAlert(alertType, alertMessage);
    document.getElementById("botonLoadshp").style.display = "flex";
    document.getElementById("botonCargandoshp").style.display = "none";
  }).catch(error => {
    showAlert('alert-danger', 'An error occurred: ' + error.message);
    document.getElementById("botonLoadshp").style.display = "flex";
    document.getElementById("botonCargandoshp").style.display = "none";
  });
});

//mostrar que se cargo un archivo
document.getElementById('file').addEventListener('change', function(event) {
  const fileInput = event.target;
  const fileNameSpan = fileInput.closest('.file-upload-label').querySelector('.file-name');
  const browseButton = fileInput.closest('.file-upload-label').querySelector('.browse-button');

  if (fileInput.files.length > 0) {
      // Mostrar el nombre del archivo seleccionado
      const fileName = fileInput.files[0].name;
      fileNameSpan.textContent = fileName;

      // Cambiar el texto del botón o el diseño
      browseButton.textContent = 'Archivo seleccionado:';
      //fileInput.closest('.file-upload-label').style.backgroundColor = '#d3ffd3'; // Cambiar el color de fondo
  } else {
      // Si no hay archivo seleccionado, revertir cambios
      fileNameSpan.textContent = '';
      browseButton.textContent = 'Buscar archivo';
      //fileInput.closest('.file-upload-label').style.backgroundColor = '#ddd'; // Revertir el color de fondo
  }
});

document.getElementById('deletetable').addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById("deletetable").style.display = "none";
  document.getElementById("botonCargandoeliminarshp").style.display = "flex";
  var esquema = document.getElementById('esquema').value;
  var tabla = document.getElementById('tablasbase').value;
  fetch('https://us-central1-risaralda-324519.cloudfunctions.net/delete_table_function', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ esquema: esquema, tabla: tabla })
  })
    .then(response => response.text()).then(data => {
      let alertType = data.error ? 'alert-danger' : 'alert-primary';
      let alertMessage = data.error ? data.error : data;
      showAlert(alertType, alertMessage);
      document.getElementById("deletetable").style.display = "flex";
      document.getElementById("botonCargandoeliminarshp").style.display = "none";
    }).catch(error => {
      document.getElementById("deletetable").style.display = "flex";
      document.getElementById("botonCargandoeliminarshp").style.display = "none";
      showAlert('alert-danger', 'An error occurred: ' + error.message);
    });
});

document.getElementById('uploadVisor').addEventListener('submit', function (event) {
  var nombrec = document.getElementById("namecapa").value;
  var layer = document.getElementById("tipocapa").value;
  var vurl = "https://www.geomonsas.xyz:8443/geoserver/buenaventura/" + nombrec + "/wms";
  var vpermisos = "general";
  var num1 = Math.random() * (1000000 - 1) + 512;
  var num2 = Math.random() * (7000 + 1) + 412;
  var num = parseInt(num1 + num2);
  update_query("insert into capas (url, layer, nombre, permisos, id) values ('" + vurl + "', '" + layer + "', '" + nombrec + "', '" + vpermisos + "', '" + num + "')");
});

document.getElementById('deleteVisor').addEventListener('submit', function (event) {
  var capab = document.getElementById("tablasbaseVisor").value;
  var layerb = document.getElementById("esquemaVisor").value;
  update_query("delete from capas where nombre ='"+capab+"' and layer ='"+layerb+"'");
});

