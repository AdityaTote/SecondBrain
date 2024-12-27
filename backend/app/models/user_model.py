from mongoengine import StringField
from werkzeug.security import generate_password_hash, check_password_hash
from app.models.base_documenet_model import BaseDocument

class User(BaseDocument):
    username = StringField(min_length=3, max_length=50, unique=True)
    profile_picture = StringField()
    email = StringField(unique=True, email=True)
    password = StringField(min_length=6, max_length=50)

    meta = {
        "collections": "users",
        "indexes": [
            {
                "fields": ["email", "username"],
                "unique": True
            }
        ]
    }

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"