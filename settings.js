const { pid } = require("process");
const fs = require("fs");
var path = require("path");
var refreshView = require("./refreshView");
const windowTopBar = require("./windowTopBar");
var modal = document.getElementById("myModal");
windowTopBar.windowTopBar();
let selectElement = document.getElementById("numberOfPresenters");
let btnAddP = document.getElementById("btnAddP");
let p = document.getElementsByTagName("p");
let copyData = [];
let conferenceName;
let marked = null;
const addConferenceName = document.getElementById("addConferenceName");
var edit = document.getElementById("edit");
var del = document.getElementById("delete");
addConferenceName.value = localStorage.getItem("conferenceName");
const absolutePath = path.resolve("./", "presenters.json");
if (!fs.existsSync(absolutePath)) {
  fs.writeFileSync(
    "presenters.json",
    '[{"id":0,"name":"Presenter1 ","active":true,"setTime":"00:01:00","conferenceName":"test"},{"id":1,"name":"Presenter2 ","active":true,"setTime":"00:02:00","conferenceName":"test"},{"id":2,"name":"Presenter3 ","active":true,"setTime":"00:03:00","conferenceName":"test"}]',
    function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    }
  );
  location.href = "index.html";
} else {
  readTextFile(absolutePath, function (text) {
    var data = JSON.parse(text);
    const nbOfItems = data.length;
    createPresenters(parseInt(nbOfItems), data);
    copyData = [...data];
    document.getElementById("nbPresenters").textContent = copyData.length;
  });
}
addConferenceName.addEventListener("change", function () {
  conferenceName = this.value;
  document.getElementById("addConferenceName").value = this.value;
});
btnAddP.addEventListener("click", function (e) {
  var nbOfObj = copyData.length;
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
  for (let i = 0; i < count; i++) {
    const p = p_array[i];
    p.addEventListener("click", function (e) {
      if (e.target && e.target.nodeName == "P" && e.target.id.length) {
        const el = copyData[i];
        divNb = e.target.id;
        for (j = 0; j < copyData.length; j++) {
          if (copyData[j].id == e.target.id) {
            document.getElementById(j).style.fontWeight = "bold";
            document.getElementById(j).style.backgroundColor = "yellow";
            marked = j;
          } else {
            document.getElementById(j).style.fontWeight = "normal";
            document.getElementById(j).style.backgroundColor = "white";
          }
        }
      }
    });
  }
}
function writeToJson() {
  fs.writeFileSync(
    absolutePath,
    String(JSON.stringify(copyData)),
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );
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
del.addEventListener("click", function () {
  if (marked == null) {
    alert("Click ietem to delete");
  } else {
    // delete
    for (let i = 0; i < copyData.length; i++) {
      const el = copyData[i];
      if (el.id == marked) {
        copyData.splice(i, 1);
        writeToJson();
        marked = null;
      }
    }
    //renumering id
    for (let j = 0; j < copyData.length; j++) {
      copyData[j].id = j;
    }
    writeToJson();
    location.reload();
  }
});
//modal
// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal
btn.onclick = function () {
  if (marked == null) {
    alert("Click item to edit");
  } else {
    // edit
    modal.style.display = "block";
    document.getElementById("editId").value = copyData[marked].id;
    document.getElementById("editPresenterName").value = copyData[marked].name;
    document.getElementById("editTime").value = copyData[marked].setTime;
  }
};
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// save modal
var editSave = document.getElementById("editSave");
editSave.addEventListener("click", function () {
  var id = document.getElementById("editId").value;
  var name = document.getElementById("editPresenterName").value;
  var setTime = document.getElementById("editTime").value;
  for (i = 0; i < copyData.length; i++) {
    if (copyData[i].id == id) {
      copyData[i].id = Number(id);
      copyData[i].name = name;
      copyData[i].setTime = setTime;
    }
  }
  // Write to JSON
  writeToJson();
  //refresh
  location.reload();
});
