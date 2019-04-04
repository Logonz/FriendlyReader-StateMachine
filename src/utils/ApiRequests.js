import req from "request";

export function SAPISRequest(data, callback, stillettOptions) {
  var sendData = { options: stillettOptions + "\tLexicalMetrics()\tSurfaceMetrics()\tStructuralMetrics()",
    document: data };
  req.post({
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
}
