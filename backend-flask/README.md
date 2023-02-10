# 태그 기반 추천
## 사용 모델
- Facebook : [Fasttext](https://fasttext.cc/docs/en/crawl-vectors.html)

## Docker RUN
### 1. Docker image build
```commandline
 docker build -t jejuinn/flask-backend .
```
### 2. Docker hub login
```commandline
docker login -u <<user>> -p <<password>>
```
### 3. Docker hub push
```commandline
 docker push jejuinn/backend-flask
```
### 4. Docker image run
```commandline
 docker run -d -p 0.0.0.0:5000:5000/tcp --name backend-flask jejuinn/backend-flask
```