from mongoengine import Document, DateTimeField
import datetime

class BaseDocument(Document):
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)

    meta = { 'abstract': True }

    def saves(self, *args, **kwargs):
        self.updated_at = datetime.datetime.now()
        return super().save(*args, **kwargs)
