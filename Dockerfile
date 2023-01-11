FROM python:3.7.9

ENV PYTHONUNBUFFERED 1

RUN mkdir /srv/cinstagram

ADD . /srv/docker-server

WORKDIR /srv/docker-server

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 80
