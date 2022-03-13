const ipcRenderer = require("electron").ipcRenderer;
function createPresenters(data) {
  for (i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.id = "div" + i;
    div.className = "div";
    var para = document.createElement("p");
    para.id = String(data[i].id);
    var t = document.createTextNode(`Presenter: ${data[i].name}, `);
    para.appendChild(t);

    var t2 = document.createTextNode(` set time: ${data[i].setTime} \xa0  `); // Create a text node
    para.appendChild(t2); // Append the text to <p>

    let btn = document.createElement("image");
    btn.id = i;
    // btn.name ="play"
    // btn.innerHTML = "Start/Stop";
    btn.innerHTML = `<img name= 'play'  src= ./photos/button_img2.png>`;
    // = "<img src= ./photos/button_img2.png>";
    btn.addEventListener("click", function () {
      btnFn(btn.id);
    });

    var para2 = document.createElement("p"); // Create a <p> node
    para2.id = "R" + String(data[i].id);
    para2.style.visibility = "hidden";
    var t3 = document.createTextNode(`   Result: `);
    para2.appendChild(t3);

    var s1 = document.createElement("span");
    s1.id = "S" + String(data[i].id);
    para2.appendChild(s1);

    var t4 = document.createTextNode(` time spent: `);
    para2.appendChild(t4);
    var sa1 = document.createElement("span");
    sa1.id = "Sa" + String(data[i].id);
    para2.appendChild(sa1);

    var t5 = document.createTextNode(` minutes. `);
    para2.appendChild(t5);

    var nb = "div" + i;
    console.log(`div ${nb}`);
    document.getElementById("presenters").appendChild(div);
    document.getElementById(nb).appendChild(btn);
    document.getElementById(nb).appendChild(para);
    document.getElementById(nb).appendChild(para2);
  }
  createListenerforP(data);
}
function createListenerforP(data) {
  const p_array = document.getElementsByTagName("p");
  const count = p_array.length;
  console.log(`count ${count}`);
  //loop through a list of elements.
  for (let i = 0; i < count; i++) {
    const p = p_array[i];
    p.addEventListener("click", function (e) {
      if (e.target && e.target.nodeName == "P" && e.target.id.length) {
        console.log("Reset item ", e.target.id.replace("post-"));
        var pId = e.target.id;
        for (let i = 0; i < data.length; i++) {
          const el = data[i];
          if (el.id == e.target.id) {
            data.splice(i, 1);
            console.log(`data ${JSON.stringify(data)}`);
            // writeToJson();
          }
        }
        location.reload();
      }
    });
  }
}
function btnFn(btn) {
  var id = Number(btn) + 1;
  console.log(`id:${id}`);
  var img = document.getElementsByTagName("img")[id].getAttribute("name");
  console.log(`image ${img}`);
  var images = document.getElementsByTagName("image");

  if (img == `play`) {
    console.log(`jestem w if `);
    images[
      btn
    ].innerHTML = `<img name = "stop" src= ./photos/button_img3a-red.png>`;
  } else {
    console.log(`jestem w else `);
    images[
      btn
    ].innerHTML = `<img name = "play"  src= ./photos/button_img2a-green.png>`;
  }
  ipcRenderer.send("nameMsg", btn);
}
exports.createPresenters = createPresenters;
