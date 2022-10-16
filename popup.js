//pp as in PopuP -_-
var currentBlurFlag = 1;

const aiPPBlur = document.getElementById('ppBtnBlur');

//Popup Buttons interactions
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.set({blurFlag: currentBlurFlag});
  aiPPBlur.addEventListener('click', () => {
    //if Blur is on
    if(currentBlurFlag === 1){
      currentBlurFlag = 0;

      chrome.storage.sync.set({blurFlag: currentBlurFlag},
        console.log('Blur is off!'));

      chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        let activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"blurState": 0});
      });
    }

    //if Blur is off
    else if(currentBlurFlag === 0){
      currentBlurFlag = 1;

      chrome.storage.sync.set({blurFlag: currentBlurFlag},
      console.log('Blur is on'));

      chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        let activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"blurState": 1})
      });
    }
  });
});