// iss_promised.js
const request = require('request-promise-native');
const { nextISSTimesForMyLocation } = require('./iss');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function(error) {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIp = function(error, body) {
  const ip = JSON.parse(body).ip;
  return request (`https://freegeoip.app/json/${ip}`);
}

const fetchISSFlyOverTimes = function(error, body) {
  const {latitude, longitude} = JSON.parse(body);
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
  return request(url);
}

const nextISSTimesForMyLocation = function(error, body){
  return fetchMyIP()
    .then(fetchCoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
       const { response } = JSON.parse(data);
    });
};

module.exports = { nextISSTimesForMyLocation };