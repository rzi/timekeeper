const readText = require("./readText");
const { ipcRenderer } = require("electron");

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
  elapsedTime;
let timeInSec = 0;
var seconds;
var temp;

ipcRenderer.on("forWin2", function (event, arg) {
  console.log(`from win2 ${arg}`);
  console.log(`arg ${parseInt(arg)} item ${item} id ${id}`);
  if (parseInt(arg) == item) {
    var tempAray = [timeInSec, procent, item];
    ipcRenderer.send("stop", tempAray);
    clearInterval(id);
    item = null;
  } else {
    item = parseInt(arg);
    readText.readText("./test.json", function (text) {
      var data = JSON.parse(text);
      presenterDataLen = Object.keys(data).length;
      console.log(`data ${JSON.stringify(data[arg])}`);
      console.log(`dataL ${presenterDataLen}`);
      presenterData = data[arg];
      timeInSec = 0;
      clearInterval(id);
      StartTimer();
      // document.getElementById("setTime").innerHTML = presenterData.setTime;
      document.getElementById("countdown").innerHTML = presenterData.setTime;
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
  console.log(`time ${setTime}`);
  progress.value = 0;
  progress.max = setTime;
  showName.innerHTML = presenterData.name;
  id = setInterval(frame, 1000);
}
function frame() {
  timeInSec = timeInSec + 1;
  progress.value = timeInSec;
  procent = parseInt((timeInSec / progress.max) * 100);
  console.log(`procent ${procent} `);
  progress.setAttribute("data-label", procent);
  console.log(`time ${parseInt(timeInSec)}`);
}
btnNext.addEventListener("click", (event) => {
  console.log(`btnNext ${JSON.stringify(item)}`);
  console.log(`time ${timeInSec}`);
  let array = [timeInSec, procent, item];
  console.log(
    ` id ${item} presenterData len ${presenterDataLen} arry ${array}`
  );
  if (item <= presenterDataLen && item != null) {
    ipcRenderer.send("nameMsg2", array);
    clearInterval(id);
  } else {
    progress.value = 0;
  }
});
ipcRenderer.on("nameReply", (event, arg) => {
  console.log(` name reply arg ${JSON.stringify(arg)}`); // why/what is not right..
});

function countdown() {
  time = document.getElementById("countdown").innerHTML;
  timeArray = time.split(":");
  console.log(`timeArray ${timeArray}`);
  seconds = Number(timeToSeconds(timeArray));
  console.log(`seconds ${seconds}`);
  if (seconds == "") {
    temp = document.getElementById("countdown");
    var GivenTime = document.getElementById("countdown").innerHTML;
    temp.innerHTML = GivenTime;
    time = document.getElementById("countdown").innerHTML;
    timeArray = time.split(":");
    seconds = timeToSeconds(timeArray);
  }
  seconds = seconds - 1;
  console.log(`seconds2 ${seconds}`);
  temp = document.getElementById("countdown");
  temp.innerHTML = secondsToTime(seconds);
  var timeoutMyOswego = setTimeout(countdown, 1000);
  if (secondsToTime(seconds) == "00:00:00") {
    clearTimeout(timeoutMyOswego); //stop timer
    console.log('Time"s UP');
  }
}

function timeToSeconds(timeArray) {
  var hours = 60 * timeArray[0] * 1;
  var minutes = timeArray[1] * 1;
  var seconds = hours + minutes * 60 + timeArray[2] * 1;
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
  //hours + ':' +
}
