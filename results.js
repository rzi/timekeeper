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
  const lines = file.split("\n");
  const cell1 = file.split(",");
  var mybody = document.getElementsByTagName("body")[0];
  mytable = document.createElement("table");
  mytablebody = document.createElement("tbody");
  for (i = 0; i < lines.length; i++) {
    //tabela

    mycurrent_row = document.createElement("tr");
    for (j = 0; j < cell1.length; j++) {
      mycurrent_cell = document.createElement("td");
      mycurrent_cell.style.border = "1px solid red";
      currenttext = document.createTextNode(cell1[j]);
      mycurrent_cell.appendChild(currenttext);
      mycurrent_row.appendChild(mycurrent_cell);
    }

    mytablebody.appendChild(mycurrent_row);
    mytable.appendChild(mytablebody);
    mybody.appendChild(mytable);
  }
});

// var mybody = document.getElementsByTagName("body")[0];
// mytable = document.createElement("table");
// mytablebody = document.createElement("tbody");
// for(var row = 0; row < 2; row++) {
//     mycurrent_row=document.createElement("tr");
//     for(var col = 0; col < 2; col++) {
//         mycurrent_cell = document.createElement("td");
//         currenttext = document.createTextNode("cell is: " + row + col);
//         mycurrent_cell.appendChild(currenttext);
//         mycurrent_row.appendChild(mycurrent_cell);
//         // set the cell background color
//         // if the column is 0. If the column is 1 hide the cell
//         if (col === 0) {
//             mycurrent_cell.style.background = "rgb(255,0,0)";
//         } else {
//             mycurrent_cell.style.display = "none";
//         }
//     }
//     mytablebody.appendChild(mycurrent_row);
// }
// mytable.appendChild(mytablebody);
// mybody.appendChild(mytable);
