import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request
from auth import auth

# CREATE_ROOMS_TABLE = (
#     "CREATE TABLE IF NOT EXISTS rooms (id SERIAL PRIMARY KEY, name TEXT);"
# )

# CREATE_TEMPS_TABLE = """CREATE TABLE IF NOT EXISTS temperatures (room_id INTEGER, temperature REAL,
#                         date TIMESTAMP, FOREIGN KEY(room_id) REFERENCES rooms(id) ON DELETE CASCADE);"""

# INSERT_ROOM_RETURN_ID = "INSERT INTO rooms (name) VALUES (%s) RETURNING id;"

# INSERT_TEMP = (
#     "INSERT INTO temperatures (room_id, temperature, date) VALUES (%s, %s, %s);"
# )

# GLOBAL_NUMBER_OF_DAYS = (
#     """SELECT COUNT(DISTINCT DATE(date)) AS days FROM temperatures;"""
# )

# GLOBAL_AVG = """SELECT AVG(temperatures) as average FROM temperatures;"""

load_dotenv()

app = Flask(__name__)
# url = os.getenv("DATABASE_URL")
# connection = psycopg2.connect(url)

# @app.post("/api/room")
# def create_room():
#     data = request.get_json()
#     name = data["name"]
#     with connection:
#         with connection.cursor() as cursor:
#             cursor.execute(CREATE_ROOMS_TABLE)
#             cursor.execute(INSERT_ROOM_RETURN_ID, (name,))
#             room_id = cursor.fetchone()[0]
#     return {"id": room_id, "message":f'Room {name} created'}, 201

@app.get("/")
def main_page():
    return "Hello World"

@app.get("/hello")
def say_hello():
    return {"message": "Hello World"}

app.register_blueprint(auth)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
