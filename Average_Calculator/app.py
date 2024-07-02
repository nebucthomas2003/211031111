from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/average', methods=['POST'])
def calculate_average():
    try:
       
        data = request.get_json()

       
        if not data or 'numbers' not in data:
            return jsonify({"error": "Please provide a list of numbers"}), 400

        numbers = data['numbers']

    
        if not all(isinstance(num, (int, float)) for num in numbers):
            return jsonify({"error": "All elements must be numbers"}), 400

      
        total = sum(numbers)
        count = len(numbers)
        average = total / count

        return jsonify({"average": average, "total": total, "count": count})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
