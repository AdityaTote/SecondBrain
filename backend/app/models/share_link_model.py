from mongoengine import StringField, ReferenceField
from app.models.base_documenet_model import BaseDocument
from app.models.user_model import User

class ShareLink(BaseDocument):
    hashs = StringField(required=True, unique=True)
    user_id = ReferenceField(User, required=True, unique=True)

    meta = {
        'collection': 'share_links',
        'indexes': [
            {'fields': ['hashs'], 'unique': True},
            {'fields': ['user_id'], 'unique': True}
        ]
    }