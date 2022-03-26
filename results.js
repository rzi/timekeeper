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

//read results
fs.readFile("results.txt", (e, data) => {
  if (e) throw e;
  console.log(data);
  var para = document.createElement("p"); // Create a <p> node
  var t = document.createTextNode(`${data}`); // Create a text node
  para.id = "paragraph";
  para.appendChild(t); // Append the text to <p>
  document.getElementById("results").appendChild(para);
});

fs.readFile("./results.txt", "utf-8", (err, file) => {
  var theadData = [
         "Name",
         "Category",
         "Years"];
  const tbodyData = ['Simon Ugorji', 'Web Developer', '2',
        'John Doe', 'App Developer', '3',
         'Cherish Junior', 'Full Stack Developer', '4']  ;
  const tableClass = "table";
  var t;
  var table = document.createElement("table");
  table.setAttribute("class", tableClass);
  var thead = document.createElement("thead");
  var theadTr = document.createElement("tr");
  for(t = 0; t <= Object.keys(theadData).length; t++){
    var td = document.createElement("td");
    td.innerText = theadData[t];
    theadTr.appendChild(td);
  }
  thead.appendChild(theadTr);
  var tbody = document.createElement("tbody");
  var tbodyTd =  {};
  var td;
  var  file2 = file.toString().split("\n");

  var tbodyTr = document.createElement("tr");
  for(var a = 0; a <= file2.length; ++a){
    for (var j =0; j<3; j++){
      console.log(`file2 ${file2[1].split(',')}`)
    tbodyTd[a]  = document.createElement("td");
    tbodyTd[a].innerText = file2[a];
    tbodyTr.appendChild(tbodyTd[a]);
    }
  }
  tbody.appendChild(tbodyTr);    
  table.appendChild(thead);
  table.appendChild(tbody);
  document.querySelector('#table').appendChild(table);
});