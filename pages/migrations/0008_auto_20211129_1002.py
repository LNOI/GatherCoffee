# Generated by Django 3.2.9 on 2021-11-29 03:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0007_rename_friends_account_data_friend'),
    ]

    operations = [
        migrations.AddField(
            model_name='account_data',
            name='age',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AddField(
            model_name='account_data',
            name='sex',
            field=models.CharField(blank=True, max_length=10),
        ),
    ]
