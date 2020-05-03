const _ = require("underscore");

const users = [];

function fakeAccounts() {
  const fakes = [
    {
      username: "Marky Mark",
      teamname: "team1",
    },
    {
      username: "Jimmy Jam",
      teamname: "Bluesss",
    },
    {
      username: "Bobby Boo",
      teamname: "teadddmwfh",
    },
    {
      username: "Marky Mark",
      teamname: "teavcxcmThree",
    },
    {
      username: "Jimmy Jam",
      teamname: "Blues",
    },
    {
      username: "Bobby Boo",
      teamname: "teamwfh",
    },
    {
      username: "Marky Mark",
      teamname: "teavxcmThree",
    },
    {
      username: "Jimmy Jam",
      teamname: "Bexvcd",
    },
    {
      username: "Bobby Boo",
      teamname: "teamThree",
    },
    {
      username: "Marky Mark",
      teamname: "Doghouse",
    },
    {
      username: "Jimmy Jam",
      teamname: "team1",
    },
    {
      username: "Bobby Boo",
      teamname: "Blues",
    },
    {
      username: "Marky Mark",
      teamname: "teamThree",
    },
    {
      username: "Jimmy Jam",
      teamname: "Red",
    },
    {
      username: "Bobby Boo",
      teamname: "teamRed",
    },
    {
      username: "Marky Mark",
      teamname: "BedRed",
    },
    {
      username: "Jimmy Jam",
      teamname: "DogRedhouse",
    },
    {
      username: "Bobby Boo",
      teamname: "Blues",
    },
    {
      username: "Jimmy Jam",
      teamname: "team1",
    },
    {
      username: "Bobby Boo",
      teamname: "teamThree",
    },
    {
      username: "Marky Mark",
      teamname: "Bed",
    },
    {
      username: "Bobby Boo",
      teamname: "Blues",
    },
    {
      username: "Jimmy Jam",
      teamname: "team1",
    },
    {
      username: "Bobby Boo",
      teamname: "teamThree",
    },
    {
      username: "Marky Mark",
      teamname: "Bed",
    },
    {
      username: "Jimmy Jam",
      teamname: "Doghouse",
    },
    {
      username: "Bobby Boo",
      teamname: "Blues",
    },
  ];

  users.push(...fakes);
  console.log(`number of users in game: ${users.length}`);
  console.log(JSON.stringify(users));
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

module.exports = {
  addUser: addUser,
  fakeAccounts: fakeAccounts,
  getUsers: getUsers,
  getTeams: getTeams,
};
