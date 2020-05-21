var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let trivial = {
    username: "Nickname",
    teamname: "Team Name",
  };

  try {
    trivial = {
      username: req.cookies["trivial"].username,
      teamname: req.cookies["trivial"].teamname,
    };
  } catch {}

  res.render("signin", trivial);
});

module.exports = router;
