const ipcRenderer = require("electron").ipcRenderer;
const readText = require("./readText");
const createPresenters = require("./createPresenters");
const refreshView = require("./refreshView");
const fs = require("fs");
var path = require("path");
const { remote } = require("electron");
let today = document.getElementById("date");
let time = document.getElementById("time");
presenters = [];
results = [];
const absolutePath = path.resolve("./", "presenters.json");
const absolutePathResults = path.resolve("./", "results.txt");
//
var windowTopBar = document.createElement('div')
windowTopBar.style.width = "100%"
windowTopBar.style.height = "32px"
// windowTopBar.style.backgroundColor = "#000"
windowTopBar.style.position = "absolute"
windowTopBar.style.top = windowTopBar.style.left = 0
windowTopBar.style.webkitAppRegion = "drag"
document.body.appendChild(windowTopBar)
//
let name = document.getElementById("name");
// check if presenters are set?
if (!fs.existsSync(absolutePath)) {
  window.location = "settings.html";
} //else{
readText.readText(absolutePath, function (text) {
  var data = JSON.parse(text);
  console.log(`dane: ${JSON.stringify(data)}`);
  const nbOfItems = data.length;
  console.log(`data0 ${nbOfItems}`);
  presenters = [...data];
  console.log(`nb of presenters ${presenters.length}`);
  createPresenters.createPresenters(presenters);
});
//}
if (!fs.existsSync(absolutePathResults)) {
  fs.writeFile(absolutePathResults, "", function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
}
ipcRenderer.on("nameReply", (event, arg) => {
  console.log(` name reply arg ${JSON.stringify(arg)}`); // why/what is not right..
});
let btnSettings = document.getElementById("btnSettings");
btnSettings.addEventListener("click", function () {
  window.location.href = "./settings.html";
  refreshView("main1")
});
let btnShow = document.getElementById("btnShow");
btnShow.addEventListener("click", function () {
  ipcRenderer.send("showProgress", "showProgress");
  refreshView("main1")
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
  refreshView("main1")
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
  nextAction(id);
  changeImage(id);
  refreshView("main1")
});
var timer = setInterval(currentTime1, 1000);
function currentTime1() {
  var dateTime = new Date();
  today.innerHTML = dateTime.toLocaleString("pl-PL", {
    timeZone: "Europe/Warsaw",
  });
}
function updateResults(id) {
  console.log(
    ` results: ${results[id].id} , ${results[id].timeSpent}, ${results[id].resultProcent, results[id].conferenceName} `
  );
  var index = "S" + String(id);
  console.log(`i ${id}  timespent   ${results[id].timeSpent}`);
  document.getElementById(`R${id}`).style.visibility = "visible";
  document.getElementById(index).innerHTML = results[id].resultProcent + "%";
  var indexa = "Sa" + String(id);
  console.log(`indexa   ${indexa}`);
  console.log(`results[i]a   ${results[id].timeSpent}`);
  document.getElementById(indexa).innerHTML = Number(
    results[id].timeSpent / 60
  ).toFixed(1);
  var record = [];
  record.push(
    new Date()
      .toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" })
      .slice(0, 20)
  );
  record.push(presenters[id].name);
  record.push(presenters[id].setTime);
  record.push(results[id].timeSpent);
  record.push(results[id].resultProcent);
  record.push(presenters[id].conferenceName);
console.log(`record ${record}`)
  var data = fs.readFileSync(absolutePathResults).toString().split("\n");
  data.splice(0, 0, record);
  var text = data.join("\n");
  fs.writeFile(absolutePathResults, text, function (err) {
    if (err) return err;
  });
}
function nextAction(id) {
  console.log(`before id ${id}, result.len ${results.length}`);
  var nextId = Number(id) + 1;
  if (presenters.length > nextId) {
    ipcRenderer.send("nameMsg", nextId);
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
function changeImage(id) {
  var img = document.getElementsByTagName("img")[id + 1].getAttribute("name");
  var images = document.getElementsByTagName("image");
  console.log(`image ${images} id ${id} img ${img}`);
  var nextId = Number(id) + 1;
  if (img == `play`) {
    console.log(`jestem w if `);
    images[
      id
    ].innerHTML = `<img name = "stop" src= ./photos/button_img3a-red.png>`;
  } else if (img == `stop`) {
    console.log(`jestem w else `);
    images[
      id
    ].innerHTML = `<img name = "play"  src= ./photos/button_img2a-green.png>`;
    if (presenters.length > nextId)
      images[
        nextId
      ].innerHTML = `<img name = "stop" src= ./photos/button_img3a-red.png>`;
  }
}
// window dimensions
window.addEventListener('DOMContentLoaded', (event) => {
refreshView.refreshView("main1")
// document.getElementById("sticky").style.width=550
});
function objToString(obj) {
  let str = "";
  for (const [p, val] of Object.entries(obj)) {
    str += `${p}::${val}\n`;
  }
  return str;
}
