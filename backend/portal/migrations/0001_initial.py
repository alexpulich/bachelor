# Generated by Django 2.0.2 on 2018-02-08 17:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ClimbingKind',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='ClimbingWall',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=255)),
                ('logo', models.ImageField(null=True, upload_to='')),
                ('description', models.TextField(null=True)),
                ('address', models.CharField(max_length=255, null=True)),
                ('website', models.URLField(null=True)),
                ('contacts', models.TextField(null=True)),
                ('open_time', models.CharField(max_length=255, null=True)),
                ('kinds', models.ManyToManyField(to='portal.ClimbingKind')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Route',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=255)),
                ('grade', models.CharField(choices=[('5a', '5a'), ('5a+', '5a+'), ('5b', '5b'), ('5b+', '5b+'), ('5c', '5c'), ('5c+', '5c+'), ('6a', '6a'), ('6a+', '6a+'), ('6b', '6b'), ('6b+', '6b+'), ('6c', '6c'), ('6c+', '6c+'), ('7a', '7a'), ('7a+', '7a+'), ('7b', '7b'), ('7b+', '7b+'), ('7c', '7c'), ('7c+', '7c+'), ('8a', '8a'), ('8a+', '8a+'), ('8b', '8b'), ('8b+', '8b+'), ('8c', '8c'), ('8c+', '8c+'), ('9a', '9a'), ('9a+', '9a+'), ('9b', '9b'), ('9b+', '9b+'), ('9c', '9c'), ('9c+', '9c+')], max_length=3)),
                ('color', models.CharField(max_length=255)),
                ('rank', models.IntegerField(default=0)),
                ('active', models.BooleanField(default=True)),
                ('description', models.CharField(max_length=255, null=True)),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='routes', to=settings.AUTH_USER_MODEL)),
                ('climbing_wall', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='routes', to='portal.ClimbingWall')),
                ('kind', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='routes', to='portal.ClimbingKind')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='RoutePicture',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('image', models.ImageField(null=True, upload_to='')),
                ('route', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pictures', to='portal.Route')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SocialNetwork',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=20)),
                ('base_url', models.URLField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SocialNetworkLink',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('url', models.URLField()),
                ('network', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='portal.SocialNetwork')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TrainingDay',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('comments', models.TextField()),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TrainingDayRoute',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('attempts', models.SmallIntegerField()),
                ('result', models.SmallIntegerField()),
                ('route', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portal.Route')),
                ('training_day', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='training_routes', to='portal.TrainingDay')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='climbingwall',
            name='networks',
            field=models.ManyToManyField(to='portal.SocialNetworkLink'),
        ),
    ]