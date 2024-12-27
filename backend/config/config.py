import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MONGODB_SETTINGS = {
        'host': os.getenv('DATABASE_URL')
    }