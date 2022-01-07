from django.db import models
from django.contrib.auth.models import User


class UnscheduledTask(models.Model):
    task_description = models.CharField(max_length=100)
    comment = models.TextField(blank=True)
    important_flg = models.BooleanField()
    done_flg = models.BooleanField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return '{} ({})'.format(self.task_description, self.id)
