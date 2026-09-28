import type { Lesson } from './types'

export const readingLessons: Lesson[] = [
  // 0 · Grade 1
  {
    title: 'Sounds, syllables & sentences',
    summary: 'Reading starts with hearing the sounds inside words and knowing what makes a complete thought.',
    topics: [
      {
        title: 'Rhymes and beginning sounds',
        body: ['Words **rhyme** when their endings sound the same: cat, hat, bat. Words share a **beginning sound** when they start alike: ball, bat, bee.'],
      },
      {
        title: 'Syllables',
        body: ['A syllable is one beat in a word. Clap as you say it: rab-bit (2), el-e-phant (3). Every syllable has a vowel sound.'],
      },
      {
        title: 'Complete sentences',
        body: ['A complete sentence has a **subject** (who or what) and a **verb** (what they do), and it expresses a full thought. "The dog runs fast." is complete; "The dog." is not.'],
      },
      {
        title: 'Opposites',
        body: ['Opposites (antonyms) mean the reverse of each other: big and small, hot and cold, happy and sad.'],
      },
    ],
  },
  // 1 · Grade 2
  {
    title: 'Parts of speech & word forms',
    summary: 'Words have jobs in a sentence, and their endings change to show number and time.',
    topics: [
      {
        title: 'Nouns and verbs',
        body: ['A **noun** names a person, place, thing or idea (teacher, park, joy). A **verb** shows an action or state (run, is, think).'],
      },
      {
        title: 'Plurals',
        body: ['Most nouns add -s (cats). Words ending in s, x, z, ch or sh add **-es** (boxes, wishes). Consonant + y becomes -ies (baby → babies).'],
      },
      {
        title: 'Contractions',
        body: ["A contraction joins two words, and an apostrophe replaces the missing letters: can not → **can't**, do not → don't, I am → I'm."],
      },
      {
        title: 'Past tense and capitals',
        body: [
          'Most verbs add **-ed** for the past: jump → jumped. Some are irregular: go → went, see → saw.',
          'Capitalize the first word of a sentence, the word I, and **proper nouns**, which are specific names like Texas or Maria.',
        ],
      },
    ],
  },
  // 2 · Grade 3
  {
    title: 'Word parts & punctuation',
    summary: 'Prefixes and describing words sharpen meaning. Punctuation tells the reader how to read a sentence.',
    topics: [
      {
        title: 'Prefixes',
        body: ['A prefix goes at the start of a word and changes its meaning: **un-** = not (unhappy), **re-** = again (redo), **pre-** = before (preview).'],
      },
      {
        title: 'Adjectives',
        body: ['Adjectives describe nouns by telling what kind, how many or which one: "The **fluffy** cat slept on the **red** blanket."'],
      },
      {
        title: 'End punctuation',
        body: ['A period ends a statement. A **question mark** ends a question. An exclamation point shows strong feeling.'],
      },
      {
        title: 'Possessives',
        body: ["To show ownership, add **'s** to a singular noun (the dog's toy). For a plural ending in s, add just the apostrophe (the dogs' toys)."],
      },
    ],
  },
  // 3 · Grade 4
  {
    title: 'Comparisons & tricky words',
    summary: 'Writers compare things to create pictures in your mind. Some words sound alike but mean very different things.',
    topics: [
      {
        title: 'Similes',
        body: ['A simile compares two things using **like** or **as**: "Her smile was as bright as the sun."'],
      },
      {
        title: 'Homophones',
        body: ["Homophones sound the same but differ in spelling and meaning: **their** (belongs to them), **there** (a place), **they're** (they are)."],
        tip: "Test they're by expanding it: if \"they are\" fits the sentence, use they're.",
      },
      {
        title: 'Suffixes',
        body: ['A suffix goes at the end of a word: **-less** = without (fearless), **-ful** = full of (hopeful), **-er** = one who (teacher).'],
      },
      {
        title: 'Main idea',
        body: ['The main idea is the **most important point** a paragraph makes. The details support it. Ask yourself: "What is this mostly about?"'],
      },
    ],
  },
  // 4 · Grade 5
  {
    title: 'Figurative language & sentence types',
    summary: 'Language often means more than it literally says. Longer sentences join ideas together.',
    topics: [
      {
        title: 'Metaphors and idioms',
        body: [
          'A **metaphor** says one thing *is* another, without like or as: "The classroom was a zoo."',
          'An **idiom** is a phrase whose meaning differs from its words: "raining cats and dogs" means raining heavily.',
        ],
      },
      {
        title: 'Point of view',
        body: ['**First person** uses I and me (the narrator is in the story). **Third person** uses he, she and they (the narrator is outside the story).'],
      },
      {
        title: 'Compound sentences',
        body: ['A compound sentence joins two complete sentences with a comma and a conjunction (**for, and, nor, but, or, yet, so**, often remembered as FANBOYS): "I wanted to play, but it was raining."'],
      },
      {
        title: 'Latin roots',
        body: ['Many English words are built from Latin roots. **port** = carry (transport, portable), **spect** = look (inspect), **rupt** = break (erupt).'],
      },
    ],
  },
  // 5 · Grade 6
  {
    title: 'Theme, personification & agreement',
    summary: 'Look beneath the plot for the message, and make sure subjects and verbs agree.',
    topics: [
      {
        title: 'Personification',
        body: ['Personification gives human traits to non-human things: "The wind **howled** through the night."'],
      },
      {
        title: 'Theme',
        body: ["The theme is the story's **central message or lesson**, like \"honesty matters\" or \"change is hard but necessary.\" It is different from the topic or plot."],
      },
      {
        title: 'Subject-verb agreement',
        body: ['A singular subject takes a singular verb. Words like **each, either, neither, everyone** are singular: "Neither of the boys **is** ready."'],
      },
      {
        title: 'Greek roots',
        body: ['**bio** = life (biology), **geo** = earth (geography), **tele** = far (telephone), **photo** = light (photograph).'],
      },
    ],
  },
  // 6 · Grade 7
  {
    title: 'Argument & word choice',
    summary: 'Essays argue a point. Word choice colors how the reader feels about that point.',
    topics: [
      {
        title: 'Thesis statements',
        body: ['A thesis states the **main argument** of an essay in one or two sentences, usually at the end of the introduction. Every body paragraph should support it.'],
      },
      {
        title: 'Hyperbole',
        body: ["Hyperbole is deliberate exaggeration for effect: \"I've told you a million times.\""],
      },
      {
        title: 'Connotation vs. denotation',
        body: ["**Denotation** is a word's dictionary meaning. **Connotation** is the feeling it carries: \"thrifty\" (positive) and \"cheap\" (negative) have similar denotations."],
      },
      {
        title: 'Semicolons',
        body: ['A semicolon joins two **closely related complete sentences** without a conjunction: "I love to read; my brother prefers to draw."'],
      },
    ],
  },
  // 7 · Grade 8
  {
    title: 'Irony, voice & allusion',
    summary: 'Readers who notice these techniques understand what writers are doing and why.',
    topics: [
      {
        title: 'Irony',
        body: [
          '**Dramatic irony**: the audience knows something the characters do not.',
          '**Situational irony**: the opposite of what you expect happens. **Verbal irony**: someone says the opposite of what they mean.',
        ],
      },
      {
        title: 'Active vs. passive voice',
        body: ['In active voice the subject acts: "The chef cooked the meal." In passive voice the subject receives the action: "The meal was cooked by the chef." Active is usually clearer.'],
      },
      {
        title: 'Allusion',
        body: ['An allusion is an indirect reference to a well-known person, place, event or work: calling someone "a Romeo" alludes to Shakespeare.'],
      },
      {
        title: 'Affect vs. effect',
        body: ['**Affect** is usually a verb (to influence). **Effect** is usually a noun (a result). "The weather will affect our plans; the effect was huge."'],
      },
    ],
  },
  // 8 · Grade 9
  {
    title: 'Persuasion & literary devices',
    summary: 'High school reading asks how a text works on you, not just what it says.',
    topics: [
      {
        title: 'Rhetorical appeals',
        body: ['**Ethos** appeals to credibility ("as a doctor…"). **Pathos** appeals to emotion. **Logos** appeals to logic and evidence.'],
      },
      {
        title: 'Oxymoron and foreshadowing',
        body: [
          'An **oxymoron** pairs contradictory words: jumbo shrimp, deafening silence.',
          '**Foreshadowing** gives hints about what will happen later in the story.',
        ],
      },
      {
        title: 'Gerunds',
        body: ['A gerund is a verb ending in **-ing** used as a noun: "**Swimming** is great exercise."'],
      },
      {
        title: 'Who vs. whom',
        body: ['Use **who** for a subject (he/she) and **whom** for an object (him/her). "To whom should I write?" works because you would write "to him."'],
      },
    ],
  },
  // 9 · Grade 10
  {
    title: 'Drama & sentence craft',
    summary: 'Study how plays reveal thought, and how careful sentence structure keeps writing clear.',
    topics: [
      {
        title: 'Soliloquy',
        body: ["A soliloquy is a speech in which a character, **alone on stage**, speaks their thoughts aloud. Hamlet's \"To be or not to be\" is the classic example."],
      },
      {
        title: 'Dangling modifiers',
        body: ['A modifier must describe the word right next to it. "Walking to school, **the rain** started" wrongly says the rain was walking. The fix: "Walking to school, **I** got caught in the rain."'],
      },
      {
        title: 'Juxtaposition',
        body: ['Placing two contrasting things side by side to highlight their differences, such as wealth next to poverty, or innocence next to cruelty.'],
      },
      {
        title: 'Parallel structure',
        body: ['Items in a list should share the same grammatical form: "She likes **hiking, swimming, and biking**", not "hiking, to swim, and bikes."'],
      },
    ],
  },
  // 10 · Grade 11
  {
    title: 'Rhetoric & logical fallacies',
    summary: 'Spotting bad arguments, and the devices of great speeches, is a defense against manipulation.',
    topics: [
      {
        title: 'Ad hominem',
        body: ['An ad hominem attack targets **the person** instead of the argument: "You can\'t trust her climate data; she drives an SUV."'],
      },
      {
        title: 'Anaphora',
        body: ['Anaphora is the repetition of a word or phrase at the **start of successive clauses**: "We shall fight on the beaches, we shall fight on the landing grounds…"'],
      },
      {
        title: 'Satire and unreliable narrators',
        body: [
          '**Satire** uses humor, irony or exaggeration to criticize people or society.',
          'An **unreliable narrator** cannot be fully trusted, because of bias, ignorance or deception.',
        ],
      },
      {
        title: 'Fewer vs. less',
        body: ['Use **fewer** for things you can count (fewer people) and **less** for amounts you cannot count (less water).'],
      },
    ],
  },
  // 11 · Grade 12
  {
    title: 'Advanced argument & style',
    summary: 'The fallacies and figures of speech that appear in AP exams and serious writing.',
    topics: [
      {
        title: 'Straw man and begging the question',
        body: [
          'A **straw man** misrepresents an opponent\'s argument to make it easier to attack.',
          '**Begging the question** assumes the conclusion in the premise: "This book is true because the book says so."',
        ],
      },
      {
        title: 'Synecdoche',
        body: ['Synecdoche uses a **part to represent the whole**: "all hands on deck" (hands = sailors), "new wheels" (wheels = car).'],
      },
      {
        title: 'Periodic sentences',
        body: ['A periodic sentence holds its main clause until the end, building suspense: "Despite the storm, the delays and the doubters, **she won**."'],
      },
    ],
  },
  // 12 · College I
  {
    title: 'College rhetoric & research',
    summary: 'College writing expects you to analyze context, argue carefully and handle sources properly.',
    topics: [
      {
        title: 'The rhetorical situation',
        body: ["Every text has a context: the **author, audience, purpose** and occasion. Analyzing it explains why a text is written the way it is."],
      },
      {
        title: 'False dilemma',
        body: ['Presenting only two options when more exist: "You\'re either with us or against us."'],
      },
      {
        title: 'Chiasmus',
        body: ['Chiasmus reverses a phrase\'s structure (A-B, B-A): "Ask not what your **country** can do for **you**; ask what **you** can do for your **country**."'],
      },
      {
        title: 'Annotated bibliographies',
        body: ['An annotated bibliography lists citations, each followed by a short **summary and evaluation** of the source: what it argues, how credible it is, and how you will use it.'],
      },
    ],
  },
  // 13 · College II
  {
    title: 'Literary theory & subtle devices',
    summary: 'Upper-level analysis looks at narrative technique and at the assumptions behind texts.',
    topics: [
      {
        title: 'Post hoc fallacy',
        body: ['*Post hoc ergo propter hoc* ("after this, therefore because of this") assumes that because B followed A, **A caused B**.'],
      },
      {
        title: 'Litotes and apophasis',
        body: [
          '**Litotes** is understatement through negation: "not bad" meaning good.',
          "**Apophasis** mentions something by claiming not to: \"I won't even bring up his arrest.\"",
        ],
      },
      {
        title: 'Free indirect discourse',
        body: ["Third-person narration that slips into a character's own thoughts and voice without quotation marks. Jane Austen and Virginia Woolf are famous for it."],
      },
      {
        title: 'Deconstruction',
        body: ["A critical approach that looks for the **internal contradictions** and binary oppositions that unsettle a text's apparently stable meaning."],
      },
    ],
  },
  // 14 · College III
  {
    title: 'Genre & advanced figures',
    summary: 'The vocabulary of literary scholarship, which lets you name exactly what a text is doing.',
    topics: [
      {
        title: 'Bildungsroman',
        body: ["A **coming-of-age** novel that follows a protagonist's growth from youth to maturity: *Great Expectations*, *Jane Eyre*."],
      },
      {
        title: 'Tu quoque',
        body: ['"You too." This fallacy dismisses criticism by pointing to the **critic\'s hypocrisy** instead of addressing the point.'],
      },
      {
        title: 'Zeugma and metonymy',
        body: [
          "**Zeugma**: one word governs two others in different senses: \"She broke his car and his heart.\"",
          '**Metonymy**: naming something by an associated thing: "the Crown" for the monarchy, "the White House" for the president\'s staff.',
        ],
      },
      {
        title: 'Defamiliarization',
        body: ['Presenting familiar things in **strange ways** so readers see them freshly. The idea comes from the Russian Formalists.'],
      },
    ],
  },
]
