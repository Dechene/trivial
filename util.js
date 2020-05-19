const admin = 'admin';

// Insanely overkill method to test that the cookie is empty or not
function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return JSON.stringify(obj) === JSON.stringify({});
}

function isAdmin(user) {
  console.log(`testing ${user.username} against ${admin}`)
  return (user.username === admin);
}

module.exports = {
  isEmpty: isEmpty,
  isAdmin: isAdmin
};
