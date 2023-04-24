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
        details TEXT, \
        email VARCHAR(128) UNIQUE NOT NULL, \
        confirmation_cod TEXT, \
        confirmation_tim INT \
    )"
)

INSERT_USER_RETURN_ID = "INSERT INTO user_account ( \
password, \
first_name, \
last_name, \
details, \
email, \
confirmation_cod, \
confirmation_tim ) \
VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id"

##########################################################################
#                              GENDER TABLE                              #
##########################################################################

CREATE_GENDER_TABLE = (
    "CREATE TABLE IF NOT EXISTS gender ( \
    id SERIAL PRIMARY KEY, \
    name VARCHAR(32) \
    )"
)

# CREATE_INTERESTED_IN_GENDER_TABLE 

def get_db():
    load_dotenv()
    url = os.getenv("DATABASE_URL")
    try:
        connection = psycopg2.connect(url)
    except:
        print("\033[1;31mDatabase is not ready...\033[m")
        exit(1)
    connection = psycopg2.connect(url)
    print("\033[1;32mDatabase is connected !\033[m")
    return connection
