/** [prompt, correct answer, wrong, wrong, wrong, optional explanation] */
export type Mcq = [string, string, string, string, string, string?]

export interface OrderPuzzle {
  prompt: string
  /** Items in the correct order. */
  items: string[]
}

export interface TierBank {
  mcq: Mcq[]
  /** [term, definition] */
  terms: [string, string][]
  orders?: OrderPuzzle[]
  /** [sentence with ___, answer]. Distractors come from the tier's terms. */
  cloze?: [string, string][]
}
