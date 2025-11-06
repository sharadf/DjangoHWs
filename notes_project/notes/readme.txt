# 📝 Django Notes App

Простое CRUD-приложение на Django для создания, просмотра, редактирования, удаления и поиска заметок.
Проект построен с нуля на чистом Django (без дополнительных фреймворков на фронтенде) с минимальными встроенными стилями.

---

## ⚙️ Технологии и структура проекта

**Фреймворк:** Django 5.x
**Шаблонизатор:** Django Template Language (встроенный)
**База данных:** SQLite
**Архитектура:** MVT (Model–View–Template)

### 📂 Структура проекта

notes_project/
│
├── notes/ # Основное приложение
│ ├── migrations/
│ ├── static/ # Стили (CSS)
│ ├── templates/ # HTML-шаблоны
│ │ ├── base.html
│ │ ├── note_list.html
│ │ ├── note_detail.html
│ │ ├── note_form.html
│ │ └── note_confirm_delete.html
│ ├── admin.py
│ ├── models.py
│ ├── views.py
│ ├── forms.py
│ ├── urls.py
│ └── tests.py
│
├── notes_project/
│ ├── init.py
│ ├── settings.py
│ ├── urls.py
│ └── wsgi.py
│
├── db.sqlite3
├── manage.py
├── requirements.txt
└── README.md


cd notes_project


2️⃣ Создайте и активируйте виртуальное окружение
python -m venv venv

Windows:
venv\Scripts\activate


3️⃣ Установите зависимости
pip install -r requirements.txt

