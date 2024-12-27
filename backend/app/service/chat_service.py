from app.models.chat_model import Chat

class ChatService:

    @staticmethod
    def create_chat(question, answer, link, user_id):
        chat = Chat(question=question, answer=answer, link=link, user_id=user_id)
        chat.save()
        return chat

    @staticmethod
    def get_chat_by_question(question):
        return Chat.objects(question=question).first()

    @staticmethod
    def get_chat_by_user_id(user_id):
        return Chat.objects(user_id=user_id)

    @staticmethod
    def get_chat_by_content_id(content_id):
        return Chat.objects(content_ids=content_id)

    @staticmethod
    def get_chat_by_id(chat_id):
        return Chat.objects(id=chat_id).first()

    @staticmethod
    def get_all_chats():
        return Chat.objects()

    @staticmethod
    def delete_chat(chat_id):
        chat = Chat.objects(id=chat_id).first()
        chat.delete()
        return chat