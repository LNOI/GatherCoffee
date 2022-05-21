FROM python:3.8.5-alpine
RUN pip install --upgrade pip
COPY ./requirements.txt  .
RUN pip install  -r ./requirements.txt 
EXPOSE 8000
WORKDIR /usr/src/app
ENTRYPOINT [ "sh","./entrypoint.sh" ]
