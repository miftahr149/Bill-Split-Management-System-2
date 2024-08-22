from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.
class BankData(models.Model):
  name = models.CharField(max_length=50)
  number = models.CharField(max_length=50)
  qr = models.ImageField(upload_to='qr/', blank=True)
  owner = models.ForeignKey(User, on_delete=models.CASCADE)

class Tag(models.Model):
  name = models.CharField(max_length=30)

class UserAmount(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  amount = models.IntegerField()
  receipt = models.FileField(upload_to='receipt/', blank=True)

class BillSplit(models.Model):
  name = models.CharField(max_length=50)
  host = models.ForeignKey(User, on_delete=models.CASCADE)
  tag = models.ManyToManyField(Tag, blank=True)
  description = models.TextField()
  user_amount = models.ManyToManyField(UserAmount)
  status = models.CharField(
    max_length=30,
    choices=(
      ('Ongoing', 'Ongoing'),
      ('Pending', 'Pending')
    ),
    default='Pending'
  )

class UserProfileImage(models.Model):
  image = models.ImageField(upload_to='image/', blank=True, null=True)
  user = models.ForeignKey(
    'auth.User', 
    on_delete=models.CASCADE, 
    related_name='user_image',
    null=True,
  )