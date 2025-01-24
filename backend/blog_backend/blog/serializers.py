from rest_framework import serializers
from .models import Post, Category, Tag, Comment

# Category serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']

# Tag serializer
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

# Post serializer
class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()  # Shows the username of the author
    categories = CategorySerializer(many=True)
    tags = TagSerializer(many=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'excerpt', 'status', 'created_at', 'updated_at', 'published_at', 'author', 'categories', 'tags']

# Comment serializer
class CommentSerializer(serializers.ModelSerializer):
    post = serializers.StringRelatedField()

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'email', 'content', 'created_at', 'approved']
