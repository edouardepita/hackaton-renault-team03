
function Request(url, method, body = null)
{
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, false);
    xhr.setRequestHeader('Content-type', 'application/json'); 
    
    if (body != null)
    {
        xhr.send(body);
    }
    else
    {
        xhr.send();
    }
    
    return xhr.responseText;
}

getRequest("http://team03.xp65.renault-digital.com/api/agent/api/user/situation/last");