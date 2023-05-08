# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    mail_confirmation.py                               :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: wluong <wluong@student.42.fr>              +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/05/08 20:51:36 by wluong            #+#    #+#              #
#    Updated: 2023/05/08 23:38:55 by wluong           ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from flask import Blueprint, request, jsonify
from mail_token import confirm_token
import src.constants.http_status_code as CODE
from services.database import db as db
import datetime
from flask.ext.mail import Message
from app import app

UPDATE_CONFIRMATION = (
    "UPDATE user_account \
    SET ( \
    confirmation_tim = %s, \
    confirmed = %s) \
    WHERE email = %s"
)


connec = db.get_db()

mail = Blueprint('mail', __name__, url_prefix='/api/v1/mail')

@mail.route('/confirm/<token>')
def confirm_email(token):
    try:
        email = confirm_token(token)
    except:
        return jsonify({'error': 'The confirmation link is invalid or has expired.'}), CODE.HTTP_401_UNAUTHORIZED
    with connec:
        with connec.cursor() as cursor:
            cursor.execute('SELECT * FROM user_account WHERE email = %s', (email,))
            user = cursor.fetchone()
            if user['confirmed']:
                return jsonify({'Error': 'You already validated your mail.'}), CODE.HTTP_401_UNAUTHORIZED
            else:
                cursor.execute(UPDATE_CONFIRMATION, (datetime.datetime.now(), True, email))
            return jsonify({'message': 'success'})
        
def send_email(to, subject, template):
    msg = Message(subject,
                  recipients=[to],
                  html=template,
                  sender=app.config['MAIL_DEFAULT_SENDER'])
    mail.send(msg)
