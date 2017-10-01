;(function(){
  chrome.runtime.sendMessage({action: 'check_youtube_site'}, function(response){
    if (response){
      chrome.runtime.sendMessage({ action: "inject_controller" });
    }
  });
})();
