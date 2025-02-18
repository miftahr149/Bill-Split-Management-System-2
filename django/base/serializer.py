from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from typing import TypedDict
from . import models 
from django.contrib.auth.models import User

class UserDict(TypedDict):
  username: str

class TagDict(TypedDict):
  name: str

class UserAmountDict(TypedDict):
  user: UserDict
  receipt: str
  amount: int

class BillSplitDict(TypedDict):
  name: str
  host: UserDict
  tag: list[TagDict]
  description: str
  user_amount: list[UserAmountDict]
  status: str

class RegisterUserDict(TypedDict):
  username: str
  password: str

class TokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)
    token['username'] = user.username

    userObject = models.User.objects.get(username=token['username'])
    token['role'] = 'admin' if userObject.is_superuser else 'user'
    return token

class UserSerializer(serializers.Serializer):
  username = serializers.CharField()

  def validate_username(self, value):
    try:
      models.User.objects.get(username=value)
      return value
    except models.User.DoesNotExist:
      raise serializers.ValidationError('No username found')

  def create(self, validated_data):
    user_object = models.User.objects.get(username=validated_data['username'])
    return user_object

class UserProfileImageSerializer(serializers.ModelSerializer):
  user = UserSerializer() 
  
  class Meta:
    model = models.UserProfileImage
    fields = ['image', 'user']

class TagSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Tag
    fields = ['name']

class UserAmountSerializer(serializers.ModelSerializer):
  user = UserSerializer()
    
  class Meta:
    model = models.UserAmount
    fields = ['user', 'amount']
    extra_kwargs = {'receipt': {'required': False}}

class BillSplitSerializer(serializers.ModelSerializer):
  host = UserSerializer()
  tag = TagSerializer(many=True)
  user_amount = UserAmountSerializer(many=True)
  
  class Meta:
    model = models.BillSplit
    fields = '__all__'
    extra_kwargs = {'id': {'required': False}}
    validators = []
  
  def create(self, validated_data):
    print('creating new bill split')
    host_data = validated_data.pop('host')
    host = models.User.objects.get(username=host_data['username'])
    
    tag_data = validated_data.pop('tag')
    user_amount_data = validated_data.pop('user_amount') 

    def tag_map_func(data: TagDict):
      return models.Tag.objects.get(name=data['name'])
    
    bill_split = models.BillSplit.objects.create(host=host, **validated_data)
    
    tags = list(map(tag_map_func, tag_data))
    for tag in tags: bill_split.tag.add(tag) 

    for data in user_amount_data:
      user_data = data.pop('user')
      user = models.User.objects.get(username=user_data['username'])
      models.UserAmount.objects.create(bill_split=bill_split, user=user, **data)

    return bill_split
  
  def update(self, instance: models.BillSplit, validated_data: BillSplitDict):
    print('updating bill split')
    print(f'validated_data: {validated_data}')

    instance.name = validated_data.get('name')
    instance.description = validated_data.get('description')
    instance.status = validated_data.get('status')

    instance.tag.clear()
    for tag_data in validated_data.get('tag'):
      tag_object = models.Tag.objects.get(name=tag_data['name'])
      instance.tag.add(tag_object)
    

    for user_amount in models.UserAmount.objects.filter(bill_split=instance):
      user_amount.delete()
    
    for user_amount_data in validated_data.get('user_amount'):
      user_data = user_amount_data.pop('user')
      user_object = models.User.objects.get(username=user_data['username'])
      models.UserAmount.objects.create(bill_split=instance, user=user_object, 
                                       **user_amount_data)
    instance.save()
    return instance

class RegisterUserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['username', 'password']
    extra_kwargs = {'password': {'write_only': True}}
  
  def create(self, validated_data: RegisterUserDict):
    registered_user = User.objects.create_user(
      username=validated_data.get('username'),
      password=validated_data.get('password')
    )
    return registered_user

  