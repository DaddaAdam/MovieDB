from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

#Recuperer le model d'utilisateur
User = get_user_model()

#Override le serializer d'origine
class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password')