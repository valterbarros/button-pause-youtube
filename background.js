;(function(){
  var ListConfig = function(){
    this.playingTab = -1
    this.hasTabChoised = false

    ListConfig.prototype.getCurrentTab = function(){
      return this.playingTab
    }

    ListConfig.prototype.setCurrentTab = function(tabId){
      this.playingTab = parseInt(tabId)
      this.hasTabChoised = true
    }
  };
  
  chrome.commands.onCommand.addListener(function(command) {
    if (window.list_config.hasTabChoised){
      chrome.tabs.sendMessage( window.list_config.getCurrentTab(), { action: command } );
    }
  });

  chrome.runtime.onMessage.addListener(function(request, sender, response){
    if(request.action === "inject_controller"){
      console.log('injecting controller');
      chrome.tabs.executeScript(parseInt(request.tabId), { file: 'js/controllers/YoutubeController.js' });
    }
  });

  window.list_config = new ListConfig();
})();
