from .db import db, environment, SCHEMA, add_prefix_for_prod



class Deck(db.Model):
    __tablename__ = 'decks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('classes.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)

    parent_class = db.relationship('Class', back_populates="decks")
    cards = db.relationship('Card', cascade="all, delete-orphan", back_populates='deck')



    def to_dict(self):
        return {
            'id': self.id,
            'classId':self.class_id,
            'name': self.name
        }
