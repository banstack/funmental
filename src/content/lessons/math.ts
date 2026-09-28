import type { Lesson } from './types'

export const mathLessons: Lesson[] = [
  // 0 · Grade 1
  {
    title: 'Adding & subtracting within 20',
    summary: 'Every later skill rests on fast, confident number facts. The goal here is to add and subtract small numbers without counting on your fingers.',
    topics: [
      {
        title: 'Addition within 20',
        body: [
          'Addition means putting groups together. Start from the **bigger number** and count on by the smaller one: for 3 + 8, start at 8 and count 9, 10, 11.',
          'The **make-ten** strategy is faster: split one number so the other reaches 10. For 8 + 5, move 2 from the 5 to make 10 + 3 = 13.',
        ],
        example: { prompt: '7 + 6', steps: ['7 needs 3 more to make 10.', 'Split 6 into 3 + 3.', '10 + 3 = **13**'] },
      },
      {
        title: 'Subtraction within 20',
        body: [
          'Subtraction means taking away, or finding the **difference** between two numbers. Addition and subtraction undo each other.',
          'Numbers come in **fact families**: 5 + 8 = 13, 8 + 5 = 13, 13 − 8 = 5, and 13 − 5 = 8. If you know one fact, you know all four.',
        ],
        example: { prompt: '15 − 7', steps: ['Think: 7 + ? = 15.', '7 + 3 = 10, then 10 + 5 = 15, so ? = 3 + 5.', 'Answer: **8**'] },
      },
      {
        title: 'Ten more, ten less',
        body: ['Adding 10 to a single-digit number puts a 1 in the tens place and keeps the ones digit the same: 10 more than 4 is 14.'],
        tip: 'Counting by tens (10, 20, 30…) is the bridge to place value in Grade 2.',
      },
    ],
  },
  // 1 · Grade 2
  {
    title: 'Place value & two-digit math',
    summary: 'The position of a digit tells you what it is worth. Place value is what makes adding and subtracting bigger numbers work.',
    topics: [
      {
        title: 'Place value',
        body: [
          'In 473, the **4** means 4 hundreds (400), the **7** means 7 tens (70), and the **3** means 3 ones.',
          'Reading a number from left to right goes from largest place to smallest: hundreds, tens, ones.',
        ],
        example: { prompt: 'What digit is in the tens place of 582?', steps: ['Hundreds: 5, tens: 8, ones: 2.', 'Answer: **8**'] },
      },
      {
        title: 'Adding two-digit numbers',
        body: [
          'Add the ones first, then the tens. If the ones add to 10 or more, **regroup** (carry): 10 ones become 1 ten.',
          'You can also add tens and ones separately: 47 + 36 = (40 + 30) + (7 + 6) = 70 + 13 = 83.',
        ],
        example: { prompt: '58 + 27', steps: ['Ones: 8 + 7 = 15. Write 5, carry 1 ten.', 'Tens: 5 + 2 + 1 = 8.', 'Answer: **85**'] },
      },
      {
        title: 'Subtracting two-digit numbers',
        body: ['Subtract the ones first. If the top ones digit is too small, **borrow** a ten: turn 1 ten into 10 ones.'],
        example: { prompt: '72 − 38', steps: ['2 − 8 does not work, so borrow: 72 becomes 6 tens and 12 ones.', 'Ones: 12 − 8 = 4. Tens: 6 − 3 = 3.', 'Answer: **34**'] },
      },
    ],
  },
  // 2 · Grade 3
  {
    title: 'Multiplication & division',
    summary: 'Multiplication is repeated addition; division splits things into equal groups. Knowing the times tables to 10 × 10 by heart pays off for years.',
    topics: [
      {
        title: 'Multiplication as equal groups',
        body: [
          '4 × 6 means 4 groups of 6: 6 + 6 + 6 + 6 = 24. Order does not matter: 4 × 6 = 6 × 4.',
          'Break hard facts into easy ones: 7 × 8 = 7 × 4 doubled = 28 × 2 = 56.',
        ],
        tip: 'Anything × 9: the digits of the answer add to 9 (9 × 7 = 63, and 6 + 3 = 9).',
      },
      {
        title: 'Division as sharing',
        body: [
          '24 ÷ 6 asks "how many in each group if 24 is split into 6 equal groups?" or "how many groups of 6 fit into 24?"',
          'Division undoes multiplication, so use the fact you know: 6 × 4 = 24, so 24 ÷ 6 = 4.',
        ],
        example: { prompt: '56 ÷ 8', steps: ['Think: 8 × ? = 56.', '8 × 7 = 56.', 'Answer: **7**'] },
      },
      {
        title: 'Adding three-digit numbers',
        body: ['Line up the places and add column by column from the right, carrying when a column reaches 10 or more.'],
        example: { prompt: '348 + 275', steps: ['Ones: 8 + 5 = 13 → write 3, carry 1.', 'Tens: 4 + 7 + 1 = 12 → write 2, carry 1.', 'Hundreds: 3 + 2 + 1 = 6.', 'Answer: **623**'] },
      },
    ],
  },
  // 3 · Grade 4
  {
    title: 'Multi-digit operations & rounding',
    summary: 'Break big numbers into place-value pieces, work on each piece, and estimate to check that the answer makes sense.',
    topics: [
      {
        title: 'Multiplying by a one-digit number',
        body: ['Split the bigger number by place value, multiply each part, then add the **partial products**.'],
        example: { prompt: '67 × 4', steps: ['60 × 4 = 240', '7 × 4 = 28', '240 + 28 = **268**'] },
      },
      {
        title: 'Long division',
        body: [
          'Divide from the left, one place at a time. At each step: **divide, multiply, subtract, bring down**.',
          'Check your answer by multiplying: quotient × divisor should equal the original number.',
        ],
        example: { prompt: '756 ÷ 6', steps: ['7 ÷ 6 = 1, remainder 1. Bring down 5 → 15.', '15 ÷ 6 = 2, remainder 3. Bring down 6 → 36.', '36 ÷ 6 = 6.', 'Answer: **126** (check: 126 × 6 = 756)'] },
      },
      {
        title: 'Rounding',
        body: ['To round to the nearest hundred, look at the **tens digit**. If it is 5 or more, round up; if it is 4 or less, round down.'],
        example: { prompt: 'Round 4,372 to the nearest hundred.', steps: ['The hundreds digit is 3; the tens digit is 7.', '7 ≥ 5, so round up.', 'Answer: **4,400**'] },
      },
    ],
  },
  // 4 · Grade 5
  {
    title: 'Fractions, decimals & volume',
    summary: 'Fractions and decimals describe parts of a whole. This grade also moves from flat shapes to solid ones.',
    topics: [
      {
        title: 'Adding fractions with the same denominator',
        body: [
          'The denominator (bottom) is the size of the pieces; the numerator (top) is how many pieces. With the same denominator, **add the numerators and keep the denominator**.',
          'Then **simplify** by dividing top and bottom by their greatest common factor.',
        ],
        example: { prompt: '5/8 + 7/8', steps: ['5 + 7 = 12, so the sum is 12/8.', 'Divide top and bottom by 4: 12/8 = 3/2.', 'Answer: **3/2** (or 1½)'] },
        tip: 'Never add the denominators: 1/4 + 1/4 is 2/4, not 2/8.',
      },
      {
        title: 'Adding decimals',
        body: ['**Line up the decimal points**, then add as with whole numbers. The decimal point in the answer goes directly below.'],
        example: { prompt: '4.7 + 3.8', steps: ['Tenths: 7 + 8 = 15 → write 5, carry 1.', 'Ones: 4 + 3 + 1 = 8.', 'Answer: **8.5**'] },
      },
      {
        title: 'Two-digit multiplication',
        body: ['Multiply by the ones digit, then by the tens digit (shifted one place left), and add the two rows.'],
        example: { prompt: '23 × 14', steps: ['23 × 4 = 92', '23 × 10 = 230', '92 + 230 = **322**'] },
      },
      {
        title: 'Volume',
        body: ['Volume is how much space a solid takes up, measured in cubic units. For a rectangular box, **V = length × width × height**.'],
        example: { prompt: 'A box is 3 × 4 × 5 cm.', steps: ['3 × 4 = 12', '12 × 5 = 60', 'Answer: **60 cm³**'] },
      },
    ],
    formulas: [
      ['Volume of a box', 'V = l × w × h'],
      ['Same-denominator sum', 'a/d + b/d = (a + b)/d'],
    ],
  },
  // 5 · Grade 6
  {
    title: 'Ratios, percents & negative numbers',
    summary: 'This grade is about comparing quantities and extending the number line below zero, which is where algebra begins.',
    topics: [
      {
        title: 'Percent of a number',
        body: [
          'Percent means "per hundred": 25% = 25/100 = 0.25. To find a percent of a number, **multiply**.',
          'Use friendly percents: 10% is dividing by 10, 50% is half, 25% is a quarter.',
        ],
        example: { prompt: 'What is 75% of 40?', steps: ['75% = 3/4.', '40 ÷ 4 = 10, and 10 × 3 = 30.', 'Answer: **30**'] },
      },
      {
        title: 'Adding negative numbers',
        body: [
          'On a number line, adding a positive moves right and adding a negative moves **left**.',
          'Adding a negative is the same as subtracting: 5 + (−8) = 5 − 8 = −3.',
        ],
        example: { prompt: '−6 + (−9)', steps: ['Both are negative, so move left from −6 by 9.', 'Answer: **−15**'] },
      },
      {
        title: 'Ratios & unit rates',
        body: ['A **unit rate** is the amount for one item. Find it by dividing, then multiply to scale up.'],
        example: { prompt: '3 notebooks cost $12. What do 7 cost?', steps: ['Unit rate: $12 ÷ 3 = $4 each.', '7 × $4 = **$28**'] },
      },
      {
        title: 'Order of operations',
        body: ['Work in this order: **Parentheses, Exponents, Multiplication & Division (left to right), Addition & Subtraction (left to right)**. This is often remembered as PEMDAS.'],
        example: { prompt: '6 + 4 × 3', steps: ['Multiply first: 4 × 3 = 12.', '6 + 12 = **18** (not 30)'] },
      },
    ],
    formulas: [
      ['Percent of a number', 'p% of n = (p ÷ 100) × n'],
      ['Order of operations', 'P → E → M/D → A/S'],
    ],
  },
  // 6 · Grade 7
  {
    title: 'Equations & integer rules',
    summary: 'An equation is a balance: whatever you do to one side, you must do to the other. That single idea solves most of algebra.',
    topics: [
      {
        title: 'One-step equations',
        body: [
          'To solve for x, undo what is being done to it using the **inverse operation**: addition undoes subtraction, division undoes multiplication.',
          'Always do the same thing to **both sides** so the equation stays balanced.',
        ],
        example: { prompt: 'Solve 6x = −42', steps: ['x is multiplied by 6, so divide both sides by 6.', 'x = −42 ÷ 6 = **−7**'] },
      },
      {
        title: 'Multiplying and dividing integers',
        body: ['Multiply or divide the numbers as usual, then set the sign: **same signs give a positive, different signs give a negative**.'],
        example: { prompt: '(−7) × (−8)', steps: ['7 × 8 = 56.', 'Both negative, so the answer is positive: **56**'] },
      },
      {
        title: 'Percent change',
        body: ['To increase by p%, find p% of the original and add it. A quicker way: multiply by (1 + p/100). A 20% increase means × 1.2.'],
        example: { prompt: 'A $80 item rises 25%.', steps: ['25% of 80 = 20.', '80 + 20 = **$100**'] },
      },
    ],
    formulas: [
      ['Sign rules', '(+)(+) = +,  (−)(−) = +,  (+)(−) = −'],
      ['Percent increase', 'new = old × (1 + p/100)'],
    ],
  },
  // 7 · Grade 8
  {
    title: 'Two-step equations & exponents',
    summary: 'Equations take more than one step, and exponents become a compact way to write repeated multiplication.',
    topics: [
      {
        title: 'Two-step equations',
        body: ['Undo operations in **reverse order**: first undo addition or subtraction, then undo multiplication or division.'],
        example: { prompt: 'Solve 4x − 7 = 21', steps: ['Add 7 to both sides: 4x = 28.', 'Divide by 4: x = **7**'] },
      },
      {
        title: 'Exponents',
        body: ['An exponent tells how many times to multiply the base by itself: 5³ = 5 × 5 × 5 = 125. It is **not** 5 × 3.'],
        tip: 'Memorize the squares from 1² to 15² (1, 4, 9 … 196, 225). They show up everywhere.',
      },
      {
        title: 'Square roots',
        body: ['The square root undoes squaring: √81 = 9 because 9² = 81. A **perfect square** has a whole-number root.'],
      },
      {
        title: 'Evaluating expressions',
        body: ['Substitute the value in parentheses, then follow order of operations. Exponents come **before** multiplying by a coefficient.'],
        example: { prompt: 'Evaluate 3x² − 2 when x = −4', steps: ['x² = (−4)² = 16. Squaring a negative gives a positive.', '3 × 16 = 48.', '48 − 2 = **46**'] },
      },
    ],
  },
  // 8 · Grade 9
  {
    title: 'Algebra I',
    summary: 'Algebra I turns patterns into equations and graphs. Lines, systems and functions are the core tools.',
    topics: [
      {
        title: 'Slope',
        body: [
          'Slope measures how steep a line is: **rise over run**, or the change in y divided by the change in x.',
          'A positive slope goes up to the right, a negative slope goes down, and a horizontal line has slope 0.',
        ],
        example: { prompt: 'Slope through (1, 2) and (4, 11)', steps: ['Change in y: 11 − 2 = 9.', 'Change in x: 4 − 1 = 3.', 'm = 9 ÷ 3 = **3**'] },
      },
      {
        title: 'Systems of equations',
        body: ['A system is two equations that are both true at once. **Elimination** means adding or subtracting the equations to cancel a variable.'],
        example: { prompt: 'x + y = 10 and x − y = 4', steps: ['Add the equations: 2x = 14.', 'x = 7, then y = 10 − 7 = 3.', 'Solution: **(7, 3)**'] },
      },
      {
        title: 'The distributive property',
        body: ['a(b + c) = ab + ac. Multiply the outside number by **every** term inside the parentheses. Or, when solving, divide both sides by it first.'],
        example: { prompt: 'Solve 3(x + 4) = 27', steps: ['Divide both sides by 3: x + 4 = 9.', 'x = **5**'] },
      },
      {
        title: 'Function notation',
        body: ['f(x) is a rule that turns an input x into an output. f(3) means "put 3 in for every x."'],
        example: { prompt: 'f(x) = x² + 2x − 1. Find f(−3).', steps: ['(−3)² + 2(−3) − 1', '= 9 − 6 − 1 = **2**'] },
      },
    ],
    formulas: [
      ['Slope', 'm = (y₂ − y₁) / (x₂ − x₁)'],
      ['Slope-intercept form', 'y = mx + b'],
      ['Distributive property', 'a(b + c) = ab + ac'],
    ],
  },
  // 9 · Grade 10
  {
    title: 'Geometry',
    summary: 'Geometry is the study of shapes, sizes and angles. A few key relationships solve a huge range of problems.',
    topics: [
      {
        title: 'The Pythagorean theorem',
        body: [
          'In a right triangle, the two legs a and b and the hypotenuse c (the longest side, opposite the right angle) satisfy **a² + b² = c²**.',
          'Common whole-number triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25, and their multiples (6-8-10, 9-12-15…).',
        ],
        example: { prompt: 'Legs 9 and 12. Find the hypotenuse.', steps: ['9² + 12² = 81 + 144 = 225.', 'c = √225 = **15** (a 3-4-5 triangle scaled by 3)'] },
      },
      {
        title: 'Angles in a triangle',
        body: ['The three interior angles of any triangle add up to **180°**.'],
        example: { prompt: 'Two angles are 50° and 75°.', steps: ['180 − 50 − 75 = **55°**'] },
      },
      {
        title: 'Circles',
        body: ['The area of a circle is **πr²** and the circumference is **2πr**, where r is the radius. Answers are often left "in terms of π".'],
        example: { prompt: 'Area of a circle with radius 6', steps: ['π × 6² = **36π**'] },
        tip: 'Do not mix up the two formulas: area has r², circumference has 2r.',
      },
      {
        title: 'Polygon interior angles',
        body: ['A polygon with n sides can be split into (n − 2) triangles, so its interior angles add up to **(n − 2) × 180°**.'],
        example: { prompt: 'Hexagon (6 sides)', steps: ['(6 − 2) × 180 = **720°**'] },
      },
    ],
    formulas: [
      ['Pythagorean theorem', 'a² + b² = c²'],
      ['Circle area', 'A = πr²'],
      ['Circumference', 'C = 2πr'],
      ['Polygon angle sum', '(n − 2) × 180°'],
    ],
  },
  // 10 · Grade 11
  {
    title: 'Algebra II',
    summary: 'Algebra II adds new kinds of functions (quadratic, exponential, logarithmic) and extends numbers to include i.',
    topics: [
      {
        title: 'Factoring quadratics',
        body: [
          'To solve x² + bx + c = 0, find two numbers that **multiply to c** and **add to b**. Then write (x + p)(x + q) = 0.',
          'Each factor can equal zero, which gives the two **roots**.',
        ],
        example: { prompt: 'Solve x² − x − 12 = 0', steps: ['Multiply to −12, add to −1: that is −4 and 3.', '(x − 4)(x + 3) = 0', 'x = **4** or x = **−3**'] },
      },
      {
        title: 'Logarithms',
        body: ['A logarithm asks "what exponent?" log_b(x) = k means b^k = x. For example, log₂(32) = 5 because 2⁵ = 32.'],
      },
      {
        title: 'Exponent rules',
        body: ['When you multiply powers with the same base, **add** the exponents. When you divide them, subtract. A power raised to a power **multiplies** the exponents.'],
        example: { prompt: '(x³)⁴ · x²', steps: ['(x³)⁴ = x¹²', 'x¹² · x² = **x¹⁴**'] },
      },
      {
        title: 'Imaginary numbers',
        body: ['i is defined as √−1, so i² = −1. Powers of i repeat in a cycle of 4: **i, −1, −i, 1**. To find iⁿ, divide n by 4 and use the remainder.'],
        example: { prompt: 'i²³', steps: ['23 ÷ 4 = 5 remainder 3.', 'i³ = **−i**'] },
      },
    ],
    formulas: [
      ['Product rule', 'xᵃ · xᵇ = xᵃ⁺ᵇ'],
      ['Quotient rule', 'xᵃ ÷ xᵇ = xᵃ⁻ᵇ'],
      ['Power rule', '(xᵃ)ᵇ = xᵃᵇ'],
      ['Log definition', 'log_b(x) = k  ⇔  bᵏ = x'],
      ['Quadratic formula', 'x = (−b ± √(b² − 4ac)) / 2a'],
    ],
  },
  // 11 · Grade 12
  {
    title: 'Precalculus',
    summary: 'Precalculus connects algebra to trigonometry and sequences, setting up the language of calculus.',
    topics: [
      {
        title: 'Special trig values',
        body: [
          'On the unit circle, cos θ is the x-coordinate and sin θ is the y-coordinate.',
          'For 0°, 30°, 45°, 60° and 90°, sin runs **0, 1/2, √2/2, √3/2, 1**, and cos runs the same list backwards.',
        ],
        tip: 'Memory trick: sin values are √0/2, √1/2, √2/2, √3/2, √4/2.',
      },
      {
        title: 'Arithmetic & geometric sequences',
        body: [
          'An **arithmetic** sequence adds the same difference d each time. The sum of its first n terms is n × (first + last) ÷ 2.',
          'A **geometric** sequence multiplies by the same ratio r. Its nth term is a × r^(n−1).',
        ],
        example: { prompt: 'Sum of 3, 7, 11, … (8 terms)', steps: ['d = 4, so the last term is 3 + 7 × 4 = 31.', 'Sum = 8 × (3 + 31) ÷ 2 = **136**'] },
      },
      {
        title: 'Function composition',
        body: ['f(g(x)) means apply g first, then feed the result into f. Work from the **inside out**.'],
        example: { prompt: 'f(x) = 2x + 1, g(x) = x − 3. Find f(g(5)).', steps: ['g(5) = 2.', 'f(2) = 5, so f(g(5)) = **5**'] },
      },
      {
        title: 'Radians',
        body: ['Radians measure angles by arc length: a full circle is 2π radians, so **180° = π**. To convert degrees to radians, multiply by π/180.'],
        example: { prompt: 'Convert 135° to radians', steps: ['135 × π/180 = 3π/4', 'Answer: **3π/4**'] },
      },
    ],
    formulas: [
      ['Arithmetic sum', 'Sₙ = n(a₁ + aₙ) / 2'],
      ['Geometric term', 'aₙ = a₁ · rⁿ⁻¹'],
      ['Degrees → radians', 'θ × π/180'],
      ['Pythagorean identity', 'sin²θ + cos²θ = 1'],
    ],
  },
  // 12 · College I
  {
    title: 'Calculus I: limits & derivatives',
    summary: 'Calculus studies change. A derivative is the instantaneous rate of change, which is the slope of a curve at a single point.',
    topics: [
      {
        title: 'Limits',
        body: [
          'A limit asks what value f(x) approaches as x gets close to some number. If plugging in gives 0/0, try **factoring and cancelling**.',
          'For limits at infinity of a ratio of polynomials with the **same degree**, the limit is the ratio of the leading coefficients.',
        ],
        example: { prompt: 'lim (x→3) of (x² − 9)/(x − 3)', steps: ['Factor: (x − 3)(x + 3)/(x − 3) = x + 3.', 'Plug in 3: **6**'] },
      },
      {
        title: 'The power rule',
        body: ['The derivative of xⁿ is **n·xⁿ⁻¹**: bring the exponent down and subtract one. Constants multiply through, and the derivative of a constant is 0.'],
        example: { prompt: "f(x) = 2x³ − 5x. Find f′(2).", steps: ["f′(x) = 6x² − 5", "f′(2) = 6(4) − 5 = **19**"] },
      },
      {
        title: 'Tangent lines',
        body: ['The derivative at x = a is the **slope of the tangent line** there. The tangent line is y − f(a) = f′(a)(x − a).'],
      },
    ],
    formulas: [
      ['Power rule', 'd/dx xⁿ = n·xⁿ⁻¹'],
      ['Derivative definition', "f′(x) = lim (h→0) [f(x+h) − f(x)] / h"],
      ['Product rule', "(fg)′ = f′g + fg′"],
    ],
  },
  // 13 · College II
  {
    title: 'Calculus II: integrals & the chain rule',
    summary: 'Integration reverses differentiation and measures accumulated area. The chain rule handles functions nested inside functions.',
    topics: [
      {
        title: 'Definite integrals',
        body: [
          'The **Fundamental Theorem of Calculus**: to find the integral of f from a to b, find an antiderivative F, then compute F(b) − F(a).',
          'Antiderivative power rule: the antiderivative of xⁿ is xⁿ⁺¹/(n + 1).',
        ],
        example: { prompt: '∫ from 0 to 2 of 3x² dx', steps: ['Antiderivative: x³.', '2³ − 0³ = **8**'] },
      },
      {
        title: 'The chain rule',
        body: ['For a composite function f(g(x)), the derivative is **f′(g(x)) · g′(x)**: take the derivative of the outside function, then multiply by the derivative of the inside.'],
        example: { prompt: "f(x) = (3x + 1)². Find f′(1).", steps: ["f′(x) = 2(3x + 1) · 3", "f′(1) = 2(4)(3) = **24**"] },
      },
      {
        title: 'Derivatives of eˣ and ln x',
        body: ['eˣ is its own derivative, and e^(kx) has derivative k·e^(kx). The derivative of ln x is **1/x**. Because ln(ax) = ln a + ln x, the derivative of ln(ax) is also 1/x.'],
      },
    ],
    formulas: [
      ['FTC', '∫ₐᵇ f(x) dx = F(b) − F(a)'],
      ['Chain rule', "[f(g(x))]′ = f′(g(x))·g′(x)"],
      ['Exponential', 'd/dx eᵏˣ = k·eᵏˣ'],
      ['Natural log', 'd/dx ln x = 1/x'],
    ],
  },
  // 14 · College III
  {
    title: 'Linear algebra & probability',
    summary: 'Vectors, matrices and counting are the working tools of data science, physics and computing.',
    topics: [
      {
        title: 'Determinants',
        body: ['The determinant of a 2×2 matrix [[a, b], [c, d]] is **ad − bc**. It measures how the matrix scales area. If it is 0, the matrix has no inverse.'],
        example: { prompt: 'det [[3, 2], [1, 4]]', steps: ['3 × 4 − 2 × 1', '= 12 − 2 = **10**'] },
      },
      {
        title: 'Dot product',
        body: ['Multiply matching components and add. If the dot product is 0, the vectors are **perpendicular**.'],
        example: { prompt: '(1, 2, 3) · (4, −1, 2)', steps: ['4 − 2 + 6 = **8**'] },
      },
      {
        title: 'Combinations',
        body: ['C(n, r) counts the ways to choose r items from n when **order does not matter**: n! / (r!(n − r)!).'],
        example: { prompt: 'C(6, 2)', steps: ['6 × 5 / (2 × 1)', '= **15**'] },
      },
      {
        title: 'Probability with dice',
        body: ['Probability = favorable outcomes ÷ total outcomes. Two dice have **36** equally likely outcomes. A sum of 7 is most likely, with 6 ways (6/36 = 1/6).'],
      },
    ],
    formulas: [
      ['2×2 determinant', 'ad − bc'],
      ['Dot product', 'u·v = u₁v₁ + u₂v₂ + u₃v₃'],
      ['Combinations', 'C(n, r) = n! / (r!(n − r)!)'],
      ['Permutations', 'P(n, r) = n! / (n − r)!'],
    ],
  },
]
