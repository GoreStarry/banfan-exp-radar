var corsAnywhere = require("cors-anywhere");

let proxy_cors = corsAnywhere.createServer({
  originWhitelist: [], // for test purpose
  requireHeader: [],
  removeHeaders: [],
  httpProxyOptions: {
    secure: false,
  },
});

module.exports = async function corsAnywhere(req, res) {
  req.url = req.url.replace(
    `/api/corsAnywhere/https:/${
      process.env.NODE_ENV === "production" ? "" : "/"
    }`,
    "/"
  );

  await proxy_cors.emit("request", req, res);
};
