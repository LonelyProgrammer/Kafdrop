function showHideDIV(divID) {
    disableDIVandElement('divStatic', true)
    disableDIVandElement('divDerivation', true)
    disableDIVandElement(divID, false)
}

function disableDIVandElement(divID, mode) {
    var nodes = document.getElementById(divID).getElementsByTagName('*');
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].disabled = mode;
    }
    document.getElementById(divID).disabled = mode;
    document.getElementById(divID).hidden = mode;
    document.getElementById(divID).style.display = (mode) ? 'none' : '';
}

function addRuleDiv(divID) {
    var mainDiv = document.getElementById(divID)
    var count = mainDiv.childNodes.length + 1
    var htmlStr = '<li id="foli4" style="width: 96%" data-wufoo-field data-field-type="text" class="notranslate      ">\
                                <label class="desc" id="title' + count + '" for="txtTarget"' + count + '>\
                                    Rule ' + count + '\
                                </label>\
                                <div style="margin-left: 550px"><a id=\'btnRemoveRule\' href="#" onclick="document.getElementById(\'' + divID + '\').removeChild(this.parentNode.parentNode.parentNode)" class="close" ></a></div>\
                                <div>\
                                    <input id="txtTarget' + count + '" name="txtTarget' + count + '" type="text" class="field text large" value="" placeholder="Target" maxlength="200" tabindex="3" required placeholder="" />\
                                    <textarea style="margin-top: 5px" id="txtFormula' + count + '" name="txtFormula' + count + '" class="field textarea small" spellcheck="true" rows="5" cols="5" tabindex="6" onkeyup="" required placeholder="Formula"></textarea>\
                                </div>\
                            </li>'

    var newDiv = document.createElement("div")
    newDiv.id = count
    newDiv.innerHTML = htmlStr
    document.getElementById(divID).appendChild(newDiv);
}

function clearFilesAjaxCall(callback, value) {
    var params = "clientID=" + value;
    url = "/clearFiles" + "?" + params;
    var req = new XMLHttpRequest();
    req.open("GET", url);

    req.onload = function(e) {
        if (this.status == 200) { // if the HTTP response code is 200 (OK)
            callback(req.responseText); // passing the result of the request to the callback function 
        } else
            alert("error")
    };
    req.send(null);
}
var processKilled = false;

function clearFiles(value) {
    if (confirm('Are you sure you want to clear Files?')) {
        // Save it!
        clearFilesAjaxCall(function uselessName(result) {

        }, value);
    } else {
        //Do nothing
    }
}

function submitAjaxCall(callback) {
    url = "/";
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.onload = function(e) {
        if (this.status == 200) { // if the HTTP response code is 200 (OK)
            callback(req.responseText); // passing the result of the request to the callback function 
        } else
            alert("error")
    };
    req.send(null);
}

function submit(value) {
    document.forms[0].action = '/';
    submitAjaxCall(function uselessName(result) {
        var res = JSON.parse(result);
        document.getElementById('errorDesc').value = res.P;
    });
}

function submitLoginAjaxCall(callback) {
    url = "/login";
    var req = new XMLHttpRequest();
    req.open("POST", url);

    req.onload = function(e) {
        if (this.status == 200) { // if the HTTP response code is 200 (OK)
            callback(req.responseText); // passing the result of the request to the callback function 
        } else
            alert("error")
    };
    req.send(null);
}

function submitLogin() {
    submitLoginAjaxCall(function uselessName(result) {
        // var res = JSON.parse(result);
        // document.getElementById('errorDesc').value = res.P;
    });
}


window.onload = function(e) {
    var req = new XMLHttpRequest();
    req.open("GET", "/get-role", true);
    req.onload = function(e) {
        // alert(JSON.parse(req.responseText).role);
        if (this.status == 200) { // if the HTTP response code is 200 (OK)
            var roleJson = JSON.parse(req.responseText)
            if (!roleJson) {
                document.getElementById('txtTicket').required = false;
                document.getElementById('txtClientID').required = false;
                document.getElementById('txtClientSecret').required = false;
                document.getElementById('txtNumberOfThreads').required = false;
                document.getElementById('txtSleepDuration').required = false;
                document.getElementById('frmLogin').style.display = 'block';
            } else {
                if (roleJson.role != true) {
                    document.getElementById('txtTicket').required = false;
                    document.getElementById('txtClientID').required = false;
                    document.getElementById('txtClientSecret').required = false;
                    document.getElementById('txtNumberOfThreads').required = false;
                    document.getElementById('txtSleepDuration').required = false;
                    document.getElementById('frmLogin').style.display = 'block';
                } else {
                    document.getElementById('txtTicket').required = true;
                    document.getElementById('txtClientID').required = true;
                    document.getElementById('txtClientSecret').required = true;
                    document.getElementById('txtNumberOfThreads').required = true;
                    document.getElementById('txtSleepDuration').required = true;
                    document.getElementById('frmLogin').style.display = 'none';
                }
            }
        } else {
            document.getElementById('frmLogin').style.display = 'block';
        }
    };
    req.send(null);
}

function home_click() {
    let message = 'Are you sure you want to go back to home?';
    if (confirm(message)) {
        window.location = '/';
    }
}