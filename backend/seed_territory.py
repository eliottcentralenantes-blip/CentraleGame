from database import    get_db_connection
from psycopg2.extras import RealDictCursor


conn = get_db_connection()
cur = conn.cursor(cursor_factory=RealDictCursor)  # RealDictCursor returns rows as dicts instead of tuples
cur.execute("DELETE FROM territory")
for x in range (200) :
    for y in range (200) :
        cur.execute(
    "INSERT INTO territory (x, y, color) VALUES (%s, %s, %s)",
    (x, y, '#4F2937')
    )
conn.commit()
conn.close()
