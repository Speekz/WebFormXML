function downloadData(contentType, data, filename) {

    var link = document.createElement("A");
    link.setAttribute("href", encodeURI("data:" + contentType + "," + data));
    link.setAttribute("style", "display:none");
    link.setAttribute("download", filename);
    document.body.appendChild(link); //needed for firefox
    console.log(link.outerHTML);
    link.click();
    setTimeout(function () {
        document.body.removeChild(link);
    }, 1000);
}

function fromToXml(form) {
    var xmldata = ['<?xml version="1.0" encoding="UTF-8"?>'];
    xmldata.push("<Configuration xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">");
    var inputs = form.elements;
    xmldata.push("<Filters>");
    xmldata.push("<FilterCountry>");
    for (var i = 0; i < inputs.length; i++) {
        var add = document.createElement("Add");
        if (inputs[i].name) {
            add.setAttribute("ID", "*");
            for (var j = 0; j < inputs[i].length; j++) {
                if (inputs[i][j].selected === true) {
                    add.setAttribute("ID", inputs[i][j].value);
                    xmldata.push(add.outerHTML);
                }
            }
        }
    }
    xmldata.push("</FilterCountry>");
    xmldata.push("</Filters>");
    xmldata.push("</Configuration>");
    return xmldata.join("\n");
}


function download(frm) {

    var data = fromToXml(frm);
    console.log(data);

    downloadData("text/xml", data, "export.xml");
}

function submit(frm) {
    var data = fromToXml(frm);

    document.getElementById('xml').innerHTML = data;

}