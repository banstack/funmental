import type { TierBank } from './bank'

export const science: TierBank[] = [
  // 0 · Grade 1
  {
    mcq: [
      ['What do plants need to grow?', 'Sunlight and water', 'Only darkness', 'Sand and salt', 'Nothing'],
      ['Which is a living thing?', 'A tree', 'A rock', 'A cloud', 'A chair'],
      ['What season comes after winter?', 'Spring', 'Summer', 'Fall', 'Winter again'],
      ['Which body part do we use to hear?', 'Ears', 'Eyes', 'Nose', 'Hands'],
      ['Which animal hatches from an egg?', 'Chicken', 'Dog', 'Cow', 'Cat'],
      ['Ice is water that has become…', 'frozen', 'hot', 'a gas', 'dirty'],
    ],
    terms: [
      ['root', 'the plant part that takes in water from soil'],
      ['leaf', 'the plant part that makes food from sunlight'],
      ['senses', 'sight, hearing, smell, taste, and touch'],
      ['weather', 'what the air outside is like each day'],
      ['shelter', 'a safe place to live'],
    ],
    orders: [{ prompt: 'Order the life cycle of a plant.', items: ['Seed', 'Sprout', 'Young plant', 'Adult plant with flowers'] }],
  },
  // 1 · Grade 2
  {
    mcq: [
      ['When water boils, it turns into…', 'steam', 'ice', 'sand', 'juice'],
      ['What is a habitat?', 'The natural home of an animal or plant', 'A type of food', 'A kind of weather', 'A baby animal'],
      ['Which of these is a solid?', 'A rock', 'Milk', 'Air', 'Juice'],
      ['Magnets attract objects made of…', 'iron', 'wood', 'plastic', 'glass'],
      ['What does a caterpillar turn into?', 'A butterfly', 'A spider', 'A bird', 'A worm'],
      ['Which animal is a mammal?', 'Whale', 'Shark', 'Frog', 'Snake', 'Whales breathe air and feed their babies milk.'],
    ],
    terms: [
      ['habitat', 'the natural home of a living thing'],
      ['solid', 'matter that keeps its own shape'],
      ['liquid', 'matter that takes the shape of its container'],
      ['gas', 'matter that spreads out to fill any space'],
      ['erosion', 'the wearing away of land by water or wind'],
    ],
    orders: [{ prompt: 'Order the life cycle of a butterfly.', items: ['Egg', 'Caterpillar (larva)', 'Chrysalis (pupa)', 'Adult butterfly'] }],
  },
  // 2 · Grade 3
  {
    mcq: [
      ['What force pulls objects toward Earth?', 'Gravity', 'Magnetism', 'Friction', 'Wind'],
      ['What does a thermometer measure?', 'Temperature', 'Weight', 'Length', 'Time'],
      ['Which planet is closest to the Sun?', 'Mercury', 'Venus', 'Earth', 'Mars'],
      ['An herbivore eats…', 'only plants', 'only meat', 'plants and meat', 'rocks'],
      ['Which part of a plant makes seeds?', 'The flower', 'The root', 'The stem', 'The bark'],
      ['Fossils are…', 'preserved remains or traces of ancient living things', 'shiny rocks', 'types of crystals', 'melted metal'],
    ],
    terms: [
      ['predator', 'an animal that hunts others for food'],
      ['prey', 'an animal that is hunted for food'],
      ['force', 'a push or a pull'],
      ['fossil', 'remains of a living thing preserved in rock'],
      ['adaptation', 'a trait that helps a living thing survive'],
    ],
    orders: [{ prompt: 'Order this food chain, starting with the energy source.', items: ['Sun', 'Grass', 'Rabbit', 'Fox'] }],
  },
  // 3 · Grade 4
  {
    mcq: [
      ['What causes day and night?', 'Earth rotating on its axis', 'Earth orbiting the Sun', 'The Moon blocking the Sun', 'Clouds'],
      ['What kind of energy does a battery store?', 'Chemical energy', 'Sound energy', 'Nuclear energy', 'Light energy'],
      ['Which is a renewable resource?', 'Wind', 'Coal', 'Oil', 'Natural gas'],
      ['What are the three main types of rock?', 'Igneous, sedimentary, metamorphic', 'Hard, soft, medium', 'Granite, sand, clay', 'Lava, ash, dust'],
      ['Sound travels as…', 'vibrations', 'light', 'electricity', 'heat'],
      ['Which organ pumps blood through the body?', 'Heart', 'Lungs', 'Brain', 'Stomach'],
    ],
    terms: [
      ['rotation', 'the spinning of Earth on its axis'],
      ['revolution', 'one full orbit around the Sun'],
      ['conductor', 'a material that lets electricity or heat flow easily'],
      ['insulator', 'a material that resists the flow of electricity or heat'],
      ['circuit', 'a closed path that electricity flows through'],
    ],
    orders: [{ prompt: 'Order the stages of the water cycle.', items: ['Evaporation', 'Condensation', 'Precipitation', 'Collection'] }],
  },
  // 4 · Grade 5
  {
    mcq: [
      ['Which gas do plants take in for photosynthesis?', 'Carbon dioxide', 'Oxygen', 'Nitrogen', 'Helium'],
      ['Salt fully dissolved in water is a…', 'solution', 'solid', 'compound', 'gas'],
      ['Which layer of Earth do we live on?', 'Crust', 'Mantle', 'Outer core', 'Inner core'],
      ['What causes the phases of the Moon?', "The Moon's changing position relative to Earth and the Sun", "Earth's shadow", 'Clouds covering the Moon', 'The Moon changing shape'],
      ['Decomposers like fungi…', 'break down dead organisms', 'make food from sunlight', 'hunt other animals', 'pollinate flowers'],
      ['What is the closest star to Earth?', 'The Sun', 'Polaris', 'Sirius', 'Alpha Centauri'],
    ],
    terms: [
      ['photosynthesis', 'how plants make food from sunlight, water, and carbon dioxide'],
      ['ecosystem', 'living and nonliving things interacting in an area'],
      ['decomposer', 'an organism that breaks down dead matter'],
      ['mixture', 'substances combined but not chemically joined'],
      ['orbit', 'the curved path of an object around another in space'],
    ],
    orders: [{ prompt: 'Order the layers of Earth from the outside in.', items: ['Crust', 'Mantle', 'Outer core', 'Inner core'] }],
  },
  // 5 · Grade 6
  {
    mcq: [
      ['What is the basic unit of life?', 'The cell', 'The atom', 'The organ', 'The tissue'],
      ['Which organelle is called the powerhouse of the cell?', 'Mitochondria', 'Nucleus', 'Ribosome', 'Cell wall'],
      ['Density is…', 'mass per unit volume', 'weight times height', 'speed over time', 'volume per mass'],
      ['Plate tectonics explains…', "the movement of Earth's crustal plates", 'the tides', 'the seasons', 'the weather'],
      ['Which is a physical change?', 'Ice melting', 'Wood burning', 'Iron rusting', 'Bread baking'],
      ['Kinetic energy is the energy of…', 'motion', 'position', 'heat only', 'light only'],
    ],
    terms: [
      ['cell', 'the smallest unit of life'],
      ['organelle', 'a specialized structure inside a cell'],
      ['density', 'how much mass is packed into a volume'],
      ['kinetic energy', 'energy of motion'],
      ['potential energy', 'stored energy due to position or condition'],
    ],
    orders: [{ prompt: 'Order the levels of organization, smallest first.', items: ['Cell', 'Tissue', 'Organ', 'Organ system', 'Organism'] }],
  },
  // 6 · Grade 7
  {
    mcq: [
      ['Where is DNA found in an animal cell?', 'The nucleus', 'The cell membrane', 'The cytoplasm only', 'The vacuole'],
      ["Newton's first law says…", 'objects keep their state of motion unless acted on by a force', 'force equals mass times acceleration', 'every action has an equal and opposite reaction', 'energy is conserved'],
      ['An element is…', 'a substance made of only one kind of atom', 'a mixture of atoms', 'any liquid', 'a type of cell'],
      ['A substance with a pH less than 7 is…', 'acidic', 'basic', 'neutral', 'salty'],
      ['Which blood cells fight infection?', 'White blood cells', 'Red blood cells', 'Platelets', 'Plasma'],
      ['Which is a chemical change?', 'Wood burning', 'Water freezing', 'Glass breaking', 'Sugar dissolving'],
    ],
    terms: [
      ['element', 'a pure substance of only one kind of atom'],
      ['compound', 'two or more elements chemically bonded'],
      ['inertia', 'resistance to a change in motion'],
      ['gene', 'a segment of DNA that codes for a trait'],
      ['acid', 'a substance with a pH below 7'],
    ],
    orders: [
      { prompt: 'Order the steps of the scientific method.', items: ['Ask a question', 'Form a hypothesis', 'Run an experiment', 'Analyze the data', 'Draw a conclusion'] },
    ],
  },
  // 7 · Grade 8
  {
    mcq: [
      ['What charge does a proton have?', 'Positive', 'Negative', 'Neutral', 'It changes'],
      ["Newton's second law is…", 'F = ma', 'E = mc²', 'V = IR', 'PV = nRT'],
      ['The periodic table is ordered by…', 'atomic number', 'atomic mass', 'color', 'discovery date'],
      ['Natural selection favors…', 'traits that improve survival and reproduction', 'the largest animals', 'random traits', 'the oldest animals'],
      ['Speed equals…', 'distance ÷ time', 'time ÷ distance', 'mass × distance', 'force ÷ mass'],
      ['An organism with genotype Bb (B dominant) shows…', 'the dominant trait', 'the recessive trait', 'no trait', 'a blend of both'],
    ],
    terms: [
      ['atomic number', 'the number of protons in an atom'],
      ['isotope', 'atoms of one element with different numbers of neutrons'],
      ['genotype', "an organism's genetic makeup"],
      ['phenotype', "an organism's observable traits"],
      ['velocity', 'speed in a given direction'],
    ],
    orders: [{ prompt: 'Order from smallest to largest.', items: ['Proton', 'Atom', 'Molecule', 'Cell'] }],
  },
  // 8 · Grade 9 (Biology)
  {
    mcq: [
      ['Mitosis produces…', 'two identical daughter cells', 'four different gametes', 'one larger cell', 'bacteria'],
      ['In DNA, adenine (A) pairs with…', 'thymine (T)', 'guanine (G)', 'cytosine (C)', 'uracil (U)'],
      ['Which molecule carries the genetic code from DNA to ribosomes?', 'mRNA', 'tRNA', 'ATP', 'glucose'],
      ['Enzymes are…', 'proteins that speed up chemical reactions', 'types of fat', 'sugars that store energy', 'minerals'],
      ['Cellular respiration produces usable energy in the form of…', 'ATP', 'DNA', 'oxygen', 'chlorophyll'],
      ['Homeostasis is…', 'maintaining stable internal conditions', 'rapid growth', 'cell division', 'a disease'],
    ],
    terms: [
      ['mitosis', 'cell division producing two identical cells'],
      ['meiosis', 'cell division producing four genetically different gametes'],
      ['enzyme', 'a protein that speeds up reactions'],
      ['ATP', 'the molecule that stores and transfers energy in cells'],
      ['homeostasis', 'keeping internal conditions stable'],
    ],
    orders: [{ prompt: 'Order the phases of mitosis.', items: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'] }],
  },
  // 9 · Grade 10 (Chemistry)
  {
    mcq: [
      ['A mole of a substance contains about…', '6.022 × 10²³ particles', '100 particles', '1 million particles', '3.14 × 10⁸ particles'],
      ['An ionic bond usually forms between…', 'a metal and a nonmetal transferring electrons', 'two nonmetals sharing electrons', 'two noble gases', 'two metals'],
      ['Balance it: 2H₂ + O₂ → ?', '2H₂O', 'H₂O', 'H₂O₂', '4H₂O'],
      ['Noble gases are unreactive because…', 'they have full outer electron shells', 'they are heavy', 'they are liquids', 'they have no protons'],
      ['The molar mass of water is about…', '18 g/mol', '10 g/mol', '32 g/mol', '1 g/mol'],
      ['An exothermic reaction…', 'releases heat', 'absorbs heat', 'has no energy change', 'only happens in water'],
    ],
    terms: [
      ['covalent bond', 'a bond where atoms share electrons'],
      ['ionic bond', 'a bond formed by transferring electrons'],
      ['valence electrons', 'the outermost electrons of an atom'],
      ['catalyst', 'speeds up a reaction without being used up'],
      ['molarity', 'moles of solute per liter of solution'],
    ],
    orders: [{ prompt: 'Order from lowest to highest pH.', items: ['Stomach acid', 'Black coffee', 'Pure water', 'Baking soda solution', 'Bleach'] }],
  },
  // 10 · Grade 11 (Physics)
  {
    mcq: [
      ['What is the SI unit of force?', 'Newton', 'Joule', 'Watt', 'Pascal'],
      ['Momentum equals…', 'mass × velocity', 'mass × acceleration', 'force × distance', 'energy ÷ time'],
      ["Ohm's law states…", 'V = IR', 'P = IV', 'F = ma', 'E = hf'],
      ['Acceleration due to gravity near Earth’s surface is about…', '9.8 m/s²', '1 m/s²', '98 m/s²', '3 × 10⁸ m/s'],
      ['The law of conservation of energy says energy…', 'cannot be created or destroyed, only transformed', 'always increases', 'is lost as heat forever', 'only exists in motion'],
      ['What is the unit of frequency?', 'Hertz', 'Meter', 'Decibel', 'Ohm'],
    ],
    terms: [
      ['momentum', 'mass times velocity'],
      ['work', 'force times distance moved in the direction of the force'],
      ['power', 'the rate of doing work'],
      ['resistance', 'opposition to the flow of electric current'],
      ['wavelength', 'the distance between consecutive wave crests'],
    ],
    orders: [
      { prompt: 'Order these by increasing frequency.', items: ['Radio waves', 'Microwaves', 'Visible light', 'X-rays', 'Gamma rays'] },
    ],
  },
  // 11 · Grade 12 (AP level)
  {
    mcq: [
      ["Le Chatelier's principle says a system at equilibrium…", 'shifts to counteract a change', 'never changes', 'always speeds up', 'releases all energy'],
      ['The Krebs cycle takes place in the…', 'mitochondrial matrix', 'nucleus', 'cell membrane', 'chloroplast'],
      ['Entropy is a measure of…', 'disorder or energy dispersal', 'temperature', 'mass', 'pressure'],
      ['Hardy-Weinberg equilibrium assumes…', 'no evolution: no selection, mutation, migration, or drift', 'rapid mutation', 'strong natural selection', 'small populations'],
      ['Half-life is…', 'the time for half of a radioactive sample to decay', 'half the age of an atom', 'the time to double a population', 'half the speed of light'],
      ["Kepler's third law relates a planet's…", 'orbital period to its orbital distance', 'mass to its color', 'speed to its temperature', 'size to its moons'],
    ],
    terms: [
      ['entropy', 'a measure of disorder in a system'],
      ['equilibrium', 'when forward and reverse reaction rates are equal'],
      ['half-life', 'time for half of a radioactive sample to decay'],
      ['allele', 'one version of a gene'],
      ['transcription', 'copying DNA into RNA'],
    ],
    orders: [
      {
        prompt: 'Order the steps of gene expression.',
        items: ['DNA unwinds', 'Transcription makes mRNA', 'mRNA leaves the nucleus', 'Ribosome translates mRNA', 'Protein folds'],
      },
    ],
  },
  // 12 · College I
  {
    mcq: [
      ['A negative Gibbs free energy (ΔG < 0) means a reaction is…', 'spontaneous', 'impossible', 'at equilibrium', 'endothermic'],
      ['PCR is used to…', 'amplify segments of DNA', 'sequence proteins', 'kill bacteria', 'measure pH'],
      ['What is the hybridization of carbon in methane (CH₄)?', 'sp³', 'sp²', 'sp', 'dsp³'],
      ['If the distance between two masses doubles, gravitational force becomes…', 'one quarter as strong', 'half as strong', 'twice as strong', 'unchanged', 'Gravity follows an inverse-square law.'],
      ['An operon is…', 'a cluster of genes controlled by one promoter', 'a type of ribosome', 'a viral protein', 'a cell organelle'],
      ['Torque depends on force and…', 'the distance from the pivot', 'temperature', 'mass only', 'color'],
    ],
    terms: [
      ['Gibbs free energy', 'energy available to do useful work'],
      ['hybridization', 'mixing atomic orbitals to form new ones'],
      ['PCR', 'a technique to copy DNA many times'],
      ['operon', 'genes under control of a single promoter'],
      ['torque', 'the rotational effect of a force'],
    ],
    orders: [
      { prompt: 'Order the stages of cellular respiration.', items: ['Glycolysis', 'Pyruvate oxidation', 'Krebs cycle', 'Electron transport chain'] },
    ],
  },
  // 13 · College II
  {
    mcq: [
      ['The Heisenberg uncertainty principle says…', "a particle's position and momentum can't both be known precisely", 'energy is quantized', 'light is a wave', 'electrons orbit in circles'],
      ['An SN2 reaction is…', 'a one-step substitution with inversion of configuration', 'a two-step reaction with a carbocation', 'an elimination reaction', 'a radical reaction'],
      ['CRISPR-Cas9 is used for…', 'targeted gene editing using guide RNA', 'protein folding', 'measuring radiation', 'cell counting'],
      ["Maxwell's equations describe…", 'electromagnetism', 'gravity', 'thermodynamics', 'fluid flow'],
      ['The rising phase of an action potential is caused by…', 'a rapid influx of sodium ions', 'an influx of potassium ions', 'calcium leaving the cell', 'glucose uptake'],
      ['In enzyme kinetics, Km is…', 'the substrate concentration at half of Vmax', 'the maximum rate', 'the enzyme concentration', 'the product yield'],
    ],
    terms: [
      ['nucleophile', 'an electron-pair donor'],
      ['chirality', 'not superimposable on its mirror image'],
      ['action potential', 'a rapid electrical signal along a neuron'],
      ['wave function', 'a mathematical description of a quantum state'],
      ['epigenetics', 'heritable changes in gene expression without DNA sequence changes'],
    ],
    orders: [
      { prompt: 'Order the phases of an action potential.', items: ['Resting potential', 'Depolarization', 'Repolarization', 'Hyperpolarization'] },
    ],
  },
  // 14 · College III
  {
    mcq: [
      ['The Schrödinger equation describes…', 'how the quantum state of a system evolves', 'the speed of light', 'chemical equilibrium', 'planetary orbits'],
      ['In special relativity, a moving clock…', 'runs slow relative to a stationary observer', 'runs fast', 'stops', 'is unaffected'],
      ['The Pauli exclusion principle states…', 'no two electrons in an atom can share all four quantum numbers', 'electrons fill the lowest energy first', 'energy is conserved', 'opposite charges attract'],
      ['The second law of thermodynamics says the entropy of an isolated system…', 'never decreases', 'always stays constant', 'always decreases', 'equals zero'],
      ['Hox genes control…', 'the body plan along the head-to-tail axis', 'eye color', 'blood type', 'photosynthesis'],
      ['Which particle carries the electromagnetic force?', 'Photon', 'Gluon', 'W boson', 'Higgs boson'],
    ],
    terms: [
      ['time dilation', 'time passing slower for a moving observer'],
      ['boson', 'a particle with integer spin'],
      ['fermion', 'a particle with half-integer spin'],
      ['Hox genes', 'genes that set up the body plan'],
      ['Carnot efficiency', 'the maximum efficiency of a heat engine'],
    ],
    orders: [
      {
        prompt: 'Order the life of a Sun-like star.',
        items: ['Nebula', 'Main-sequence star', 'Red giant', 'Planetary nebula', 'White dwarf'],
      },
    ],
  },
]
