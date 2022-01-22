const ipcRenderer = require("electron").ipcRenderer;
const readText = require("./readText");
const createPresenters = require("./createPresenters");
const fs = require("fs");
let today = document.getElementById("date");
let time = document.getElementById("time");

presenters = [];
results = [];

let name = document.getElementById("name");
// check if presenters are set?
if (!fs.existsSync("./test.json")) {
  window.location = "settings.html";
}
readText.readText("./test.json", function (text) {
  var data = JSON.parse(text);
  console.log(`dane: ${JSON.stringify(data)}`);
  const nbOfItems = data.length;
  console.log(`data0 ${nbOfItems}`);
  presenters = [...data];
  console.log(`nb of presenters ${presenters.length}`);
  createPresenters.createPresenters(presenters);
});
ipcRenderer.on("nameReply", (event, arg) => {
  console.log(` name reply arg ${JSON.stringify(arg)}`); // why/what is not right..
});
let btnSettings = document.getElementById("btnSettings");
btnSettings.addEventListener("click", function () {
  window.location.href = "./settings.html";
});
ipcRenderer.on("forWin1", function (event, arg) {
  console.log(`from win1  ${arg}`);
  var id = arg[2];
  var timeSpent = arg[0];
  var resultProcent = arg[1];
  results[id] = {
    id: `${id}`,
    timeSpent: `${timeSpent}`,
    resultProcent: `${resultProcent}`,
  };

  updateResults();
  var nextStep = id + 1;
  console.log(`nextStep ${nextStep}`);
  nextAction(id);
  // if (id + 1 < results.length) {
  //   console.log(` id1  ${id} len ${results.length}`);
  //   nextAction(id + 1);
  // } else {
  //   console.log(` id2  ${id} len ${results.length}`);
  //   alert("koniec");
  // }
});
var timer = setInterval(currentTime1, 1000);
function currentTime1() {
  var dateTime = new Date();
  today.innerHTML = dateTime.toLocaleDateString();
  var minutes, seconds;
  dateTime.getMinutes() < 10
    ? (minutes = "0" + dateTime.getMinutes())
    : (minutes = dateTime.getMinutes());
  dateTime.getSeconds() < 10
    ? (seconds = "0" + dateTime.getSeconds())
    : (seconds = dateTime.getSeconds());
  time.innerHTML = dateTime.getHours() + ":" + minutes + ":" + seconds;
}
function updateResults() {
  var resultsLen = results.length;
  console.log(`resultLen update  ${resultsLen}`);
  for (i = 0; i < resultsLen; i++) {
    var index = "S" + String(i);
    // console.log(`i  ${i}`);
    console.log(`i ${i}  timespent   ${results[i].timeSpent}`);

    if (i < resultsLen)
      document.getElementById(index).innerHTML = results[i].resultProcent + "%";
    var indexa = "Sa" + String(i);
    console.log(`indexa   ${indexa}`);
    console.log(`results[i]a   ${results[i].timeSpent}`);
    if (i < resultsLen)
      document.getElementById(indexa).innerHTML = results[i].timeSpent;
  }
}
function nextAction(id) {
  console.log(`before fend next id ${id}, result.len ${results.length}`)
  if (!results.length==id+1) {
    ipcRenderer.send("nameMsg", id+1);
    console.log(`sent   action ${id+1}`)
  }

}
