const dateFunc = require("date-fns")

const makeFields = (lobbyData) => {
  let tempObj = {};
  let output = [];

  for (let i = 0; i < lobbyData.length; i++) {
    var date = new Date(lobbyData[i].timestamp + 28800000)
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours + ':' + minutes.substr(-2);
    let dateOfMessage = dateFunc.format(new Date(lobbyData[i].timestamp), 'p do MMMM')

    tempObj.name = `${i+1}: ${lobbyData[i].creator}'s ${lobbyData[i].category} lobby on ${dateOfMessage}`
    tempObj.value = lobbyData[i].link;
    tempObj.inline = false;
    output.push(tempObj);
    tempObj = {};

  } 

  // Output a list of objects.
  return output;
}

module.exports = makeFields;