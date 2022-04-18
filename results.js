const fs = require("fs");
var refreshView = require("./refreshView");
const windowTopBar = require("./windowTopBar");
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".navigation");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
btnPrev.addEventListener("click", clickPrev);
btnNext.addEventListener("click", clickNext);
var paginationNb = 10;
var currentPage = 1;
var pag;
windowTopBar.windowTopBar();
loadTable();
function clickPrev() {
  if (currentPage > 1) {
    currentPage--;
    //consolele.log(`currentPage ${currentPage}`);
    document.getElementById(
      "pagination"
    ).innerHTML = ` ${currentPage} / ${pag} `;
    delTable();
    loadTable();
  }
}
function clickNext() {
  if (currentPage < pag) {
    currentPage++;
    //consolele.log(`currentPage ${currentPage}`);
    document.getElementById(
      "pagination"
    ).innerHTML = ` ${currentPage} / ${pag} `;
    delTable();
    loadTable();
  }
}
function loadTable() {
  fs.readFile("./results.txt", "utf-8", (err, file) => {
    var theadData = [
      "Date",
      "Time",
      "Presenter",
      "Set time",
      "Result [min]",
      "Result [%]",
    ];
    const tableClass = "table";
    var t;
    var table = document.createElement("table");
    table.setAttribute("class", tableClass);
    table.setAttribute("id", "myTableId");
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
    var rows = file.split("\n").reverse();
    var rowsLen = rows.length;
    //consolele.log(`rowsLen ${rowsLen}`);
    if (rowsLen < paginationNb) paginationNb = rowsLen;
    //consolele.log(`paginationNb=${paginationNb}`)
    pag = Math.ceil(rowsLen / paginationNb);
    //consolele.log(`panination ${currentPage} / ${pag}`);
    document.getElementById(
      "pagination"
    ).innerHTML = ` ${currentPage} / ${pag} `;
    for (var a = 0; a <= paginationNb - 1; a++) {
      //consolele.log(`LoopPaginationNb=${paginationNb}`)
      var tbodyTr = document.createElement("tr");
      //consolele.log(`rows ${(currentPage - 1) * paginationNb + a}`)
      var myRow = rows[(currentPage - 1) * paginationNb + a];
      if (!(myRow == undefined)) {
        for (var j = 0; j < 6; j++) {
          //consolele.log(`myRowA ${myRow} j=${j} a=${a}`);
          myCol = myRow.toString().split(",");
          if (myCol[j] == "" || myCol[j] == undefined) {
          } else {
            tbodyTd[a] = document.createElement("td");
            if (j == 4) {
              tbodyTd[a].innerText = Number(myCol[j] / 60).toFixed(1);
            } else if (j == 5) {
              tbodyTd[a].innerText = myCol[j] + "%";
            } else {
              tbodyTd[a].innerText = myCol[j];
            }
            tbodyTr.appendChild(tbodyTd[a]);
          }
        }
      }
      tbody.appendChild(tbodyTr);
    }
    table.appendChild(thead);
    table.appendChild(tbody);
    document.querySelector("#table").appendChild(table);
  });
}
function delTable() {
  var el = document.getElementById("table");
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
}
function btnExit() {
  location.href = "index.html";
}
// window dimensions
window.addEventListener("DOMContentLoaded", (event) => {
  refreshView.refreshView("main1");
});
