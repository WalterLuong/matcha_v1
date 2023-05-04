from flask import Blueprint, request, jsonify
from services.database import db as db

user_att = ['id', 'password', 'first_name', 'last_name', 'details', 'email', 'confirmation_cod', 'confirmation_tim']
profile = ['id', 'first_name', "details"]

connec = db.get_db()

user = Blueprint('user', __name__, url_prefix='/api/v1/user')

@user.get("/<int:id>")
def get_user_by_id(id):
    with connec:
        with connec.cursor() as cursor:
            cursor.execute('SELECT id, first_name, details FROM user_account WHERE id = %s', (id,))
            existant = cursor.fetchone()
            if existant:
                user = dict(zip(profile, existant))
                return jsonify(user)
            return jsonify({})

        
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
