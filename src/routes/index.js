const siteRouter = require("./site");
const accountRouter = require("./account");

function route(app) {
  app.use("/", siteRouter);
  app.use("/myaccount", accountRouter);
}
module.exports = route;
