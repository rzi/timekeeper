let selectElement = document.getElementById("numberOfPresenters");
let btnAddP = document.getElementById("btnAddP");
let copyData =[];
btnAddP.addEventListener("click", function () {
  console.log("btn");
  console.log(`copyData: ${JSON.stringify(copyData)}`);
  var nbOfObj =copyData.length+1
  console.log(`copyDataLenght: ${nbOfObj}`);
  const addName=document.getElementById("addName").value;
  const setTime = document.getElementById("addTime").value; 
  copyData.push({"id": nbOfObj,"name":addName, "active":true, "setTime":setTime })
  console.log(`copyData2: ${JSON.stringify(copyData)}`);
  //save to json
  //refresh
});
readTextFile("./test.json", function (text) {
  var data = JSON.parse(text);
  console.log(`dane: ${JSON.stringify(data)}`);
  document.getElementById("numberOfPresenters").value = 5;
  console.log(`wartość ${selectElement.value}`);
  const nbOfItems = data.length;
  console.log(`data0 ${nbOfItems}`);
  createPresenters(parseInt(nbOfItems), data);
  copyData = [...data];
});
selectElement.addEventListener("change", (event) => {
  console.log(`nb. of change  ${event.target.value}`);
  const parent = document.getElementById("presenters");
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
  var index = event.target.value;
  createPresenters(index);
});
function createPresenters(index, data) {
  for (i = 0; i < index; i++) {
    var para = document.createElement("p"); // Create a <p> node
    var t = document.createTextNode(`id: ${data[i].name}`); // Create a text node
    para.id = String(data[i ].id);
    para.appendChild(t); // Append the text to <p>

    var t2 = document.createTextNode(` setTime: ${data[i].setTime}`); // Create a text node
    para.appendChild(t2); // Append the text to <p>

    document.getElementById("presenters").appendChild(para); // Append <p> to <div> with id="myDIV"
  }
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
