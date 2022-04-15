const { pid } = require("process");
const fs = require("fs");
var path = require("path");
var refreshView = require("./refreshView");
const windowTopBar = require("./windowTopBar");

windowTopBar.windowTopBar();
let selectElement = document.getElementById("numberOfPresenters");
let btnAddP = document.getElementById("btnAddP");
let p = document.getElementsByTagName("p");
let copyData = [];
let conferenceName;
let marked = 0;
const addConferenceName = document.getElementById("addConferenceName");
var edit = document.getElementById("edit");
var del = document.getElementById("delete");
addConferenceName.value = localStorage.getItem("conferenceName");
console.log(`conferenceName ${conferenceName}`);
const absolutePath = path.resolve("./", "presenters.json");

if (!fs.existsSync(absolutePath)) {
  fs.writeFile(
    "presenters.json",
    '[{"id":0,"name":"Presenter1 ","active":true,"setTime":"00:01:00"},{"id":1,"name":"Presenter2 ","active":true,"setTime":"00:02:00"},{"id":2,"name":"Presenter3 ","active":true,"setTime":"00:03:00"}]',
    function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    }
  );
} else {
  readTextFile(absolutePath, function (text) {
    var data = JSON.parse(text);
    console.log(`dane: ${JSON.stringify(data)}`);
    const nbOfItems = data.length;
    console.log(`data0 ${nbOfItems}`);
    createPresenters(parseInt(nbOfItems), data);
    copyData = [...data];
  });
}
addConferenceName.addEventListener("change", function () {
  conferenceName = this.value;
  console.log(` conferenceName ${conferenceName}`);
  document.getElementById("addConferenceName").value = this.value;
});
btnAddP.addEventListener("click", function (e) {
  console.log(`copyData: ${JSON.stringify(copyData)}`);
  var nbOfObj = copyData.length;
  console.log(`copyDataLenght: ${nbOfObj}`);
  const addName = document.getElementById("addName").value;
  const setTime = document.getElementById("addTime").value;
  conferenceName = document.getElementById("addConferenceName").value;
  localStorage.setItem("conferenceName", conferenceName);
  copyData.push({
    id: nbOfObj,
    name: addName,
    active: true,
    setTime: setTime,
    conferenceName: conferenceName,
  });
  console.log(`copyData2: ${JSON.stringify(copyData)}`);
  // Write to JSON
  writeToJson();
  //refresh
  location.reload();
});
function createPresenters(index, data) {
  for (i = 0; i < index; i++) {
    var para = document.createElement("p"); // Create a <p> node
    var t = document.createTextNode(`Presenter name: ${data[i].name},`); // Create a text node
    para.id = String(data[i].id);
    para.appendChild(t); // Append the text to <p>
    var t2 = document.createTextNode(` time: ${data[i].setTime}`); // Create a text node
    para.appendChild(t2); // Append the text to <p>
    document.getElementById("presenters").appendChild(para); // Append <p> to <div> with id="myDIV"
  }
  createListenerforP();
}
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}
function createListenerforP() {
  const p_array = document.getElementsByTagName("p");
  const count = p_array.length;
  console.log(`count ${count}`);
  //loop through a list of elements.
  for (let i = 0; i < count; i++) {
    const p = p_array[i];
    p.addEventListener("click", function (e) {
      if (e.target && e.target.nodeName == "P" && e.target.id.length) {
        const el = copyData[i];
        divNb = e.target.id;
        console.log(`id=${divNb}`);
        for (j = 0; j < copyData.length; j++) {
          console.log(
            `copyData[i].id=${copyData[j].id} e.target.id=${e.target.id}`
          );
          if (copyData[j].id == e.target.id) {
            document.getElementById(j).style.fontWeight = "bold";
            console.log(`bold divNb=${divNb}`);
            marked = j;
          } else {
            document.getElementById(j).style.fontWeight = "normal";
            console.log("normal");
          }
        }
      }
    });
  }
}
function writeToJson() {
  fs.writeFile(absolutePath, String(JSON.stringify(copyData)), function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
}
function btnExit() {
  if (copyData.length) {
    location.href = "index.html";
  } else {
    alert("Add presenter");
  }
}
// window dimensions
window.addEventListener("DOMContentLoaded", (event) => {
  refreshView.refreshView("main1");
});
function objToString(obj) {
  let str = "";
  for (const [p, val] of Object.entries(obj)) {
    str += `${p}::${val}\n`;
  }
  return str;
}

edit.addEventListener("click", function () {
  if (marked == 0) {
    alert("Click item to edit");
  } else {
    // edit
  }
});
del.addEventListener("click", function () {
  if (marked == 0) {
    alert("Click ietem to delete");
  } else {
    // edit
  }
});
