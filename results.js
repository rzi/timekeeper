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
fs.readFile('results.txt', (e, data) => {
    if (e) throw e;
    console.log(data);
    var para = document.createElement("p"); // Create a <p> node
    var t = document.createTextNode(`${data}`); // Create a text node
    para.id = 'paragraph';
    para.appendChild(t); // Append the text to <p>
    document.getElementById("results").appendChild(para); 
});
