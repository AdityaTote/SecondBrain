from app.models.tags_model import Tags

class TagsService:

    @staticmethod
    def create_tag(title):
        tag = Tags(title=title)
        tag.save()
        return tag
    
    @staticmethod
    def get_or_create_tag(title):
        try:
            return Tags.objects.get(title=title)
        except Tags.DoesNotExist:
            return TagsService.create_tag(title)

    @staticmethod
    def get_tags():
        return Tags.objects().all()
    
    @staticmethod
    def get_tag_by_title(title):
        return Tags.objects(title=title).first()
    
    @staticmethod
    def delete_tag_by_title(title):
        return Tags.objects(title=title).delete()