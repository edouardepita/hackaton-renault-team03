
function getRequest(url)
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//    xhr.onload = function () {
//        // do something to response
//        console.log(xhr.responseText)
//    };
 
    xhr.send();
    return xhr.responseText;
}


getRequest("http://team03.xp65.renault-digital.com/api/agent/api/user/situation/last");