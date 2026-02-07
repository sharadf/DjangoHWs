from flask_rest_api.extensions import db


class Menu(db.Model):
    __tablename__ = 'menus'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)

    chef_id = db.Column(
        db.Integer,
        db.ForeignKey('chefs.id', ondelete='CASCADE'),
        nullable=False)

    def to_dict(self):
        return \
            {
                'id': self.id,
                'name': self.name,
                'price': self.price,
                "chef_id": self.chef_id,
            }