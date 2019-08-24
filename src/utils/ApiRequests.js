const https = require("https");

export function SAPISRequest(data, callback, stillettOptions) {
  var sendData = { options: stillettOptions, // stillettOptions = "Feedback(-svo -pass2act -prox -quoteInv -split)" + "\tLexicalMetrics()\tSurfaceMetrics()\tStructuralMetrics()";
    document: data };
  sendData = JSON.stringify(sendData);
  var options = {
    path: "https://www.ida.liu.se/projects/scream/services/sapis/service/",
    method: "POST",
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "Content-Length": Buffer.byteLength(sendData)
    }
  };
  console.log("Sending SAPIS request");
  var req = https.request(options, (res) => {
    res.setEncoding("utf8");
    console.log("SAPIS REQUEST:\nStatusCode:", res.statusCode, "\nHeaders:", res.headers);
    var data = [];
    let body = "";
    res.on("data", function(chunk) {
      data.push(chunk);
    }).on("end", function() {
      body = JSON.parse(data.join(""));
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log("REQUEST SUCCESS:\n", body);
        callback(body);
      } else {
        let errObj = {};
        errObj.res = res;
        errObj.body = body;
        callback(errObj);
        console.error("SAPIS REQUEST ERROR:\n", body);
      }
    });
  });

  req.on("error", (e) => {
    console.error("SAPIS REQUEST ERROR:\n", e);
  });

  req.write(sendData);
  req.end();
}

// OLD CODE
// import { post } from "request";

/* export function SAPISRequest(data, callback, stillettOptions) {
  var sendData = { options: stillettOptions + "\tLexicalMetrics()\tSurfaceMetrics()\tStructuralMetrics()",
    document: data };
  post({
    headers: { "content-type": "application/json; charset=UTF-8" },
    url: "https://www.ida.liu.se/projects/scream/services/sapis/service/",
    body: JSON.stringify(sendData)
  }, function(error, response, body) {
    if (error) {
      console.error(error);
    }
    body = JSON.parse(body);

    console.log(body);
    callback(body);
  });
} */
