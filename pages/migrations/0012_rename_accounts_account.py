# Generated by Django 4.0.1 on 2022-05-03 07:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0011_rename_account_data_accounts'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Accounts',
            new_name='Account',
        ),
    ]