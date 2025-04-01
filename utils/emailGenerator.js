// utils/randomEmail.js
function getRandomEmail() {
    return `test_${Math.random().toString(36).substring(2, 10)}@powr.com`;
  }
  
  module.exports = getRandomEmail;