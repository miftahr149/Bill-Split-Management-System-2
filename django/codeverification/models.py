from django.db import models
from django.contrib.auth.models import User
import secrets
import string

# Create your models here.
class CodeVerification(models.Model):
  id = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
  current_email = models.EmailField(blank=True, null=True)
  new_email = models.EmailField()
  code_verification = models.CharField(max_length=4)

  def save(self, **kwargs) -> None:
    self.code_verification = ''.join(secrets.choice(string.digits) for _ in range(4))
    return super().save(**kwargs)
  
  def __str__(self) -> str:
    return self.current_email