# Generated by Django 3.2.9 on 2021-11-10 02:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0002_auto_20211109_1815'),
    ]

    operations = [
        migrations.AddField(
            model_name='account_data',
            name='fullname',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]
