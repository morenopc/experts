from django.db import models


POPULARITY_CHOICES = (
    (0, 0),
    (1, 1), (2, 2), (3, 3), (4, 4), (5, 5),
    (6, 6), (7, 7), (8, 8), (9, 9), (10, 10),
)


class Expert(models.Model):
    """Expert profile"""

    picture = models.ImageField(default='static/img/default.jpeg')
    name = models.CharField(max_length=64, default='Expert name')
    popularity = models.PositiveSmallIntegerField(
        choices=POPULARITY_CHOICES, default=0)
    hours_taught = models.PositiveSmallIntegerField(default=0)
    title = models.CharField(max_length=64, default='English Student')
    education = models.CharField(max_length=64, default='Harvard University')

    description_title = models.CharField(
        max_length=64, default='Your future English tutor')
    description = models.TextField(default='Type your description here')

    hourly_rate = models.PositiveSmallIntegerField(default=35)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return '%s' % self.name
