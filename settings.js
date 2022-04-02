const { pid } = require("process");
const fs = require("fs");
var path = require("path");
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
let selectElement = document.getElementById("numberOfPresenters");
let btnAddP = document.getElementById("btnAddP");
let p = document.getElementsByTagName("p");
let copyData = [];
let conferenceName;
const addConferenceName = document.getElementById("addConferenceName");

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
addConferenceName.addEventListener("change" , function(){
conferenceName= this.value;
console.log(` conferenceName ${conferenceName}`)
document.getElementById("addConferenceName").value=this.value;
});
btnAddP.addEventListener("click", function () {
  console.log("btn");
  console.log(`copyData: ${JSON.stringify(copyData)}`);
  var nbOfObj = copyData.length;
  console.log(`copyDataLenght: ${nbOfObj}`);
  const addName = document.getElementById("addName").value;
  const setTime = document.getElementById("addTime").value;
  conferenceName = document.getElementById("addConferenceName").value;
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
        console.log("Remove item ", e.target.id.replace("post-"));
        var pId = e.target.id;
        for (let i = 0; i < copyData.length; i++) {
          const el = copyData[i];
          if (el.id == e.target.id) {
            copyData.splice(i, 1);
            writeToJson();
          }
        }
        location.reload();
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
