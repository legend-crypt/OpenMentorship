from django.db import models
import uuid
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser

# Create your models here.

ROLE = [("Mentor", "Mentor"), ("Mentee", "Mentee")]

MENTOR_STATUS = [
    ("pending", "pending"),
    ("accepted", "accepted"),
    ("rejected", "rejected"),
]


class AccountUserProfile(models.Model):
    profile_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    phone_number = models.CharField(max_length=255, blank=True)
    profile_picture = models.ImageField(upload_to="profile_pictures", blank=True)
    bio = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(null=True, blank=True, max_length=50)

    def __str__(self):
        return self.first_name


class AccountBaseUser(BaseUserManager):
    """YelloBaseUser Base model for all users"""

    def create_user(self, email, password=None, **extra_fields):
        """create_user Creates and saves a User with the given email and password"""
        if not email:
            raise ValueError("Users must have an email address")
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        """create_superuser Creates and saves a superuser with the given email and password"""
        user = self.create_user(email, password=password, **extra_fields)
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True
        user.is_active = True
        user.save(using=self._db)
        return user


class AccountUser(AbstractBaseUser):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(verbose_name="email address", max_length=255, unique=True)
    profile = models.OneToOneField(
        AccountUserProfile, on_delete=models.CASCADE, null=True, blank=True
    )
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    verified = models.BooleanField(default=False)
    role = models.CharField(choices=ROLE, max_length=50)

    USERNAME_FIELD = "email"
    objects = AccountBaseUser()

    def has_perm(self, perm, obj=None):
        """has_perm Does the user have a specific permission?"""
        return self.is_superuser

    def has_module_perms(self, app_label):
        """has_module_perms Does the user have permissions to view the app `app_label`?"""
        return self.is_superuser

    def __str__(self):
        return self.email
    
    
    @property
    def full_name(self):
        return f"{self.profile.first_name} {self.profile.last_name} " if self.profile else ""


class VerificationCode(models.Model):
    code_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(verbose_name="email address", max_length=255)
    otp = models.CharField(max_length=255)
    time = models.DateTimeField()

    def __str__(self):
        return f"{self.otp} || {self.email}"


class PasswordResetCode(models.Model):
    code_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(verbose_name="email address", max_length=255)
    otp = models.CharField(max_length=255)
    time = models.DateTimeField()

    def __str__(self):
        return f"{self.otp} || {self.email}"


class MentorRequest(models.Model):
    mentor_request_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(
        AccountUser, on_delete=models.CASCADE, related_name="student"
    )
    mentor = models.ForeignKey(
        AccountUser, on_delete=models.CASCADE, related_name="mentor"
    )
    status = models.CharField(choices=MENTOR_STATUS, max_length=255, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.student} || {self.mentor}"
    

class Meeting(models.Model):
    meeting_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    mentor = models.ForeignKey(AccountUser, on_delete=models.CASCADE, related_name='meeting_mentor')
    mentee = models.ForeignKey(AccountUser, on_delete=models.CASCADE, related_name='mentee')
    meeting_time = models.DateTimeField(default=None, null=True)
    meeting_link = models.CharField(max_length=255, default=None, null=True)
    
    def __str__(self):
        return self.mentor.email + " || " + self.mentee.email


class Project(models.Model):
    project_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField()
    link = models.CharField(max_length=255)
    thumnail = models.ImageField(upload_to="project_thumbnails", null=True, blank=True)
    
    def __str__(self):
        return self.name


class Blog(models.Model):
    blog_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey(AccountUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    thumbnail = models.ImageField(upload_to="blog_thumbnails", null=True, blank=True)
    
    def __str__(self):
        return self.title