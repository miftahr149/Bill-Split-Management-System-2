from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.UserProfileImage)
admin.site.register(models.Tag)
admin.site.register(models.BillSplit)
admin.site.register(models.UserAmount)