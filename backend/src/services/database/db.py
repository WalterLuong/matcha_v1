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
        gender_id INT,\
        details TEXT, \
        email VARCHAR(128) UNIQUE NOT NULL, \
        confirmation_cod TEXT, \
        confirmation_tim INT, \
        CONSTRAINT fk_gender FOREIGN KEY(gender_id) REFERENCES gender(id) ON DELETE SET NULL\
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
confirmation_tim ) \
VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id"

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
    user_account_id INT, \
    gender_id INT, \
    CONSTRAINT fk_user FOREIGN KEY(user_account_id) REFERENCES user_account(id) ON DELETE SET NULL,\
    CONSTRAINT fk_gender FOREIGN KEY(gender_id) REFERENCES gender(id) ON DELETE SET NULL\
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
    user_account_id INT, \
    relationship_type_id INT, \
    CONSTRAINT fk_user FOREIGN KEY(user_account_id) REFERENCES user_account(id) ON DELETE SET NULL,\
    CONSTRAINT fk_relationship FOREIGN KEY(relationship_type_id) REFERENCES relationship_type(id) ON DELETE SET NULL\
    )"
)

##########################################################################
#                              USER PHOTO                                #
##########################################################################

CREATE_USER_PHOTO_TABLE = (
    "CREATE TABLE IF NOT EXISTS user_photo ( \
    id SERIAL PRIMARY KEY, \
    user_account_id INT, \
    link TEXT NOT NULL, \
    details TEXT, \
    time_added INT, \
    active BOOL, \
    CONSTRAINT fk_user FOREIGN KEY(user_account_id) REFERENCES user_account(id) ON DELETE SET NULL \
        )"
)

##########################################################################
#                              MATCHS                                    #
##########################################################################

CREATE_MATCH_TABLE = (
    """CREATE TABLE IF NOT EXISTS match (
    id SERIAL PRIMARY KEY,
    user_account_id_given INT,
    user_account_id_received INT,
    match BOOL,
    CONSTRAINT fk_user_given FOREIGN KEY(user_account_id_given) REFERENCES user_account(id) ON DELETE SET NULL,
    CONSTRAINT fk_user_received FOREIGN KEY(user_account_id_received) REFERENCES user_account(id) ON DELETE SET NULL
    )
    """
)

CREATE_BLOCK_USER_TABLE = (
    """CREATE TABLE IF NOT EXISTS block_user (
    id SERIAL PRIMARY KEY,
    user_account_id INT,
    user_account_id_blocked INT,
    CONSTRAINT fk_user FOREIGN KEY(user_account_id) REFERENCES user_account(id) ON DELETE SET NULL,
    CONSTRAINT fk_user_blocked FOREIGN KEY(user_account_id_blocked) REFERENCES user_account(id) ON DELETE SET NULL
    )
    """
)

##########################################################################
#                                CHAT                                    #
##########################################################################

CREATE_CONVERSATION_TABLE = (
    """CREATE TABLE IF NOT EXISTS conversation (
    id SERIAL PRIMARY KEY,
    user_account_id INT,
    time_started TIMESTAMP,
    time_closed TIMESTAMP DEFAULT NULL,
    CONSTRAINT fk_user FOREIGN KEY(user_account_id) REFERENCES user_account(id) ON DELETE SET NULL
    )
    """
)

CREATE_PARTICIPANT_TABLE = (
    """CREATE TABLE IF NOT EXISTS participant (
    id SERIAL PRIMARY KEY,
    conversation_id INT,
    user_account_id INT,
    time_joined TIMESTAMP,
    time_left TIMESTAMP DEFAULT NULL,
    CONSTRAINT fk_conversation FOREIGN KEY(conversation_id) REFERENCES conversation(id) ON DELETE SET NULL,
    CONSTRAINT fk_user FOREIGN KEY(user_account_id) REFERENCES user_account(id) ON DELETE SET NULL
    )"""
)

CREATE_MESSAGE_TABLE = (
    """CREATE TABLE IF NOT EXISTS message (
    id SERIAL PRIMARY KEY,
    participant_id INT,
    message_text TEXT,
    ts TIMESTAMP,
    CONSTRAINT fk_participant FOREIGN KEY(participant_id) REFERENCES participant(id) ON DELETE SET NULL
    )
    """
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
            cursor.execute('DROP TABLE IF EXISTS interested_in_gender CASCADE')
            cursor.execute(CREATE_INTERESTED_IN_GENDER_TABLE)
            cursor.execute('DROP TABLE IF EXISTS relationship_type CASCADE')
            cursor.execute(CREATE_RELATIONSHIP_TYPE_TABLE)
            cursor.execute('DROP TABLE IF EXISTS interested_in_relation CASCADE')
            cursor.execute(CREATE_INTERESTED_IN_RELATION_TABLE)
            cursor.execute('DROP TABLE IF EXISTS user_photo CASCADE')
            cursor.execute(CREATE_USER_PHOTO_TABLE)
            cursor.execute('DROP TABLE IF EXISTS match CASCADE')
            cursor.execute(CREATE_MATCH_TABLE)
            cursor.execute('DROP TABLE IF EXISTS block_user CASCADE')
            cursor.execute(CREATE_BLOCK_USER_TABLE)
            cursor.execute('DROP TABLE IF EXISTS conversation CASCADE')
            cursor.execute(CREATE_CONVERSATION_TABLE)
            cursor.execute('DROP TABLE IF EXISTS participant CASCADE')
            cursor.execute(CREATE_PARTICIPANT_TABLE)
            cursor.execute('DROP TABLE IF EXISTS message CASCADE')
            cursor.execute(CREATE_MESSAGE_TABLE)
