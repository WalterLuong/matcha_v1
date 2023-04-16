FROM python:3.7

LABEL maintainer "Walter Luong <wluong@student.42.fr>"

RUN apt-get update

RUN mkdir /usr/src/api/

WORKDIR /usr/src/api/

COPY src/ .
COPY requirements.txt .

EXPOSE 5000

RUN pip install --no-cache-dir -r requirements.txt

ENV FLASK_ENV="docker"

CMD ["python", "./app.py"]
