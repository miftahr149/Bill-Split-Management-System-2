from rest_framework import serializers
from .models import Tag, BillSplit
from typing import TypedDict

class TagType(TypedDict):
  name: str

class BillSplitType(TypedDict):
  name: str
  tag: list[TagType]

class TagSerializer(serializers.ModelSerializer):
  class Meta:
    model = Tag
    fields = ['name']

class BillSplitSerializer(serializers.ModelSerializer):
  tag = TagSerializer(many=True)

  class Meta:
    model = BillSplit
    fields = ['name', 'tag']
  
  def create(self, validated_data: BillSplitType):
    print('create new bill split')
    tag: list[TagType] = validated_data.pop('tag')
    
    def tag_map_func(value: TagType):
      pass
data = {
  'name': 'Dummy Bill Split',
  'description': 'testing purpose',
  'host': {'username': 'admin'},
  'tag': [
    {'name': 'Dummy Tag #1'}, 
    {'name': 'Dummy Tag #2'}
  ],
  'user_amount': [
    {'user': {'username': 'admin'}, 'amount':100, 'receipt': 'receipt/'},
  ],
  'status': 'Pending',
}