var urlsqlphp = 'sql/connect.php';
var db_name = 'buenaventura';

function select_query(query) {
    var c = "selectQuery";
    var xmlresp = doRequest(c, query);
    return responseContent(xmlresp);
}
function update_query(query) {
    var c = "updateQuery";
    var xmlresp = doRequest(c, query);
    return responseContent(xmlresp);
}
function upload_query(query) {
    var c = "uploadQuery";
    var xmlresp = doRequest(c, query);
    return responseContent(xmlresp);
}
function delfile(file) {
    var c = "delfile";
    var xmlresp = doRequest(c, file);
    return responseContent(xmlresp);
}
function doRequest(comm, pars) {
    var req = new ajaxRequest();
    if (pars === "") {
        pars = "1";
    }
    var url = urlsqlphp + "?db=" + db_name + "&c=" + comm + "&p=" + pars;
    //console.log(url);
    req.open("GET", url, false);
    req.send();
    //console.log(req.response);
    return req.responseXML;
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
function responseContent(xmlresp) {
    // Devuelve un array con el contenido.
    // El array puede ser multidimensional
    if (xmlresp === null) {
        return null;
    }
    var arResp = new Array();
    var lstCtnt = xmlresp.getElementsByTagName("content");
    var childs = lstCtnt[0].childNodes[0];
    if ((childs !== undefined) && (childs.nodeType === 1)) {
        // Contenido elementos <item>
        var lstItem = lstCtnt[0].getElementsByTagName("item");
        var numItem = lstItem.length;
        for (i = 0; i < numItem; i++) {
            var ar = lstItem[i].childNodes[0].nodeValue.split(",");
            arResp.push(ar);
        }
    } else if ((childs !== undefined) && (childs.nodeType === 3)) {
        // Contenido una cadena separada por comas
        var ctnt = lstCtnt[0].childNodes[0].nodeValue;
        arResp = ctnt.split(",");
    } else {
        arResp = null;
    }
    return arResp;
}