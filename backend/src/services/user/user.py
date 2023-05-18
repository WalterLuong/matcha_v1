from flask import Blueprint, request, jsonify
from services.database import db as db
from flask_jwt_extended import  jwt_required , create_access_token, create_refresh_token, get_jwt_identity
from constants import http_status_code as CODE

user_att = ['id', 'password', 'first_name', 'last_name', 'gender_id', 'details', 'email', 'confirmation_cod', 'confirmation_tim', 'confirmed']
new_user_att = ['password', 'first_name', 'last_name', 'gender_id', 'details', 'email', 'confirmation_cod', 'confirmation_tim', 'confirmed']
profile = ['id', 'first_name', "age","details"]

connec = db.get_db()

user = Blueprint('user', __name__, url_prefix='/api/v1/user')

@user.get("/<int:id>")
@jwt_required()
def get_user_by_id(id):
    with connec:
        with connec.cursor() as cursor:
            cursor.execute('SELECT id, first_name, age, details FROM user_account WHERE id = %s', (id,))
            existant = cursor.fetchone()
            if existant:
                user = dict(zip(profile, existant))
                return jsonify(user)
            return jsonify({}), CODE.HTTP_404_NOT_FOUND

@user.get("/me")
@jwt_required()
def get_me():
    me_attributes = ['id', 'first_name', "age","bio"]
    current_user = get_jwt_identity()
    with connec:
        with connec.cursor() as cursor:
            cursor.execute('SELECT id, first_name, age, details FROM user_account WHERE id = %s', (current_user,))
            user = cursor.fetchone()
            if user:
                return jsonify(dict(zip(me_attributes, user))), CODE.HTTP_200_OK
            return jsonify({"error": "an error has occuped"}), CODE.HTTP_401_UNAUTHORIZED

@user.get("/all")
def get_all_users():
    with connec:
        with connec.cursor() as cursor:
            cursor.execute('SELECT * FROM user_account')
            user = []
            for row in cursor.fetchall():
                user.append(jsonify(dict(zip(user_att, row))))
            return user
        
@user.get("/gender/<int:id>")
def get_gender_name_user_id(id):
    with connec:
        with connec.cursor() as cursor:
            cursor.execute('SELECT gender_id FROM user_account WHERE id = %s', (id,))
            user = cursor.fetchone()
            if user:
                cursor.execute('SELECT name FROM gender WHERE id = %s', (user))
                name = cursor.fetchone()[0]
                return jsonify({"name": name})
            return jsonify({})
        
@user.get("/all-details/<int:id>")
def get_user_details(id):
    with connec:
        with connec.cursor() as cursor:
            cursor.execute('SELECT * FROM user_account WHERE id = %s', (id,))
            existant = cursor.fetchone()
            if existant:
                user = dict(zip(user_att, existant))
                return jsonify(user)
            return jsonify({})
