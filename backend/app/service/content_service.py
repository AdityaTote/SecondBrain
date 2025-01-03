from app.models.content_model import Content
from app.models.content_model import Types

class ContentService:

    @staticmethod
    def create_content(title, types, tags, user_id, link):


        if link:
            content = Content(
            title=title,
            link=link,
            types=types,
            tags=tags,
            user_id=user_id
            )
            content.save()
            return content
        else:
            return("Provide either link or description")
        
    @staticmethod
    def get_content_by_user_id(user_id):
        return Content.objects(user_id=user_id).all()
    
    @staticmethod
    def get_content_by_id_and_user_id(content_id, user_id):
        return Content.objects(id=content_id, user_id=user_id).first()
        
    @staticmethod
    def get_content_by_types(types):
        return Content.objects(types=types.upper()).all()
    
    @staticmethod
    def get_content_by_tag(tags):
        return Content.objects(tags=tags).all()
    
    @staticmethod
    def get_all_content():
        return Content.objects.all()

    @staticmethod
    def delete_content(content_id):
        content = Content.objects(id=content_id).first()
        content.delete()
        return content