from audioop import cross
from requests import request
from tensorflow import keras

import pickle

import json
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/predict", methods=["POST"])
@cross_origin()
def predict_endpoint():
    json_req = request.get_json()
    analysis_result = predict_sentiment(json_req['quote'])
    response = {
        'is_negative': analysis_result
    }
    print(analysis_result)
    return jsonify(response)


def predict_sentiment(text):
    tw = tfidf.transform([text]).toarray()
    prediction = model.predict(tw)
    if prediction[0][0] > 0.5:
        return 1
    else:
        return 0
    #print("Predicted label: ", sentiment_label[1][prediction])


tfidf = None

with open("tfidf-3.dat", "rb") as file:
    tfidf = pickle.load(file)


model = keras.models.load_model("Dense32-new-tfidf.h5")

#predict_sentiment("test 123")

app.run(host='0.0.0.0')
