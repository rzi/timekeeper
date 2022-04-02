const fs = require("fs");
let baseData = [];
let dataList = [];
let tempDataList = [];
let selectedDate;

let labels = baseData.map((o) => o.label).concat("Total");
let data = [];
let total = 0;
for (let i = 0; i < baseData.length; i++) {
  const vStart = total;
  total += baseData[i].value;
  data.push([vStart, total]);
}
data.push(total);
const backgroundColors = data.map(
  (o, i) => "rgba(255, 99, 132, " + (i + (11 - data.length)) * 0.1 + ")"
);
const ctx = document.getElementById("waterfall");
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: labels,
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
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const v = data.datasets[0].data[tooltipItem.index];
          return Array.isArray(v) ? v[1] - v[0] : v;
        },
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

console.log(`chart  ${objToString(myChart)}`);

fs.readFile("./results.txt", "utf-8", (err, file) => {
  var rows = file.split("\n");
  var rowsLen = rows.length;
  console.log(`rowsLen ${rowsLen}`);
  //add date to selcet
  for (i = 0; i < rowsLen; i++) {
    var item = rows[i].toString().split(",");
    if (!dataList.includes(item[0])) {
      dataList.push(item[0]);
    }
    tempDataList.push({
      date: item[0],
      presenter: item[2],
      result: Number(item[4]),
      resultProcent: Number(item[5]),
    });
  }
  console.log(`list ${dataList}`);
  console.log(`tempDataList  ${JSON.stringify(tempDataList)}`);
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

  var selectedValue =
    document.getElementById("listDate").selectedOptions[0].value;
  selectedDate = selectedValue;
  document.getElementById("listDate").addEventListener("change", dropDownList);
  console.log("You selected: ", selectedDate);
});
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
function dropDownList() {
  selectedDate = this.value;
  baseData = [];
  myChart.data.labels = [];
  myChart.data.datasets[0].data = [];
  data = [];
  labels = [];
  total = 0;

  for (const val of tempDataList) {
    if (val.date == selectedDate) {
      baseData.push({ label: val.presenter, value: val.result });
    }
  }
  console.log(`baseData1  ${JSON.stringify(baseData)}`);

  myChart.data.labels = baseData.map((o) => o.label).concat("Total"); // add "TOTAL at end of table"

  for (let i = 0; i < baseData.length; i++) {
    const vStart = total;
    total += baseData[i].value;
    data.push([vStart, total]);
    console.log(`data  ${JSON.stringify(data)}`);
  }

  data.push(total); // calculate value of table
  myChart.data.datasets[0].data = data;

  console.log(`labels ${JSON.stringify(myChart.data.labels)}`);
  console.log(`baseData2  ${JSON.stringify(baseData)}`);
  console.log(`data  ${JSON.stringify(myChart.data.datasets[0].data)}`);
  myChart.update();
}
