from app.models.share_link_model import ShareLink

class ShareLinkService:

    @staticmethod
    def create_share_link(hashs, user_id):
        share_link = ShareLink(hashs=hashs, user_id=user_id)
        share_link.save()
        return share_link
    
    @staticmethod
    def get_share_link_by_hashs(hashs):
        return ShareLink.objects(hashs=hashs).first()
    
    @staticmethod
    def get_share_link_by_user_id(user_id):
        return ShareLink.objects(user_id=user_id).first()

    @staticmethod
    def delete_share_link_by_hashs(hashs):
        ShareLink.objects(hashs=hashs).delete()