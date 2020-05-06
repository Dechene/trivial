const _ = require("underscore");

const users = [];

//add a user into the team array
function getTeamsv2() {
  return teams;
}

function clearScores() {
  for (var i = 0; i < teams.length; i++) {
    for (var x = 0; x < teams[i].scores.length; x++) {
      teams[i].scores[x] = 0;
    }
  }
}

function setUserScore(points, username, teamname) {
  const teamIndex = teams.findIndex(el => el.teamname === teamname);
  const scoreIndex = teams[teamIndex].players.findIndex(el => el === username);

  teams[teamIndex].scores[scoreIndex] += parseInt(points);
}

function getTeam(username) {
  for (var i = 0; i < teams.length; i++) {
    const userIndex = teams[i].players.find(el => el === username);
    if (userIndex) return teams[i].teamname;
  }
}

function addUserV2(newuser) {
  //test if the player & team exist already
  const playerexists = teams.some(el => el.players.includes(newuser.username));
  //const teamexists = teams.some(el => el.teamname.includes(newuser.teamname));
  const teamexists = teams.findIndex(el => el.teamname === newuser.teamname);

  console.log(`TEAMEXISTS = ${teamexists}`);
  console.log(`PLAYEREXISTS = ${playerexists}`);

  if (playerexists) {
    console.log(`We tried to add a duplicate user but failed!`);
    return false;
  }

  //insert the player as first member of a new team
  if (teamexists === -1 && !playerexists) {
    teams.push({
      teamname: newuser.teamname,
      players: [newuser.username],
      scores: [0],
    });
    return true;
  }

  //insert the player to an existing team
  if (teamexists && !playerexists) {
    const index = teams.findIndex(el => el.teamname === newuser.teamname);

    teams[index].players.push(newuser.username);
    teams[index].scores.push(0);
  }

  return true;
}

const teams = [
  {
    teamname: "Blues",
    players: ["Bob", "Jane", "TMart"],
    scores: [0, 0, 0],
  },
  {
    teamname: "Reds",
    players: ["Jim", "Tim", "Ken"],
    scores: [0, 0, 0],
  },
  {
    teamname: "Yellows",
    players: ["Nik", "Jak", "Buck"],
    scores: [0, 0, 0],
  },
  {
    teamname: "Greens",
    players: ["Rio", "Rollo", "Rello"],
    scores: [0, 0, 0],
  },
];

function getUserScoreDEAD(unique) {
  const arr = users.find(el => el.uniqueID === unique);
  if (arr !== undefined) return 0;
  return arr.score;
}

function getUsersDEAD() {
  return users;
}

function setUserScoreDEAD(points, username) {
  const index = users.findIndex(el => el.username === username);
  users[index].score = users[index].score + parseInt(points);
}

function getTeamScoreDEAD() {
  const teams = [...new Set(users.map(user => user.teamname))];
  return teams;
}

// Group the user array to populate teams
function getTeamsDEAD() {
  let grouped = [];
  grouped = _.mapObject(_.groupBy(users, "teamname"), clist =>
    clist.map(team => _.omit(team, "teamname"))
  );

  console.log(`grouped teams: ${JSON.stringify(grouped)}`);
  return grouped;
}

function addUserDEAD(newuser) {
  const exists = users.some(el => el.username === newuser.username);

  if (!exists) {
    users.push({ username: newuser.username, teamname: newuser.teamname, score: 0 });
    console.log(`added ${newuser.name} from team ${newuser.team}. Num users: ${users.length}`);
    return true;
  } else {
    console.log(`We tried to add a duplicate user but failed!`);
    return false;
  }
}

module.exports = {
  // addUser: addUser,
  // getUsers: getUsers,
  //getTeams: getTeams,
  //getUserScore: getUserScore,
  setUserScore: setUserScore,
  // getTeamScore: getTeamScore,
  getTeamsv2: getTeamsv2,
  addUserV2: addUserV2,
  getTeam: getTeam,
  clearScores: clearScores,
};
