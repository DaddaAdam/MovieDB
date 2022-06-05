from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from .models import UserAccount
from django.core.serializers import serialize


# Create your views here.
@api_view(['GET'])
def getUserDetails(request, email):
    user = UserAccount.objects.get(email=email)
    print(user)
    data = serialize('json', [user])
    struct = json.loads(data)
    data = json.dumps(struct[0])
    print(data)
    return Response(json.loads(data), status=status.HTTP_200_OK)