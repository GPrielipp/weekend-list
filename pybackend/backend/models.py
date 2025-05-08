from django.db import models

# Create your models here.
class User(models.Model):
    alpha = models.IntegerField(unique=True, primary_key=True)
    fname = models.CharField(max_length=30)
    lname = models.CharField(max_length=30)
    permissions = models.IntegerField()
    company = models.IntegerField()
    platoon = models.IntegerField()
    squad = models.IntegerField()
    phone = models.IntegerField()
    weekendCount = models.IntegerField()
    spiritPasses = models.IntegerField()

    

