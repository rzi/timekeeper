const ipcRenderer = require("electron").ipcRenderer;
function refreshView(element) {
  var winHeight = document.getElementById(element).offsetHeight;
  var winWidth = document.getElementById(element).offsetWidth;
  winHeight = winHeight + 15;
  winWidth = winWidth + 15;
  ipcRenderer.send("winDimmension", { winWidth, winHeight });
}
exports.refreshView = refreshView;
