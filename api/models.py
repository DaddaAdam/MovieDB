from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext_lazy

# Create your models here.

class AccountManager(BaseUserManager):

    def create_user(self, email, user_name, password):
        
        if not email:
            raise ValueError(gettext_lazy('ERROR: You must provide an email address.'))
        email = self.normalize_email(email)
        
        user = self.model(email=email, user_name=user_name)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, user_name, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff set to True.')

        return self.create_user(email, user_name, password, is_superuser=True)

class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(unique=True)
    user_name = models.CharField(max_length=25, unique=True)
    started_at = models.DateField(auto_now=True)
    profile_picture = models.ImageField(upload_to='profile_images')
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = AccountManager()

    USERNAME_FIELD = 'user_name'

    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.user_name

    def has_module_perms(self, app_label):
       return self.is_superuser
    
    def has_perm(self, perm, obj=None):
       return self.is_superuser