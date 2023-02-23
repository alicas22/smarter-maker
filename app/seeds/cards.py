from app.models import db, Card, environment, SCHEMA


def seed_cards():
    card1_deck1 = Card(
            deck_id=1, question = "What type of landform protrudes from a larger landmass, and is surrounded by water on three sides?", answer="PENINSULA: Well-known peninsulas include the Arabian Peninsula, Alaska, and Cape Cod, Massachusetts.", mastery=0
    )
    card2_deck1 = Card(
            deck_id=1, question = "Lines of latitude run _______ to the equator while lines of longitude run _______ to the equator.", answer="parallel, perpendicular: Both latitude and longitude are measured in degrees, minutes, and seconds. For example: New York City is situated at 40.7128° N latitude, 74.0060° W longitude. GPS systems use such precise measurements to help orient navigation and weather equipment.", mastery=0
    )
    card3_deck1 = Card(
            deck_id=1, question = "How long did the French Revolution last?", answer="roughly 10 years (1789-1799): The French Revolution marked the end of the Ancien Régime, the absolute monarchy that had lasted for centuries. It facilitated several important philosophies such as the Declaration of the Rights of Man and of the Citizen. ", mastery=0
    )
    card4_deck1 = Card(
            deck_id=1, question = "What landmark became the tallest man-made structure in 2010?", answer="Burj Khalifa: The Burj Khalifa is 2,722 feet (829 m) tall and is located in Dubai, United Arab Emirates. ", mastery=0
    )
    card5_deck1 = Card(
            deck_id=1, question = "What bone density-promoting mineral is found in dairy products, almonds, spinach, and okra?", answer="""calcium: Your body doesn't produce calcium, so you have to rely on your diet to get the calcium you need.

            The average adult needs 1,000 mg of calcium per day. The amount increases to 1,200 mg per day for women over the age of 50 and men over the age of 71.

            A proper level of calcium in the body over a lifetime can help prevent osteoporosis, frail and porous bones that easily fracture.""", mastery=0
    )
    card6_deck1 = Card(
            deck_id=1, question = """What type of financial institution, open to only institutional and high net worth investors, exists to maximize returns and eliminate risk?

            (e.g. Bridgewater, Citadel)""", answer="""hedge fund: Investment in hedge funds is only open to investors with large amounts of capital.

            Some of the world's biggest and best known hedge funds include: Bridgewater, Och-Ziff, Brevan Howard, BlueCrest, BlackRock.""", mastery=0
    )
    card7_deck1 = Card(
            deck_id=1, question = "Which U.S. president delivered the Gettysburg Address?", answer="""Abraham Lincoln (16th President):
            The Gettysburg Address was a speech delivered by President Lincoln on November 19, 1863 after the Union armies defeated Confederate forces in the Battle of Gettysburg, the Civil War's deadliest battle.

            The speech sought to give meaning to the sacrifice of soldiers who died during the war and is among the best known speeches in American history.""", mastery=0
    )
    card8_deck1 = Card(
            deck_id=1, question = "What is the name for the learning disorder that confuses similar sounds or letters; reverses letters or words; or completely substitutes certain words for others?", answer="""dyslexia: One of the primary challenges with dyslexia is recognizing phonemes. These are the basic sounds of speech (the “b” sound in “bat” is a phoneme, for example).

            Some studies show that nearly 5-10 percent of the population suffers from varying degrees of dyslexia. """, mastery=0
    )
    card9_deck1 = Card(
            deck_id=1, question = "What is the name for creatures whose body temperature varies based on the temperature of their environment?", answer="""cold-blooded: Warm-blooded (endothermic) creatures maintain a stable body temperature by converting food into energy. They include mammals and birds.

            Cold-blooded (ectothermic) creatures include fish, amphibians, reptiles, and insects.""", mastery=0
    )
    card10_deck1 = Card(
            deck_id=1, question = "What is the English translation of the famous René Descartes quote “cogito ergo sum”?", answer="""“I think, therefore I am.” : This is perhaps the most famous statement from the man often called the 'father of modern philosophy'.

            Descartes originally wrote this in French in 1637 as Je pense, donc je suis, but later included the better known Latin translation Cogito ergo sum. """, mastery=0
    )

    card1_deck2 = Card(
            deck_id=2, question = "What part of the inner brain resembles a seahorse and is responsible for regulating learning & memory?", answer="hippocampus", mastery=0
    )
    card2_deck2 = Card(
            deck_id=2, question = "What is the cognitive science term for when you think of an answer in your head (rather than just recognizing it on a list of multiple choices)?", answer="""active recall (aka “retrieval practice”): This is the mental tactic you are using when studying flashcards.

            Active recall has been shown to be an order of magnitude more effective than just passive review of your notes, or practicing multiple choice or matching quizzes where all you have to do is “recognize” the right answer.""", mastery=0
    )
    card3_deck2 = Card(
            deck_id=2, question = "______________ science is the study of the mind & intelligence, while ______________ science is the study of the anatomy & physiology of the brain.", answer="Cognitive science / neuroscience", mastery=0
    )
    card4_deck2 = Card(
            deck_id=2, question = """What term is used for an error in speech that is believed to be the result of some unconscious belief or desire?

            (Hint: the term derives from the name of a famous psychologist)""", answer="""Freudian slip: Named after Freud because he's said to have often interpreted such slip-ups as being more indicative of deep unconscious desires than is probably the case.

            An example of a Freudian slip: a child who accidentally calls his teacher “Mom”.

            Freud would have a psychoanalytic interpretation for the example above. However, it is more likely to be the child's transition from spending most of the day with his teacher instead of his mother.""", mastery=0
    )
    card5_deck2 = Card(
            deck_id=2, question = """“____ vs ____” is the phrase typically used to describe the controversy over whether behavior is inherited vs. learned from experience.""", answer="""John Locke (1662 - 1704) is best known for implying that all human development is developed from experience, and that infant brains begin with a completely blank slate (“tabula rasa”).

            Nowadays, the consensus among psychologists is that both nature and nurture are hugely important in development.""", mastery=0
    )
    card6_deck2 = Card(
            deck_id=2, question = """Which 19th and 20th-century scientist is recognized as the Father of Psychoanalysis and is particularly famous for his analyses of dreams and the subconscious?""", answer="Sigmund Freud (1856 - 1939)", mastery=0
    )
    card7_deck2 = Card(
            deck_id=2, question = "What are the five tastes humans perceive?", answer="""
            1. salty
            2. sweet
            3. bitter
            4. sour
            5. umami (savory or meaty flavors)
            Taste (and its close sibling smell) is our most primitive sense. Over a billion years ago, ancient microorganisms could actually perceive most of the same chemical signals that we can, and even produced some of the same neurotransmitters that make humans “hungry” and motivated to seek food.

            In fact, the olfactory bulb in the brain is located directly behind our nasal cavity and in the most primitive part of our brain, closely resembling the olfactory brain mechanics of our lizard ancestors.

            It could be that - despite lacking advanced cognition - an iguana experiences the sense of eating something “delicious” with a similar joy, and motivation to eat more, as we do.""", mastery=0
    )
    card8_deck2 = Card(
            deck_id=2, question = "What is the name of the inhibitory neurotransmitter involved in the regulation of mood, sleep, appetite, and memory?", answer="serotonin: Serotonin is derived from the amino acid tryptophan.", mastery=0
    )
    card9_deck2 = Card(
            deck_id=2, question = "Which hormone and neurotransmitter is also commonly referred to as adrenaline?", answer="""epinephrine: Epinephrine is involved in the activation of the sympathetic nervous system and assists in the body's fight-or-flight response; it works to regulate heart rate, blood pressure, air passage diameters, and metabolic shifts

            Norepinephrine is involved in the body's fight-or-flight response and the activation of the sympathetic nervous system. It acts to increase heart rate and blood pressure, trigger the release of glucose, and increase blood flow to skeletal muscles.""", mastery=0
    )
    card10_deck2 = Card(
            deck_id=2, question = """True or false:

            Dopamine is the “reward chemical” that your brain produces when achieving a goal.""", answer="""False: Dopamine is actually what your brain produces when it expects a reward. It is a primary driver of our motivation, and sometimes, when we come to associate a certain activity with pleasure, mere anticipation may be enough to raise our dopamine levels.

            Our reward circuits are actually quite complicated and involve many parts of the brain. And dopamine itself is also involved in mood, sleep, and movement in ways neuroscientists still don't fully understand.""", mastery=0
    )

    card1_deck3 = Card(
            deck_id=3, question = "Name the capital of: Australia", answer="Canberra", mastery=0
    )
    card2_deck3 = Card(
            deck_id=3, question = "Name the capital of: Egypt", answer="Cairo", mastery=0
    )
    card3_deck3 = Card(
            deck_id=3, question = "Name the capital of: Argentina", answer="Buenos Aires", mastery=0
    )
    card4_deck3 = Card(
            deck_id=3, question = "Name the capital of: Chile", answer="Santiago", mastery=0
    )
    card5_deck3 = Card(
            deck_id=3, question = "Name the capital of: Japan", answer="Tokyo", mastery=0
    )
    card6_deck3 = Card(
            deck_id=3, question = "Name the capital of: Malaysia", answer="Kuala Lumpur", mastery=0
    )
    card7_deck3 = Card(
            deck_id=3, question = "Name the capital of: Thailand", answer="Bangkok", mastery=0
    )
    card8_deck3 = Card(
            deck_id=3, question = "Name the capital of: Austria", answer="Vienna", mastery=0
    )
    card9_deck3 = Card(
            deck_id=3, question = "Name the capital of: Brazil", answer="Brasilia", mastery=0
    )
    card10_deck3 = Card(
            deck_id=3, question = "Name the capital of: Pakistan", answer="Islamabad", mastery=0
    )

    card1_deck4 = Card(
            deck_id=4, question = "The tendency to show more compassion towards a smaller number of identifiable victims, as opposed to a large number of anonymous ones, is called _____ ___.", answer="""compassion fade: Compassion fade is the tendency to show more compassion for a small group of identifiable victims than to a big group of anonymous ones.

            Example: Greenpeace is collecting donations for the pandas in China due to deforestation. It doesn't get much response. Now they campaign for a single panda named 'Billie' living in a tropical forest in China. The donations rise dramatically.""", mastery=0
    )
    card2_deck4 = Card(
            deck_id=4, question = """Which famous Shakespeare play centers on the ghost of the King of Denmark telling his son to avenge his murder by killing the new king.""", answer="""Hamlet: Hamlet is one of Shakespeare's longest plays and is so popular, it has even been translated into the Klingon language found in Star Trek.""", mastery=0
    )
    card3_deck4 = Card(
            deck_id=4, question = """Which dog breed was originally bred as a lapdog for Chinese royalty?""", answer="""Pug: The pug is famously known for its cute smooshed-in, wrinkled face.

            Pugs love to spend time with their owners and have a funny personality suited for many.""", mastery=0
    )
    card4_deck4 = Card(
            deck_id=4, question = """What is the key difference between eminent and imminent?""", answer="""Eminent: distinguished or standing out
            Imminent: about to happen

            Example: The company was run by the world's most eminent business owner.

            Example: The new product arrival is imminent for the business owner.""", mastery=0
    )
    card5_deck4 = Card(
            deck_id=4, question = """Which material originated in China and is obtained from the cocoon of larvae?""", answer="""Silk: Originating in China, the earliest production of silk began around 3630 BC.

            It takes 3000 silkworms to produce one pound of silk.""", mastery=0
    )
    card6_deck4 = Card(
            deck_id=4, question = """Which English rock band of the 1970s and 80s produced songs such as Bohemian Rhapsody, We Are the Champions, We Will Rock You, and Another One Bites the Dust?""", answer="""Queen: Queen was best known for their originality and their showmanship. They were voted the greatest British band of all time in a national BBC poll.""", mastery=0
    )
    card7_deck4 = Card(
            deck_id=4, question = """Which English alternative rock band is best known for their songs Paradise, Viva la Vida, and Clocks?""", answer="""Coldplay: Coldplay consists of Chris Martin, Jonny Buckland, Guy Berryman, and Will Champion.

                        They released their debut album Parachutes in 2000 and went on to earn 7 Grammys.

                        Throughout their career they sold 100 million albums (2021) worldwide.""", mastery=0
    )
    card8_deck4 = Card(
            deck_id=4, question = """How do you say “thank you” in Icelandic?""", answer="""Þakka þér

            Try it: thah-kah th-yeh-r

            The more informal way of saying thank you is takk.""", mastery=0
    )
    card9_deck4 = Card(
            deck_id=4, question = """Which type of wine requires the grape skins to be removed before fermentation?""", answer="""white wine: While red wine ferments with the grape skins and juice combined in a tank or vat, white wines are pressed before fermentation, separating the juice from the skins.""", mastery=0
    )
    card10_deck4 = Card(
            deck_id=4, question = """What does this social media acronym mean? ICYMI""", answer="""in case you missed it""", mastery=0
    )

    card1_deck5 = Card(
            deck_id=5, question = """When you have a brother who only has one biological parent in common with you, he is your ____-brother.""", answer="""half-brother: For example, if your father had kids from a previous marriage, those kids would be your half-siblings.""", mastery=0
    )
    card2_deck5 = Card(
            deck_id=5, question = """The ______, also called The Academy Awards, is an award ceremony which recognizes artistic and technical merit in the film industry.""", answer="""Oscars: The Oscars are seen by many as the most prestigious award one can win in the entertainment industry.""", mastery=0
    )
    card3_deck5 = Card(
            deck_id=5, question = """What award ceremony recognizes outstanding achievement in the music industry of the USA?""", answer="""The Grammy Awards: The event is held annually, and the award is a trophy depicting a gilded gramophone.""", mastery=0
    )
    card4_deck5 = Card(
            deck_id=5, question = """The children of your stepmother are your ____________.""", answer="""stepsiblings (stepbrothers and stepsisters): Note that stepsiblings share no biological parents (even if one of each of their parents have married each other), while half-siblings share one biological parent.""", mastery=0
    )
    card5_deck5 = Card(
            deck_id=5, question = """True or false:

            If you think a victim lying on the ground may have injured their spine, you should immediately move them to a bed or soft surface to prevent further damage.""", answer="""FALSE: Important: never move a victim from their location unless their current position provides an immediate risk to their life. If the victim's neck or spinal column is broken, then moving them may lacerate their spinal cord and lead to permanent paralyzation. Stop traffic if you have to!""", mastery=0
    )
    card6_deck5 = Card(
            deck_id=5, question = """What single appliance uses the most electricity in a household?""", answer="""refrigerator: Studies show the refrigerator to use up about 30 percent of the electricity in your home.""", mastery=0
    )
    card7_deck5 = Card(
            deck_id=5, question = """A ____ ________ occurs when an electrical current finds a way to bypass the appliance on a path that has little or no resistance""", answer="""short circuit:

                        A typical example is when frayed insulation bares a wire and allows it to touch the frame of the appliance, so the current can flow straight to the ground.

                        Fuses (and circuit breakers) are designed to “blow” so that the connection is interrupted to prevent electric shock and fire.""", mastery=0
    )
    card8_deck5 = Card(
            deck_id=5, question = """What is the difference between coarse and course?""", answer="""Coarse is an adjective meaning rough or vulgar.

            Course is a noun meaning a route or a part of a meal, or a verb meaning “to flow”.""", mastery=0
    )
    card9_deck5 = Card(
            deck_id=5, question = """What small, seed-like grain is popular today with vegans and vegetarians, and is commonly used in cold salads or as a hot side dish?""", answer="""quinoa (keen-waa)""", mastery=0
    )
    card10_deck5 = Card(
            deck_id=5, question = """Which American actor famously won an Oscar for co-writing the screenplay for Good Will Hunting, in which he also starred?""", answer="""Matt Damon""", mastery=0
    )

    card1_deck6 = Card(
            deck_id=6, question = """The sun rises in the ____ and sets in the ____.""", answer="""east, west: Knowing the directions east and west, one can determine where north and south is without a compass.""", mastery=0
    )
    card2_deck6 = Card(
            deck_id=6, question = """If lost and out of water, one of the easiest ways to collect water from vegetation is by collecting ____.""", answer="""dew: Because dew gathers on leaves, you can collect it using a piece of cloth and squeezing it into a container.

            The best time to find dew (in a humid climate) is in the very early morning, after the cool night air has condensed the humidity into water droplets on leaves and grass.""", mastery=0
    )
    card3_deck6 = Card(
            deck_id=6, question = """You can tie a ____ ____ around a leafy branch to collect water from vegetation over time.""", answer="""plastic bag: Plants “sweat”, just like humans. By tying a plastic bag around a leafy branch you can collect the moisture they produce through respiration, especially if you are lost for many days.""", mastery=0
    )
    card4_deck6 = Card(
            deck_id=6, question = """A safe way to kill off any pathogens (“germs”) in water is to ____ the water.""", answer="""boil: All you need is a few minutes. Boiling can be helpful if you ever need to use rainwater or snow as a source of drinking water during a shortage.""", mastery=0
    )
    card5_deck6 = Card(
            deck_id=6, question = """What should you do to attract the attention of a rescue party when you are lost and lack a phone signal?""", answer="""1.Prepare a giant fire pit and light it;
            2. Spell out SOS or HELP with big rocks;
            3. Use a shiny metal object or a mirror to reflect light.
            Your main goal, alongside surviving, should be to get rescued. Do not forget that people will be looking for you. Even if you don't see an airplane or helicopter, nowadays there may be rescue drones or other such equipment.""", mastery=0
    )
    card6_deck6 = Card(
            deck_id=6, question = """If you have hunted a wild animal and would like to preserve a large quantity of its meat, what should be your first step for preservation?""", answer="""Dry it in the sun using a makeshift drying rack.: Cut the meat into thinner strips (1/8”) and place it on the drying rack for 8 to 16 hours.

            This may seem unintuitive as we're used to refrigerating meat to preserve it. But in fresh meat's early hours, the extra moisture is the bigger contributor to rotting and needs to be promptly evaporated.""", mastery=0
    )
    card7_deck6 = Card(
            deck_id=6, question = """A human being can survive for ____ days without water.""", answer="""three: Early symptoms of dehydration can develop in as early as one day.

            Meanwhile, as long as the body as hydrated, a person can survive without food for up to a month or even longer.""", mastery=0
    )
    card8_deck6 = Card(
            deck_id=6, question = """What should you do when confronted with an enraged grizzly or brown bear?""", answer="""Back away quietly and avoid direct eye contact. (if it decides to attack, play dead):  Brown bears and grizzlies get bored with prey that doesn't struggle. Unlike with black bears, do NOT challenge the bear by shouting at it.

            Make sure to remain 'dead' even after the bear leaves. Their initial departure is often a test to see if their prey is still willing to fight.""", mastery=0
    )
    card9_deck6 = Card(
            deck_id=6, question = """If you encounter a wolf in the wild what should you do?""", answer="""Do not turn your back, look the wolf in the eye and slowly back away""", mastery=0
    )
    card10_deck6 = Card(
            deck_id=6, question = """What can you coat matches with to make them waterproof?""", answer="""nailpolish""", mastery=0
    )

    card1_deck7 = Card(
            deck_id=7, question = """odium (oh-dee-um)""", answer="""n. blame

            n. strong dislike
            The popular odium of attorneys is often unmerited.""", mastery=0
    )
    card2_deck7 = Card(
            deck_id=7, question = """opaque (owe-peyk)""", answer="""adj. blocking all light

            adj. hard to understand
            The windows became so dirty they were almost opaque.""", mastery=0
    )
    card3_deck7 = Card(
            deck_id=7, question = """superfluous (suh-per-flu-us)""", answer="""adj. more than necessary; unnecessary
            The student's essay was full of superfluous phrases that needed to be deleted.""", mastery=0
    )
    card4_deck7 = Card(
            deck_id=7, question = """supplant (suh-plant)""", answer="""v. to replace: The higher-ups tried to supplant rebellious teachers with conformists.""", mastery=0
    )
    card5_deck7 = Card(
            deck_id=7, question = """supplicate: (sup-lih-kate)""", answer="""v. to humbly ask: The churchgoers then bowed their heads and supplicated God to answer their prayers.""", mastery=0
    )
    card6_deck7 = Card(
            deck_id=7, question = """surreptitious (ser-up-tish-us)""", answer="""adj. secretive (especially because it would not be approved of): Since they were not allowed to speak, the couple exchanged surreptitious glances from across the room.""", mastery=0
    )
    card7_deck7 = Card(
            deck_id=7, question = """surmount (ser-mount)""", answer="""v. to overcome
            v. to rise above: Through sheer determination, he was able to surmount his disadvantages and win the contest outright.""", mastery=0
    )
    card8_deck7 = Card(
            deck_id=7, question = """supersede

            (sue-per-seed)""", answer="""v. to substitute; to take precedence over: It had been my understanding that the new tax code supersedes the old one, but actually both are in vigor simultaneously.""", mastery=0
    )
    card9_deck7 = Card(
            deck_id=7, question = """opportune (opp-er-tune)""", answer="""adj. happening under fitting circumstances: The students waited for an opportune moment to surprise their teacher with the bouquet of flowers they had prepared.""", mastery=0
    )
    card10_deck7 = Card(
            deck_id=7, question = """officious (uh-fish-us)""", answer="""adj. assertive of authority in a domineering way
            adj. prone to give unwanted advice:

            The security people at the concert were very officious.

            I make a habit of giving honest opinions, but I try to avoid being officious with my friends.""", mastery=0
    )

    card1_deck8 = Card(
            deck_id=8, question = """symbiotic (sim-bee-ott-ik)""", answer="""adj. related to a relationship that is beneficial for all involved
            The whale and the small fish that cling to its body have a symbiotic relationship.""", mastery=0
    )
    card2_deck8 = Card(
            deck_id=8, question = """synapse (sin-apse)""", answer="""n. the small gap between the cells of nerves
            Neurotransmitters travel across the synapse between brain cells.""", mastery=0
    )
    card3_deck8 = Card(
            deck_id=8, question = """synchronous (sing-kruh-nuss)""", answer="""adj. operating at the same time or at the same rate
            The film was notable for its synchronous premiere in 11 capital cities around the globe.""", mastery=0
    )
    card4_deck8 = Card(
            deck_id=8, question = """tacit (tass-it)""", answer="""adj. implied or unspoken
            There was a tacit agreement between the two companies that neither would expand into the other's city.""", mastery=0
    )
    card5_deck8 = Card(
            deck_id=8, question = """taciturn (tass-ih-turn)""", answer="""adj. tending to be silent; quiet
            Some of the students were quite taciturn and had to be asked to participate more.""", mastery=0
    )
    card6_deck8 = Card(
            deck_id=8, question = """exacerbate (ig-zass-er-bate)""", answer="""v. to make worse
            The children's screaming exacerbated their father's headache.""", mastery=0
    )
    card7_deck8 = Card(
            deck_id=8, question = """v. exact (ig-zact)""", answer="""v. to forcibly demand and obtain
            The detectives finally exacted the truth from the witness.""", mastery=0
    )
    card8_deck8 = Card(
            deck_id=8, question = """exculpate (ek-skull-pate)""", answer="""v. to free from blame
            The political prisoner was fully exculpated only when the dictatorship was overthrown and an independent truth commission established.""", mastery=0
    )
    card9_deck8 = Card(
            deck_id=8, question = """exhort (ig-zort)""", answer="""v. to urge by strong appeal
            Taking the loudspeaker in her hand, the policewoman exhorted the kidnapper to release his hostage.""", mastery=0
    )
    card10_deck8 = Card(
            deck_id=8, question = """exigent (ek-suh-djunt)""", answer="""adj. requiring immediate attention
            The show's run was cut short by an exigent lack of funds.""", mastery=0
    )


    card1_deck9 = Card(
            deck_id=9, question = """circumscribe (sir-come-skrahyb)""", answer="""v. to draw or contain in a circle
            v. to limit or restrain
            I believe our government's actions are circumscribed by financial interests as well as moral imperatives.""", mastery=0
    )
    card2_deck9 = Card(
            deck_id=9, question = """circumspect (sir-come-spekt)""", answer="""adj. prudent; cautious
            Though her mother's boyfriend attempted to win affection with toys and treats, Elise remained circumspect around him.""", mastery=0
    )
    card3_deck9 = Card(
            deck_id=9, question = """circumvent (sir-kum-vent)""", answer="""v. to get around an obstacle
            She managed to circumvent security and approached her favorite actor backstage.""", mastery=0
    )
    card4_deck9 = Card(
            deck_id=9, question = """cleave (kleev)""", answer="""v. to cut off with force
            v. to be loyal to
            v. to develop an emotional bond with
            She vowed that even when tempted she would cleave to her principles.""", mastery=0
    )
    card5_deck9 = Card(
            deck_id=9, question = """cloister (cloy-stur)""", answer="""v. to isolate
            n. a place for religious isolation
            The boy's parents tended to cloister him from the harsher realities of the world.""", mastery=0
    )
    card6_deck9 = Card(
            deck_id=9, question = """coagulate (koh-ag-yuh-late)""", answer="""v. to clot or solidify
            The poorly-made syrup began to coagulate on the pancakes after a few minutes.""", mastery=0
    )
    card7_deck9 = Card(
            deck_id=9, question = """coalesce (koh-ih-less)""", answer="""v. to come together to form a single unit
            Our county's many poverty initiatives are too different to coalesce into an effective whole.""", mastery=0
    )
    card8_deck9 = Card(
            deck_id=9, question = """cogent (koh-djunt)""", answer="""adj. clear and convincing
            adj. relevant
            We won the debate because the other team was unable to mount a cogent counterargument.""", mastery=0
    )
    card9_deck9 = Card(
            deck_id=9, question = """cohere (koh-heer)""", answer="""v. to be logically connected to
            v. to stick to each other
            These short stories are quite charming when taken separately, but they will not cohere if published together as a collection.""", mastery=0
    )
    card10_deck9 = Card(
            deck_id=9, question = """intransigent (in-tran-suh-junt)""", answer="""adj. unwilling to compromise
            The government remained intransigent despite the people's protest.""", mastery=0
    )

    cards = [card1_deck1, card2_deck1, card3_deck1, card4_deck1, card5_deck1, card6_deck1, card7_deck1, card8_deck1, card9_deck1, card10_deck1,
             card1_deck2, card2_deck2, card3_deck2, card4_deck2, card5_deck2, card6_deck2, card7_deck2, card8_deck2, card9_deck2, card10_deck2,
             card1_deck3, card2_deck3, card3_deck3, card4_deck3, card5_deck3, card6_deck3, card7_deck3, card8_deck3, card9_deck3, card10_deck3,
             card1_deck4, card2_deck4, card3_deck4, card4_deck4, card5_deck4, card6_deck4, card7_deck4, card8_deck4, card9_deck4, card10_deck4,
             card1_deck5, card2_deck5, card3_deck5, card4_deck5, card5_deck5, card6_deck5, card7_deck5, card8_deck5, card9_deck5, card10_deck5,
             card1_deck6, card2_deck6, card3_deck6, card4_deck6, card5_deck6, card6_deck6, card7_deck6, card8_deck6, card9_deck6, card10_deck6,
             card1_deck7, card2_deck7, card3_deck7, card4_deck7, card5_deck7, card6_deck7, card7_deck7, card8_deck7, card9_deck7, card10_deck7,
             card1_deck8, card2_deck8, card3_deck8, card4_deck8, card5_deck8, card6_deck8, card7_deck8, card8_deck8, card9_deck8, card10_deck8,
             card1_deck9, card2_deck9, card3_deck9, card4_deck9, card5_deck9, card6_deck9, card7_deck9, card8_deck9, card9_deck9, card10_deck9]

    for card in cards:
        db.session.add(card)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
