from .db import db, environment, SCHEMA, add_prefix_for_prod



class Class(db.Model):
    __tablename__ = 'classes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    headline = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(2000), nullable=False)

    user = db.relationship('User', back_populates="classes")
    decks = db.relationship('Deck', cascade="all, delete-orphan", back_populates='parent_class')


    def to_dict(self):
        return {
            'id': self.id,
            'userId':self.user_id,
            'name': self.name,
            'headline': self.headline,
            'description': self.description
        }
