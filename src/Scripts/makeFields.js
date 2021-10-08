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

module.exports = makeFields;