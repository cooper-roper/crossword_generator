from flask import Flask, request, jsonify
from dotenv import load_dotenv

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
    
    # TODO:
    # generate sublist word2vec or GloVe
    # backtracing algorithm
    # generate clues with LLM
    
    # letter number toggled

    # Return a response (optional)
    # return solved grid, words, and clues,
    return jsonify({'message': 'Data received successfully'})

if __name__ == '__main__':
    load_dotenv()
    app.run(host='0.0.0.0', port=5000)
