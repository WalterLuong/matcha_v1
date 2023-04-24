import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request, current_app
from services.auth import auth as auth
import src.services.database.db as db
from flask_jwt_extended import JWTManager
from constants import http_status_code as CODE
from flasgger import Swagger, swag_from
from config import swagger as swg

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

user_att = ['id', 'password', 'first_name', 'last_name', 'details', 'email', 'confirmation_cod', 'confirmation_tim']
profile = ['id', 'first_name', "details"]
app = Flask(__name__)

load_dotenv()

# url = os.getenv("DATABASE_URL")

# try:
#     connection = psycopg2.connect(url)
# except:
#     print("\033[1;31mDatabase is not ready...\033[m")
#     exit(1)

# connection = psycopg2.connect(url)
# with current_app.open_resources('schema.sql') as f:
#         connection.executescript(f.read().decode('utf8'))

app.config.from_mapping(
    SECRET_KEY=os.environ.get("SECRET_KEY"),
    JWT_SECRET_KEY=os.environ.get("JWT_SECRET_KEY"),

    SWAGGER={
        'title':'Matcha API',
        'uiversion':3
    },
)

connec = db.get_db()
with connec:
    with connec.cursor() as cursor:
        cursor.execute('DROP TABLE IF EXISTS user_account')
        cursor.execute(db.CREATE_USER_ACCOUNT_TABLE)

JWTManager(app)

@app.errorhandler(CODE.HTTP_404_NOT_FOUND)
def handle_404(e):
    return {"error": "Content not found"}, CODE.HTTP_404_NOT_FOUND

@app.errorhandler(CODE.HTTP_500_INTERNAL_SERVER_ERROR)
def handle_500(e):
    return {"error": "Something were wrong, please try again."}, CODE.HTTP_500_INTERNAL_SERVER_ERROR

app.register_blueprint(auth.auth)
Swagger(app, config = swg.swagger_config)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv("PORT"))
