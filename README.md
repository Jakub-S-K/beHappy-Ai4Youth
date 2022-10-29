Ai4Youth
===
## General Information
- Project name:  `beHappy`
- Authors:  `Jakub Stanula-Kaczka`,`Wiktor Koźlik`,`Piotr Chajec`
- Project form: Google Chrome extension with predicting model exposed on `localhost` moderating `reddit.com` comments.

## Installation & Dependences
- python
    - tensorflow
    - keras
    - numpy
    - sklearn
    - nltk
    - pandas
    - matplotlib
    - flask
    - flask_cors

Install all required dependencies with:

```pip install -r requirements.txt``` 

## Dataset
| Name | Download |
| ---      | ---   |
| Twitter Toxicity Sentiment Analysis | [link](https://www.kaggle.com/datasets/ashwiniyer176/toxic-tweets-dataset) |

## Use
- Train
  
  Run all cells in .ipynb notebook model 
  and tokenizer will be saved in it's directory
- Test & Run

    In order to load extension go to `Extensions` -> Set `Developer Mode` in upper right cornet to `On` -> On Upper left corner select this repository directory by clicking on `Load unpacked`

    Generally speaking you don't need to train model from scratch. You could use pretrained models contained in ```/python_api``` directory.
    Python script uses relative path so it does need to be run in folder with model and tokenizers files.
    You can test different models by changing it's names in `main.py` file.

      cd python_api
      python main.py

## Important Information
- By default all paragraphs containing offensive language are blured. To see moderated content simply hower mouse on it.
- It is possible to disable blurring completely. See extension menu for futher details.
  

## Directory Hierarchy
```
|—— .DS_Store
|—— .gitignore
|—— background.js
|—— Ai4Youth_beHappy.ipynb
|—— beHappy in English.pptx
|—— beHappy po Polsku.pptx
|—— blur.css
|—— contentScript.js
|—— content_img
|    |—— 0.png
|    \—— 1.png
|—— images
|    |—— ai_icon128.png
|    |—— ai_icon16.png
|    |—— ai_icon32.png
|    |—— ai_icon48.png
|    \—— ai_icon64.png
|—— manifest.json
|—— popup.css
|—— popup.html
|—— popup.js
|—— python_api
     |—— Dense128.h5
     |—— Dense32-new-tfidf.h5
     |—— Dense32.h5
     |—— Dense64.h5
     |—— Dense8-4.h5
     |—— main.py
     |—— model.h5
     |—— model2.h5
     |—— tfidf-2.dat
     |—— tfidf-3.dat
     |—— tfidf.dat
     \—— tokenizer_twitter_save.dat
```
## Code Details
### Tested Platform
- software
  ```
  OS: macOS Monterey 12.5, Windows 10
  Python: 3.9+
  Tensorflow: latest compiled version as for 16.10.2022, 2.8.2
  ```
- hardware
  ```
  CPUs: Apple Silicon M1 8 cores, Intel i5-9300h, Intel i5-7400
  GPUs: Apple Silicon M1 8 cores, Nvidia GeForce GTX 1650, Nvidia GTX 1660 Super
  ```
- RAM
  ```
    Trained on platforms with at least 12GB of RAM
  ```

## References
- Ai4Youth resources
- [Keras documentation](https://keras.io)
- [Stack Overflow](https://stackoverflow.com)
- [Our project's repository](https://github.com/Jakub-S-K/beHappy-Ai4Youth)  
