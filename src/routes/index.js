const siteRouter = require("./site");
const accountRouter = require("./account");

function route(app) {
  app.use("/", accountRouter);
  app.use("/helloworld", siteRouter);
}
module.exports = route;
