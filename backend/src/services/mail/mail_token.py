# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    mail_token.py                                      :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: wluong <wluong@student.42.fr>              +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/05/08 20:21:58 by wluong            #+#    #+#              #
#    Updated: 2023/05/15 18:54:11 by wluong           ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

# from itsdangerous import URLSafeTimedSerializer

# from app import app

# def generate_confirmation_token(email):
#     serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
#     return serializer.dumps(email, salt=app.config['SECURITY_PASSWORD_SALT'])

# def confirm_token(token, expiration=3600):
#     serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
#     try:
#         email = serializer.loads(
#             token,
#             salt=app.config['SECURITY_PASSWORD_SALT'],
#             max_age=expiration
#         )
#     except:
#         return False
#     return email

