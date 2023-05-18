from flask import Blueprint, request, jsonify
from services.database import db as db
from flask_jwt_extended import  jwt_required , create_access_token, create_refresh_token, get_jwt_identity
from constants import http_status_code as CODE

connec = db.get_db()

match = Blueprint('match', __name__, url_prefix='/api/v1/match')

@match.get('/match_list')
@jwt_required()
def list_user_to_match():
    users = []
    

