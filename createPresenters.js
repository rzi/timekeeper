const ipcRenderer = require("electron").ipcRenderer;

function createPresenters(index, data) {
  for (i = 0; i < index; i++) {
    var div = document.createElement("div");
    div.id = "div" + i;
    div.className = "div";
    var para = document.createElement("p"); // Create a <p> node
    para.id = String(data[i].id);
    var t = document.createTextNode(`id: ${data[i].name}`); // Create a text node
    para.appendChild(t); // Append the text to <p>

    var t2 = document.createTextNode(` setTime: ${data[i].setTime}`); // Create a text node
    para.appendChild(t2); // Append the text to <p>

    let btn = document.createElement("button");
    btn.id = i;
    btn.innerHTML = "Start";
    btn.addEventListener("click", function () {
      btnFn(btn.id);
    });
    var nb = "div" + i;
    console.log(`div ${nb}`);
    document.getElementById("presenters").appendChild(div);
    document.getElementById(nb).appendChild(para); // Append <p> to <div> with id="myDIV"
    document.getElementById(nb).appendChild(btn);
  }
  createListenerforP();
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
function btnFn(btn) {
  console.log(`btn ${btn}`);
  ipcRenderer.send("nameMsg", btn);
}
exports.createPresenters = createPresenters;
