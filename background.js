const screenshots = {};
function captureAllTabs(){
  browser.tabs.query({currentWindow : true}, (tabs) => {
    console.log(`number of tabs ${tabs.length}`)
    let index = 0;

    let captureTab = function(tab){
      browser.tabs.captureVisibleTab(tab.windowId, {format : 'png'}).then((dataUrl) => {
        screenshots[tab.id] = {
          dataUrl: dataUrl,
          timestamp: new Date().toISOString(),
          tabTitle: tab.title
        }
        console.log(screenshots[tab.id].dataUrl);
        index++;
        if (index < tabs.length) {
          processTab();
        } else {
          console.log(screenshots); 
        }
      })
    }

    let processTab = function() {
      if (index < tabs.length){
        browser.tabs.update(tabs[index].id,{active : true}, function(){
          setTimeout(function(){
            captureTab(tabs[index]); 
          }, 1000)
        })
      }
    }

    processTab(); // Start the process
  })
}

browser.runtime.onConnect.addListener(function(port){
  console.assert(port.name == "screenshotChannel");
  port.onMessage.addListener(function(msg){
    if (msg.action == "startCapturing") {
      captureAllTabs();
    }
  })
})

