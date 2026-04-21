from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DB_FILE = '/tmp/workouts.db'

# Initialize database
def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS workouts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            workout_type TEXT NOT NULL,
            duration INTEGER NOT NULL,
            calories INTEGER NOT NULL
        )
    """)
    conn.commit()
    conn.close()

init_db()

# Home route
@app.route('/')
def home():
    return jsonify({
        "message": "Flask Backend is Running",
        "version": "1.0",
        "routes": {
            "GET all workouts": "/api/workouts",
            "POST new workout": "/api/workouts",
            "health check": "/health"
        }
    })

# Health check
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK'})

# Get all workouts
@app.route('/api/workouts', methods=['GET'])
def get_workouts():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT * FROM workouts ORDER BY id DESC")
    rows = c.fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

# Add new workout
@app.route('/api/workouts', methods=['POST'])
def add_workout():
    data = request.json
    
    workout_type = data.get('type') or data.get('workout_type')
    duration = data.get('duration')
    calories = data.get('calories')
    
    if not workout_type:
        return jsonify({'error': 'Missing workout_type'}), 400
    
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("INSERT INTO workouts (workout_type, duration, calories) VALUES (?, ?, ?)",
              (workout_type, duration, calories))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Workout added successfully'}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)