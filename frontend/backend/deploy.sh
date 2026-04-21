#!/bin/bash

# Configuration
EC2_IP="13.202.142.27"
PORT=5000

echo "=== Starting Flask Setup ==="

# Install Python and Flask
sudo apt update && sudo apt install python3-pip -y
pip3 install flask flask-cors

# Kill existing Flask processes
pkill -f "python3 app.py" 2>/dev/null
sleep 2

# Run Flask in background
cd ~
nohup python3 app.py > flask.log 2>&1 &
sleep 5

# Check if running
if curl -s http://localhost:$PORT/health > /dev/null; then
    echo "SUCCESS! Flask is running."
    echo "=== ACCESS YOUR APP ==="
    echo "Health: http://$EC2_IP:$PORT/health"
    echo "API: http://$EC2_IP:$PORT/api/workouts"
    echo "Browser: http://$EC2_IP:$PORT"
else
    echo "FAILED. Check logs:"
    cat flask.log
fi