// Initialize butotn with users's prefered color
/*
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
*/


/*
$(function() {
  $('#btnChange').click(function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {todo: "log"});
    });
  });
});
*/



//When button in popup is clicked, change AI type
document.addEventListener('DOMContentLoaded', () => {
  var aiTypeButton = document.getElementById('btnChange');
  let currentAiFlag = 1;

  aiTypeButton.addEventListener('click', () => {
    chrome.storage.sync.set({aiFlag: currentAiFlag}, () => {
      console.log('Current AI is: ' + currentAiFlag);
    });
  });
});