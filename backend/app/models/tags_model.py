from mongoengine import StringField
from app.models.base_documenet_model import BaseDocument

class Tags(BaseDocument):
    title = StringField(required=True, unique=True)
    
    meta = {
        'collection': 'tags',
        'indexes': [{'fields': ['title'], 'unique': True}]
    }
