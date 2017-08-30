document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({},function(tabs){     
    //alert(tabs);
    var select = document.getElementById("selectButton")
    var option;
    for (var i = 0; i < tabs.length; i++) {
      var tabYoutubeRegex = /\.youtube\./
      if(tabYoutubeRegex.exec(tabs[i].url) != null){
        option = document.createElement("option");
        option.text = tabs[i].title;
        option.value = tabs[i].id;
        select.add(option);
        if(localStorage["tabid"] == option.value){
          option.selected = "selected";
        }
      }
    }
  });

  document.getElementById('closeButton').onclick = doClose;
  document.getElementById('pauseButton').onclick = doPause;
  document.getElementById('selectButton').onchange = doSelected;
});

function doSelected(){
  var select = document.getElementById("selectButton");
  var tabId = select.options[select.selectedIndex].value;
  var oldTabId = localStorage["tabid"];
  chrome.tabs.query({audible: true},function(tabs){
    for (var i = 0; i < tabs.length; i++) {
      if(tabs[i].id == oldTabId){
        chrome.tabs.executeScript(parseInt(oldTabId), {
          code: 'document.getElementsByClassName("ytp-play-button")[0].click();'
        });
      }
    }
  });
  localStorage["tabid"] = tabId;
  chrome.tabs.move(parseInt(tabId),{"index": 0});
  chrome.tabs.query({audible: false},function(tabs){
    for (var i = 0; i < tabs.length; i++) {
      if(tabs[i].id == tabId){
        chrome.tabs.executeScript(parseInt(tabId), {
          code: 'document.getElementsByClassName("ytp-play-button")[0].click();'
        });
      }
    }
  });
  //chrome.tabs.update(parseInt(tabId), {"selected": true});
}

function doPause() {
  var select = document.getElementById("selectButton");
  var tabId = select.options[select.selectedIndex].value;
  var tabIdInt = parseInt(tabId)
  chrome.tabs.executeScript(tabIdInt, {
    code: 'document.getElementsByClassName("ytp-play-button")[0].click();'
  });
}

function doClose() {
  self.close();
}
