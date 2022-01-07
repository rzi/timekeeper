const readText = require("./readText");
const { ipcRenderer } = require("electron");

showName = document.getElementById("presenterName");
showResult = document.getElementById("showResult");
progress = document.getElementById("presenter");
ipcRenderer.on("forWin2", function (event, arg) {
  console.log(`from win2 ${arg}`);

  readText.readText("./test.json", function (text) {
    var data = JSON.parse(text);
    console.log(`data ${JSON.stringify(data[arg])}`);
    // showName.innerHTML = data[arg].name;
    timeInSec = data[arg].setTime;
    console.log(`time ${getSeconds(timeInSec)}`);
    progress.value = 0;
    progress.max = 100;
    showName.innerHTML = data[arg].name;
    var id = setInterval(frame, 1000);
    function frame() {
      if (progress.value >= 100) {
        console.log("end");
        progress.setAttribute("data-label", "wwwww");
      } else {
        progress.value = progress.value + 1;
        showResult.innerHTML = parseInt((progress.value / progress.max) * 100);
        progress.innerHTML =
          String((progress.value / progress.max) * 100) + "%";
        console.log(`val: ${parseInt((progress.value / progress.max) * 100)}`);
        progress.setAttribute("data-label", progress.value + 1);
      }
    }
    btnNext = document.getElementById("btnNext");
    btnNext.addEventListener("click", (event) => {
      console.log(`btnNext `);
      clearInterval(id);
    });
  });
});
console.log("I'm Window2");

function getSeconds(time) {
  var ts = time.split(":");
  return Date.UTC(1970, 0, 1, ts[0], ts[1], ts[2]) / 1000;
}
