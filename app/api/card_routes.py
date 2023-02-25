from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import Card, db
from ..forms.card_form import CardForm


card_routes = Blueprint("cards", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@card_routes.route("/")
@login_required
def all_cards():
    cards = Card.query.all()
    return {card.id: card.to_dict() for card in cards}

@card_routes.route("/<int:id>")
@login_required
def single_card(id):
    card = Card.query.get(id)
    return card.to_dict()


@card_routes.route("/", methods=["POST"])
@login_required
def create_card():
    form = CardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        card = Card(
            question=form.data["question"],
            answer=form.data["answer"],
            deck_id=form.data["deck_id"],
            mastery=0
        )

        db.session.add(card)
        db.session.commit()
        return card.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@card_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_card(id):
    current_card = Card.query.get(id)
    form = CardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    res = request.get_json()
    if form.validate_on_submit():
        form.populate_obj(current_card)

        current_card.question = res['question']
        current_card.answer = res['answer']
        current_card.mastery = res['mastery']
        db.session.commit()
        return current_card.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@card_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_card(id):
    deleted_card = Card.query.get(id)

    if(deleted_card):
        db.session.delete(deleted_card)
        db.session.commit()
        return {'message': 'Successfully Deleted'}
    else:
        return {'errors': 'Unauthorized'}, 401
