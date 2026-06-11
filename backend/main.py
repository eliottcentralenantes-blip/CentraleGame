from fastapi import FastAPI
import psycopg2


    
app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Centrale Game API is alive"}

@app.get("/leaderboard")
def leaderboard() :
    return [
        {"name": "BDE", "color": "#3B82F6", "pixels": 1200},
        {"name": "BDA", "color": "#F59E0B", "pixels": 850},
        {"name": "BDS", "color": "#10B981", "pixels": 650},
    ]

/* open a connection to the database and return it */
def get_db_connection():
    return psycopg2.connect(
        host="localhost",
        port=5432,
        dbname="centrale",
        user="postgres",
        password="mypassword"
    )