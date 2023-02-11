# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request
import gensim
import sys
import logging
import datetime
from pytz import timezone


app = Flask(__name__)

print("START FLASK SERVER BOOT", file=sys.stdout)
print("MODEL LOAD...", file=sys.stdout)
# 위키피디아 데이터셋 학습 모델
ko_model = gensim.models.fasttext.load_facebook_model('kowiki.bin')
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


def calc_score(work, resume):
    w = 10
    d = 1
    pw = 2
    avg = 0
    cnt = 0
    for i in work["guestHouseTypes"]:
        for j in resume["guestHouseTypes"]:
            avg += ko_model.wv.similarity(i, j)
            cnt += 1

    for i in work["personTypes"]:
        for j in resume["personTypes"]:
            avg += ko_model.wv.similarity(i, j) * pw
            cnt += 1
    return str(int(avg ** 2 / cnt * w) + d)


@app.post('/sim')
def app_main():  # put application's code here
    log(request, "FUNC CALL")
    params = request.get_json()
    size = len(params["resumes"])
    for i in range(size):
        params["resumes"][i]["score"] = calc_score(params["work"], params["resumes"][i])
    log(request, "FUNC PROCESS DONE")
    return jsonify(params), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0')
