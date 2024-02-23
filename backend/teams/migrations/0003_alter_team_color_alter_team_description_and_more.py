# Generated by Django 5.0.2 on 2024-02-23 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("teams", "0002_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="team",
            name="color",
            field=models.CharField(max_length=6),
        ),
        migrations.AlterField(
            model_name="team",
            name="description",
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name="team",
            name="image",
            field=models.ImageField(null=True, upload_to="team_images"),
        ),
    ]
