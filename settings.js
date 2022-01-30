const { pid } = require("process");
const fs = require("fs");

let selectElement = document.getElementById("numberOfPresenters");
let btnAddP = document.getElementById("btnAddP");
let p = document.getElementsByTagName("p");
let copyData = [];

btnAddP.addEventListener("click", function () {
  console.log("btn");
  console.log(`copyData: ${JSON.stringify(copyData)}`);
  var nbOfObj = copyData.length ;
  console.log(`copyDataLenght: ${nbOfObj}`);
  const addName = document.getElementById("addName").value;
  const setTime = document.getElementById("addTime").value;
  copyData.push({ id: nbOfObj, name: addName, active: true, setTime: setTime });
  console.log(`copyData2: ${JSON.stringify(copyData)}`);
  // Write to JSON
  writeToJson();
  //refresh
  location.reload();
});
readTextFile("./test.json", function (text) {
  var data = JSON.parse(text);
  console.log(`dane: ${JSON.stringify(data)}`);
  const nbOfItems = data.length;
  console.log(`data0 ${nbOfItems}`);
  createPresenters(parseInt(nbOfItems), data);
  copyData = [...data];
});
function createPresenters(index, data) {
  for (i = 0; i < index; i++) {
    var para = document.createElement("p"); // Create a <p> node
    var t = document.createTextNode(`id: ${data[i].name}`); // Create a text node
    para.id = String(data[i].id);
    para.appendChild(t); // Append the text to <p>

    var t2 = document.createTextNode(` setTime: ${data[i].setTime}`); // Create a text node
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
  fs.writeFile("test.json", String(JSON.stringify(copyData)), function (err) {
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
