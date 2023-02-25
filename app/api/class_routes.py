from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import Class, db
from ..forms.class_form import ClassForm


class_routes = Blueprint("classes", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


# @class_routes.route("/")
# # @login_required
# def all_classes():
#     classes = Class.query.all()
#     return [singleClass.to_dict() for singleClass in classes]

@class_routes.route("/user")
@login_required
def user_classes():
    classes = Class.query.filter(Class.user_id == current_user.id).all()
    return [singleClass.to_dict() for singleClass in classes]


@class_routes.route("/<int:id>")
@login_required
def single_class(id):
    singleClass = Class.query.get(id)
    return singleClass.to_dict()





@class_routes.route("/", methods=["POST"])
@login_required
def create_class():
    form = ClassForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        singleClass = Class(
            user_id=current_user.id,
            name=form.data["name"],
            headline=form.data["headline"],
            description=form.data["description"]
        )

        db.session.add(singleClass)
        db.session.commit()
        return singleClass.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401



@class_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_class(id):
    current_class = Class.query.get(id)
    form = ClassForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    res = request.get_json()
    if form.validate_on_submit():
        form.populate_obj(current_class)

        current_class.name = res['name']
        current_class.headline = res['headline']
        current_class.description = res['description']

        db.session.commit()
        return current_class.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@class_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_class(id):
    deleted_class = Class.query.get(id)

    if deleted_class.user_id == current_user.id:
        db.session.delete(deleted_class)
        db.session.commit()
        return {'message': 'Successfully Deleted'}
    else:
        return {'errors': 'Unauthorized'}, 401
