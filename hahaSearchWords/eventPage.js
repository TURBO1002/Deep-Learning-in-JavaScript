var menuItem = {
    "id":"hahaWord",
    "title":"金山词霸：%s",
    "contexts":["selection"]
}

chrome.contextMenus.create(menuItem)

function fixedEncodeURI(str){
    return encodeURI(str).replace(/%5B/g,'[').replace(/%5D/g,']')
}

chrome.contextMenus.onClicked.addListener(function (clickData){
    console.log("clickData",clickData)
    if(clickData.menuItemId =="hahaWord" && clickData.selectionText){
        var icibaUrl = " http://www.iciba.com/word?w="+clickData.selectionText
            var createData = {
            "url":icibaUrl,
            "type":"popup",
            "top":50,
            "left":50,
            "width":screen.width/2,
            "height":screen.height/2
        }
        chrome.windows.create(createData,function (){})
    }
})