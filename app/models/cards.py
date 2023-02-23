from .db import db, environment, SCHEMA, add_prefix_for_prod



class Card(db.Model):
    __tablename__ = 'cards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    deck_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('decks.id')), nullable=False)
    question = db.Column(db.String(255), nullable=False)
    answer = db.Column(db.String(500), nullable=False)
    mastery = db.Column(db.Integer, nullable=False, default = 0)

    deck = db.relationship("Deck", back_populates = 'cards')


    def to_dict(self):
        return {
            'id': self.id,
            'deckId':self.deck_id,
            'question': self.question,
            'answer': self.answer,
            'mastery': self.mastery
        }
