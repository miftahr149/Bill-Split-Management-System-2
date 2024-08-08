from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class BankData(models.Model):
  name = models.CharField(max_length=50)
  number = models.CharField(max_length=50)
  # qr
  owner = models.ForeignKey(User, on_delete=models.CASCADE)

class Tag(models.Model):
  name = models.CharField(max_length=30)

class UserAmount(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  amount = models.IntegerField()
  #receipt

class BillSplit(models.Model):
  name = models.CharField(max_length=50)
  host = models.ForeignKey(User, on_delete=models.CASCADE)
  tag = models.ManyToManyField(Tag, blank=True)
  description = models.TextField()
  user_amount = models.ManyToManyField(UserAmount, on_delete=models.CASCADE)
  status = models.TextChoices(
    choices=(
      ('Ongoing', 'Ongoing'),
      ('Pending', 'Pending')
    ),
    default='Pending'
  )
  