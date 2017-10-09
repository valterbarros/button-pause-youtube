(() => {
  class ListConfig {

    constructor() {
      this.playingTab = -1
      this.hasTabChoised = false
    }

    getCurrentTab() {
      return this.playingTab
    }

    setCurrentTab(tabId) {
      this.playingTab = parseInt(tabId)
      this.hasTabChoised = true
    }

    checkYoutubeSite(url) {
      const tabYoutubeRegex = new RegExp(/\.youtube\./)

      return tabYoutubeRegex.test(url)
    }
  }

  chrome.commands.onCommand.addListener(command => {
    if (window.list_config.hasTabChoised) {
      chrome.tabs.sendMessage(
        window.list_config.getCurrentTab(), {
          action: command
        }
      )
    }
  })

  chrome.runtime.onMessage.addListener((request, sender, response) => {
    if (request.action === 'inject_controller') {
      chrome.tabs.executeScript(
        sender.tab.id, {
          file: 'public/controllers/YoutubeController.js'
        }
      )
    }

    if (request.action === 'check_youtube_site') {
      if (sender.tab.index === -1) {
        return response('no_inject')
      }

      response(window.list_config.checkYoutubeSite(sender.tab.url))
    }
  })

  window.list_config = new ListConfig()
})()
