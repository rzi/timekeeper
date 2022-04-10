function windowTopBar (){
    var windowTopBar = document.createElement('div')
    windowTopBar.style.width = "auto"
    windowTopBar.style.height = "32px"
    windowTopBar.style.position = "absolute"
    windowTopBar.style.top = windowTopBar.style.left = 0
    windowTopBar.style.webkitAppRegion = "drag"
    document.body.appendChild(windowTopBar)
}
exports.windowTopBar =windowTopBar
