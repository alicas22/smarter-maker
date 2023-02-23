from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import Deck, db
from ..forms.deck_form import DeckForm


deck_routes = Blueprint("decks", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@deck_routes.route("/")
@login_required
def all_decks():
    decks = Deck.query.all()
    return [deck.to_dict() for deck in decks]



@deck_routes.route("/<int:id>")
@login_required
def single_deck(id):
    deck = Deck.query.get(id)
    return deck.to_dict()

# #Get current user's decks
# @deck_routes.route("/user")
# @login_required
# def user_decks():
#     decks = Deck.query.filter(Deck.owner_id == current_user.id).all()
#     return {deck.id: deck.to_dict() for deck in decks}

@deck_routes.route("/", methods=["POST"])
@login_required
def create_deck():
    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        deck = Deck(
            name=form.data['name'],
            class_id=form.data['classId'],
        )

        db.session.add(deck)
        db.session.commit()
        return deck.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@deck_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_deck(id):
    current_deck = Deck.query.get(id)
    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('>>>>>>>update deck put', form.classId)
    res = request.get_json()
    if form.validate_on_submit():
        form.populate_obj(current_deck)

        current_deck.name = res['name']
        current_deck.class_id = res['classId']

        db.session.commit()
        return current_deck.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@deck_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_deck(id):
    deleted_deck = Deck.query.get(id)

    # if deletedDeck.class.user_id == current_user.id:
    if deleted_deck:
        db.session.delete(deleted_deck)
        db.session.commit()
        return {'message': 'Successfully Deleted'}
    return {'errors': 'Unauthorized'}, 401
