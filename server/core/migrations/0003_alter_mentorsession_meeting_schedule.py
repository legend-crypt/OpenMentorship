# Generated by Django 4.2.8 on 2023-12-26 21:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_alter_mentorsession_meeting_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mentorsession',
            name='meeting_schedule',
            field=models.DateTimeField(null=True),
        ),
    ]
