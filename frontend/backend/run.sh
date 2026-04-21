#!/bin/bash

# Flask Deployment Script
# Run on EC2 after SSH connection

EC2_IP="13.202.142.27"
PORT=5000

echo "=== Installing Python and Flask ==="
sudo apt update
sudo apt install python3 python3-pip -y
pip3 install flask flask-cors

echo "=== Running Flask App ==="
nohup python3 app.py > flask.log 2>&1 &
sleep 5

echo "=== Testing API ==="
curl http://localhost:$PORT/health

echo "=== Done! Access at: http://$EC2_IP:$PORT ==="