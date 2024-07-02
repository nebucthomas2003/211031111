from flask import Flask, jsonify
import requests
from collections import deque
import time

app = Flask(__name__)

# Configuration
WINDOW_SIZE = 10
THIRD_PARTY_API_URL = "http://localhost:9876/numbers/e"  # The third-party API URL which is given
TIMEOUT = 0.5  # 500 milliseconds

# State
window = deque(maxlen=WINDOW_SIZE)

def fetch_numbers(numberid):
    try:
        response = requests.get(f"{THIRD_PARTY_API_URL}/{numberid}", timeout=TIMEOUT)
        response.raise_for_status()
        numbers = response.json().get('numbers', [])
        return numbers
    except (requests.exceptions.RequestException, ValueError):
        return []

@app.route('/numbers/<numberid>', methods=['GET'])
def get_numbers(numberid):
    if numberid not in ['p', 'f', 'e', 'r']:
        return jsonify({"error": "Invalid number ID. Use 'p', 'f', 'e', or 'r'."}), 400

    start_time = time.time()

    # Fetch numbers from third-party API
    new_numbers = fetch_numbers(numberid)

    # Track the previous state of the window
    previous_state = list(window)

    # Update the window with new unique numbers
    for num in new_numbers:
        if num not in window:
            if len(window) >= WINDOW_SIZE:
                window.popleft()
            window.append(num)

    # Calculate average
    if len(window) > 0:
        average = sum(window) / len(window)
    else:
        average = 0

    # Ensure quick response
    elapsed_time = time.time() - start_time
    if elapsed_time > TIMEOUT:
        return jsonify({"error": "Request took too long."}), 500

    return jsonify({
        "windowPrevState": previous_state,
        "windowCurrState": list(window),
        "numbers": new_numbers,
        "avg": round(average, 2)
    })

if __name__ == '__main__':
    app.run(port=9876, debug=True)
