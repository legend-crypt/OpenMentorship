# Generated by Django 4.2.8 on 2024-03-12 17:18

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_meetingdetail_delete_meetingdetails'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meetingdetail',
            name='meeting_id',
            field=models.UUIDField(default=uuid.UUID('686d4506-7753-4d0c-97fd-911d851a8ac3'), editable=False, primary_key=True, serialize=False),
        ),
    ]
