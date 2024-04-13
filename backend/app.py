from flask import Flask, request, jsonify
from flask_cors import CORS
from evaluate_route import evaluate_route

app = Flask(__name__)
CORS(app)

@app.route('/evaluate', methods=['POST'])
def evaluate():
    data = request.get_json()
    result = evaluate_route(data)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)