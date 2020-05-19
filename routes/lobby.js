const users = require("../users");
const contest = require("../contest");
const util = require("../util");

var express = require("express");
var router = express.Router();

// Lobby page, showing who is in the comp and which autorefreshes when the game starts
//
// cookie full and no params -------------- LOAD FROM COOKIE    DONE
// cookie full and params ----------------- LOAD FROM COOKIE    DONE
// cookie empty and no params ------------- PUSH TO SIGNIN PAGE DONE
// cookie empty and params ---------------- ADD NEW USER        DONE
// cookie empty and params & fails to add - PUSH TO SIGNIN PAGE DONE
//

router.get("/", function (req, res, next) {
  // Test the attributes which have been passed in to us
  const isEmptyCookie = util.isEmpty(req.cookies);
  const isEmptyParams = JSON.stringify(req.query) === "{}" ? true : false;

  let add = false,
    readyToPlay = false;

  let user = {
    username: `Unknown`,
    teamname: `Unknown`,
  };

  if (isEmptyCookie && !isEmptyParams) {
    console.log(`USER SIGNIN - We have no cookie, but we have params`);

    user = {
      username: req.query.username ? req.query.username : "",
      teamname: req.query.teamname ? req.query.teamname : "",
    };

    // We have to test the length for some unknown chrome bug reason
    if (user.username !== "") add = users.addUserV2(user);
   
    if (add) {
      console.log(`USER SIGNIN - About to insert COOKIE for ${user.username}`);
      readyToPlay = true;
      res.cookie("trivial", user);
    } else {
      console.log(`USER SIGNIN - Failed to add ${user.username} due to duplicate account existing`);
      user = {
        username: `The username you tried already exists!`,
        teamname: `Head back to the signin page and change your username!`,
      };
    }

    // Load from the cookie, but make sure the cookie does not have empty value
  } else if (!isEmptyCookie && req.cookies["trivial"].username.length > 0) {
    console.log(`USER SIGNIN - Loading from cookie: ${JSON.stringify(req.cookies)}`);
    user = {
      username: req.cookies["trivial"].username,
      teamname: req.cookies["trivial"].teamname,
    };
    readyToPlay = true;
  } else if (isEmptyCookie && isEmptyParams) {
    console.log(`USER SIGNIN - No cookie, and no params received`);
    user = {
      username: `I don't know who you are!`,
      teamname: `Make sure cookies are enabled and try signing in again!`,
    };
  }

  // Test if the game has begun or not - if yes, start playing, if not, stay in the lobby
  if (contest.hasGameStarted() === true && readyToPlay) {
    console.log(`The game has begun so redirecting the user now`);
    res.redirect(`${req.path}\comp`);
  } else {
    // Render the darn thing if the game has not started
    console.log(
      `The game hasn't started so ${JSON.stringify({
        user,
        teamlist: users.getTeamsv2(),
      })} is just hanging in the lobby`
    );
    res.render("lobby", { user, teamlist: users.getTeamsv2() });
  }
});

module.exports = router;
