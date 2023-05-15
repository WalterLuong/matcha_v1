import datetime
import math, random
from flask import Blueprint, request, jsonify, url_for
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import  jwt_required , create_access_token, create_refresh_token, get_jwt_identity, set_access_cookies, unset_jwt_cookies
from flasgger import swag_from

from services.database import db as db
from constants import http_status_code as CODE
from services.validators.validators import is_email, is_name, is_strong_password
# from services.mail.mail_token import generate_confirmation_token, confirm_token
# from services.mail.mail_confirmation import send_email
import time


auth = Blueprint('auth', __name__, url_prefix='/api/v1/auth')
user_att = ['id', 'password', 'first_name', 'last_name', 'gender_id', 'age', 'details', 'email', 'confirmation_cod', 'confirmation_tim']
new_user_att = ['password', 'first_name', 'last_name', 'gender_id', 'age', 'details', 'email', 'confirmation_cod', 'confirmation_tim']
login_user_att = ['password', 'email']

connec = db.get_db()

def mandatory_attributes(form):
    attributes = ['first_name', 'last_name', 'email', 'password', 'gender_id', 'age']
    for column in attributes:
        if not column in form:
            return False
    for column in attributes:
        if not form[column]:
            return False
    for form_attr in form.keys():
        if not form_attr in new_user_att:
            return False
    return True

def generateOTP():
    string = '0123456789ABCDEFGHIJKLMNOPRSTUVWXYZ'
    OTP = ""
    for i in range(6):
        OTP += string[math.floor(random.random() * len(string))]
    return OTP

def TS_to_age(timestamp):
    return str( int((time.time() - timestamp) / (60 * 60 * 24 * 365)) )

@auth.post('/register')
@swag_from('../../docs/auth/register.yml')
def register():
    form = request.form
    code = CODE.HTTP_400_BAD_REQUEST
    if request.method == 'POST' and mandatory_attributes(form):
        User = dict(zip(new_user_att, ['' for i in range(len(new_user_att))]))
        for form_keys in form.keys():
            User[form_keys] = form[form_keys]
        User['confirmation_tim'] = None
        User['confirmation_cod'] = generateOTP()
        User['age'] = TS_to_age(int(User['age']))
        with connec:
            with connec.cursor() as cursor:
                cursor.execute('SELECT * FROM user_account WHERE email = %s', (User['email'],))
                account = cursor.fetchone()
                if account:
                    message = "This account already exists !"
                elif not is_email(User['email']):
                    message = 'Invalid email address !'
                elif not is_strong_password(User['password']):
                    message = "Password must have at leat 8 characters, 1 uppercase, 1 lowercase and 1 special character"
                elif not is_name(User['first_name']):
                    message = "Not a valid first name"
                elif not is_name(User['last_name']):
                    message = "Not a valid last name"
                elif not int(User['age']) >= 18:
                    message = "You should are at least 18 yo."
                else:
                    User['password'] = generate_password_hash(User['password'])
                    cursor.execute(db.INSERT_USER_RETURN_ID, tuple(User.values()))
                    user_id = cursor.fetchone()[0]
                    message = f"You have successfully registered !\n {user_id}"
                    code = CODE.HTTP_201_CREATED
                    # token = generate_confirmation_token(User['email'])
    elif request.method == 'POST':
        message = 'Please fill out the form !'
    return message, code

@auth.post('/login')
@swag_from('../../docs/auth/login.yml')
def login():
    form = request.form
    email = form['email']
    password = form['password']
    with connec:
        with connec.cursor() as cursor:
            cursor.execute('SELECT id, password FROM user_account WHERE email = %s', (email,))
            user = cursor.fetchone()
            if user:
                user = dict(zip(['id', 'password'], user))
                is_pass_correct = check_password_hash(user['password'], password)
                if is_pass_correct:
                    response = jsonify({"message": "User logged in successfully"})
                    refresh =create_refresh_token(identity=user['id'])
                    access =create_access_token(identity=user['id'])
                    set_access_cookies(response, access)
                    return response, CODE.HTTP_200_OK
                return jsonify({"error" : "Wrong password"}), CODE.HTTP_401_UNAUTHORIZED
            return jsonify({"error" : "Wrong email address"}), CODE.HTTP_401_UNAUTHORIZED

@auth.post('/logout')
def logout():
    response = jsonify({"message" : "User logged out successfully"})
    unset_jwt_cookies(response)
    return response

@auth.get('/me')
@jwt_required()
@swag_from("../../docs/auth/me.yml")
def me():
    user_id = get_jwt_identity() 
    return jsonify({'id': user_id}), CODE.HTTP_200_OK

@auth.get('/token/refresh')
@jwt_required(refresh=True)
@swag_from("../../docs/auth/refresh_token.yml")
def refresh_users_token():
    identity = get_jwt_identity()
    access = create_access_token(identity=identity)
    return jsonify({'access': access}), CODE.HTTP_200_OK
