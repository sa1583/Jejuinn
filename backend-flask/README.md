# 태그 기반 추천
## 사용 모델
- Facebook : [Fasttext](https://fasttext.cc/docs/en/crawl-vectors.html)

## Docker RUN
### 1. Docker image build
#### 윈도우, 리눅스 용 이미지를 빌드하는 경우
```commandline
 docker build --platform amd64 -t jejuinn/flask-backend .
```
#### mac 용 이미지를 빌드하는 경우
```commandline
docker build --platform arm64 -t jejuinn/flask-backend .
```

### 2. Docker hub login
```commandline
docker login -u <<user>> -p <<password>>
```
### 3. Docker image push to hub
```commandline
docker push jejuinn/flask-backend
```
### 4. Docker image pull from hub
```commandline
docker pull jejuinn/flask-backend
```
### 5. Docker image run
```commandline
docker run -d -p 0.0.0.0:5000:5000/tcp  --memory="15g" --name backend-flask jejuinn/flask-backend 
```