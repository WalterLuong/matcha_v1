import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request, current_app
from auth import auth
import time
import re
import db

CREATE_USER_ACCOUNT_TABLE = (
    "CREATE TABLE IF NOT EXISTS user_account ( \
        id SERIAL PRIMARY KEY, \
        first_name VARCHAR(64) NOT NULL, \
        last_name VARCHAR(64) NOT NULL, \
        details TEXT, \
        nickname VARCHAR(64), \
        email VARCHAR(64) UNIQUE NOT NULL, \
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

user_att = ['id', 'first_name', 'last_name', 'details', 'nickname', 'email', 'confirmation_cod', 'confirmation_tim']

app = Flask(__name__)

# load_dotenv()

# url = os.getenv("DATABASE_URL")

# try:
#     connection = psycopg2.connect(url)
# except:
#     print("\033[1;31mDatabase is not ready...\033[m")
#     exit(1)

# connection = psycopg2.connect(url)
# with current_app.open_resources('schema.sql') as f:
#         connection.executescript(f.read().decode('utf8'))
# print("\033[1;32mDatabase is connected !\033[m")

connec = db.get_db()
with connec:
    with connec.cursor() as cursor:
        # cursor.execute('DROP TABLE IF EXISTS user_account')
        cursor.execute(CREATE_USER_ACCOUNT_TABLE)

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
        with connec:
            with connec.cursor() as cursor:
                cursor.execute('SELECT * FROM user_account WHERE email = %s', (email,))
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
                    cursor.execute(INSERT_USER_RETURN_ID, (first_name, last_name, details, nickname, email, confirmation_cod, confirmation_tim))
                    user_id = cursor.fetchone()[0]
                    message = f"You have successfully registered !\n id: {user_id}"
    elif request.method == 'POST':
        message = 'Please fill out the form !'
    return message

@app.get("/users/<int:id>")
def get_user_by_id(id):
    with connec:
        with connec.cursor() as cursor:
            cursor.execute('SELECT * FROM user_account WHERE id = %s', (id,))
            user = dict(zip(user_att, cursor.fetchone()))
            # user = str(cursor.fetchone())
            return user
        
@app.get("/users/all")
def get_all_users():
    with connec:
        with connec.cursor() as cursor:
            cursor.execute('SELECT * FROM user_account')
            user = []
            for row in cursor.fetchall():
                user.append(dict(zip(user_att, row)))
            return user


@app.get("/")
def main_page():
    return "Hello World"

@app.get("/hello")
def say_hello():
    return {"message": "Hello World"}

app.register_blueprint(auth)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
