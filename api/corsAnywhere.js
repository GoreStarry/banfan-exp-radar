var corsAnywhere = require("cors-anywhere");

let proxy_cors = corsAnywhere.createServer({
  originWhitelist: [], // for test purpose
  requireHeaders: [], // for test purpose
  removeHeaders: [], // for test purpose
  httpProxyOptions: {
    secure: false,
  },
});

module.exports = async function corsAnywhere(req, res) {
  req.url = req.url.replace("/api/corsAnywhere/", "/");
  console.log(req.url);
  proxy_cors.emit("request", req, res);
};
