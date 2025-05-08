from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    alpha = serializers.IntegerField()
    fname = serializers.CharField(max_length=30)
    lname = serializers.CharField(max_length=30)
    permissions = serializers.IntegerField()
    company = serializers.IntegerField()
    platoon = serializers.IntegerField()
    squad = serializers.IntegerField()
    phone = serializers.IntegerField()
    weekendCount = serializers.IntegerField()
    spiritPasses = serializers.IntegerField()