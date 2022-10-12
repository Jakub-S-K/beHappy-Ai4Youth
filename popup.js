//pp as in PopuP -_-
var currentAiFlag = 1;
const aiTypeButton = document.getElementById('ppBtnChg');
const aiTypeHeader = document.getElementById('ppHead');
const popupBody = document.getElementById('ppBody');

aiTypeHeader.innerHTML = 'Hejt';

//When button in popup is clicked, change AI type
document.addEventListener('DOMContentLoaded', () => {


  chrome.storage.sync.set({aiFlag: currentAiFlag});

  aiTypeButton.addEventListener('click', () => {
    //if hateAI is selected, change to offensiveAI
    if(currentAiFlag === 1){
      currentAiFlag = 0;

      chrome.storage.sync.set({aiFlag: currentAiFlag}, 
        console.log('Current AI mode is Offensive Language detection!'));

        aiTypeHeader.innerHTML = "Obraźliwe";

        aiTypeHeader.classList.remove('hateStyle');
        popupBody.classList.remove('hateStyle');

        aiTypeHeader.classList.add('offensiveStyle');
        popupBody.classList.add('offensiveStyle');
    }
    //if offensiveAI is selected, change to hateAI
    else if(currentAiFlag === 0){
      currentAiFlag = 1;

      chrome.storage.sync.set({aiFlag: currentAiFlag},
        console.log('Current AI mode is Hate Language detection!'));

        aiTypeHeader.innerHTML = "Hejt";

        aiTypeHeader.classList.remove('offensiveStyle');
        popupBody.classList.remove('offensiveStyle');

        aiTypeHeader.classList.add('hateStyle');
        popupBody.classList.add('hateStyle');
    }
    
  });
});