#!/bin/bash

EC2_IP="13.202.142.27"
PORT=5000

echo "=== FLASK EC2 SETUP SCRIPT ==="
echo ""

# Update and install Python
sudo apt update
sudo apt install python3 python3-pip -y

# Install Flask
pip3 install flask flask-cors

# Kill existing Flask processes
pkill -f "python3 app.py" 2>/dev/null

# Run Flask in background
cd ~
nohup python3 app.py > flask.log 2>&1 &

# Wait for startup
sleep 5

# Check if Flask is running
if ps aux | grep -v grep | grep "python3 app.py" > /dev/null; then
    echo "Flask is running!"
    echo ""
    echo "=== ACCESS YOUR APP ==="
    echo "Browser: http://$EC2_IP:$PORT"
    echo "API: http://$EC2_IP:$PORT/api/workouts"
    echo "Health: http://$EC2_IP:$PORT/health"
    echo ""
    echo "=== USEFUL COMMANDS ==="
    echo "View logs: tail -f flask.log"
    echo "Stop app: pkill -f 'python3 app.py'"
else
    echo "Flask failed to start. Check logs:"
    cat flask.log
fi