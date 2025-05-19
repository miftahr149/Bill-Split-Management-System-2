set "django-folder-dir=./django"

powershell -Command "code ./react/front-end; %django-folder-dir%/.env/bin/activate; code %django-folder-dir%; python %django-folder-dir%/manage.py runserver" 