/** Strings may use **bold** for emphasis. */
export interface Example {
  prompt: string
  steps: string[]
}

export interface Topic {
  title: string
  body: string[]
  example?: Example
  tip?: string
}

export interface Lesson {
  /** Short name for the grade's focus, e.g. "Algebra I". */
  title: string
  summary: string
  topics: Topic[]
  /** [name, formula or rule] shown in a reference table. */
  formulas?: [string, string][]
}
