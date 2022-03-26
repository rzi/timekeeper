const fs = require("fs");

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".navigation");

const handleClick = () => {
  hamburger.classList.toggle("hamburger--active");
  hamburger.setAttribute(
    "aria-expanded",
    hamburger.classList.contains("hamburger--active")
  );
  nav.classList.toggle("navigation--active");
};

hamburger.addEventListener("click", handleClick);
//table
fs.readFile("./results.txt", "utf-8", (err, file) => {
  var theadData = ["Date", "Presenter", "Set time", "Result", "%"];
  const tableClass = "table";
  var t;
  var table = document.createElement("table");
  table.setAttribute("class", tableClass);
  var thead = document.createElement("thead");
  var theadTr = document.createElement("tr");
  for (t = 0; t < theadData.length; t++) {
    var td = document.createElement("td");
    td.innerText = theadData[t];
    theadTr.appendChild(td);
  }
  thead.appendChild(theadTr);
  var tbody = document.createElement("tbody");
  var tbodyTd = {};
  var td;
  var rows = file.split("\n");
  for (var a = 0; a < rows.length - 1; a++) {
    var tbodyTr = document.createElement("tr");
    var myRow = rows[a];
    for (var j = 0; j <= 4; j++) {
      console.log(`myRow ${myRow}`);
      myCol = myRow.toString().split(",");
      tbodyTd[a] = document.createElement("td");
      if (j == 0) {
        tbodyTd[a].innerText = myCol[j].replace("T", " ");
      } else {
        tbodyTd[a].innerText = myCol[j];
      }
      tbodyTr.appendChild(tbodyTd[a]);
    }
    tbody.appendChild(tbodyTr);
  }
  table.appendChild(thead);
  table.appendChild(tbody);
  document.querySelector("#table").appendChild(table);
});
