from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
import os

# Create your models here.
class BankData(models.Model):
  name = models.CharField(max_length=50)
  number = models.CharField(max_length=50)
  qr = models.ImageField(upload_to='qr/', blank=True)
  owner = models.ForeignKey(User, on_delete=models.CASCADE)

class Tag(models.Model):
  name = models.CharField(max_length=30)
  
  def __str__(self):
    return self.name

class UserAmount(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  amount = models.IntegerField()
  receipt = models.FileField(upload_to='receipt/', blank=True)

class BillSplit(models.Model):
  status_choices = (
    ('Ongoing', 'Ongoing'),
    ('Pending', 'Pending')
  )
  
  name = models.CharField(max_length=50)
  host = models.ForeignKey(User, on_delete=models.CASCADE)
  tag = models.ManyToManyField(Tag, blank=True)
  description = models.TextField()
  user_amount = models.ManyToManyField(UserAmount)
  status = models.CharField(max_length=30, choices=status_choices,
                            default='Pending')
  
  def __str__(self):
    return self.name

class UserProfileImage(models.Model):
  image = models.ImageField(upload_to='image/', blank=True, null=True, 
                            default='image/defaultUserProfile.jpg')
  user = models.OneToOneField(User, on_delete=models.CASCADE, 
                              related_name='user_image', null=True)
  
  def __str__(self):
    return self.user.username
  
  def save(self, *args, **kwargs):
    image_name = f'{self.user.username}.png'
    
    # Checking whether the image is already in there
    folder_path = settings.MEDIA_ROOT / 'image'
    if image_name in os.listdir(folder_path):
      os.remove(folder_path / image_name)
    
    # Upload data to the database
    self.image.name = image_name
    return super().save(*args, **kwargs)