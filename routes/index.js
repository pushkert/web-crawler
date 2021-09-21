var express = require("express");
var router = express.Router();
const crawlerMethod = require("../util");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Web Crawler" });
});

router.post("/crawling", async (req, res) => {
  const { link } = req.body;
  try {
    let data = await crawlerMethod(link);
    data = data && data.length > 0 ? data : {};
    res.json({
      data: data,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      data: null,
    });
  }
});

module.exports = router;
