const fs = require("fs");
const { parse } = require("path");
const { start } = require("repl");
// const Chart = require('chart.js');

var refreshView = require("./refreshView");

let baseData = [];
let dataList = [];
let conferenceList =[];
let tempDataList = [];
let chartColor =[];
let selectedDate;
let selectedConference;
let tooltip2line=[];
let procentTotal;
let setTimeData =[];
let data = [];
let total = 0;

let labels = baseData.map((o) => o.label).concat("Total");

for (let i = 0; i < baseData.length; i++) {
  const vStart = total;
  total += baseData[i].value;
  data.push([vStart, total]);
}
data.push(total);

const ctx = document.getElementById("waterfall");
const myChart = new Chart(ctx, {
  type: "bar",
  data: {

    datasets: [
      {
        data: data,
        backgroundColor: "blue",
        barPercentage: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    title:{
      display: true,
      text: " "
    },
    plugins: {
      labels: [
        {
          render: (arg) => {
            return tooltip2line[arg.index] +"%"
          },
        },
      ]
    },  
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data, ) => {
          const v = data.datasets[0].data[tooltipItem.index];
          var valReturn;
          if(Array.isArray(v)){
            valReturn =(((Number(v[1]) - Number(v[0]))).toFixed(2) + " min" )
          }else{
             valReturn =((Number(v)).toFixed(2) +" min")
          }
          return valReturn;
        },     
        afterLabel: function(tooltipItem ) {
          var setTime2 = tooltip3line[tooltipItem['index']];
          var percent = tooltip2line[tooltipItem['index']];
          return '(' + percent + '% ) \nSetTime: '+setTime2.toFixed(2) +' min';
        },
        
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'Time [minutes]'
          },
        },
      ],
    },
  },
});
fs.readFile("./results.txt", "utf-8", (err, file) => {
  var rows = file.split("\n");
  //add date to selcets
  for (i = 0; i < rows.length; i++) {
    var item = rows[i].toString().split(",");
    if (!dataList.includes(item[0])) {
       if (!(item[0]=="")) dataList.push(item[0]);
    }
    if (!conferenceList.includes(item[6])) {
      if (!(item[6]=="") && !(item[6]==undefined)) conferenceList.push(item[6]);
    }
    tempDataList.push({
      date: item[0],
      presenter: item[2],
      result: Number(item[4]),
      resultProcent: Number(item[5]),
      conferenceList: item[6],
      setTime: item[3],
    });
  }
  tempDataList.reverse();
  console.log(`tempDataList  ${JSON.stringify(tempDataList)}`);
  //date list
  var select = document.createElement("select");
  select.name = "listDate";
  select.id = "listDate";
  for (const val of dataList) {
    var option = document.createElement("option");
    option.value = val;
    option.text = val.charAt(0).toUpperCase() + val.slice(1);
    select.appendChild(option);
  }
  var label = document.createElement("label");
  label.innerHTML = "Choose date: ";
  label.htmlFor = "listDate";
  document.getElementById("dateList").appendChild(label).appendChild(select);
  // conference list
  console.log(`conferenceList ${conferenceList}`);
  var select = document.createElement("select");
  select.name = "listConference";
  select.id = "listConference";
  for (const val of conferenceList) {
    var option = document.createElement("option");
    option.value = val;
    option.text = val;
    select.appendChild(option);
  }
  var label = document.createElement("label");
  label.innerHTML = "and conference name  ";
  label.htmlFor = "listConference";
  document.getElementById("conferenceList").appendChild(label).appendChild(select);

  selectedDate = document.getElementById("listDate").selectedOptions[0].value;
  document.getElementById("listDate").addEventListener("change", dropDownList);
  selectedConference = document.getElementById("listConference").selectedOptions[0].value;
  document.getElementById("listConference").addEventListener("change", dropDownListConference);
  console.log("You selected: ", selectedDate, selectedConference);
  initialvalue(selectedDate, selectedConference);
});
function dropDownList() {
  selectedDate = this.value;
  initialvalue(selectedDate,selectedConference)
}
function dropDownListConference() {
  selectedConference = this.value;
  initialvalue(selectedDate,selectedConference)
}
function initialvalue(selectedDate, selectdConference){
   var toolTipTotal=0;
   var setTime1;
   initChart();
  for (const val of tempDataList) {
    // console.log(`przed if ${val.date }=${selectedDate} i ${val.conferenceList}=${selectdConference} i ${val.setTime}`)
    if (val.date == selectedDate && val.conferenceList == selectdConference && !(val.setTime ==undefined)) {
      // console.log(`if ${val.date }=${selectedDate} i ${val.conferenceList}=${selectdConference} i setTime=${val.setTime}`)
      baseData.push({ label: val.presenter, value: (val.result)/60 });
      if (val.resultProcent > 100) {
        chartColor.push("red")
      }else{
        chartColor.push("#3dcd58")
      } 
      tooltip2line.push(val.resultProcent )
      setTime1=setTimeToTime(val.setTime)
      tooltip3line.push(setTime1) 
      // console.log(`setTime1 ${setTime1}`)
    }
    if (!isNaN(setTime1)){
    // console.log(`setTime1 loop ${Number(setTime1)}`)
    toolTipTotal= toolTipTotal+setTime1
    // console.log(`toolTipTotalLoop ${toolTipTotal}`)
    }else{
      toolTipTotal=0;
    }
  }
  console.log(`toolTipTotaltotal ${toolTipTotal}`)
  myChart.data.labels = baseData.map((o) => o.label).concat("Total"); // add "TOTAL at end of table"
  for (let i = 0; i < baseData.length; i++) {
    const vStart = total;
    total += baseData[i].value;
    data.push([(vStart).toFixed(2), (total).toFixed(2)]);
  }
  console.log(`data  ${JSON.stringify(data)}`);
  data.push((total).toFixed(2)); // calculate value of table (total)
  var lastItem = data[data.length-1] ///in minute
  console.log(`lastItem ${lastItem} tooltipTotal ${toolTipTotal}  data ${data}`)
  procentTotal=(100*(lastItem/toolTipTotal)).toFixed(1);
  // calc sum of settime
  tooltip2line.push(procentTotal);
  tooltip3line.push(toolTipTotal) //suma setTime
  if (procentTotal<100){
    chartColor.push("#3dcd58")
  }else(
    chartColor.push("red")
  )
  myChart.data.datasets[0].data = data;
  myChart.data.datasets[0].backgroundColor=chartColor;
  myChart.update();
}
function setTimeToTime (setTime){
      //calc sum of setTime 00:00:05
      const czas = setTime.slice(0,8);
      // console.log(`czas ${czas}`)
      const h = parseInt(setTime.slice(0,2));
      const m = parseInt(setTime.slice(3,5));
      const s = parseInt(setTime.slice(6,8));
      // console.log(`h ${h} m ${m} s ${s}`)
      return Number((h*60)+m+(s/60)) // return time in minutes
}
function initChart(){
  baseData = [];
  myChart.data.labels = [];
  myChart.data.datasets[0].data = [];
  myChart.data.datasets[0].backgroundColor =[],
  data = [];
  labels = [];
  chartColor =[];
  tooltip2line =[];
  tooltip3line = [];
  total = 0;
}
function btnExit() {
  location.href = "index.html";
}
function objToString(obj) {
  let str = "";
  for (const [p, val] of Object.entries(obj)) {
    str += `${p}::${val}\n`;
  }
  return str;
}
// window dimensions
window.addEventListener('DOMContentLoaded', (event) => {
  refreshView.refreshView("main1");
});