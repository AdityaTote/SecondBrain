from mongoengine import StringField, ReferenceField, ListField
from app.models.base_documenet_model import BaseDocument
from app.models.content_model import Content
from app.models.user_model import User

class Chat(BaseDocument):
    question = StringField(required=True)
    answer = StringField(required=True)
    content_ids = ListField(ReferenceField(Content, required=True))
    user_id = ReferenceField(User, required=True)

    meta = {
        'collection': 'chats',
        'indexes': [
            'user_id',
            {'fields': ['question'], 'unique': True},
        ]
    }