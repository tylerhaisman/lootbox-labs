from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
import random
from dotenv import load_dotenv
import array
import json
from flask_cors import CORS, cross_origin
from bson import ObjectId
from datetime import datetime, timezone


def convert_objectids(obj):
    if isinstance(obj, dict):
        return {k: convert_objectids(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_objectids(item) for item in obj]
    elif isinstance(obj, ObjectId):
        return str(obj)
    else:
        return obj


def serialize_doc(doc):
    doc["_id"] = str(doc["_id"])
    return doc


load_dotenv()


# Add a custom JSON encoder that can handle ObjectId
class MongoJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)


app = Flask(__name__)
CORS(app)

# Configure Flask to use the custom JSON encoder
app.json_encoder = MongoJSONEncoder

MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")
print(f"MONGO_PASSWORD: {MONGO_PASSWORD}")

MONGO_URI = f"mongodb+srv://LootBoxLabs:{MONGO_PASSWORD}@cluster0.hc6vi.mongodb.net/LootBoxLabsDB?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(MONGO_URI, server_api=ServerApi("1"))

try:
    client.admin.command("ping")
    print("MongoDB connection successful")
except Exception as e:
    print("MongoDB connection failed:", e)

db = client["LootBoxLabsDB"]

users_collection = db["Users"]
boxes_collection = db["Boxes"]
items_collection = db["Items"]
orders_collection = db["Orders"]


# Helper function to convert MongoDB objects to JSON serializable format
def serialize_doc(doc):
    if doc is None:
        return None

    if isinstance(doc, list):
        return [serialize_doc(item) for item in doc]

    if isinstance(doc, dict):
        for key, value in doc.items():
            if isinstance(value, ObjectId):
                doc[key] = str(value)
            elif isinstance(value, dict) or isinstance(value, list):
                doc[key] = serialize_doc(value)
        return doc

    return doc


@app.route("/")
def home():
    return jsonify({"message": "Flask server is running!"}), 200


# TEST CLERK OUTPUT
@app.route("/test", methods=["POST"])
def test_clerk():
    data = request.json
    if not data or "test" not in data:
        return jsonify({"error": "Invalid input"}), 400

    print("hello world:", data)
    return jsonify({"message": "test successful"}), 201


@app.route("/add", methods=["POST"])
def add_item():
    data = request.json
    if not data or "name" not in data or "chance" not in data:
        return jsonify({"error": "Invalid input"}), 400

    item = {"name": data["name"], "chance": data["chance"]}
    users_collection.insert_one(item)
    return jsonify({"message": "Item added successfully!"}), 201


@app.route("/remove/<string:item_id>", methods=["DELETE"])
def remove_item(item_id):
    result = users_collection.delete_one({"_id": item_id})
    if result.deleted_count == 0:
        return jsonify({"error": "Item not found"}), 404
    return jsonify({"message": "Item removed successfully!"}), 200


@app.route("/update/<string:item_id>", methods=["PUT"])
def update_item(item_id):
    data = request.json
    if "chance" not in data:
        return jsonify({"error": "Invalid input"}), 400

    result = users_collection.update_one(
        {"_id": item_id}, {"$set": {"chance": data["chance"]}}
    )
    if result.matched_count == 0:
        return jsonify({"error": "Item not found"}), 404
    return jsonify({"message": "Item updated successfully!"}), 200


@app.route("/lootbox/<string:box_name>", methods=["POST"])
def lootbox(box_name):
    try:

        # getting clerkId from the request
        data = request.json
        if not data or "clerkId" not in data:
            return jsonify({"error": "Invalid input"}), 400

        # Find the box by name
        box = boxes_collection.find_one({"BoxName": box_name})

        if not box:
            return jsonify({"error": f"Lootbox '{box_name}' not found"}), 404

        items = box.get("Probability")
        if not items or len(items) == 0:
            return jsonify({"error": "No items in this lootbox"}), 404

        # Generate random number for probability calculation
        rand_number = random.randint(1, 10000)
        currentVar = 0

        # Log for debugging
        print(f"Opening box: {box_name}, Random number: {rand_number}")
        print(f"Items probability array: {items}")

        for item in items:
            # MongoDB might return different numeric types
            item_chance = (
                int(item[0])
                if isinstance(item[0], dict) and "$numberInt" in item[0]
                else int(item[0])
            )
            item_id = (
                int(item[1])
                if isinstance(item[1], dict) and "$numberInt" in item[1]
                else int(item[1])
            )

            currentVar += item_chance
            print(
                f"Item ID: {item_id}, Chance: {item_chance}, Current threshold: {currentVar}"
            )

            if rand_number <= currentVar:
                itemWon = items_collection.find_one({"ItemID": item_id})
                if not itemWon:
                    return (
                        jsonify(
                            {"error": f"Item with ID {item_id} not found in database"}
                        ),
                        404,
                    )

                print(f"Item won: {itemWon}")

                # adding item to user's purchase history

                users_collection.update_one(
                    {"clerkId": data["clerkId"]},
                    {
                        "$push": {
                            "purchases": {
                                "box": box,
                                "item": itemWon,
                                "timestamp": datetime.now(timezone.utc).isoformat(),
                            }
                        }
                    },
                )

                return jsonify({"reward": itemWon["ItemName"]}), 200

        return jsonify({"reward": "Better luck next time"}), 200

    except Exception as e:
        print(f"Error in lootbox function: {str(e)}")
        return jsonify({"error": f"Failed to open lootbox: {str(e)}"}), 500


@app.route("/lootboxTest/<string:box_name>", methods=["POST"])
def lootbox_test(box_name):  # Fixed function name to avoid conflict
    items = boxes_collection[box_name]["Probability"]
    rewardArray = [0 for i in range((len(items)) + 2)]
    if not items:
        return jsonify({"error": "No items in lootbox"}), 404

    # Changed from 'for i in 50000' to proper Python range
    for _ in range(50000):
        rand_number = random.randint(1, 10000)
        currentVar = 0
        idx = -1  # Changed variable name to avoid shadowing the loop variable
        for item in items:
            idx += 1  # Fixed: replaced i++ with proper Python increment
            currentVar += item[0]
            if rand_number <= currentVar:
                itemWon = items_collection.find_one({"ItemID": item[1]})
                rewardArray[(len(items)) + 1] += boxes_collection[box_name]["BoxPrice"]
                rewardArray[(len(items))] += itemWon["ItemValue"]
                rewardArray[idx] += 1  # Using the new idx variable

                return jsonify({"rewardArray": rewardArray}), 200

        return jsonify({"reward": "No item won"}), 200


@app.route("/boxes", methods=["GET"])
def get_boxes():
    try:
        boxes = list(boxes_collection.find({}))
        if not boxes:
            return jsonify({"error": "No boxes found"}), 404

        # Convert ObjectId to string before returning
        serialized_boxes = serialize_doc(boxes)
        return jsonify(serialized_boxes), 200
    except Exception as e:
        print(f"Error in get_boxes: {str(e)}")
        return jsonify({"error": f"Failed to fetch boxes: {str(e)}"}), 500


@app.route("/boxes/<string:box_name>/items", methods=["GET"])
def get_box_items(box_name):
    try:
        # Find the box by name
        box = boxes_collection.find_one({"BoxName": box_name})

        if not box:
            return jsonify({"error": f"Lootbox '{box_name}' not found"}), 404

        items_data = box.get("Probability")
        if not items_data or len(items_data) == 0:
            return jsonify({"error": "No items in this lootbox"}), 404

        # Get details for each item
        box_items = []
        for item_data in items_data:
            # Extract item ID and chance
            item_id = (
                int(item_data[1])
                if isinstance(item_data[1], dict) and "$numberInt" in item_data[1]
                else int(item_data[1])
            )
            item_chance = (
                int(item_data[0])
                if isinstance(item_data[0], dict) and "$numberInt" in item_data[0]
                else int(item_data[0])
            )

            # Find item details
            item = items_collection.find_one({"ItemID": item_id})
            if item:
                # Calculate percentage chance (out of 10000)
                chance_percent = item_chance / 100.0

                box_items.append(
                    {
                        "id": item_id,
                        "name": item.get("ItemName", "Unknown Item"),
                        "value": item.get("ItemValue", 0),
                        "chance": chance_percent,
                        "image": item.get("ImagePath", ""),
                    }
                )

        return jsonify(box_items), 200

    except Exception as e:
        print(f"Error getting box items: {str(e)}")
        return jsonify({"error": f"Failed to get box items: {str(e)}"}), 500


@app.route("/users/data", methods=["POST"])
def get_user_data():
    try:
        data = request.json
        if not data or "clerkId" not in data:
            return jsonify({"error": "Invalid input"}), 400

        user = users_collection.find_one({"clerkId": data["clerkId"]})
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Recursively convert all ObjectIds
        user_cleaned = convert_objectids(user)

        return jsonify(user_cleaned), 200

    except Exception as e:
        print(f"Error getting user: {str(e)}")
        return jsonify({"error": f"Failed to get user: {str(e)}"}), 500


@app.route("/users/sync", methods=["POST"])
def sync_user():
    data = request.json
    if not data or "clerkId" not in data:
        return jsonify({"error": "Invalid input"}), 400

    # Check if user already exists
    existing_user = users_collection.find_one({"clerkId": data["clerkId"]})

    if existing_user:
        # Update existing user
        users_collection.update_one({"clerkId": data["clerkId"]}, {"$set": data})
        return jsonify({"message": "User updated successfully!"}), 200
    else:
        # Create new user
        users_collection.insert_one(data)
        return jsonify({"message": "User created successfully!"}), 201


if __name__ == "__main__":
    app.run(debug=True, port=5001)
