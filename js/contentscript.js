(() => {
  chrome.runtime.sendMessage({
    action: 'check_youtube_site'
  },
  response => {
    if (response) {
      chrome.runtime.sendMessage({
        action: 'inject_controller'
      })
    }
  })
})()
