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
         'Cherish Junior', 'Full Stack Developer', '4']
    ;
    const tableClass = "table";
    //increment
    var t;
    //create table with classlist
    var table = document.createElement("table");
    table.setAttribute("class", tableClass);
    //create table head
    var thead = document.createElement("thead");
    //create table head table row
    var theadTr = document.createElement("tr");
    //Loop through the table head dataset provided
    for(t = 0; t <= Object.keys(theadData).length; t++){
        //create table head > table row >  table data
        var td = document.createElement("td");
        //set inner text to be a single value from the loop
        td.innerText = theadData[t];
        //set class
        // td.setAttribute("class", theadData[t]);
        //append each of the table data to the thead row
        theadTr.appendChild(td);
        }
        //append thead row to thead
        thead.appendChild(theadTr);
        /**** TBODY ****/
        var tbody = document.createElement("tbody");
        //Init table body object
        var tbodyTd =  {};
        //create table body table data
        var td; 

            //for each record, create a table row
            var tbodyTr = document.createElement("tr");
            //loop through the dataset again to create all table data that we need
                for(var a = 0; a <= Object.keys(tbodyData).length; ++a){
                    //add a new table data property to the table body object
                   tbodyTd[a]  = document.createElement("td");
                   // set the inner text of the table data within our object
                   tbodyTd[a].innerText = tbodyData[a];
                    //append single table data to table row
                    tbodyTr.appendChild(tbodyTd[a]);
                }
                //after table data set loop, to create the table data we need,
                //append that data to table body table row    
                tbody.appendChild(tbodyTr);
        
            //append table head to table
            table.appendChild(thead);
            //append table body to table
            table.appendChild(tbody);
            document.querySelector('#table').appendChild(table);
});