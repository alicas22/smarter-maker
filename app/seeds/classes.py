from app.models import db, Class, environment, SCHEMA



def seed_classes():
    class1 = Class(
        user_id=1, name="General Knowledge", headline="Rehabilitate your knowledge with the best flashcards on everything you wish you'd learned in school.", description ="""'Knowledge Rehab' is everything you wish you'd learned in (and remembered from) school, and with Smarter Maker's sophisticated learning algorithm, you'll be able to absorb and retain it all so much more efficiently! This, the world's most comprehensive collection of general knowledge flashcards, serves up over 2,000 adaptive digital flashcards covering essential, need-to-know facts drawn from an impressive suite of subjects.

        From modern art to ancient history; ground-breaking scientific discoveries to sky-scraping monuments; the tectonic processes that shape our planet to the celestial bodies that traverse our solar system… Knowledge Rehab will equip you with a well-rounded, base-line education that'll open your eyes to the world around you and empower you to have smart conversations, connect with more people, and absolutely smash your next bar quiz or game of Trivial Pursuit!

        Stop talking about the weather. Have smart conversations!
        Or maybe talking about the weather could be a smart conversation if you knew the difference between sleet and hail; or what causes lightning and the BOOM of sound that follows when the air heats up to over 50,000°F in a matter of seconds. (That's FIVE times hotter than the surface of the sun!)

        Through a multi-year project involving hundreds of students, teachers, professors, and experts (and even a few hipsters), Smarter Maker has compiled a critical base set of knowledge across a huge range of subjects that embrace art, Earth science, chemistry, geography, business & finance, flags of the world, psychology, and more!

        And it's all here, optimized for the world's best study platform: Smarter Maker."""
            )
    class2 = Class(
        user_id=1, name="Street Smarts", headline="Rehabilitate your knowledge with the best flashcards covering all the facts you should know in life.", description ="""'Street Smarts' is everything you wish you'd learned in (or should know from) life, and with Smarter Maker's sophisticated learning algorithm, you'll be able to absorb and retain it all so much more efficiently! As a member of the human race, it behooves you to have a certain knowledge ken—to maintain a level of cultural literacy—so as to connect better with your fellow humans and understand the natural world around you better.

        From what things like magma, glass, and hotdogs are made of to the basics of maintaining and fixing your car; the spices that pair best with your favorite meals to the weird ingredients on a vegan menu and how to pronounce them (say it with me: keen-waa); and the basic first aid and survival skills that could save your life to the names of the birds that frequent your backyard…

        This, the world's most comprehensive collection of “street smarts” flashcards, serves up over 1,000 adaptive digital flashcards covering essential, need-to-know facts drawn from an impressive suite of worldly subjects and skills you'll unavoidably encounter throughout life.

        Cultural literacy for the 21st century!
        Through a multi-year project involving hundreds of students, teachers, professors, and experts (and even a few hipsters), Smarter Maker has compiled a critical base set of knowledge across a huge range of life-based subjects. These 1,000+ flashcards (organized into 22 topical decks) will help you to become culturally literate, which is increasingly important in today's competitive and diverse world.

        Impress and succeed in almost any walk of life, whether it's schmoozing a potential client, chatting up someone at a cocktail party, surviving in the wilderness, or just winning your next trivia night. Whether you want to review the arts, sciences, social sciences, or even pop culture and entertainment, it's all here. And it's OPTIMIZED for the world's best study platform: Smarter Maker."""
                    )
    class3 = Class(
        user_id=1, name="Vocab Workout", headline="Drill yourself with smart flashcards to become a faster reader and more articulate speaker.", description ="""Become a faster reader and a more articulate writer and speaker with Smarter Maker's 1,000-flashcard-strong collection of sophisticated and occasionally challenging English words and word elements! Vocab Builder has been carefully curated to improve your mastery of the more complex and expressive words in the English language and by leveraging the very science of learning, will help you do so faster than any other language app, tool, or game.

        Vocab Builder is one of three flashcard classes in Smarter Maker's 'Get Smarter' initiative, which strives to make the world a smarter place to live by providing everyone, everywhere with a free, well-rounded, baseline education in the essentials of academia (Knowledge Rehab) and life (Street Smarts).

        And you can access them all for FREE.

        Improve your vocabulary every day
        A bigger vocabulary goes the distance in helping you communicate more eloquently with peers and superiors; it can help you feel more confident in professional and academic environments; and BE a better, more efficient, and articulate communicator overall. Vocabulary is the building blocks of language. Become a master of yours!

        Benefit from a study system that uses Smarter Maker's unique Confidence-Based Repetition process and customized flashcard repetition algorithm to help you learn in the fastest, most efficient way that is customized for YOU.

        Plus, being accessible via Smarter Maker's web and mobile app for Android or iOS, you can sneak in vocab practice anytime and anywhere, empowering you to learn as many new words a day as you can manage (while also reviewing the words you previously learned)."""
                    )



    db.session.add(class1)
    db.session.add(class2)
    db.session.add(class3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_classes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
