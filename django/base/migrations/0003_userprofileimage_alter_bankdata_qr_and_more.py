# Generated by Django 5.1 on 2024-08-22 04:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_bankdata_qr_useramount_receipt'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfileImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='C:\\Users\\mifta\\OneDrive\\Documents\\Github\\Bill-Split-Management-System-2\\django\\mediaimage/')),
            ],
        ),
        migrations.AlterField(
            model_name='bankdata',
            name='qr',
            field=models.ImageField(blank=True, upload_to='C:\\Users\\mifta\\OneDrive\\Documents\\Github\\Bill-Split-Management-System-2\\django\\mediaqr/'),
        ),
        migrations.AlterField(
            model_name='useramount',
            name='receipt',
            field=models.FileField(blank=True, upload_to='C:\\Users\\mifta\\OneDrive\\Documents\\Github\\Bill-Split-Management-System-2\\django\\mediareceipt/'),
        ),
    ]