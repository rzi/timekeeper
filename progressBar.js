const readText = require("./readText");
const { ipcRenderer } = require("electron");

showName = document.getElementById("presenterName");
showResult = document.getElementById("showResult");
progress = document.getElementById("presenter");
btnNext = document.getElementById("btnNext");
let item, id, procent, presenterData, setTime, presenterDataLen;
let timeInSec = 0;

ipcRenderer.on("forWin2", function (event, arg) {
  console.log(`from win2 ${arg}`);
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
  });
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
  console.log(` id ${item} presenterData len ${presenterDataLen} arry ${array}`);
  if (item <= presenterDataLen) ipcRenderer.send("nameMsg2", array);
  clearInterval(id);
});
ipcRenderer.on("nameReply", (event, arg) => {
  console.log(` name reply arg ${JSON.stringify(arg)}`); // why/what is not right..
});
