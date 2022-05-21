FROM python:3.7

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install  -r ./requirements.txt 
EXPOSE 8000
RUN python manager.py migrate
