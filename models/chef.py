from datetime import datetime
from extensions import db


class Chef(db.Model):
    __tablename__ = 'chefs'

    id = db.Column(db.Integer, primary_key=True)

    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)

    position = db.Column(db.String(50), nullable=False)
    experience_years = db.Column(db.Integer, nullable=False)

    salary = db.Column(db.Float, nullable=False)

    is_active = db.Column(db.Boolean, default=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    menus = db.relationship(
        'Menu',
        backref='chef',
        lazy=True,
        cascade='all, delete'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'position': self.position,
            'experience_years': self.experience_years,
            'salary': self.salary,
            'is_active': self.is_active,

        }
