const _ = require("underscore");

const users = [];

function fakeAccounts() {
  const fakes = [
    {
      username: "Bobby Boo",
      teamname: "Blues",
      score: 0,
    },
    {
      username: "Jimmy Jam",
      teamname: "team1",
      score: 0,
    },
    {
      username: "Bobby Boo",
      teamname: "teamThree",
      score: 0,
    },
    {
      username: "Marky Mark",
      teamname: "Bed",
      score: 0,
    },
    {
      username: "Bobby Boo",
      teamname: "Blues",
      score: 0,
    },
    {
      username: "Jimmy Jam",
      teamname: "team1",
      score: 0,
    },
    {
      username: "Bobby Boo",
      teamname: "teamThree",
      score: 0,
    },
    {
      username: "Marky Mark",
      teamname: "Bed",
      score: 0,
    },
    {
      username: "Jimmy Jam",
      teamname: "Doghouse",
      score: 0,
    },
    {
      username: "Bobby Boo",
      teamname: "Blues",
      score: 0,
    },
  ];

  users.push(...fakes);
  console.log(`number of users in game: ${users.length}`);
  console.log(JSON.stringify(users));
}

function getUserScore(unique) {
  const arr = users.find(el => el.uniqueID === unique);
  if (arr !== undefined) return 0;
  return arr.score;
}

function getUsers() {
  return users;
}

// Group the user array to populate teams
function getTeams() {
  let grouped = [];
  grouped = _.mapObject(_.groupBy(users, "teamname"), clist =>
    clist.map(team => _.omit(team, "teamname"))
  );

  // console.log(`grouped teams: ${JSON.stringify(grouped)}`);
  return grouped;
}

function addUser(newuser) {
  const exists = users.some(el => el.username === newuser.username);

  if (!exists) {
    users.push({ username: newuser.username, teamname: newuser.teamname });
    console.log(`added ${newuser.name} from team ${newuser.team}. Num users: ${users.length}`);
    return true;
  } else {
    console.log(`We tried to add a duplicate user but failed!`);
    return false;
  }
}

// manually called by the admin
function checkAnswers() {
  users.forEach(el => {});
}

module.exports = {
  checkAnswers: checkAnswers,
  addUser: addUser,
  fakeAccounts: fakeAccounts,
  getUsers: getUsers,
  getTeams: getTeams,
  getUserScore: getUserScore,
};
