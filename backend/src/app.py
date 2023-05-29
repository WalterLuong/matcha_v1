import os
import psycopg2
from dotenv import load_dotenv

from flask import Flask, request, current_app
from flask_jwt_extended import JWTManager
from flasgger import Swagger

from config import swagger as swg
from constants import http_status_code as CODE
import services.database.db as db

from services.auth import auth as auth
from services.user import user as user

from flask_cors import CORS

app = Flask(__name__)

load_dotenv()

app.config.from_mapping(
    SECRET_KEY=os.environ.get("SECRET_KEY"),
    JWT_SECRET_KEY=os.environ.get("JWT_SECRET_KEY"),

    SWAGGER={
        'title':'Matcha API',
        'uiversion':3
    },
)

cors = CORS(app, support_credentials=True)

connec = db.get_db()
db.init_db(connec)
print("\033[1;32mDatabase is connected !\033[m")

JWTManager(app)

@app.errorhandler(CODE.HTTP_404_NOT_FOUND)
def handle_404(e):
    return {"error": "Content not found"}, CODE.HTTP_404_NOT_FOUND

@app.errorhandler(CODE.HTTP_500_INTERNAL_SERVER_ERROR)
def handle_500(e):
    return {"error": "Something were wrong, please try again."}, CODE.HTTP_500_INTERNAL_SERVER_ERROR

app.register_blueprint(auth.auth)
app.register_blueprint(user.user)
Swagger(app, config = swg.swagger_config)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv("PORT"))
