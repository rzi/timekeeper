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
  //createPresenters(parseInt(nbOfItems), data);
  presenters = [...data];
  console.log(`nb of presenters ${presenters.length}`);
  createPresenters.createPresenters(presenters.length, presenters);
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
  results.push({ id: arg[2], timeSpent: arg[0], resultProcent: arg[1] });
  console.log(`tab: ${JSON.stringify(results)}`);
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
