# Generated by Django 2.0.2 on 2018-04-05 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portal', '0010_auto_20180324_1439'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trainingdayroute',
            name='result',
            field=models.TextField(),
        ),
    ]