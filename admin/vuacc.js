function parseJwt(token) {
    if (!token) {
        window.location.href = 'index.html?ig=error';
        return;
    }
    else{
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }
}

function verificarAcceso() {
    const token = localStorage.getItem('jwt');
    const decoded = parseJwt(token);
    //console.log(decoded);
    /*if (!token) {
        window.location.href = '../index.html?ig=error';
        return;
    }*/
    if(decoded.rol !== 'Administrador'){
      window.location.href = 'index.html?ig=error';
      return;
    }
}


    

