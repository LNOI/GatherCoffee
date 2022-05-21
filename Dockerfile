FROM python:3.7

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /usr/src/app
COPY requirements.txt  ./requirements.txt  
RUN pip install --upgrade pip
RUN pip install  -r ./requirements.txt 
EXPOSE 8000

