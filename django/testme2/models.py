from django.db import models

# Create your models here.
class Tag(models.Model):
  name = models.CharField(max_length=30)

  def __str__(self):
    return self.name

class BillSplit(models.Model):
  name = models.CharField(max_length=30)
  tag = models.ManyToManyField(Tag, related_name='tag')

  def __str__(self):
    return self.name