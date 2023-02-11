FROM python:3.10

COPY . /app

RUN pip3 install --upgrade pip
RUN pip freeze > requirements.txt
RUN pip install -r requirements.txt
RUN pip install Flask==2.2.2
RUN pip install gensim==4.3.0

WORKDIR /app



EXPOSE 5000
CMD ["python", "app.py"]
