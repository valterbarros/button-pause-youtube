(() => {
  class YoutubeController {

    constructor() {
      this.selectors = {
        playPause: ['.ytp-button-play', '.ytp-play-button'],
        playNext: ['.ytp-button-next', '.ytp-next-button'],
        playPrev: ['.ytp-button-prev', '.ytp-prev-button']
      }

      this.atachListeners()
    }

    playPause() {
      document.querySelector(this.selectors.playPause).click()
    }

    playNext() {
      document.querySelector(this.selectors.playNext).click()
    }

    playPrev() {
      document.querySelector(this.selectors.playPrev).click()
    }

    doRequest(request, sender, response) {

      console.log(`hello i'm injected`)

      if (typeof request !== 'undefined') {
        if (request.action === 'playPause') {
          this.playPause()
        }

        if (request.action === 'playNext') {
          this.playNext()
        }

        if (request.action === 'playPrev') {
          this.playPrev()
        }
      }
    }

    atachListeners() {
      chrome.runtime.onMessage.addListener(this.doRequest.bind(this))
    }
  }

  new YoutubeController()
})()
