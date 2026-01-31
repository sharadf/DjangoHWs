from flask import Flask
from extensions import db, api
from config import Config
from routes.chef import chef_ns

from routes.menu import menu_ns


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    api.init_app(app)

    api.add_namespace(menu_ns)
    api.add_namespace(chef_ns)

    with app.app_context():
        db.create_all()

    return app


app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
