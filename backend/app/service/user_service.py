from app.models.user_model import User

class UserService:
    @staticmethod
    def create_user(email, password, username=None, profile_picture = None):
        try:
            user = User(email=email, username=username, profile_picture=profile_picture)
            user.set_password(password)
            user.save()
            return user
        except Exception as e:
            raise Exception(f"Error creating user: {str(e)}")

    @staticmethod
    def get_user(user_id):
        return User.objects.get(id=user_id)

    @staticmethod
    def update_user(user_id, **kwargs):
        user = User.objects.get(id=user_id)
        for key, value in kwargs.items():
            if key == 'password':
                user.set_password(value)
            else:
                setattr(user, key, value)
        user.save()
        return user

    @staticmethod
    def delete_user(user_id):
        User.objects.get(id=user_id).delete()
