const ipcRenderer = require("electron").ipcRenderer;
const readText = require("./readText");
const createPresenters = require("./createPresenters");
const fs = require("fs");

presenters = [];

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

// ButtonSendName = document.getElementById("sendName");
// ButtonSendName.addEventListener("click", (event) => {
//   ipcRenderer.send("nameMsg", name.value);
//   console.log(`name.value ${name.value}`);
// });

ipcRenderer.on("nameReply", (event, arg) => {
  console.log(` name reply arg ${arg}`); // why/what is not right..
});

let btnSettings = document.getElementById("btnSettings");
btnSettings.addEventListener("click", function () {
  window.location.href = "./settings.html";
});
