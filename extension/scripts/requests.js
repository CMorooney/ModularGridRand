function requestDocument(url, success, failure){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = "document";

    xhr.onload = function() {
        if (xhr.status != 200) {
            failure(xhr.status, xhr.statusText);
        } else {
            success(xhr.response);
        }
    };

    xhr.onerror = function() {
        failure(null, null)
    };

    xhr.send();
}