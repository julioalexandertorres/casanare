
function onload() {
    var cookies = document.cookie.split(";");
    //console.log(cookies);
    for (var i = 0; i < cookies.length; i++)
    {
       // console.log(cookies[i].split("=")[0]);
        deleteCookie(cookies[i].split("=")[0]);
    }
    var val = document.location.href;
    var validar = val.split("?");
    if (validar[1] === "ig=error")
    {
        document.getElementById('er').style.display = 'block';
    } else
    {
        document.getElementById('er').style.display = 'none';
    }
    if (validar[1] === "ig=navegador")
    {
        document.getElementById('er1').style.display = 'block';
    } else
    {
        document.getElementById('er1').style.display = 'none';
    }
}
function setC(name, value, expirydays) {
    var d = new Date();
    d.setTime(d.getTime() + (expirydays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    //console.log(name + "=" + value + "; " + expires+";path=/");
    //console.log(name+ "=" + value + "; " + expires + "; domain=.gesstorbarranquilla.com" + "; path=/");
    //document.cookie = name + "=" + value + "; " + expires + ";path=/";
    //var domain = location.hostname
    document.cookie = name+ "=" + value+ "; " + expires + "; domain=.gesstorbarranquilla.com" + "; path=/";
    document.cookie = name + "=" + value + "; " + expires + ";path=/";
}
function deleteCookie(name) {
    //console.log(name);
    setC(name, "", -1);
}
function setCookie(cname, cvalue, exdays) {
    //console.log(document.getElementById("u").value);
    if (document.getElementById("u").value !== "" && document.getElementById("p").value !== "")
    {
        //console.log(1111);
        var pw = hex_md5(document.getElementById("p").value);
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + 1000 * 36000;
        now.setTime(expireTime);
        //console.log(document.getElementById("u").value + "=" + pw + ";expires="+now.toGMTString()+";path=/");
        document.cookie = document.getElementById("u").value + "=" + pw + ";expires=" + now.toGMTString() + ";path=/";
    }
}

function ajaxRequest() {
    try {
        var request = new XMLHttpRequest();
    } catch (e1) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e2) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e3) {
                request = false;
            }
        }
    }
    return request;
}

function login() {
    const username = document.getElementById('u').value;
    const password = document.getElementById('p').value;
    //console.log(username, password);
    event.preventDefault();
    fetch('./validateUser.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciales no válidas.');
        }
        return response.json();
    })
    .then(data => {
        if (data.token) {
            localStorage.setItem('jwt', data.token);
            const decoded = parseJwt(data.token);
            if (decoded.rol === "Administrador") {
                window.location.href = 'admin.html';
            } else {
                window.location.href = './visor/visor.html';
            }
            saveIncome(decoded);
        } else {
            throw new Error('No se recibió el token esperado.');
        }
    })
    .catch(error => {
        /*console.error('Error en la solicitud:', error);*/
        //alert("Error de autenticación: " + error.message);
        /*Swal.fire({
            title: 'Credenciales no válidas',
            text: 'Inténtelo de nuevo por favor',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });*/
        document.getElementById("er").style.display = 'block';
    });
}

function fetchData() {
    const token = localStorage.getItem('jwt');
    fetch('secure_data.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        if (data.message) {
            alert(data.message);  // Muestra el mensaje del servidor
        }
    })
    .catch(error => console.error('Error:', error));
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function saveIncome(dataV){
    //console.log(dataV);
    var activity = "ingreso";
    update_query("insert into reguser(usuario, fecha, actividad) values ('"+dataV.sub+"', '"+dataV.fecha+"', '"+activity+"')");
}