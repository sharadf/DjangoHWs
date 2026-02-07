from flask_restx import Namespace, fields, Resource

from flask_rest_api.extensions import db
from flask_rest_api.models.chef import Chef
from flask_rest_api.models.menu import Menu

menu_ns = Namespace('menus', description='Menu operations')

menu_model = menu_ns.model('Menu', {
    'name': fields.String(required=True),
    'price': fields.Float(required=True),
    'chef_id': fields.Integer(required=True)
})


@menu_ns.route('/')
class MenuList(Resource):

    def get(self):
        menus = Menu.query.all()
        return [
            {
                'id': m.id,
                'name': m.name,
                'price': m.price
            }
            for m in menus], 200

    @menu_ns.expect(menu_model, validate=True)
    def post(self):
        data = menu_ns.payload

        chef = Chef.query.get_or_404(data['chef_id'])

        new_menu = Menu(**data)
        db.session.add(new_menu)
        db.session.commit()

        return {
            'id': new_menu.id,
            'name': new_menu.name,
            'price': new_menu.price}, 201


@menu_ns.route('/<int:id>')
class MenuItem(Resource):

    def get(self, id):
        menu = Menu.query.get(id)
        if not menu:
            return {'message': 'Menu not found'}, 404
        return menu.to_dict()

    def delete(self, id):
        delete_menu = Menu.query.get_or_404(id)

        db.session.delete(delete_menu)
        db.session.commit()
        return {"message": "Menu deleted"}, 204

    @menu_ns.expect(menu_model, validate=True)
    def put(self, id):
        change_menu = Menu.query.get_or_404(id)
        data = menu_ns.payload

        if 'name' in data:
            change_menu.name = str(data['name'])

        if 'price' in data:
            change_menu.price = float(data['price'])

        db.session.commit()

        return change_menu.to_dict(), 200
