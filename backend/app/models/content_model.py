from mongoengine import StringField, ListField, ReferenceField, EnumField
from enum import Enum
from app.models.base_documenet_model import BaseDocument
from app.models.tags_model import Tags
from app.models.user_model import User

class Types(Enum):
    YOUTUBE = "youtube"
    TWITTER = "twitter"
    INSTAGRAM = "instagram"
    OTHER = "other"

class Content(BaseDocument):
    title = StringField(min_length=1, max_length=100, required=True)
    description = StringField(min_length=1, max_length=800)
    link = StringField(min_length=1, max_length=200)
    types = EnumField(Types, required=True)
    tags = ListField(ReferenceField(Tags, required=True))
    user_id = ReferenceField(User, required=True)

    meta = {
        'collection': 'contents',
        'indexes': [
            'title',
            'types',
            'user_id',
            {'fields': ['tags'], 'sparse': True}
        ]
    }