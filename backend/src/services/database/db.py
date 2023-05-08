import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request

##########################################################################
#                               USER TABLE                               #
##########################################################################

CREATE_USER_ACCOUNT_TABLE = (
    "CREATE TABLE IF NOT EXISTS user_account ( \
        id SERIAL PRIMARY KEY, \
        password TEXT NOT NULL, \
        first_name VARCHAR(64) NOT NULL, \
        last_name VARCHAR(64) NOT NULL, \
        gender_id INT REFERENCES gender(id),\
        details TEXT, \
        email VARCHAR(128) UNIQUE NOT NULL, \
        confirmation_cod TEXT, \
        confirmation_tim TIMESTAMP, \
        confirmed BOOL \
    )"
)
        # FOREIGN KEY(gender_id) REFERENCES gender(id) ON DELETE CASCADE, \

INSERT_USER_RETURN_ID = "INSERT INTO user_account ( \
password, \
first_name, \
last_name, \
gender_id, \
details, \
email, \
confirmation_cod, \
confirmation_tim, \
confirmed ) \
VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id"

##########################################################################
#                              GENDER TABLE                              #
##########################################################################

CREATE_GENDER_TABLE = (
    "CREATE TABLE IF NOT EXISTS gender ( \
    id SERIAL PRIMARY KEY, \
    name VARCHAR(32) UNIQUE NOT NULL\
    )"
)

INSERT_GENDER_RETURN_ID = "INSERT INTO gender ( \
name) VALUES (%s) RETURNING id"

CREATE_INTERESTED_IN_GENDER_TABLE = (
    "CREATE TABLE IF NOT EXISTS interested_in_gender ( \
    id SERIAL PRIMARY KEY, \
    FOREIGN KEY(user_account_id) REFERENCES user_account(id) ON DELETE CASCADE,\
    FOREIGN KEY(gender_id) REFERENCES gender(id) ON DELETE CASCADE\
    )"
)

##########################################################################
#                              RELATIONSHIP                              #
##########################################################################

CREATE_RELATIONSHIP_TYPE_TABLE = (
    "CREATE TABLE IF NOT EXISTS relationship_type ( \
    id SERIAL PRIMARY KEY,\
    name VARCHAR(32) \
    )"
)

CREATE_INTERESTED_IN_RELATION_TABLE = (
    "CREATE TABLE IF NOT EXISTS interested_in_relation ( \
    id SERIAL PRIMARY KEY,\
    FOREIGN KEY(user_account_id) REFERENCES user_account(id) ON DELETE CASCADE,\
    FOREIGN KEY(relationship_type_id) REFERENCES relationship_type(id) ON DELETE CASCADE,\
    )"
)

def get_db():
    load_dotenv()
    url = os.getenv("DATABASE_URL")
    try:
        connection = psycopg2.connect(url)
    except:
        print("\033[1;31mDatabase is not ready...\033[m")
        exit(1)
    connection = psycopg2.connect(url)
    return connection

def init_db(connec):
    with connec:
        with connec.cursor() as cursor:
            cursor.execute('DROP TABLE IF EXISTS gender CASCADE')
            cursor.execute(CREATE_GENDER_TABLE)
            cursor.execute(INSERT_GENDER_RETURN_ID, ("male",))
            cursor.execute(INSERT_GENDER_RETURN_ID, ("female",))
            cursor.execute(INSERT_GENDER_RETURN_ID, ("non-binary",))
            cursor.execute('DROP TABLE IF EXISTS user_account CASCADE')
            cursor.execute(CREATE_USER_ACCOUNT_TABLE)
