(function(){
  function YoutubeController(){

    this.selectors = {
      playPause: [".ytp-button-play", ".ytp-play-button"],
      playNext: [".ytp-button-next", ".ytp-next-button"],
      playPrev: [".ytp-button-prev", ".ytp-prev-button"],
    };

    this.atachListeners();
  }

  YoutubeController.prototype.playPause = function(){
    document.querySelector(this.selectors.playPause).click();
  };

  YoutubeController.prototype.playNext = function(){
    document.querySelector(this.selectors.playNext).click();
  }

  YoutubeController.prototype.playPrev = function(){
    document.querySelector(this.selectors.playPrev).click();
  }

  YoutubeController.prototype.doRequest = function(request, sender, response){
    console.log("hello i'm injected");
    if(typeof request !== "undefined"){
      if(request.action === "playPause"){
        this.playPause();
      }

      if(request.action === "playNext"){
        this.playNext();
      }

      if(request.action === "playPrev"){
        this.playPrev();
      }
    }
  };

  YoutubeController.prototype.atachListeners = function(){
    chrome.runtime.onMessage.addListener(this.doRequest.bind(this));
  };

  new YoutubeController();
})();
