const questions = [
  {
    type: "hrv",
    title: "HRV Measurement",
    question: "Enter your HRV reading (ms):",
    range: [20, 200]  // Wider clinical range
  },
  {
    type: "slider",
    title: "Environmental Stressor Load",
    question: "How chaotic or orderly does your current environment feel?",
    descriptors: [
      "Complete chaos (overwhelming)",
      "Disorganized",
      "Neutral",
      "Mostly orderly",
      "Perfectly orderly (controlled)"
    ]
  },
  {
    type: "slider",
    title: "Somatic Awareness",
    question: "How connected do you feel to your body's physical signals?",
    descriptors: [
      "Completely disconnected",
      "Somewhat numb",
      "Some awareness",
      "Clearly noticeable",
      "Highly attuned (full awareness)"
    ]
  },
  {
    type: "slider", 
    title: "Social Resonance",
    question: "How harmoniously are you interacting with others?",
    descriptors: [
      "Conflict/withdrawal",
      "Some tension",
      "Neutral",
      "Mostly harmonious",
      "Deep connection (flow)"
    ]
  },
  {
    type: "slider",
    title: "Cognitive Load",
    question: "How scattered or focused are your thoughts?",
    descriptors: [
      "Racing/overwhelmed",
      "Some distraction",
      "Some mental chatter",
      "Mostly focused",
      "Laser-focused (clear)"
    ]
  },
  {
    type: "slider",
    title: "Energy State",
    question: "How would you describe your energy quality?",
    descriptors: [
      "Drained/exhausted",
      "Some fatigue",
      "Neutral",
      "Mostly energized",
      "Effortless vitality"
    ]
  }
];
