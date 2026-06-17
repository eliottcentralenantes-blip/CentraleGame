import math
from PIL import Image
from psycopg2.extras import execute_values
from database import get_db_connection

PNG_PATH = "/home/eliottb/Documents/GAME1/ressources/plan_ECN.png"
GRID_SIZE = 200

# (terrain_name, target_RGB, threshold)
# Order matters: most visually distinctive colors checked first
TERRAINS = [
    ('sports',       ( 38, 205,   0),  50),   # (38,205,0) sampled
    ('rez',          (  0,  91, 246),  50),   # (0,91,246) sampled
    ('construction', (226, 100, 105),  50),   # (226,100,105) sampled
    ('building',     ( 16,  38,  72),  60),   # (16,38,72) sampled
    ('path',         (209, 209, 209),  45),   # (209,209,209) sampled
    # white/outside is the fallback for anything else
]

def color_distance(c1, c2):
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(c1, c2)))

def classify(r, g, b):
    for name, target, threshold in TERRAINS:
        if color_distance((r, g, b), target) < threshold:
            return name
    return 'outside'

def main():
    img = Image.open(PNG_PATH).convert('RGB')
    w, h = img.size
    side = min(w, h)
    left, top = (w - side) // 2, (h - side) // 2
    img = img.crop((left, top, left + side, top + side))
    cw, ch = img.size
    pixels = img.load()

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("ALTER TABLE territory ADD COLUMN IF NOT EXISTS ground VARCHAR DEFAULT 'outside'")

    data = []
    counts = {}

    for gy in range(GRID_SIZE):
        for gx in range(GRID_SIZE):
            # Source pixel region for this grid cell
            x0, x1 = int(gx * cw / GRID_SIZE), int((gx + 1) * cw / GRID_SIZE)
            y0, y1 = int(gy * ch / GRID_SIZE), int((gy + 1) * ch / GRID_SIZE)

            # Majority vote across all source pixels in this cell
            votes = {}
            for sy in range(y0, y1):
                for sx in range(x0, x1):
                    r, g, b = pixels[sx, sy]
                    t = classify(r, g, b)
                    votes[t] = votes.get(t, 0) + 1

            terrain = max(votes, key=votes.get)
            counts[terrain] = counts.get(terrain, 0) + 1
            data.append((terrain, gx, gy))

    # Single bulk UPDATE instead of 40 000 individual queries
    execute_values(
        cur,
        """
        UPDATE territory SET ground = v.terrain
        FROM (VALUES %s) AS v(terrain, x, y)
        WHERE territory.x = v.x::int AND territory.y = v.y::int
        """,
        data,
        template="(%s, %s, %s)"
    )

    conn.commit()
    conn.close()
    print(f"Done: {counts}")

if __name__ == "__main__":
    main()
