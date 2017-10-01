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

    ListConfig.prototype.checkYoutubeSite = function(url){
      var tabYoutubeRegex = new RegExp(/\.youtube\./)
      return tabYoutubeRegex.test(url)
    }
  };
  
  chrome.commands.onCommand.addListener(function(command) {
    if (window.list_config.hasTabChoised){
      chrome.tabs.sendMessage( window.list_config.getCurrentTab(), { action: command } );
    }
  });

  chrome.runtime.onMessage.addListener(function(request, sender, response){
    if(request.action === "inject_controller"){
      chrome.tabs.executeScript(sender.tab.id, { file: 'js/controllers/YoutubeController.js' });
    }

    if(request.action === "check_youtube_site") {
      if(sender.tab.index === -1) return response("no_inject");
      response(window.list_config.checkYoutubeSite(sender.tab.url));
    }
  });

  window.list_config = new ListConfig();
})();
