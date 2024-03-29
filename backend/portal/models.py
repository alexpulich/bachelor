from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


GRADE_CHOICES = (
        ('5a', '5a'),
        ('5a+', '5a+'),
        ('5b', '5b'),
        ('5b+', '5b+'),
        ('5c', '5c'),
        ('5c+', '5c+'),
        ('6a', '6a'),
        ('6a+', '6a+'),
        ('6b', '6b'),
        ('6b+', '6b+'),
        ('6c', '6c'),
        ('6c+', '6c+'),
        ('7a', '7a'),
        ('7a+', '7a+'),
        ('7b', '7b'),
        ('7b+', '7b+'),
        ('7c', '7c'),
        ('7c+', '7c+'),
        ('8a', '8a'),
        ('8a+', '8a+'),
        ('8b', '8b'),
        ('8b+', '8b+'),
        ('8c', '8c'),
        ('8c+', '8c+'),
        ('9a', '9a'),
        ('9a+', '9a+'),
        ('9b', '9b'),
        ('9b+', '9b+'),
        ('9c', '9c'),
        ('9c+', '9c+'),
    )


RESULT_CHOICES = (
    ('F', 'FLASH'),
    ('SG', 'SECOND GO'),
    ('RP', 'RED POINT'),
)


GRADES = ('5a','5a+','5b','5b+','5c','5c+',
          '6a','6a+','6b','6b+','6c','6c+',
          '7a','7a+','7b','7b+','7c','7c+',
          '8a','8a+','8b','8b+','8c','8c+',
          '9a','9a+','9b','9b+','9c','9c+'
          )

RESULT_COST = {
    'RP': 1.0,
    'SG': 1.1,
    'F' : 1.2,
}

def get_grade_cost(grade):
    try:
        index = GRADES.index(grade)
        cost = 400 + 50 * index
    except ValueError:
        cost = 0

    return cost


class TimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SocialNetwork(TimeStampedModel):
    name = models.CharField(max_length=20)
    base_url = models.URLField()


class SocialNetworkLink(TimeStampedModel):
    url = models.URLField()
    network = models.ForeignKey(
        SocialNetwork,
        on_delete=models.SET_NULL,
        null=True
    )


class ClimbingKind(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return str(self.name)


class ClimbingWall(TimeStampedModel):
    name = models.CharField(max_length=255)
    logo = models.ImageField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    kinds = models.ManyToManyField(ClimbingKind)
    address = models.CharField(max_length=255, null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    contacts = models.TextField(null=True, blank=True)
    networks = models.ManyToManyField(SocialNetworkLink, null=True, blank=True)
    open_time = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return str(self.name)


class Route(TimeStampedModel):
    climbingwall = models.ForeignKey(
        ClimbingWall,
        related_name='routes',
        on_delete=models.SET_NULL,
        null=True
    )
    author = models.ForeignKey(
        User,
        related_name='routes',
        on_delete=models.SET_NULL,
        null=True
    )
    name = models.CharField(max_length=255)
    grade = models.CharField(max_length=3, choices=GRADE_CHOICES)
    color = models.CharField(max_length=255)

    rank = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    kind = models.ForeignKey(
        ClimbingKind,
        related_name='routes',
        on_delete=models.SET_NULL,
        null=True
    )

    description = models.CharField(max_length=255, null=True)

    def __str__(self):
        return "%s (%s)" % (str(self.name), str(self.grade))


class RoutePicture(TimeStampedModel):
    image = models.ImageField(null=True, upload_to='media/routes/')
    route = models.ForeignKey(
        Route,
        related_name='pictures',
        on_delete=models.CASCADE
    )
    active = models.BooleanField(default=True)


class ClimbingwallPicture(TimeStampedModel):
    image = models.ImageField(null=True, upload_to='media/climbingwalls/')
    climbingwall = models.ForeignKey(
        ClimbingWall,
        related_name='pictures',
        on_delete=models.CASCADE
    )
    active = models.BooleanField(default=True)


class TrainingDay(TimeStampedModel):
    comments = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.start_date)


class TrainingDayRoute(TimeStampedModel):
    training_day = models.ForeignKey(
        TrainingDay,
        related_name='training_routes',
        on_delete=models.CASCADE
    )
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    attempts = models.SmallIntegerField()
    result = models.TextField()

    def __str__(self):
        return str(self.route)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.ImageField(blank=True, null=True, upload_to='media/users/')
    networks = models.ManyToManyField(SocialNetworkLink, null=True, blank=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return ' '.join((self.user.first_name, self.user.last_name))

    def get_competitions(self):
        for participance in self.user.participation.all():
            yield participance.competition.id


class Competition(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    climbingwall = models.ForeignKey('ClimbingWall', on_delete=models.CASCADE)
    date = models.DateTimeField()

    def __str__(self):
        return self.name

    def get_results(self):
        results = []
        for participant in self.participants.all():
            points = 0
            routes_cnt = 0
            for result in participant.results.all():
                result_cost = RESULT_COST.get(result.result, 1.0)
                cost = get_grade_cost(result.route.grade) * result_cost
                points += cost
                routes_cnt += 1
            results.append({
                'user': participant.user.id,
                'first_name': participant.user.first_name,
                'last_name': participant.user.last_name,
                'points': round(points),
                'routes': routes_cnt
            })
        return sorted(results, key=lambda t: t['points'], reverse=True)


class CompetitionParticipant(models.Model):
    competition = models.ForeignKey('Competition', on_delete=models.CASCADE, related_name='participants')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='participation')

    def __str__(self):
        return '%s %s (%s)' % (self.user.first_name, self.user.last_name, self.competition.name)


class CompetitionResult(models.Model):
    participant = models.ForeignKey('CompetitionParticipant', on_delete=models.CASCADE, related_name='results')
    route = models.ForeignKey('Route', on_delete=models.CASCADE)
    result = models.CharField(max_length=2, choices=RESULT_CHOICES)

    class Meta:
        unique_together = ('participant', 'route')

    def __str__(self):
        return '%s %s - %s - %s' % (self.participant.user.first_name,
                                self.participant.user.last_name,
                                    self.route.name,
                                    self.result)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()