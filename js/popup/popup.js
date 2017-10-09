document.addEventListener('DOMContentLoaded', () => {

  chrome.tabs.query({}, tabs => {
    const select = document.getElementById('selectButton')

    let option

    for (let i = 0, len = tabs.length; i < len; i += 1) {

      if (chrome.extension.getBackgroundPage()
          .window.list_config.checkYoutubeSite(tabs[i].url)) {
        option = document.createElement('option')
        option.text = tabs[i].title
        option.value = tabs[i].id
        select.add(option)

        if (chrome.extension.getBackgroundPage()
            .window.list_config.getCurrentTab() === option.value) {
          option.selected = 'selected'
        }
      }
    }
  })

  document.getElementById('selectButton').onchange = doSelected
})

function doSelected() {
  const select = document.getElementById('selectButton')
  const tabId = select.options[select.selectedIndex].value

  chrome.extension.getBackgroundPage()
    .window.list_config.setCurrentTab(tabId)
}
