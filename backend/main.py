from fastapi import FastAPI
from psycopg2.extras import RealDictCursor
from fastapi.middleware.cors import CORSMiddleware

from database import get_db_connection

    
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    # Health check endpoint — confirms the API is running
    return {"message": "Centrale Game API is alive"}


@app.get("/leaderboard")
def dashboard():
    # Returns all clans with their name, color, and pixel count for the leaderboard
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)  # RealDictCursor returns rows as dicts instead of tuples
    cur.execute("SELECT name, color, pixels FROM clans")
    rows = cur.fetchall()
    conn.close()
    return rows



@app.get("/territory")
def get_territory():     # ← unique, descriptive name
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT x, y, color FROM territory")
    rows = cur.fetchall()
    conn.close()
    return rows