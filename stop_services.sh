#!/bin/bash

# Function to kill process running on a specific port
kill_process_on_port() {
  PORT=$1
  PID=$(lsof -t -i:$PORT)
  if [ -n "$PID" ]; then
    echo "Killing process on port $PORT (PID: $PID)"
    kill -9 $PID
  else
    echo "No process found running on port $PORT"
  fi
}

# Kill server running on port 5000
kill_process_on_port 5000

# Kill client running on port 3000
kill_process_on_port 3000

kill_process_on_port 56965

echo "All done!"
