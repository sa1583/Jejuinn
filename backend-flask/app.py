# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request
import numpy as np
import sys
import torch
from transformers import AutoTokenizer, AutoModel
import fasttext
import fasttext.util
import datetime
from pytz import timezone


app = Flask(__name__)
print("=========================", file=sys.stdout)
print("START FLASK SERVER BOOT |", file=sys.stdout)
print("=========================", file=sys.stdout)

# Load the fasttext model
print("FAST TEXT MODEL LOAD...", file=sys.stdout)
ko_model = fasttext.load_model('kowiki.100.bin')
print("MODEL LOAD DONE", file=sys.stdout)


# Load the BERT model
print("BERT MODEL LOAD...", file=sys.stdout)
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModel.from_pretrained("bert-base-uncased")
print("MODEL LOAD DONE", file=sys.stdout)


def log(message):
    log_date = get_log_date()
    log_message = "{0}/{2}".format(log_date, message)
    print(log_message, file=sys.stdout)


def log(req, message):
    log_date = get_log_date()
    log_message = "{0}/{1}/{2}".format(log_date, str(req), message)
    print(log_message, file=sys.stdout)


def error_log(req, error_code, error_message):
    log_date = get_log_date()
    log_message = "{0}/{1}/{2}/{3}".format(log_date, str(req), error_code, error_message)
    print(log_message, file=sys.sterr)


def get_log_date():
    dt = datetime.datetime.now(timezone("Asia/Seoul"))
    log_date = dt.strftime("%Y%m%d_%H:%M:%S")
    return log_date


def word_similarity(word1, word2):
    word_vector1 = ko_model.get_word_vector(word1)
    word_vector2 = ko_model.get_word_vector(word2)

    similarity_score = word_vector1.dot(word_vector2) / (np.linalg.norm(word_vector1) * np.linalg.norm(word_vector2))
    return similarity_score


def analysis_tags(work, resume):
    w = 10
    d = 1
    pw = 2
    avg = 0
    cnt = 0
    for i in work["guestHouseTypes"]:
        for j in resume["guestHouseTypes"]:
            # avg += ko_model.wv.similarity(i, j)
            avg += word_similarity(i, j)
            cnt += 1

    for i in work["personTypes"]:
        for j in resume["personTypes"]:
            # avg += ko_model.wv.similarity(i, j) * pw
            avg += word_similarity(i, j) * pw
            cnt += 1
    return int(avg ** 2 / cnt * w) + d


@app.post('/sim')
def app_main():  # put application's code here
    log(request, "FUNC CALL")
    params = request.get_json()
    size = len(params["resumes"])
    for i in range(size):
        params["resumes"][i]["score"] = analysis_tags(params["work"], params["resumes"][i])
        params["resumes"][i]["score"] += analysis_document(params["work"]["content"], params["resumes"][i]["content"])
    log(request, "FUNC PROCESS DONE")
    return jsonify(params), 200


@app.route('/')
def analysis_document(sent1, sent2):
    # Tokenize the sentences
    input_ids = torch.tensor(tokenizer.encode([sent1, sent2], return_tensors='pt').tolist())

    # Get the sentence embeddings
    with torch.no_grad():
        last_hidden_states = model(input_ids)[0]
        sent1_embedding = last_hidden_states[0, 0, :]
        sent2_embedding = last_hidden_states[0, 1, :]

    # Calculate the cosine similarity between the two sentence embeddings
    cos_sim = torch.nn.functional.cosine_similarity(sent1_embedding.unsqueeze(0), sent2_embedding.unsqueeze(0))

    # Return the similarity as a percentage
    return int(cos_sim.item() * 100)


if __name__ == '__main__':
    app.run(host='0.0.0.0')
