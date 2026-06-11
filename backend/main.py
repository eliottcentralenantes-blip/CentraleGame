from fastapi import FastAPI
import psycopg2
from psycopg2.extras import RealDictCursor



    
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
def dashboard():
    conn = get_db_connection()        # 1. open connection
    cur = conn.cursor(cursor_factory=RealDictCursor)  # 2. create cursor
    cur.execute("SELECT name, color, pixels FROM clans")  # 3. run query
    rows = cur.fetchall()             # 4. get all results
    conn.close()                      # 5. close connection
    return rows                       # 6. send back

# Helper function to connect to the database    
def get_db_connection():
    return psycopg2.connect(
        host="localhost",
        port=5432,
        dbname="centrale",
        user="postgres",
        password="mypassword"
    )