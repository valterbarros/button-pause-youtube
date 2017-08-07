// Listen for a click on the camera icon. On that click, take a screenshot.
//chrome.commands.onCommand.addListener(function(command) {
//  chrome.tabs.query({audible: true},function(tab){
 //   chrome.tabs.executeScript(tab[0].id, {
  //    code: 'document.getElementsByClassName("ytp-play-button")[0].click();'
  //  });
  //});
//});

//chrome.browserAction.onClicked.addListener(function() {
 // chrome.tabs.query({audible: true},function(tab){
  //  chrome.tabs.executeScript(tab[0].id, {
   //   code: 'document.getElementsByClassName("ytp-play-button")[0].click();'
    //});
  //});
//})

chrome.commands.onCommand.addListener(function(command) {
  if(command == "pause_video"){
    var tabId = localStorage["tabid"];
    var tabIdInt = parseInt(tabId);
    chrome.tabs.executeScript(tabIdInt, {
      code: 'document.getElementsByClassName("ytp-play-button")[0].click();'
    });
  }
});
