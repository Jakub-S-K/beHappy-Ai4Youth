//pp as in PopuP -_-
var currentAiFlag = 1;
var currentBlurFlag = 1;

const aiTypeButton = document.getElementById('ppBtnChg');
const aiPPHeader = document.getElementById('ppHead');
const aiPPBlur = document.getElementById('ppBtnBlur');

const popupStyleElements = [document.getElementById('ppBody'), document.getElementById('ppBtnChg'), document.getElementById('ppBtnBlur')];

aiPPHeader.innerHTML = 'Hejt';

//Popup Buttons interactions
document.addEventListener('DOMContentLoaded', () => {

  //AI Mode Button
  chrome.storage.sync.set({aiFlag: currentAiFlag});
  aiTypeButton.addEventListener('click', () => {
    //if hateAI is selected, change to offensiveAI
    if(currentAiFlag === 1){
      currentAiFlag = 0;

      chrome.storage.sync.set({aiFlag: currentAiFlag}, 
        console.log('Current AI mode is Offensive Language detection!'));

        aiPPHeader.innerHTML = "Obraźliwe";

       for(let i = 0; i < popupStyleElements.length; i++){
          popupStyleElements[i].classList.remove('hateStyle');
          popupStyleElements[i].classList.add('offensiveStyle');
        }
    }
    //if offensiveAI is selected, change to hateAI
    else if(currentAiFlag === 0){
      currentAiFlag = 1;

      chrome.storage.sync.set({aiFlag: currentAiFlag},
        console.log('Current AI mode is Hate Language detection!'));

        aiPPHeader.innerHTML = "Hejt";

        for(let i = 0; i < popupStyleElements.length; i++){
          popupStyleElements[i].classList.remove('offensiveStyle');
          popupStyleElements[i].classList.add('hateStyle');
        }
    }
    
  });

  chrome.storage.sync.set({blurFlag: currentBlurFlag});
  aiPPBlur.addEventListener('click', () => {
    //if Blur is on
    if(currentBlurFlag === 1){
      currentBlurFlag = 0;

      chrome.storage.sync.set({blurFlag: currentBlurFlag},
        console.log('Blur is off!'));
    }
    //if Blur is off
    else if(currentBlurFlag === 0){
      currentBlurFlag = 1;

      chrome.storage.sync.set({blurFlag: currentBlurFlag},
      console.log('Blur is on'));
    }
  });
});