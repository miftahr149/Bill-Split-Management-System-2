from django.contrib import admin
from .models import Tag, BillSplit

# Register your models here.
admin.site.register([Tag, BillSplit])
