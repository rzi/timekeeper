const readText = require("./readText");
const { ipcRenderer } = require("electron");
var path = require("path");
const absolutePath = path.resolve("./", "presenters.json");
showName = document.getElementById("presenterName");
showResult = document.getElementById("showResult");
progress = document.getElementById("presenter");
btnNext = document.getElementById("btnNext");
let item = null,
  id,
  procent,
  presenterData,
  setTime,
  presenterDataLen,
  timeoutMyOswego,
  dirCount;
let timeInSec = 0;
var seconds;
var temp;
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
ipcRenderer.on("forWin2", function (event, arg) {
  if (parseInt(arg) == item) {
    var tempAray = [timeInSec, procent, item];
    ipcRenderer.send("stop", tempAray);
    clearInterval(id);
    clearTimeout(timeoutMyOswego);
    item = null;
  } else {
    item = parseInt(arg);
    readText.readText(absolutePath, function (text) {
      var data = JSON.parse(text);
      presenterDataLen = Object.keys(data).length;
      presenterData = data[arg];
      timeInSec = 0;
      clearInterval(id);
      clearTimeout(timeoutMyOswego);
      StartTimer();
      document.getElementById("countdown").innerHTML = presenterData.setTime;
      console.log(`presenterData.setTime ${presenterData.setTime}`);
      dirCount = "down";
      document.getElementById("countdown").style.color = "black";
      countdown();
    });
  }
});
console.log("I'm Window2");
function getSeconds(time) {
  var ts = time.split(":");
  return Date.UTC(1970, 0, 1, ts[0], ts[1], ts[2]) / 1000;
}
function StartTimer() {
  console.log(`presenterData ${JSON.stringify(presenterData)}`);
  setTime = getSeconds(presenterData.setTime);
  progress.value = 0;
  progress.max = setTime;
  showName.innerHTML = presenterData.name;
  id = setInterval(frame, 1000);
}
function frame() {
  timeInSec = timeInSec + 1;
  progress.value = timeInSec;
  procent = parseInt((timeInSec / progress.max) * 100);
  progress.setAttribute("data-label", procent);
}
btnNext.addEventListener("click", (event) => {
  let array = [timeInSec, procent, item];
  if (item <= presenterDataLen && item != null) {
    ipcRenderer.send("nameMsg2", array);
    clearInterval(id);
  } else {
    progress.value = 0;
  }
  clearTimeout(timeoutMyOswego);
});
ipcRenderer.on("nameReply", (event, arg) => {
  console.log(` name reply arg ${JSON.stringify(arg)}`); // why/what is not right..
});
function countdown() {
  time = document.getElementById("countdown").innerHTML;
  timeArray = time.split(":");
  seconds = Number(timeToSeconds(timeArray));
  if (seconds == "") {
    temp = document.getElementById("countdown");
    var GivenTime = document.getElementById("countdown").innerHTML;
    temp.innerHTML = GivenTime;
    time = document.getElementById("countdown").innerHTML;
    timeArray = time.split(":");
    seconds = timeToSeconds(timeArray);
  }
  if (dirCount == "down") {
    seconds = seconds - 1;
  } else {
    seconds = seconds + 1;
    dirCount = "up";
  }
  temp = document.getElementById("countdown");
  temp.innerHTML = secondsToTime(seconds);
  timeoutMyOswego = setTimeout(countdown, 1000);
  if (secondsToTime(seconds) == "00:00:00") {
    dirCount = "up";
    temp.style.color = "red";
  }
}
function timeToSeconds(timeArray) {
  var hours = 60 * 60 * Number(timeArray[0]);
  var minutes = 60 * Number(timeArray[1]);
  var seconds = hours + minutes + Number(timeArray[2]);
  return seconds;
}
function secondsToTime(secs) {
  var hours = Math.floor(secs / (60 * 60));
  hours = hours < 10 ? "0" + hours : hours;
  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);
  seconds = seconds < 10 ? "0" + seconds : seconds;
  console.log(`time2: ${hours + ":" + minutes + ":" + seconds}`);
  return hours + ":" + minutes + ":" + seconds;
}
