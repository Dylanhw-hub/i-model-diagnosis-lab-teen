export interface Scenario {
  id: string;
  title: string;
  vignette: string;
  missingModes: string[];
  explanation: string;
  presentModes?: string[];
}

export const scenarios: Scenario[] = [
  {
    id: "scenario1",
    title: "The Quick Fix",
    vignette:
      "Mia has a history essay due tomorrow. She pastes the essay question into ChatGPT, copies the response word-for-word into her document, and submits it. She got an A, so she figures it worked out fine.",
    missingModes: ["Intentionality", "Integrity", "Inquiry"],
    presentModes: ["Intuition"],
    explanation:
      "Mia skipped Intentionality (never asked 'what am I trying to learn here?'), Integrity (submitted AI work as her own without transparency), and Inquiry (never questioned or evaluated what AI produced). The only mode partially present was Intuition—but she ignored any discomfort she might have felt.",
  },
  {
    id: "scenario2",
    title: "The Trusted Source",
    vignette:
      "Jake is researching climate change for a presentation. He asks Claude to summarize the key arguments, gets a well-written response, and builds his whole presentation around it. He's careful to put things in his own words and cite 'AI-assisted research' on his reference slide.",
    missingModes: ["Inquiry"],
    presentModes: ["Intentionality", "Integrity", "Intuition"],
    explanation:
      "Jake handled Intentionality (clear purpose), Integrity (transparent about AI use), and followed his Intuition (put things in his own words). But he skipped Inquiry—he never fact-checked the AI's claims, verified the arguments were balanced, or questioned whether anything was missing or outdated.",
  },
  {
    id: "scenario3",
    title: "The Gut Feeling",
    vignette:
      "Priya uses AI to help draft a cover letter for her dream internship. The result is polished and professional, but something feels off—it doesn't sound like her. She can't pinpoint why, so she sends it anyway, thinking 'the AI probably knows best.'",
    missingModes: ["Intuition"],
    presentModes: ["Intentionality", "Integrity"],
    explanation:
      "Priya actually engaged her Intuition—she felt something was wrong. But she dismissed it instead of investigating. When your gut says 'this doesn't feel like me,' that's a signal worth exploring, not overriding. Trusting Intuition means treating that discomfort as valuable data.",
  },
  {
    id: "scenario4",
    title: "The Perfectionist",
    vignette:
      "Carlos is working on a creative writing piece. He spends hours prompting AI with different approaches, carefully evaluating each output, selecting the best elements, and rewriting everything in his own voice. He's transparent with his teacher about his process. But he never stopped to ask why he was using AI in the first place—he just assumed it would make his work better.",
    missingModes: ["Intentionality"],
    presentModes: ["Inquiry", "Integrity", "Intuition"],
    explanation:
      "Carlos nailed Inquiry (critical evaluation), Integrity (transparency), and Intuition (finding his own voice). But he skipped Intentionality—he never asked 'Should I use AI for this at all? What am I trying to develop as a writer? Might struggling through this myself be more valuable?' Sometimes the best use of AI is knowing when not to use it.",
  },
  {
    id: "scenario5",
    title: "The Group Project",
    vignette:
      "A group is working on a business presentation. They decide to use AI to generate their market analysis. One member feels uncomfortable but doesn't say anything because everyone else seems fine with it. They submit the work without any of them having actually understood the data or checked if it made sense for their specific case.",
    missingModes: ["Integrity", "Inquiry", "Intuition"],
    presentModes: ["Intentionality"],
    explanation:
      "The group skipped Integrity (no discussion of whether this was appropriate for the assignment), Inquiry (no one evaluated whether the AI output actually fit their case), and one member suppressed their Intuition (the discomfort that went unvoiced). Group settings can make it harder to raise concerns—but that's exactly when these modes matter most.",
  },
  {
    id: "scenario6",
    title: "The Thoughtful Approach",
    vignette:
      "Emma is writing a personal statement for university. She decides to draft it entirely herself first, then asks AI to suggest where her argument could be clearer. She reads each suggestion critically, accepts some, rejects others, and rewrites everything in her own voice. She notes in her application that she used AI for editing feedback.",
    missingModes: [],
    presentModes: ["Intentionality", "Integrity", "Inquiry", "Intuition"],
    explanation:
      "This is what the full I-Model looks like in action. Emma used Intentionality (clear purpose—AI for feedback, not generation), Integrity (transparency, kept her authentic voice), Inquiry (critically evaluated suggestions), and Intuition (trusted her own judgment about what to keep). Not every scenario has missing modes—sometimes the goal is recognizing when someone gets it right.",
  },
];
