from django.db import models
import uuid
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
# Create your models here.



class YelloUserProfile(models.Model):
    profile_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    phone_number = models.CharField(max_length=255, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures', blank=True)
    bio = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.user.email
    
    
class YelloBaseUser(BaseUserManager):
    """YelloBaseUser Base model for all users    
    """
    def create_user(self, email, password=None, **extra_fields):
        """create_user Creates and saves a User with the given email and password
        """
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            email=self.normalize_email(email), **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password, **extra_fields):
        """create_superuser Creates and saves a superuser with the given email and password
        """
        user = self.create_user(
            email,
            password=password, **extra_fields
        )
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)
        return user
    
    
class YelloUser(AbstractBaseUser):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    profile = models.OneToOneField(YelloUserProfile, on_delete=models.CASCADE, null=True)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    verified = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    objects = YelloBaseUser()
    
    def has_perm(self, perm, obj=None):
        """has_perm Does the user have a specific permission?
        """
        return self.is_superuser
    
    def has_module_perms(self, app_label):
        """has_module_perms Does the user have permissions to view the app `app_label`?
        """
        return self.is_superuser
    
    def __str__(self):
        return self.email
    


class VerificationCode(models.Model):
    code_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(verbose_name='email address', max_length=255)
    otp = models.CharField(max_length=255)
    time = models.DateTimeField()
    
    def __str__(self):
        return f"{self.otp} || {self.email}"
    
    
class PasswordResetCode(models.Model):
    code_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(verbose_name='email address', max_length=255)
    otp = models.CharField(max_length=255)
    time = models.DateTimeField()
    
    def __str__(self):
        return f"{self.otp} || {self.email}"
