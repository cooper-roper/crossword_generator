from flask import Flask, request, jsonify

app = Flask(__name__)

# Create a route to handle POST requests from the frontend
@app.route('/endpoint', methods=['POST'])
def handle_data():
    # Get the JSON data from the request
    data = request.get_json()

    # Extract gridData and topic from the JSON data
    grid_data = data.get('gridData')
    topic = data.get('topic')

    print(grid_data, topic)

    # Return a response (optional)
    return jsonify({'message': 'Data received successfully'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
