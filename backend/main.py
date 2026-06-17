from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from psycopg2.extras import RealDictCursor
from database import get_db_connection

from connection_manager import manager

    
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
    cur.execute("SELECT x, y, color, ground FROM territory")
    rows = cur.fetchall()
    conn.close()
    return rows


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    # 1. connect
    # 2. keep listening for messages in a loop
    # 3. on disconnect, clean up
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            # Broadcast the received message to all connected clients
            await manager.broadcast(data)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

