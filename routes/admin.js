const contest = require("../contest");

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // look for a passed in action item
  const action = req.query.action ? req.query.action : "";

  // Move the current question if requested
  if (action === "pre") {
    contest.movePre();
  } else if (action === "next") {
    contest.moveNext();
  }

  // get the current question
  const question = contest.getCurrentQuestion();

  // count up how many answers we have so far for this question
  const count = contest.getAnswers(question.questionID).length;

  // Display as normal, or remove the parameters from the url so we can safely refresh
  if (action === ""){
    res.render("admin", {question, count});
  } else {
    res.redirect(`${req.path}\admin`);
  }
});

module.exports = router;
