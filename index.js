const ipcRenderer = require("electron").ipcRenderer;
const readText = require("./readText");
const createPresenters = require("./createPresenters");
const fs = require("fs");
const { remote } = require("electron");
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
let btnShow = document.getElementById("btnShow");
btnShow.addEventListener("click", function () {
  ipcRenderer.send("showProgress", "showProgress");
});
let btnExit = document.getElementById("btnExit");
btnExit.addEventListener("click", function () {
  // Close app
  ipcRenderer.send("Exit", "exit");
});
ipcRenderer.on("forWin1Stop", function (event, arg) {
  console.log(`stop`);
  var id = arg[2];
  var timeSpent = arg[0];
  var resultProcent = arg[1];
  results[id] = {
    id: `${id}`,
    timeSpent: `${timeSpent}`,
    resultProcent: `${resultProcent}`,
  };
  updateResults(id);
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
  updateResults(id);
  var nextStep = id + 1;
  console.log(`nextStep ${nextStep}`);
  nextAction(id);
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
function updateResults(id) {
  console.log(
    ` results: ${results[id].id} , ${results[id].timeSpent}, ${results[id].resultProcent} `
  );
  var index = "S" + String(id);
  console.log(`i ${id}  timespent   ${results[id].timeSpent}`);
  document.getElementById(index).innerHTML = results[id].resultProcent + "%";
  var indexa = "Sa" + String(id);
  console.log(`indexa   ${indexa}`);
  console.log(`results[i]a   ${results[id].timeSpent}`);
  document.getElementById(indexa).innerHTML = results[id].timeSpent;
}
function nextAction(id) {
  console.log(`before id ${id}, result.len ${results.length}`);
  if (presenters.length > id + 1) {
    ipcRenderer.send("nameMsg", id + 1);
    console.log(`sent   action ${id + 1}`);
  }
}
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".navigation");

const handleClick = () => {
  hamburger.classList.toggle("hamburger--active");
  hamburger.setAttribute(
    "aria-expanded",
    hamburger.classList.contains("hamburger--active")
  );
  nav.classList.toggle("navigation--active");
};

hamburger.addEventListener("click", handleClick);
