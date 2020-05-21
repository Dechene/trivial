const _ = require("underscore");

const users = [];
const teams = [];

function newGame() {
  this.users = [];
  this.teams = [];
}

//add a user into the team array
function getTeamsv2(admin) {
  return teams;
}

function clearScores() {
  for (var i = 0; i < teams.length; i++) {
    teams[i].teamscore = 0;
    for (var x = 0; x < teams[i].scores.length; x++) {
      teams[i].scores[x] = 0;
    }
  }
}

function setUserScore(points, username, teamname) {
  console.log(`POINTS ${points} USERNAME ${username} TEAMNAME ${teamname}`);
  const teamIndex = teams.findIndex(el => el.teamname === teamname);
  const scoreIndex = teams[teamIndex].players.findIndex(el => el === username);

  teams[teamIndex].scores[scoreIndex] += parseInt(points);
  teams[teamIndex].teamscore += parseInt(points);
}

function getTeam(username) {
  for (var i = 0; i < teams.length; i++) {
    const userIndex = teams[i].players.find(el => el === username);
    if (userIndex) return teams[i].teamname;
  }
}

function checkUserTeam(newuser) {
  //test if the player & team exist already
  const playerexists = teams.some(el => el.players.includes(newuser.username));
  //const teamexists = teams.some(el => el.teamname.includes(newuser.teamname));
  const teamexists = teams.findIndex(el => el.teamname === newuser.teamname);

  // the client has a cookie, but no entry in the system, so lets add them
  console.log(`Cookie and player/team!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!w ${playerexists} ${teamexists}`);
  if (playerexists === false) {
    console.log(`Cookie but no player/team, adding them in now`);
    addUserV2(newuser);
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
  if (teamexists === -1 && !playerexists && newuser.username !== 'admin') {
    teams.push({
      teamname: newuser.teamname,
      players: [newuser.username],
      scores: [0],
    });
    return true;
  }

  //insert the player to an existing team
  if (teamexists > -1 && !playerexists && newuser.teamname !== 'admin') {
    const index = teams.findIndex(el => el.teamname === newuser.teamname);

    teams[index].players.push(newuser.username);
    teams[index].scores.push(0);
  }

  return true;
}

/* const teams = [
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
]; */

module.exports = {
  setUserScore: setUserScore,
  getTeamsv2: getTeamsv2,
  addUserV2: addUserV2,
  getTeam: getTeam,
  clearScores: clearScores,
  checkUserTeam: checkUserTeam,
  newGame:newGame
};
