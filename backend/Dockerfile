FROM python:3.7

LABEL maintainer "Walter Luong <wluong@student.42.fr>"

RUN apt-get update

RUN mkdir /usr/src/api/

WORKDIR /usr/src/api/

COPY src/ .
COPY requirements.txt .

EXPOSE $PORT

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "./app.py"]
