from fastapi import FastAPI

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

@app.get("http://127.0.0.1:8000/leaderboard")
def dashboard() :
    return [
        {"name": "BDE", "color": "#3B82F6", "pixels": 1200},
        {"name": "BDA", "color": "#F59E0B", "pixels": 850},
        {"name": "BDS", "color": "#10B981", "pixels": 650},
    ]


