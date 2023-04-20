import db
import time
from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from constants import http_status_code
from validators import is_email, is_name, is_strong_password

auth = Blueprint('auth', __name__, url_prefix='/api/v1/auth')
user_att = ['id', 'password', 'first_name', 'last_name', 'details', 'email', 'confirmation_cod', 'confirmation_tim']
new_user_att = ['password', 'first_name', 'last_name', 'details', 'email', 'confirmation_cod', 'confirmation_tim']
connec = db.get_db()

def mandatory_attributes(form):
    attributes = ['first_name', 'last_name', 'email', 'password']
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

@auth.route('/register', methods=['GET', 'POST'])
def register():
    form = request.form
    if request.method == 'POST' and mandatory_attributes(form):
        User = dict(zip(new_user_att, ['' for i in range(len(new_user_att))]))
        for form_keys in form.keys():
            User[form_keys] = form[form_keys]
        User['confirmation_tim'] = time.time()
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
                else:
                    User['password'] = generate_password_hash(User['password'])
                    cursor.execute(db.INSERT_USER_RETURN_ID, tuple(User.values()))
                    user_id = cursor.fetchone()[0]
                    message = f"You have successfully registered !\n id: {user_id}"
    elif request.method == 'POST':
        message = 'Please fill out the form !'
    return message

# @auth.post('/register')
# def register():
#     username = request.json['username']
#     email = request.json['email']
#     password = request.json['password']

#     if len(password) < 6:
#         return jsonify({"error" : "Password is too short"}), HTTP_400_BAD_REQUEST
    
#     if len(username) < 3:
#         return jsonify({"error" : "Username is too short"}), HTTP_400_BAD_REQUEST

#     if not username.isalnum() or " " in username:
#         return jsonify({"error" : "Username should be alphanumeric, also no spaces"}), HTTP_400_BAD_REQUEST

#     pwd_hash = generate_password_hash(password)

#     return "User created"

@auth.get("/me")
def me():
    return {"user": "me"}