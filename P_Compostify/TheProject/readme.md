# Backend in django

## Installation
Clone the repository
```bash
git clone 
```

cd into P_Compostify
```bash
cd P_Compostify
```

Create a virtual environment
```bash
virtualenv env
```
or
```bash
python -m venv env
```

Activate the virtual environment, this will depend on the platform you use, for UNIX-based systems, use
```bash
source env/Scripts/activate
```

Install dependencies
```bash
pip install -r requirements.txt
```

Run migrations in local sqlite database
```bash
python manage.py migrate
```

Create superuser
```bash
python manage.py createsuperuser
```

Start local development server
```bash
python manage.py runserver
```