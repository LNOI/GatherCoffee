# Generated by Django 3.2.9 on 2021-12-02 12:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0009_auto_20211129_1113'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account_data',
            name='phoneNumber',
            field=models.CharField(blank=True, default='xxxxxxxxxxx', max_length=11),
        ),
    ]
