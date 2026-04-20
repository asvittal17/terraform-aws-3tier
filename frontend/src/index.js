import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  const [workouts, setWorkouts] = React.useState([]);
  const [formData, setFormData] = React.useState({ type: '', duration: '', calories: '' });
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [apiIP, setApiIP] = React.useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiIP) {
      setMessage('⚠️ Please enter the EC2 Public IP first!');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`http://${apiIP}/api/workouts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setMessage('✅ Workout added successfully!');
        setFormData({ type: '', duration: '', calories: '' });
      } else {
        setMessage('❌ Failed to add workout');
      }
    } catch (error) {
      setMessage('❌ Error connecting to backend. Make sure EC2 is running and API is deployed.');
    }
    setLoading(false);
  };

  const loadWorkouts = async () => {
    if (!apiIP) {
      setMessage('⚠️ Please enter the EC2 Public IP first!');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`http://${apiIP}/api/workouts`);
      const data = await response.json();
      setWorkouts(data);
      setMessage('');
    } catch (error) {
      setMessage('❌ Error loading workouts. Make sure EC2 is running and API is deployed.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <header>
        <h1>🏋️ Fitness Tracker App</h1>
        <p className="subtitle">3-Tier Cloud Architecture Project</p>
      </header>

      <div className="config-section">
        <label>🔧 EC2 Public IP Address:</label>
        <input
          type="text"
          placeholder="e.g., 13.232.45.67"
          value={apiIP}
          onChange={(e) => setApiIP(e.target.value)}
        />
        <small>Enter the Public IP of your EC2 instance</small>
      </div>

      {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}

      <div className="main-content">
        <div className="section">
          <h2>📝 Add Workout</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Workout Type:</label>
              <input
                type="text"
                name="type"
                placeholder="e.g., Running, Cycling, Gym"
                value={formData.type}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Duration (minutes):</label>
              <input
                type="number"
                name="duration"
                placeholder="e.g., 30"
                value={formData.duration}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Calories Burned:</label>
              <input
                type="number"
                name="calories"
                placeholder="e.g., 300"
                value={formData.calories}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : '➕ Add Workout'}
            </button>
          </form>
        </div>

        <div className="section">
          <h2>📋 View Workouts</h2>
          <button onClick={loadWorkouts} disabled={loading} className="secondary">
            {loading ? 'Loading...' : '🔄 Load Workouts'}
          </button>

          {workouts.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Duration (min)</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, index) => (
                  <tr key={index}>
                    <td>{workout.workout_type}</td>
                    <td>{workout.duration}</td>
                    <td>{workout.calories}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {workouts.length === 0 && !loading && (
            <p className="no-data">No workouts yet. Click "Load Workouts" to fetch data.</p>
          )}
        </div>
      </div>

      <footer>
        <div className="architecture-info">
          <h3>☁️ 3-Tier Architecture</h3>
          <div className="tiers">
            <span className="tier">🌐 Frontend (React)</span>
            <span className="arrow">→</span>
            <span className="tier">⚙️ Backend (EC2)</span>
            <span className="arrow">→</span>
            <span className="tier">🗄️ Database (RDS)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
