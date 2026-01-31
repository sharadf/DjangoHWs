from flask import request

from flask_restx import fields, Namespace, Resource

from extensions import db
from models.chef import Chef

chef_ns = Namespace('chefs', description='Chefs operations')

chef_model = chef_ns.model('Chef', {
    'first_name': fields.String(required=True),
    'last_name': fields.String(required=True),
    'position': fields.String(required=True),
    'experience_years': fields.Integer(required=True),
    'salary': fields.Float(required=True)
})


@chef_ns.route("/")
class ChefList(Resource):

    def get(self):
        chefs = Chef.query.all()
        return [
            {
                "id": ch.id,
                "first_name": ch.first_name,
                "last_name": ch.last_name,
                "position": ch.position,
                "experience_years": ch.experience_years,
                "salary": ch.salary,
                "is_active": ch.is_active,
                "created_at": ch.created_at.isoformat()
            }
            for ch in chefs], 200

    @chef_ns.expect(chef_model, validate=True)
    def post(self):
        data = chef_ns.payload

        new_chef = Chef(**data)
        db.session.add(new_chef)
        db.session.commit()

        return {
            "id": new_chef.id,
            "first_name": new_chef.first_name,
            "last_name": new_chef.last_name,
            "position": new_chef.position,
            "experience_years": new_chef.experience_years,
            "salary": new_chef.salary,
            "is_active": new_chef.is_active,
            "created_at": new_chef.created_at.isoformat()
        }, 201


@chef_ns.route("/<int:id>")
class ChefItem(Resource):
    def get(self, id):
        chef = Chef.query.get_or_404(id)
        return {
            "id": chef.id,
            "first_name": chef.first_name,
            "last_name": chef.last_name,
            "position": chef.position,
            "is_active": chef.is_active,
            "created_at": chef.created_at.isoformat()
        }, 200

    def delete(self, id):
        delete_chef = Chef.query.get_or_404(id)
        db.session.delete(delete_chef)
        db.session.commit()
        return {"message": "Chef deleted successfully."}, 204

    @chef_ns.expect(chef_model, validate=True)
    def put(self, id):
        chef = Chef.query.get_or_404(id)
        data = chef_ns.payload

        if 'first_name' in data:
            chef.first_name = str(data['first_name'])

        if 'last_name' in data:
            chef.last_name = str(data['last_name'])

        if 'position' in data:
            chef.position = str(data['position'])

        if 'experience_years' in data:
            chef.experience_years = int(data['experience_years'])

        if 'salary' in data:
            chef.salary = float(data['salary'])

        db.session.commit()

        return chef.to_dict(), 200


@chef_ns.route('/<int:id>/menus')
class ChefMenus(Resource):
    def get(self, id):
        chef = Chef.query.get_or_404(id)
        return [menu.to_dict() for menu in chef.menus], 200
