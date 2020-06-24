function validateXML(txt) {
    if (window.ActiveXObject) {
        var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(document.all(txt).value);
        if (xmlDoc.parseError.errorCode !== 0) {
            txt = "Error Code: " + xmlDoc.parseError.errorCode + "\n";
            txt = txt + "Error Reason: " + xmlDoc.parseError.reason;
            txt = txt + "Error Line: " + xmlDoc.parseError.line;
            alert(txt);
        } else {
            alert("No errors found");
        }
    } else if (document.implementation.createDocument) {
        try {
            var text = document.getElementById(txt).value;
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(text, "application/xml");
        } catch (err) {
            alert(err.message)
        }

        if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
            alert("Errors found, check XML");
        } else {
            alert("No errors found");
        }
    } else {
        alert('Your browser cannot handle XML validation');
    }
}