const dateFunc = require("date-fns")

const makeFields = (lobbyData) => {
  let tempObj = {};
  let output = [];

  for (let i = 0; i < lobbyData.length; i++) {
    let unixTime = lobbyData[i].timestamp + 28800000;
    let dateOfMessage = dateFunc.format(new Date(unixTime), 'p do MMMM')

    tempObj.name = `${i+1}: ${lobbyData[i].creator}'s ${lobbyData[i].category} lobby on ${dateOfMessage}`
    tempObj.value = lobbyData[i].link;
    tempObj.inline = false;
    output.push(tempObj);
    tempObj = {};

  } 

  // Output a list of objects.
  return output;
}

function getTimeFromStart(millisec) {
  var seconds = (millisec / 1000).toFixed(0);
  var minutes = Math.floor(seconds / 60);
  var hours = "";
  if (minutes > 59) {
      hours = Math.floor(minutes / 60);
      hours = (hours >= 10) ? hours : "0" + hours;
      minutes = minutes - (hours * 60);
      minutes = (minutes >= 10) ? minutes : "0" + minutes;
  }

  seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : "0" + seconds;
  if (hours != "") {
      return hours + "h " + minutes + "m " + seconds + "s";
  }
  return minutes + "m " + seconds + "s";
}

const makeRefresherFields = (lobbyData) => {
  let tempObj = {};
  let output = [];
  let currentTimestamp = Date.now();

  for (let i = 0; i < lobbyData.length; i++) {
    let unixTime = lobbyData[i].timestamp + 28800000;
    let dateOfMessage = dateFunc.format(new Date(unixTime), 'p do MMMM')

    let timeInMiliseconds = currentTimestamp - lobbyData[i].timestamp;
    let time = getTimeFromStart(timeInMiliseconds);
  
    tempObj.name = `${i+1}: ${lobbyData[i].creator}'s ${lobbyData[i].category} lobby on ${dateOfMessage} - ${time} ago`
    tempObj.value = lobbyData[i].link;
    tempObj.inline = false;
    output.push(tempObj);
    tempObj = {};

  } 

  // Output a list of objects.
  return output;
}

module.exports = {makeFields, makeRefresherFields}