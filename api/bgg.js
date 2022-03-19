const { bggXmlApiClient } = require("bgg-xml-api-client");

module.exports = async function corsAnywhere(req, res) {
  res.setHeader("Content-Type", "application/json");
  // const { type, parameters } = req.body;
  // const { data } = await bggXmlApiClient.get(type, parameters);
  const { data } = await bggXmlApiClient.get("search", {
    query: "hero realms",
    type: "boardgame",
  });
  res.json(data);
};
