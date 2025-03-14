from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
import random
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")
MONGO_URI = f"mongodb+srv://LootBoxLabs:{MONGO_PASSWORD}@cluster0.hc6vi.mongodb.net/LootBoxLabsDB?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(MONGO_URI, server_api=ServerApi('1'))
db = client["LootBoxLabsDB"]

users_collection = db["Users"]
boxes_collection = db["Boxes"]

@app.route('/')
def home():
    return jsonify({"message": "Flask server is running!"}), 200

@app.route('/add', methods=['POST'])
def add_item():
    data = request.json
    if not data or "name" not in data or "chance" not in data:
        return jsonify({"error": "Invalid input"}), 400

    item = {"name": data["name"], "chance": data["chance"]}
    users_collection.insert_one(item)
    return jsonify({"message": "Item added successfully!"}), 201

@app.route('/remove/<string:item_id>', methods=['DELETE'])
def remove_item(item_id):
    result = users_collection.delete_one({"_id": item_id})
    if result.deleted_count == 0:
        return jsonify({"error": "Item not found"}), 404
    return jsonify({"message": "Item removed successfully!"}), 200

@app.route('/update/<string:item_id>', methods=['PUT'])
def update_item(item_id):
    data = request.json
    if "chance" not in data:
        return jsonify({"error": "Invalid input"}), 400

    result = users_collection.update_one({"_id": item_id}, {"$set": {"chance": data["chance"]}})
    if result.matched_count == 0:
        return jsonify({"error": "Item not found"}), 404
    return jsonify({"message": "Item updated successfully!"}), 200

@app.route('/lootbox', methods=['GET'])
def lootbox():
    items = list(users_collection.find({}))
    if not items:
        return jsonify({"error": "No items in lootbox"}), 404

    rand_number = random.randint(1, 10000)
    for item in items:
        if rand_number <= item["chance"] * 100:
            return jsonify({"reward": item["name"]}), 200

    return jsonify({"reward": "No item won"}), 200

@app.route('/boxes', methods=['GET'])
def get_boxes():
    boxes = list(boxes_collection.find({}))
    if not boxes:
        return jsonify({"error": "No boxes found"}), 404

    return jsonify(boxes), 200

@app.route('/users/sync', methods=['POST'])
def sync_user():
    data = request.json
    if not data or "clerkId" not in data:
        return jsonify({"error": "Invalid input"}), 400
    
    # Check if user already exists
    existing_user = users_collection.find_one({"clerkId": data["clerkId"]})
    
    if existing_user:
        # Update existing user
        users_collection.update_one(
            {"clerkId": data["clerkId"]},
            {"$set": data}
        )
        return jsonify({"message": "User updated successfully!"}), 200
    else:
        # Create new user
        users_collection.insert_one(data)
        return jsonify({"message": "User created successfully!"}), 201

if __name__ == '__main__':
    app.run(debug=True, port=5001)
