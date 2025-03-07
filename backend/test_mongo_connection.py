from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve the password from the .env file
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")

# Define the MongoDB URI using the password from the env file
MONGO_URI = f"mongodb+srv://LootBoxLabs:{MONGO_PASSWORD}@cluster0.hc6vi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a MongoDB Client
client = MongoClient(MONGO_URI, server_api=ServerApi('1'))

# Test the connection
try:
    client.admin.command('ping')
    print("✅ Successfully connected to MongoDB!")
except Exception as e:
    print("❌ Connection failed:", e)
