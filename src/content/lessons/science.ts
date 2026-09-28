import type { Lesson } from './types'

export const scienceLessons: Lesson[] = [
  // 0 · Grade 1
  {
    title: 'Living things & the world around us',
    summary: 'Science begins with observing: what is alive, what plants need, and how the weather changes.',
    topics: [
      {
        title: 'Living vs. nonliving',
        body: ['Living things **grow, need food and water, breathe, and reproduce**. A tree is living; a rock, cloud or chair is not.'],
      },
      {
        title: 'What plants need',
        body: ['Plants need **sunlight, water, air and soil**. Roots take in water; leaves use sunlight to make food.'],
      },
      {
        title: 'Seasons and weather',
        body: ['The four seasons repeat in order: **spring, summer, fall, winter**. Weather is what the air is like each day: sunny, rainy, windy or snowy.'],
      },
      {
        title: 'Our five senses',
        body: ['We learn about the world through **sight, hearing, smell, taste and touch**, using our eyes, ears, nose, tongue and skin.'],
      },
    ],
  },
  // 1 · Grade 2
  {
    title: 'Matter, habitats & life cycles',
    summary: 'Everything is made of matter, every creature has a home, and living things change as they grow.',
    topics: [
      {
        title: 'States of matter',
        body: [
          'A **solid** keeps its shape. A **liquid** takes the shape of its container. A **gas** spreads out to fill any space.',
          'Heating changes state: ice melts into water, and water boils into steam.',
        ],
      },
      {
        title: 'Habitats',
        body: ['A habitat is the natural home of a plant or animal, and it provides food, water and shelter. Examples are forests, deserts, oceans and wetlands.'],
      },
      {
        title: 'Life cycles',
        body: ['A butterfly goes through **egg → caterpillar (larva) → chrysalis (pupa) → adult**. This dramatic change is called metamorphosis.'],
      },
      {
        title: 'Magnets and erosion',
        body: [
          'Magnets attract objects made of **iron** (and some other metals), but not wood, plastic or glass.',
          '**Erosion** is the slow wearing away of land by water, wind or ice.',
        ],
      },
    ],
  },
  // 2 · Grade 3
  {
    title: 'Forces, space & food chains',
    summary: 'Pushes and pulls move things, planets circle the Sun, and energy flows from one living thing to the next.',
    topics: [
      {
        title: 'Forces and gravity',
        body: ['A force is a **push or a pull**. Gravity is the force that pulls objects toward Earth, which is why things fall.'],
      },
      {
        title: 'The solar system',
        body: ['Eight planets orbit the Sun. In order: **Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune**.'],
        tip: 'Memory trick: "My Very Educated Mother Just Served Us Noodles."',
      },
      {
        title: 'Food chains',
        body: [
          'Energy starts with the **Sun**, passes to plants (producers), then to animals that eat plants (**herbivores**), then to animals that eat animals (**carnivores**).',
          'A **predator** hunts; its **prey** is hunted.',
        ],
      },
      {
        title: 'Fossils and adaptations',
        body: [
          '**Fossils** are preserved remains or traces of ancient living things, usually found in rock.',
          'An **adaptation** is a trait that helps a living thing survive, like a camel\'s hump or a polar bear\'s thick fur.',
        ],
      },
    ],
  },
  // 3 · Grade 4
  {
    title: 'Earth, energy & electricity',
    summary: "How Earth's motion creates days and years, where energy comes from, and how circuits work.",
    topics: [
      {
        title: 'Day, night and years',
        body: ["Earth **rotates** on its axis once every 24 hours, which causes day and night. It **revolves** around the Sun once a year."],
      },
      {
        title: 'Energy and resources',
        body: [
          'Energy takes many forms: light, heat, sound, motion and **chemical** (stored in batteries and food).',
          '**Renewable** resources like wind and sunlight will not run out. Coal, oil and gas are nonrenewable.',
        ],
      },
      {
        title: 'The rock cycle',
        body: ['**Igneous** rock forms from cooled magma, **sedimentary** rock from pressed layers of sediment, and **metamorphic** rock from heat and pressure.'],
      },
      {
        title: 'The water cycle',
        body: ['Water **evaporates** into vapor, **condenses** into clouds, falls as **precipitation**, and **collects** in oceans and lakes, and then the cycle repeats.'],
      },
      {
        title: 'Circuits',
        body: ['Electricity flows through a **closed circuit**. Conductors (like metals) let it flow; insulators (like rubber) block it.'],
      },
    ],
  },
  // 4 · Grade 5
  {
    title: 'Ecosystems, Earth & space',
    summary: 'Plants power ecosystems, Earth has layers, and the Moon changes how it looks to us.',
    topics: [
      {
        title: 'Photosynthesis',
        body: ['Plants make their own food (sugar) from **sunlight, water and carbon dioxide**, and they release oxygen as a byproduct.'],
      },
      {
        title: 'Ecosystems and decomposers',
        body: ['An ecosystem is all the living and nonliving things in an area interacting. **Decomposers** such as fungi and bacteria break down dead matter and return nutrients to the soil.'],
      },
      {
        title: 'Mixtures and solutions',
        body: ['A **mixture** combines substances without chemically joining them (trail mix). A **solution** is a mixture where one substance dissolves evenly into another (salt water).'],
      },
      {
        title: "Earth's layers",
        body: ['From the outside in: **crust** (where we live), **mantle**, **outer core** (liquid metal) and **inner core** (solid metal).'],
      },
      {
        title: 'Moon phases',
        body: ["The Moon doesn't make light; it reflects sunlight. As it orbits Earth, we see different amounts of its lit side, and these are the **phases**."],
      },
    ],
  },
  // 5 · Grade 6
  {
    title: 'Cells, matter & energy',
    summary: 'All living things are built from cells, and all matter has measurable properties like density.',
    topics: [
      {
        title: 'Cells and organelles',
        body: [
          'The **cell** is the basic unit of life. Organelles are its specialized parts.',
          'The **nucleus** holds DNA, the **mitochondria** release energy (the "powerhouse"), and the **cell membrane** controls what enters and leaves.',
        ],
      },
      {
        title: 'Density',
        body: ['Density is **mass per unit volume**. Objects less dense than water float; objects more dense sink.'],
        example: { prompt: 'A 60 g block has a volume of 20 cm³.', steps: ['Density = 60 ÷ 20 = **3 g/cm³**', 'Water is 1 g/cm³, so it sinks.'] },
      },
      {
        title: 'Physical vs. chemical changes',
        body: ['A **physical change** alters form but not substance (ice melting). A **chemical change** makes a new substance (wood burning, iron rusting).'],
      },
      {
        title: 'Kinetic and potential energy',
        body: ['**Kinetic** energy is the energy of motion. **Potential** energy is stored energy, such as a ball held high or a stretched spring.'],
      },
      {
        title: 'Plate tectonics',
        body: ["Earth's crust is broken into huge **plates** that slowly move. Where they meet, we get earthquakes, volcanoes and mountains."],
      },
    ],
    formulas: [['Density', 'ρ = mass ÷ volume']],
  },
  // 6 · Grade 7
  {
    title: 'Chemistry basics, motion & heredity',
    summary: 'The building blocks of matter, the laws of motion, and how traits pass from parent to child.',
    topics: [
      {
        title: 'Elements and compounds',
        body: ['An **element** is made of only one kind of atom (oxygen, gold). A **compound** is two or more elements chemically bonded (water, H₂O).'],
      },
      {
        title: "Newton's first law",
        body: ['An object at rest stays at rest, and an object in motion stays in motion, **unless acted on by a force**. This resistance to change is called **inertia**.'],
      },
      {
        title: 'Acids and bases',
        body: ['The **pH scale** runs from 0 to 14. Below 7 is **acidic** (lemon juice), 7 is neutral (pure water), and above 7 is **basic** (soap).'],
      },
      {
        title: 'Genes and DNA',
        body: ['DNA in the nucleus carries instructions. A **gene** is a segment of DNA that codes for a trait.'],
      },
      {
        title: 'The scientific method',
        body: ['**Ask a question → form a hypothesis → experiment → analyze data → draw a conclusion.** A good experiment changes only one variable at a time.'],
      },
    ],
  },
  // 7 · Grade 8
  {
    title: 'Atoms, forces & evolution',
    summary: 'Inside the atom, the math of motion, and how populations change over generations.',
    topics: [
      {
        title: 'Atomic structure',
        body: [
          'Atoms contain **protons** (+) and **neutrons** (neutral) in the nucleus, with **electrons** (−) around it.',
          'The **atomic number** is the number of protons, and it defines the element. **Isotopes** have the same protons but different neutrons.',
        ],
      },
      {
        title: 'The periodic table',
        body: ['Elements are ordered by **atomic number**. Columns (groups) share similar chemical behavior.'],
      },
      {
        title: "Newton's second law and speed",
        body: ['**F = ma**: force equals mass times acceleration. **Speed = distance ÷ time**; **velocity** is speed with a direction.'],
        example: { prompt: 'What force accelerates a 5 kg cart at 3 m/s²?', steps: ['F = 5 × 3 = **15 N**'] },
      },
      {
        title: 'Genetics',
        body: [
          '**Genotype** is the genetic makeup (Bb); **phenotype** is the visible trait (brown eyes).',
          'A **dominant** allele (B) shows whenever present, so a Bb individual shows the dominant trait. A recessive trait (b) shows only as bb.',
        ],
      },
      {
        title: 'Natural selection',
        body: ['Individuals with traits that help them **survive and reproduce** pass those traits on more often, so populations change over generations.'],
      },
    ],
    formulas: [
      ["Newton's 2nd law", 'F = m × a'],
      ['Speed', 'v = d ÷ t'],
    ],
  },
  // 8 · Grade 9
  {
    title: 'Biology',
    summary: 'How cells divide, store information, and turn food into usable energy.',
    topics: [
      {
        title: 'Mitosis vs. meiosis',
        body: [
          '**Mitosis** makes two identical cells for growth and repair. Its phases are prophase, metaphase, anaphase and telophase ("PMAT").',
          '**Meiosis** makes four genetically different sex cells (gametes) with half the chromosomes.',
        ],
      },
      {
        title: 'DNA and RNA',
        body: [
          'DNA bases pair up: **A with T** and **C with G**.',
          '**mRNA** carries the genetic code from DNA to the ribosomes, where proteins are built. In RNA, uracil (U) replaces thymine.',
        ],
      },
      {
        title: 'Enzymes',
        body: ['Enzymes are **proteins that speed up** chemical reactions without being used up. Each fits its substrate like a lock and key.'],
      },
      {
        title: 'Cellular respiration and homeostasis',
        body: [
          'Cells break down glucose with oxygen to make **ATP**, the energy currency of the cell.',
          '**Homeostasis** is the body keeping stable internal conditions, such as temperature and blood sugar.',
        ],
      },
    ],
    formulas: [['Cellular respiration', 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP']],
  },
  // 9 · Grade 10
  {
    title: 'Chemistry',
    summary: 'Counting atoms, understanding how they bond, and tracking energy through reactions.',
    topics: [
      {
        title: 'The mole',
        body: [
          'A mole is **6.022 × 10²³** particles (Avogadro\'s number), a chemist\'s "dozen."',
          '**Molar mass** is the mass of one mole. Water (H₂O) is 2(1) + 16 = **18 g/mol**.',
        ],
      },
      {
        title: 'Chemical bonds',
        body: [
          '**Ionic bonds** form when a metal transfers electrons to a nonmetal (NaCl). **Covalent bonds** form when nonmetals share electrons (H₂O).',
          '**Valence electrons** (the outermost ones) drive bonding. Noble gases have full outer shells, so they rarely react.',
        ],
      },
      {
        title: 'Balancing equations',
        body: ['Atoms are never created or destroyed, so each element must have the same count on both sides. Adjust **coefficients**, never subscripts.'],
        example: { prompt: 'H₂ + O₂ → H₂O', steps: ['Oxygen: 2 on the left, 1 on the right → put 2 before H₂O.', 'Now hydrogen: 4 on the right → put 2 before H₂.', '**2H₂ + O₂ → 2H₂O**'] },
      },
      {
        title: 'Energy in reactions',
        body: ['**Exothermic** reactions release heat (burning). **Endothermic** reactions absorb heat (cold packs). A **catalyst** speeds up a reaction without being consumed.'],
      },
    ],
    formulas: [
      ["Avogadro's number", '6.022 × 10²³ /mol'],
      ['Molarity', 'M = moles solute ÷ liters solution'],
    ],
  },
  // 10 · Grade 11
  {
    title: 'Physics',
    summary: 'The quantitative laws behind motion, energy, electricity and waves.',
    topics: [
      {
        title: 'Momentum',
        body: ['Momentum is **mass × velocity**. In a collision with no outside forces, total momentum is conserved.'],
      },
      {
        title: 'Work, energy and power',
        body: [
          '**Work** = force × distance (in joules). **Power** = work ÷ time (in watts).',
          'Energy is **conserved**: it cannot be created or destroyed, only transformed.',
        ],
        example: { prompt: 'Pushing with 50 N over 4 m in 2 s', steps: ['Work = 50 × 4 = 200 J', 'Power = 200 ÷ 2 = **100 W**'] },
      },
      {
        title: "Ohm's law",
        body: ['Voltage = current × resistance (**V = IR**). Double the resistance at the same voltage and the current halves.'],
      },
      {
        title: 'Waves and the EM spectrum',
        body: [
          'Wave speed = frequency × wavelength. Frequency is measured in **hertz** (cycles per second).',
          'By increasing frequency: **radio, microwave, infrared, visible, ultraviolet, X-ray, gamma**.',
        ],
      },
    ],
    formulas: [
      ['Momentum', 'p = m × v'],
      ['Work', 'W = F × d'],
      ['Power', 'P = W ÷ t'],
      ["Ohm's law", 'V = I × R'],
      ['Wave speed', 'v = f × λ'],
      ['Gravity near Earth', 'g ≈ 9.8 m/s²'],
    ],
  },
  // 11 · Grade 12
  {
    title: 'AP-level science',
    summary: 'The big unifying ideas: equilibrium, entropy, gene expression and radioactive decay.',
    topics: [
      {
        title: "Equilibrium and Le Chatelier's principle",
        body: ['At equilibrium, forward and reverse reactions run at **equal rates**. If you disturb the system (add reactant, change temperature), it **shifts to counteract** the change.'],
      },
      {
        title: 'Entropy',
        body: ['Entropy measures **disorder** or energy dispersal. Natural processes tend to increase total entropy: ice melts in a warm room, not the reverse.'],
      },
      {
        title: 'Gene expression',
        body: ['The **central dogma**: DNA → (transcription) → mRNA → (translation) → protein. Transcription happens in the nucleus; translation happens at ribosomes.'],
      },
      {
        title: 'Population genetics',
        body: ['**Hardy-Weinberg equilibrium** describes a population that is not evolving: no selection, mutation, migration or genetic drift, and random mating. Deviations reveal evolution at work.'],
      },
      {
        title: "Half-life and Kepler's laws",
        body: [
          'A **half-life** is the time for half of a radioactive sample to decay. After 3 half-lives, 1/8 remains.',
          "Kepler's third law: a planet's orbital period squared is proportional to its average distance cubed (T² ∝ a³).",
        ],
      },
    ],
    formulas: [
      ['Hardy-Weinberg', 'p² + 2pq + q² = 1'],
      ['Radioactive decay', 'N = N₀ · (1/2)^(t / t½)'],
      ["Kepler's third law", 'T² ∝ a³'],
    ],
  },
  // 12 · College I
  {
    title: 'Intro college: thermodynamics & molecular biology',
    summary: 'First-year college science: predicting reactions, molecular shapes, and the tools of biotechnology.',
    topics: [
      {
        title: 'Gibbs free energy',
        body: ['**ΔG = ΔH − TΔS**. If ΔG < 0, a reaction is **spontaneous** (it can happen without an input of energy). That says nothing about how fast it goes.'],
      },
      {
        title: 'Orbital hybridization',
        body: ['Atomic orbitals mix to form hybrid orbitals. Carbon with four single bonds, as in methane, is **sp³** (tetrahedral, 109.5°). A double bond gives sp², and a triple bond gives sp.'],
      },
      {
        title: 'Cellular respiration stages',
        body: ['**Glycolysis** (cytoplasm) → **pyruvate oxidation** → **Krebs cycle** (mitochondrial matrix) → **electron transport chain**, which makes most of the ATP.'],
      },
      {
        title: 'Biotech tools and gene regulation',
        body: [
          '**PCR** amplifies a DNA segment into millions of copies through repeated heating and cooling cycles.',
          'An **operon** is a cluster of bacterial genes controlled by a single promoter, such as the lac operon.',
        ],
      },
      {
        title: 'Rotation and gravitation',
        body: [
          '**Torque** = force × lever arm (distance from the pivot). This is why long wrenches make turning easier.',
          "Newton's law of gravitation is inverse-square: **double the distance, and the force drops to 1/4**.",
        ],
      },
    ],
    formulas: [
      ['Gibbs free energy', 'ΔG = ΔH − TΔS'],
      ['Torque', 'τ = r × F'],
      ['Gravitation', 'F = G·m₁m₂ / r²'],
    ],
  },
  // 13 · College II
  {
    title: 'Quantum, organic & neuroscience',
    summary: 'Second-year topics where intuition breaks down and mechanisms matter.',
    topics: [
      {
        title: 'Quantum basics',
        body: [
          'A **wave function** describes a quantum state; its square gives probabilities.',
          'The **Heisenberg uncertainty principle** says position and momentum cannot both be known precisely: Δx·Δp ≥ ħ/2.',
        ],
      },
      {
        title: 'Organic reaction mechanisms',
        body: [
          'A **nucleophile** is an electron-pair donor that attacks electron-poor atoms.',
          '**SN2** reactions happen in one step with backside attack, causing **inversion** of configuration. **Chiral** molecules are not superimposable on their mirror images.',
        ],
      },
      {
        title: 'Action potentials',
        body: ['A neuron fires when **Na⁺ rushes in** (depolarization). **K⁺ flows out** (repolarization), the membrane briefly overshoots (hyperpolarization), and then it returns to resting potential.'],
      },
      {
        title: 'Gene editing and epigenetics',
        body: [
          '**CRISPR-Cas9** uses a guide RNA to direct the Cas9 enzyme to cut DNA at a precise location.',
          '**Epigenetics** covers heritable changes in gene expression, such as DNA methylation, that happen without changing the DNA sequence.',
        ],
      },
      {
        title: 'Enzyme kinetics',
        body: ['In Michaelis-Menten kinetics, **Km** is the substrate concentration at which the reaction runs at half of its maximum rate (Vmax). A low Km means high affinity.'],
      },
    ],
    formulas: [
      ['Uncertainty principle', 'Δx · Δp ≥ ħ/2'],
      ['Michaelis-Menten', 'v = Vmax[S] / (Km + [S])'],
      ['Photon energy', 'E = hf'],
    ],
  },
  // 14 · College III
  {
    title: 'Modern physics & developmental biology',
    summary: 'The frontier: relativity, quantum mechanics, the particle zoo, and how a single cell builds a body.',
    topics: [
      {
        title: 'The Schrödinger equation and the Pauli principle',
        body: [
          'The Schrödinger equation describes how a quantum state **evolves over time**.',
          '**Pauli exclusion**: no two electrons in an atom can share all four quantum numbers. This is why electron shells fill up and chemistry exists.',
        ],
      },
      {
        title: 'Special relativity',
        body: ['The speed of light is the same for all observers. As a result, moving clocks **run slow** (time dilation) and mass and energy are equivalent (E = mc²).'],
      },
      {
        title: 'Thermodynamics, second law',
        body: ['The total entropy of an isolated system **never decreases**. As a consequence, no heat engine can beat the **Carnot efficiency**, 1 − T_cold/T_hot.'],
      },
      {
        title: 'Particle physics',
        body: ['**Fermions** (half-integer spin: quarks, electrons) make up matter. **Bosons** (integer spin) carry forces: the **photon** carries electromagnetism and gluons carry the strong force.'],
      },
      {
        title: 'Developmental biology and stellar evolution',
        body: [
          '**Hox genes** lay out the body plan along the head-to-tail axis in animals.',
          'A Sun-like star goes from **nebula → main-sequence star → red giant → planetary nebula → white dwarf**.',
        ],
      },
    ],
    formulas: [
      ['Mass-energy', 'E = mc²'],
      ['Time dilation', 't = t₀ / √(1 − v²/c²)'],
      ['Carnot efficiency', 'η = 1 − T_c / T_h'],
    ],
  },
]
