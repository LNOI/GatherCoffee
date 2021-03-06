# Generated by Django 3.2.9 on 2021-11-29 04:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0008_auto_20211129_1002'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account_data',
            name='address',
            field=models.CharField(blank=True, default='xxx', max_length=50),
        ),
        migrations.AlterField(
            model_name='account_data',
            name='age',
            field=models.CharField(blank=True, default='xxx', max_length=10),
        ),
        migrations.AlterField(
            model_name='account_data',
            name='email',
            field=models.CharField(blank=True, default='x', max_length=20),
        ),
        migrations.AlterField(
            model_name='account_data',
            name='fullname',
            field=models.CharField(blank=True, default='x', max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='account_data',
            name='phoneNumber',
            field=models.CharField(blank=True, default='xxxxxxxxxxxx', max_length=11),
        ),
        migrations.AlterField(
            model_name='account_data',
            name='sex',
            field=models.CharField(blank=True, default='xxx', max_length=10),
        ),
    ]
