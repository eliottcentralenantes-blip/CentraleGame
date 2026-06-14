import os
from dotenv import load_dotenv
import psycopg2


load_dotenv() #reads the .env file
    

def get_db_connection():
    # Opens a new PostgreSQL connection using credentials from environment variables
    return psycopg2.connect(
        host="localhost",
        port=int(os.getenv("DB_PORT", 5432)),
        dbname="centrale",
        user="postgres",
        password=os.getenv("DB_PASSWORD")
    )

