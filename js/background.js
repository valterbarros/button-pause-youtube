;(function(){
  var ListConfig = function(){
    this.playingTab = -1
    this.hasTabChoised = false
    this.showNotifications = false

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
    
    ListConfig.prototype.setNotify = function(state){
      this.showNotifications = state
    }
    
    ListConfig.prototype.getNotify = function(){
      return this.showNotifications
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

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (
      tabId === window.list_config.playingTab
      && changeInfo.status === 'complete'
    ) {
      tabUrlChanged(tab);
    }
  });

  function tabUrlChanged(tab) {
    fetch("https://www.youtube.com/oembed?url=" + tab.url + "&format=json", { mode: 'cors' })
      .then(function(response) {
        if (response.ok === false) {
          throw Error("Bad metadata response");
        }
        return response.json();
      })
      .then(function(metadata) {
        notifyNewSong(metadata.title, metadata.thumbnail_url);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function notifyNewSong(message, image) {
    if (window.list_config.getNotify() === false) {
      return false;
    }
    var image = image || chrome.extension.getURL("icon-pause-128.png");
    if (!("Notification" in window)) {
      return;
    }
    else if (Notification.permission === "granted") {
      new Notification('Now Playing', { body: message, icon: image });
    }
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          new Notification('Now Playing', { body: message, icon: image });
        }
      });
    }
  }

  window.list_config = new ListConfig();
})();
