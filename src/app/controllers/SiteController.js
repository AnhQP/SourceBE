class SiteController {
  index(req, res, next) {
    res.send("Hello World!");
  }
}

module.exports = new SiteController();
