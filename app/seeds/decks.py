from app.models import db, Deck, environment, SCHEMA



def seed_decks():
    # Class 1 - Knowledge Rehab
    deck1_class1 = Deck(
        class_id=1, name = "Knowledge Warm-Up"
    )
    deck2_class1 = Deck(
        class_id=1, name = "Psychology & The Brain"
    )
    deck3_class1 = Deck(
        class_id=1, name = "National Capitals"
    )

    # Class 2 - Street Smarts
    deck1_class2 = Deck(
        class_id=2, name = "Street Smarts Warm-Up"
    )
    deck2_class2 = Deck(
        class_id=2, name = "Random Knowledge"
    )
    deck3_class2 = Deck(
        class_id=2, name = "Survival Skills"
    )

    # Class 3 - Vocab Workout
    deck1_class3 = Deck(
        class_id=3, name = "Vocab Workout 1"
    )
    deck2_class3 = Deck(
        class_id=3, name = "Vocab Workout 2"
    )
    deck3_class3 = Deck(
        class_id=3, name = "Vocab Workout 3"
    )

    decks =[deck1_class1,deck2_class1,deck3_class1,
            deck1_class2,deck2_class2,deck3_class2,
            deck1_class3,deck2_class3,deck3_class3]

    for deck in decks:
        db.session.add(deck)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_decks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
