import type { TierBank } from './bank'

export const reading: TierBank[] = [
  // 0 · Grade 1
  {
    mcq: [
      ["Which word rhymes with 'cat'?", 'hat', 'dog', 'cup', 'sun'],
      ["Which word starts with the same sound as 'ball'?", 'bat', 'doll', 'cat', 'fish'],
      ["What is the opposite of 'big'?", 'small', 'tall', 'happy', 'red'],
      ['Which is a complete sentence?', 'The dog runs fast.', 'The dog.', 'Runs fast.', 'Fast the dog.'],
      ["How many syllables are in 'rabbit'?", '2', '1', '3', '4', 'rab-bit'],
      ['Which word names a color?', 'blue', 'jump', 'chair', 'slow'],
    ],
    terms: [
      ['happy', 'feeling good and glad'],
      ['jump', 'to push off the ground into the air'],
      ['tiny', 'very small'],
      ['shout', 'to yell loudly'],
      ['quick', 'fast'],
    ],
    orders: [{ prompt: 'Put these words in ABC order.', items: ['apple', 'ball', 'cat', 'dog'] }],
    cloze: [
      ['The ant is so ___ I can barely see it.', 'tiny'],
      ['The frog can ___ over the log.', 'jump'],
    ],
  },
  // 1 · Grade 2
  {
    mcq: [
      ["What is the plural of 'box'?", 'boxes', 'boxs', 'boxies', 'boxen'],
      ['Which word is a noun?', 'teacher', 'quickly', 'run', 'green'],
      ["What does the contraction 'can't' mean?", 'can not', 'can it', 'can too', 'could not'],
      ["Which word means the same as 'glad'?", 'happy', 'sad', 'mad', 'tired'],
      ["What is the past tense of 'jump'?", 'jumped', 'jumping', 'jumps', 'jumpt'],
      ['Which word should always start with a capital letter?', 'Texas', 'river', 'city', 'school'],
    ],
    terms: [
      ['gentle', 'soft and kind'],
      ['brave', 'not afraid'],
      ['gather', 'to bring together'],
      ['shiver', 'to shake from cold or fear'],
      ['whisper', 'to speak very softly'],
    ],
    orders: [{ prompt: 'Put these words in ABC order.', items: ['bear', 'bird', 'boat', 'bus'] }],
    cloze: [
      ['She wore a coat because she began to ___ in the cold.', 'shiver'],
      ['The ___ firefighter ran into the smoky building.', 'brave'],
    ],
  },
  // 2 · Grade 3
  {
    mcq: [
      ["What does the prefix 'un-' mean in 'unhappy'?", 'not', 'very', 'again', 'before'],
      ['Which word is spelled correctly?', 'because', 'becuz', 'becaus', 'becouse'],
      ["What is the opposite of 'ancient'?", 'modern', 'old', 'broken', 'large'],
      ["Which word is an adjective in 'The fluffy cat slept.'?", 'fluffy', 'cat', 'slept', 'the'],
      ['Which punctuation mark ends a question?', '?', '.', '!', ','],
      ['How do you show a toy belongs to the dog?', "the dog's toy", 'the dogs toy', "the dogs' toy", "the dog toy's"],
    ],
    terms: [
      ['curious', 'wanting to know or learn something'],
      ['fragile', 'easily broken'],
      ['journey', 'a trip from one place to another'],
      ['enormous', 'extremely large'],
      ['timid', 'shy and easily frightened'],
    ],
    orders: [{ prompt: 'Put the words in order to make a sentence.', items: ['The', 'big', 'dog', 'barked', 'loudly.'] }],
    cloze: [
      ['Handle the glass vase carefully because it is ___.', 'fragile'],
      ['The ___ kitten hid under the bed when guests arrived.', 'timid'],
    ],
  },
  // 3 · Grade 4
  {
    mcq: [
      ['Which sentence uses a simile?', 'Her smile was as bright as the sun.', 'Her smile was the sun.', 'She smiled at the sun.', 'The sun was bright.', "A simile compares using 'like' or 'as'."],
      ['Choose the right word: "They left ___ books here."', 'their', 'there', "they're", 'thier'],
      ["What does the suffix '-less' mean in 'fearless'?", 'without', 'full of', 'more', 'before'],
      ['What is the main idea of a paragraph?', 'The most important point it makes', 'The first sentence', 'The longest sentence', 'A small detail'],
      ['Which word is a verb?', 'explore', 'forest', 'quiet', 'beneath'],
      ["What does the prefix 're-' mean in 'rewrite'?", 'again', 'not', 'under', 'badly'],
    ],
    terms: [
      ['reluctant', 'unwilling or hesitant'],
      ['abundant', 'existing in large amounts'],
      ['observe', 'to watch carefully'],
      ['migrate', 'to move from one region to another'],
      ['cautious', 'careful to avoid danger'],
    ],
    orders: [{ prompt: 'Order these from smallest to largest.', items: ['tiny', 'small', 'large', 'enormous'] }],
    cloze: [
      ['Birds ___ south each winter to find warmer weather.', 'migrate'],
      ['He was ___ to jump into the freezing lake.', 'reluctant'],
    ],
  },
  // 4 · Grade 5
  {
    mcq: [
      ['Which sentence is a metaphor?', 'The classroom was a zoo.', 'The classroom was like a zoo.', 'We visited the zoo.', 'The zoo was loud.', "A metaphor says one thing IS another, without 'like' or 'as'."],
      ["A story told using 'I' and 'me' is in which point of view?", 'first person', 'second person', 'third person', 'omniscient'],
      ['What does "It\'s raining cats and dogs" mean?', "It's raining very heavily", 'Animals are falling', "It's a little cloudy", 'Pets are outside'],
      ['Which is a compound sentence?', 'I wanted to play, but it was raining.', 'I wanted to play.', 'Because it was raining.', 'Playing in the rain.'],
      ["Which word means about the same as 'conclude'?", 'finish', 'begin', 'argue', 'wonder'],
      ["What does the root 'port' mean in 'transport' and 'portable'?", 'carry', 'see', 'write', 'break'],
    ],
    terms: [
      ['persuade', 'to convince someone to do or believe something'],
      ['evidence', 'facts that show something is true'],
      ['hesitate', 'to pause before acting'],
      ['generous', 'willing to give more than expected'],
      ['predict', 'to say what will happen in the future'],
    ],
    orders: [
      {
        prompt: 'Put the story events in order.',
        items: ['Maya found a lost puppy.', 'She checked its collar for a tag.', 'She called the number on the tag.', 'The owner came to pick it up.'],
      },
    ],
    cloze: [
      ['The lawyer presented ___ that proved her client was innocent.', 'evidence'],
      ['Can you ___ how the story will end?', 'predict'],
    ],
  },
  // 5 · Grade 6
  {
    mcq: [
      ['Which is an example of personification?', 'The wind howled through the night.', 'The wind was strong.', 'It was a windy night.', 'The wind blew at 30 mph.', 'Personification gives human traits to non-human things.'],
      ['What is the theme of a story?', 'Its central message or lesson', 'Where it takes place', 'The main character', 'How long it is'],
      ['Which word is spelled correctly?', 'necessary', 'neccessary', 'necesary', 'neccesary'],
      ["What does the root 'bio' mean?", 'life', 'earth', 'water', 'sound'],
      ['Choose the correct verb: "Neither of the boys ___ ready."', 'is', 'are', 'were', 'be', "'Neither' is singular."],
      ["'Benevolent' most nearly means:", 'kind', 'angry', 'wealthy', 'clever'],
    ],
    terms: [
      ['analyze', 'to examine something in detail'],
      ['significant', 'important or meaningful'],
      ['inevitable', 'certain to happen'],
      ['diligent', 'hardworking and careful'],
      ['contradict', 'to say the opposite of'],
    ],
    orders: [{ prompt: 'Order from mildest to strongest feeling.', items: ['content', 'happy', 'joyful', 'ecstatic'] }],
    cloze: [
      ['After weeks of rain, flooding seemed ___.', 'inevitable'],
      ['The ___ student reviewed her notes every night.', 'diligent'],
    ],
  },
  // 6 · Grade 7
  {
    mcq: [
      ['What is the purpose of a thesis statement?', 'To state the main argument of an essay', 'To list sources', 'To end the essay', 'To describe the setting'],
      ['Which sentence uses hyperbole?', "I've told you a million times.", "I've told you twice.", 'I told you yesterday.', 'I will tell you later.', 'Hyperbole is deliberate exaggeration.'],
      ["A word's connotation is:", 'The feelings or ideas it suggests beyond its literal meaning', 'Its dictionary definition', 'Its spelling', 'Its origin'],
      ['Which sentence uses a semicolon correctly?', 'I love to read; my brother prefers to draw.', 'I love; to read.', 'I love to read; and draw.', 'I; love to read.'],
      ["'Chronological' order means:", 'in time order', 'in order of importance', 'alphabetical', 'random'],
      ["What does the Greek root 'graph' mean?", 'write', 'hear', 'measure', 'light'],
    ],
    terms: [
      ['ambiguous', 'open to more than one interpretation'],
      ['meticulous', 'showing great attention to detail'],
      ['resilient', 'able to recover quickly from difficulty'],
      ['skeptical', 'doubtful; not easily convinced'],
      ['elaborate', 'detailed and complicated'],
    ],
    orders: [
      {
        prompt: 'Order the parts of a typical argumentative essay.',
        items: ['Introduction with thesis', 'Body paragraphs with evidence', 'Counterargument and rebuttal', 'Conclusion'],
      },
    ],
    cloze: [
      ['The instructions were so ___ that nobody knew what to do.', 'ambiguous'],
      ['Despite many setbacks, the ___ team kept trying.', 'resilient'],
    ],
  },
  // 7 · Grade 8
  {
    mcq: [
      ['What is dramatic irony?', 'When the audience knows something the characters do not', 'When a story is sad', 'When characters argue', 'When the ending is happy'],
      ['Which sentence is in active voice?', 'The chef cooked the meal.', 'The meal was cooked by the chef.', 'The meal was cooked.', 'Cooking was done.'],
      ["Which word means 'to make less severe'?", 'alleviate', 'aggravate', 'accelerate', 'allocate'],
      ['An allusion is:', 'An indirect reference to a well-known person, place, or work', 'A false belief', 'A type of rhyme', 'A long speech'],
      ['Choose the right word: "The weather will ___ our plans."', 'affect', 'effect', 'afect', 'effects', "'Affect' is usually the verb; 'effect' is usually the noun."],
      ["What does the Latin root 'dict' mean?", 'say', 'lead', 'build', 'throw'],
    ],
    terms: [
      ['pragmatic', 'dealing with things in a practical way'],
      ['candid', 'truthful and straightforward'],
      ['ominous', 'suggesting something bad will happen'],
      ['tenacious', 'holding firmly; persistent'],
      ['arbitrary', 'based on random choice rather than reason'],
    ],
    orders: [
      { prompt: 'Order the stages of plot structure.', items: ['Exposition', 'Rising action', 'Climax', 'Falling action', 'Resolution'] },
    ],
    cloze: [
      ['Dark clouds gathered in an ___ way over the town.', 'ominous'],
      ['The rule seemed ___, with no clear reason behind it.', 'arbitrary'],
    ],
  },
  // 8 · Grade 9
  {
    mcq: [
      ['What is an oxymoron?', "A phrase combining contradictory terms, like 'jumbo shrimp'", 'A word that sounds like its meaning', 'An exaggeration', 'A comparison using like'],
      ['Which persuasive appeal is based on emotion?', 'pathos', 'ethos', 'logos', 'kairos'],
      ['In "Swimming is great exercise," what is the gerund?', 'Swimming', 'is', 'great', 'exercise', 'A gerund is a verb ending in -ing used as a noun.'],
      ['Foreshadowing is:', 'Hints about what will happen later', 'A flashback', 'The climax', 'A character description'],
      ['Choose the right word: "To ___ should I address the letter?"', 'whom', 'who', 'whose', "who's", "Use 'whom' as the object of a preposition."],
      ["'Ubiquitous' means:", 'found everywhere', 'very rare', 'extremely loud', 'hard to see'],
    ],
    terms: [
      ['eloquent', 'fluent and persuasive in speaking or writing'],
      ['lethargic', 'sluggish and lacking energy'],
      ['scrutinize', 'to examine closely'],
      ['ambivalent', 'having mixed feelings'],
      ['ephemeral', 'lasting a very short time'],
    ],
    cloze: [
      ['Fame on social media is often ___, gone within a week.', 'ephemeral'],
      ['She felt ___ about moving: excited but also sad.', 'ambivalent'],
    ],
  },
  // 9 · Grade 10
  {
    mcq: [
      ['What is a soliloquy?', 'A speech where a character alone on stage speaks their thoughts aloud', 'A conversation between two characters', 'A poem with 14 lines', 'The final scene of a play'],
      ['An appeal to logos relies on:', 'logic and reasoning', 'emotion', 'credibility', 'humor'],
      ['Which sentence contains a dangling modifier?', 'Walking to school, the rain started.', 'Walking to school, I got wet.', 'I walked to school in the rain.', 'The rain started as I walked.', "The rain wasn't walking to school."],
      ['Juxtaposition is:', 'Placing two things side by side to highlight contrast', 'Repeating a sound', 'A hidden meaning', 'A type of rhyme scheme'],
      ["Which word is a synonym for 'mitigate'?", 'lessen', 'worsen', 'ignore', 'repeat'],
      ['Which sentence has parallel structure?', 'She likes hiking, swimming, and biking.', 'She likes hiking, to swim, and biking.', 'She likes to hike, swimming, and bikes.', 'She likes hikes, to swim, and biking.'],
    ],
    terms: [
      ['pernicious', 'harmful in a gradual or subtle way'],
      ['gregarious', 'fond of company; sociable'],
      ['obsolete', 'no longer in use'],
      ['capricious', 'given to sudden changes of mood or behavior'],
      ['verbose', 'using more words than needed'],
    ],
    cloze: [
      ['Fax machines have become nearly ___.', 'obsolete'],
      ['His ___ report ran twenty pages when two would do.', 'verbose'],
    ],
  },
  // 10 · Grade 11
  {
    mcq: [
      ['An ad hominem argument:', 'Attacks the person instead of the argument', 'Appeals to tradition', 'Uses statistics', 'Offers two choices'],
      ['Anaphora is:', 'Repetition of a word at the beginning of successive clauses', 'A comparison of unlike things', 'A deliberate understatement', 'A reference to mythology'],
      ["A 'laconic' person:", 'uses very few words', 'talks constantly', 'is always late', 'is very emotional'],
      ['What does satire do?', 'Uses humor or exaggeration to criticize', 'Tells a love story', 'Describes nature', 'Explains a process'],
      ['Choose the right word: "There were ___ people than expected."', 'fewer', 'less', 'lesser', 'more less', "Use 'fewer' for countable things."],
      ['An unreliable narrator is:', 'A narrator whose credibility is compromised', 'A narrator who is absent', 'A narrator in second person', 'A narrator who is an animal'],
    ],
    terms: [
      ['esoteric', 'understood by only a small group'],
      ['ameliorate', 'to make something better'],
      ['obfuscate', 'to make unclear or confusing'],
      ['magnanimous', 'generous in forgiving'],
      ['didactic', 'intended to teach'],
    ],
    orders: [
      {
        prompt: 'Order the steps of writing a research paper.',
        items: ['Choose a topic', 'Find sources', 'Evaluate credibility', 'Write a draft', 'Cite and revise'],
      },
    ],
    cloze: [
      ['The politician tried to ___ the issue with jargon.', 'obfuscate'],
      ['New policies helped ___ conditions in the shelter.', 'ameliorate'],
    ],
  },
  // 11 · Grade 12
  {
    mcq: [
      ['A straw man fallacy is:', 'Misrepresenting an argument to make it easier to attack', 'Attacking the speaker', 'Appealing to popularity', 'Using circular reasoning'],
      ['Synecdoche is when:', "A part represents the whole, e.g. 'all hands on deck'", 'Two opposites are joined', 'Sound imitates meaning', 'A question needs no answer'],
      ["'Quixotic' means:", 'idealistic and impractical', 'quick and clever', 'bitter and cynical', 'calm and patient'],
      ['What is the effect of a periodic sentence?', 'It builds suspense by delaying the main clause to the end', 'It lists items', 'It asks a question', 'It shortens the text'],
      ["'Begging the question' strictly means:", 'Assuming the conclusion in the premise', 'Raising a new question', 'Asking politely', 'Avoiding an answer'],
      ["Which word means 'to renounce under oath'?", 'abjure', 'adjure', 'abide', 'abscond'],
    ],
    terms: [
      ['perfunctory', 'done with minimal effort or care'],
      ['recalcitrant', 'stubbornly uncooperative'],
      ['sycophant', 'a person who flatters to gain favor'],
      ['equivocate', 'to use vague language to avoid commitment'],
      ['ineffable', 'too great to be expressed in words'],
    ],
    cloze: [
      ['He gave a ___ nod without looking up from his phone.', 'perfunctory'],
      ['The beauty of the canyon at sunrise was ___.', 'ineffable'],
    ],
  },
  // 12 · College I
  {
    mcq: [
      ["A text's 'rhetorical situation' is:", 'Its context: author, audience, and purpose', 'Its word count', 'Its publication date', 'Its grammar'],
      ["'Hegemony' refers to:", 'Dominance of one group over others', 'A form of poetry', 'Economic equality', 'A medical condition'],
      ['A false dilemma is:', 'Presenting only two options when more exist', 'An attack on character', 'A slippery slope', 'An appeal to authority'],
      ['Which is an example of chiasmus?', 'Ask not what your country can do for you; ask what you can do for your country.', 'I came, I saw, I conquered.', 'The pen is mightier than the sword.', 'All the world’s a stage.', 'Chiasmus reverses the structure of a phrase: A-B, B-A.'],
      ['An annotated bibliography contains:', 'Citations with a summary or evaluation of each source', 'Only a list of URLs', 'The full text of sources', 'An outline of the essay'],
      ["'Paradigm' means:", 'A model or framework of thinking', 'A small coin', 'A contradiction', 'A type of argument'],
    ],
    terms: [
      ['epistemology', 'the study of knowledge'],
      ['hermeneutics', 'the theory of interpretation'],
      ['dialectic', 'reasoning through opposing ideas'],
      ['zeitgeist', 'the spirit of an era'],
      ['polemic', 'a strong verbal or written attack'],
    ],
    orders: [{ prompt: 'Order the parts of an MLA book citation.', items: ['Author', 'Title', 'Publisher', 'Year'] }],
    cloze: [
      ['Her essay was a fierce ___ against the new policy.', 'polemic'],
      ['Jazz captured the ___ of the 1920s.', 'zeitgeist'],
    ],
  },
  // 13 · College II
  {
    mcq: [
      ["'Post hoc ergo propter hoc' is:", 'Assuming that because B followed A, A caused B', 'Attacking a straw man', 'Appealing to tradition', 'Circular reasoning'],
      ['Litotes is:', "Understatement using a negative, e.g. 'not bad'", 'Extreme exaggeration', 'A pun', 'Repetition of consonants'],
      ['Free indirect discourse is:', "Third-person narration that takes on a character's thoughts and voice", 'Dialogue in quotation marks', 'A letter-based novel', 'Stage directions'],
      ['Deconstruction as a critical approach:', "Examines contradictions that undermine a text's stable meaning", 'Studies the author’s biography', 'Counts word frequency', 'Focuses on historical accuracy'],
      ["'Sesquipedalian' describes:", 'Using long words', 'Walking slowly', 'Speaking in rhyme', 'Writing in verse'],
      ['Apophasis is:', "Mentioning something by saying you won't mention it", 'A sudden ending', 'A plea to the gods', 'A long list'],
    ],
    terms: [
      ['verisimilitude', 'the appearance of being true or real'],
      ['pedantic', 'overly concerned with minor details'],
      ['tendentious', 'promoting a particular cause or view'],
      ['intransigent', 'refusing to change one’s views'],
      ['perspicacious', 'having keen insight'],
    ],
    cloze: [
      ['The film’s gritty details lent it great ___.', 'verisimilitude'],
      ['Both sides remained ___, so talks collapsed.', 'intransigent'],
    ],
  },
  // 14 · College III
  {
    mcq: [
      ['A Bildungsroman is:', 'A coming-of-age novel', 'A war epic', 'A satirical play', 'A detective story'],
      ['The tu quoque fallacy:', "Dismisses criticism by pointing out the critic's hypocrisy", 'Appeals to nature', 'Uses a false analogy', 'Relies on anecdote'],
      ['Which is an example of zeugma?', 'She broke his car and his heart.', 'She drove fast.', 'His heart was stone.', 'The car purred.', "One verb ('broke') governs two objects in different senses."],
      ['Metonymy is:', "Referring to something by a closely associated thing ('the Crown' for the monarchy)", 'A part standing for the whole', 'An extended metaphor', 'An inverted sentence'],
      ['Defamiliarization is:', 'Presenting familiar things in strange ways to renew perception', 'Removing characters', 'Translating a text', 'Simplifying vocabulary'],
      ["'Apotheosis' means:", 'The highest point; elevation to divine status', 'A sudden downfall', 'A formal apology', 'A medical cure'],
    ],
    terms: [
      ['sui generis', 'unique; in a class of its own'],
      ['obsequious', 'excessively eager to please'],
      ['lugubrious', 'looking or sounding sad and dismal'],
      ['pusillanimous', 'showing a lack of courage'],
      ['recondite', 'little known; obscure'],
    ],
    cloze: [
      ['The waiter was so ___ that it became uncomfortable.', 'obsequious'],
      ['The funeral march had a ___ tone.', 'lugubrious'],
    ],
  },
]
