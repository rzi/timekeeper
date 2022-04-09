const ipcRenderer = require("electron").ipcRenderer;
 function refreshView(element){
     console.log(` refresh: ${ element}`)
    var winHeight=document.getElementById(element).offsetHeight
    console.log(`winHeight ${winHeight}`)
    var winWidth =document.getElementById(element).offsetWidth
    console.log(`winwidhh ${winWidth}`)
    winHeight=winHeight+15
    winWidth=winWidth+15
    ipcRenderer.send("winDimmension", {winWidth,winHeight});
  }
  exports.refreshView = refreshView         