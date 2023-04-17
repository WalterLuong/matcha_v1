import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request
from auth import auth
import time
import re

CREATE_ROOMS_TABLE = (
    "CREATE TABLE IF NOT EXISTS rooms ( \
        id SERIAL PRIMARY KEY, \
        name TEXT);"
)

CREATE_TEMPS_TABLE = """CREATE TABLE IF NOT EXISTS temperatures (room_id INTEGER, temperature REAL,
                        date TIMESTAMP, FOREIGN KEY(room_id) REFERENCES rooms(id) ON DELETE CASCADE);"""

INSERT_ROOM_RETURN_ID = "INSERT INTO rooms (name) VALUES (%s) RETURNING id;"

INSERT_TEMP = (
    "INSERT INTO temperatures (room_id, temperature, date) VALUES (%s, %s, %s);"
)

GLOBAL_NUMBER_OF_DAYS = (
    """SELECT COUNT(DISTINCT DATE(date)) AS days FROM temperatures;"""
)

GLOBAL_AVG = """SELECT AVG(temperatures) as average FROM temperatures;"""


CREATE_USER_ACCOUNT_TABLE = (
    "CREATE TABLE IF NOT EXISTS user_account ( \
        id SERIAL PRIMARY KEY, \
        first_name VARCHAR(64), \
        last_name VARCHAR(64), \
        details TEXT, \
        nickname VARCHAR(64), \
        email VARCHAR(64), \
        confirmation_cod TEXT, \
        confirmation_tim INT \
    )"
)

INSERT_USER_RETURN_ID = "INSERT INTO user_account \
(\
first_name, \
last_name, \
details, \
nickname, \
email, \
confirmation_cod, \
confirmation_tim \
) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id"


load_dotenv()

app = Flask(__name__)
url = os.getenv("DATABASE_URL")

try:
    connection = psycopg2.connect(url)
except:
    print("\033[1;31mDatabase is not ready...\033[m")
    exit(1)

connection = psycopg2.connect(url)

print("\033[1;32mDatabase is connected !\033[m")

@app.route('/register', methods=['GET', 'POST'])
def register():
    message=''
    first_name =''
    last_name = ''
    details = ''
    email = ''
    nickname = ''
    confirmation_cod = ''
    confirmation_tim = time.time()
    form = request.form
    if request.method == 'POST' and 'first_name' in form and 'last_name' in form and 'email' in form:
        first_name = form['first_name']
        last_name = form['last_name']
        email = form['email']
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(CREATE_USER_ACCOUNT_TABLE)
                cursor.execute('SELECT * FROM user_account WHERE email=%s', (email, ))
                account = cursor.fetchone()
                if account:
                    message = "This account already exists !"
                elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
                    message = 'Invalid email address !'
                elif not first_name or not last_name or not email:
                    message = 'Please fill out the form !'
                else:
                    if 'details' in form:
                        details = form['details']
                    if 'nickname' in form:
                        nickname = form['nickname']
                    else:
                        nickname = first_name
                    if 'confirmation_cod' in form:
                        confirmation_cod = form['confirmation_cod']
                    cursor.execute(INSERT_USER_RETURN_ID, (first_name, last_name, details, email, nickname, confirmation_cod, confirmation_tim))
                    user_id = cursor.fetchone()[0]
                    message = f"You have successfully registered !\n id: {user_id}"
    elif request.method == 'POST':
        message = 'Please fill out the form !'
    return message

@app.get("/")
def main_page():
    return "Hello World"

@app.get("/hello")
def say_hello():
    return {"message": "Hello World"}

app.register_blueprint(auth)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
