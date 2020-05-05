const _ = require("underscore");

const users = [];

//add a user into the team array
function getTeamsv2() {
  return teams;
}

function addUserV2(newuser) {
  //test if the player exists
  const playerexists = teams.some(el => el.players.includes(newuser.username));

  //test if the team exists
  const teamexists = teams.some(el => el.teamname.includes(newuser.teamname));

  //insert the player to a non existent team
  if (!teamexists && !playerexists) {
    teams.push({
      teamname: newuser.teamname,
      players: [newuser.username],
      scores: [0],
    });
  }

// todo FIND THE INDEX OF THE TEAM TO BE INSERTED
  console.log(`teamid is ||||| : ${teamindex} `);

  //insert the player to an existing team
  if (teamexists && !playerexists) {
    /*     teams.push({
      teamname: newuser.teamname,
      players: [newuser.username],
      scores: [0],
    }); */
  }

  console.log(`playerexists: ${playerexists} `);
  console.log(`teamsexists: ${teamexists} `);
  console.log(JSON.stringify(teams));

  /*
  if (!exists) {
    teams.push({ username: newuser.username, teamname: newuser.teamname, score: 0 });
    console.log(`added ${newuser.name} from team ${newuser.team}. Num users: ${users.length}`);
    return true;
  } else {
    console.log(`We tried to add a duplicate user but failed!`);
    return false;
  } */
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

function fakeAccounts() {
  const fakes = [
    {
      username: "Bobby",
      teamname: "Blues",
      score: 0,
    },
    {
      username: "Jimmy Jam",
      teamname: "team1",
      score: 0,
    },
    {
      username: "Boo",
      teamname: "teamThree",
      score: 0,
    },
    {
      username: "Marky Mark",
      teamname: "Bed",
      score: 0,
    },
  ];

  users.push(...fakes);
  console.log(`number of users in game: ${users.length}`);
}

function getUserScore(unique) {
  const arr = users.find(el => el.uniqueID === unique);
  if (arr !== undefined) return 0;
  return arr.score;
}

function getUsers() {
  return users;
}

function setUserScore(points, username) {
  const index = users.findIndex(el => el.username === username);
  users[index].score = users[index].score + parseInt(points);
}

function getTeamScore() {
  const teams = [...new Set(users.map(user => user.teamname))];
  return teams;
}

// Group the user array to populate teams
function getTeams() {
  let grouped = [];
  grouped = _.mapObject(_.groupBy(users, "teamname"), clist =>
    clist.map(team => _.omit(team, "teamname"))
  );

  console.log(`grouped teams: ${JSON.stringify(grouped)}`);
  return grouped;
}

function addUser(newuser) {
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
  addUser: addUser,
  fakeAccounts: fakeAccounts,
  getUsers: getUsers,
  getTeams: getTeams,
  getUserScore: getUserScore,
  setUserScore: setUserScore,
  getTeamScore: getTeamScore,
  getTeamsv2: getTeamsv2,
  addUserV2: addUserV2,
};
