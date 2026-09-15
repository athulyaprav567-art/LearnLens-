// ============================================================
// LearnLens — Centralized Mock Data
// Replace these with API responses when the backend is ready.
// ============================================================

export const teacherData = {
  name: "Dr. Priya Nair",
  shortName: "Ma'am",
  class: "CSE AI - S2",
  subject: "Data Structures & Algorithms",
  totalStudents: 42,
};

export const dashboardData = {
  date: "Monday, September 15",
  studentsAnalyzed: 42,
  conceptsMonitored: 12,
  highConfusion: 3,
  improving: 5,
  pulseHeadline:
    "Your class showed strong progress in Arrays, but Trees and Recursion need attention.",
  weeklyInsight:
    "Overall confusion decreased by 12% this week. Pointer understanding improved significantly after last Thursday's session.",
  weeklyConfusionChange: -12,
};

export const conceptsData = [
  {
    id: "trees",
    name: "Trees",
    confusionPercentage: 71,
    affectedStudents: 27,
    severity: "High",
    trend: { previous: 42, current: 71 },
    change: "+29%",
    improving: false,
    shortInsight: "Confusion spiked after application-based questions.",
    misconception: "Students are confusing tree height with tree depth.",
    patternDetected:
      "Confusion increased significantly after application-based questions requiring height/depth calculations.",
    whatWeFound:
      "Students are performing reasonably well on basic tree terminology, but confusion increases sharply when questions require distinguishing tree height from tree depth in practical scenarios.",
    whyItMatters:
      "If this misconception is not addressed, students may continue making errors in traversal, recursion and tree-based problem solving throughout the course.",
    confidenceDistribution: {
      confident: 29,
      someDifficulty: 34,
      confused: 37,
    },
    weeklyTrend: [
      { day: "Mon", confusion: 42 },
      { day: "Tue", confusion: 48 },
      { day: "Wed", confusion: 55 },
      { day: "Thu", confusion: 61 },
      { day: "Fri", confusion: 71 },
    ],
    intervention: {
      title: "10-minute visual explanation of Tree Height vs Tree Depth",
      extra: "5 short application questions",
    },
    tips: [
      "Use a visual tree diagram side-by-side to compare height and depth with a specific node highlighted.",
      "Ask students to manually trace the height and depth for 3 different nodes in the same tree.",
      "Introduce the concept using a family tree analogy before moving to CS notation.",
    ],
  },
  {
    id: "recursion",
    name: "Recursion",
    confusionPercentage: 68,
    affectedStudents: 24,
    severity: "High",
    trend: { previous: 54, current: 68 },
    change: "+14%",
    improving: false,
    shortInsight: "Recursion confusion increased by 14% compared with the previous session.",
    misconception:
      "Students struggle to trace the call stack and understand how recursive calls return values.",
    patternDetected:
      "Errors concentrated around problems with multiple recursive calls and base case identification.",
    whatWeFound:
      "Students can write simple recursive functions but consistently fail on problems that require tracing multiple recursive calls or identifying correct base cases.",
    whyItMatters:
      "Recursion is foundational to trees, graphs and dynamic programming. Persistent confusion will compound as the course progresses.",
    confidenceDistribution: {
      confident: 32,
      someDifficulty: 36,
      confused: 32,
    },
    weeklyTrend: [
      { day: "Mon", confusion: 54 },
      { day: "Tue", confusion: 56 },
      { day: "Wed", confusion: 60 },
      { day: "Thu", confusion: 63 },
      { day: "Fri", confusion: 68 },
    ],
    intervention: {
      title: "Step-by-step call stack tracing exercise",
      extra: "5 short recursion tracing questions with diagrams",
    },
    tips: [
      "Draw the call stack on the board step by step for a simple factorial or Fibonacci example.",
      "Give students 5 short recursion tracing questions and let them work through them in pairs.",
      "Ask students to identify the base case before writing any recursive code.",
    ],
  },
  {
    id: "pointers",
    name: "Pointers",
    confusionPercentage: 42,
    affectedStudents: 16,
    severity: "Moderate",
    trend: { previous: 58, current: 42 },
    change: "-16%",
    improving: true,
    shortInsight: "Improving — confusion dropped 16% after last session.",
    misconception:
      "Students confuse pointer values with the data stored at the pointed address.",
    patternDetected:
      "Improvement seen after real-world memory analogy was introduced.",
    whatWeFound:
      "Pointer confusion is moderately elevated but trending downward after the visual memory diagram session last Thursday.",
    whyItMatters:
      "Pointer mastery is essential for linked lists, dynamic memory and systems programming.",
    confidenceDistribution: {
      confident: 45,
      someDifficulty: 34,
      confused: 21,
    },
    weeklyTrend: [
      { day: "Mon", confusion: 58 },
      { day: "Tue", confusion: 55 },
      { day: "Wed", confusion: 50 },
      { day: "Thu", confusion: 46 },
      { day: "Fri", confusion: 42 },
    ],
    intervention: {
      title: "Pointer diagram with a real-world memory analogy",
      extra: "3 debugging exercises with pointer errors",
    },
    tips: [
      "Use pointer diagrams with a real-world memory example such as a house address vs the house itself.",
      "Show students what happens in memory when a pointer is dereferenced using a visual debugger.",
      "Give them broken code with pointer errors and ask them to identify the bug.",
    ],
  },
  {
    id: "arrays",
    name: "Arrays",
    confusionPercentage: 18,
    affectedStudents: 7,
    severity: "Low",
    trend: { previous: 34, current: 18 },
    change: "-16%",
    improving: true,
    shortInsight: "Strong improvement — most students are confident.",
    misconception: "Minor confusion around out-of-bounds indexing edge cases.",
    patternDetected:
      "Most errors are isolated to off-by-one errors in loop boundaries.",
    whatWeFound:
      "Arrays are well understood by the majority of the class. Remaining confusion is concentrated around boundary conditions.",
    whyItMatters:
      "Array mastery underpins many algorithmic patterns. The remaining confusion is minor and easily addressed.",
    confidenceDistribution: {
      confident: 67,
      someDifficulty: 21,
      confused: 12,
    },
    weeklyTrend: [
      { day: "Mon", confusion: 34 },
      { day: "Tue", confusion: 30 },
      { day: "Wed", confusion: 26 },
      { day: "Thu", confusion: 22 },
      { day: "Fri", confusion: 18 },
    ],
    intervention: {
      title: "Quick 5-minute review of loop boundary conditions",
      extra: "2 boundary-case practice problems",
    },
    tips: [
      "Review off-by-one errors with a single concrete loop example.",
      "Ask students to manually trace through a loop that accesses the last element.",
      "Reinforce the pattern: index starts at 0, ends at length - 1.",
    ],
  },
  {
    id: "graphs",
    name: "Graphs",
    confusionPercentage: 23,
    affectedStudents: 9,
    severity: "Low",
    trend: { previous: 29, current: 23 },
    change: "-6%",
    improving: true,
    shortInsight: "Slowly improving after BFS/DFS visual walkthrough.",
    misconception: "Students sometimes conflate directed and undirected graphs.",
    patternDetected: "Confusion peaks around adjacency matrix vs adjacency list trade-offs.",
    whatWeFound:
      "Graph understanding is improving following the BFS/DFS visual walkthrough. Remaining confusion relates to representation choices.",
    whyItMatters:
      "Graph algorithms are a significant part of technical interviews and advanced coursework.",
    confidenceDistribution: {
      confident: 55,
      someDifficulty: 30,
      confused: 15,
    },
    weeklyTrend: [
      { day: "Mon", confusion: 29 },
      { day: "Tue", confusion: 28 },
      { day: "Wed", confusion: 26 },
      { day: "Thu", confusion: 25 },
      { day: "Fri", confusion: 23 },
    ],
    intervention: {
      title: "Comparison table: adjacency matrix vs adjacency list",
      extra: "One implementation exercise for each representation",
    },
    tips: [
      "Create a side-by-side comparison of adjacency matrix and adjacency list for the same graph.",
      "Ask students when they would choose one representation over the other.",
      "Reinforce directed vs undirected with a real-world example such as a one-way street.",
    ],
  },
];

export const weeklyData = {
  confusionTrend: [
    { day: "Mon", avg: 47 },
    { day: "Tue", avg: 51 },
    { day: "Wed", avg: 49 },
    { day: "Thu", avg: 44 },
    { day: "Fri", avg: 41 },
  ],
  improving: ["Pointers", "Arrays", "Graphs"],
  needsAttention: ["Trees", "Recursion"],
  weeklyChange: -12,
};

export const insightsData = [
  {
    id: 1,
    title: "Trees became the highest-confusion concept yesterday",
    explanation:
      "Confusion around Trees jumped from 42% to 71% in a single session — the largest single-day spike this month.",
    value: "71%",
    tag: "Urgent",
    severity: "high",
    action: "Review Tree Height vs Depth today",
  },
  {
    id: 2,
    title: "Recursion confusion increased by 14%",
    explanation:
      "Recursion confusion rose from 54% to 68% compared with the previous session, driven by multi-call tracing problems.",
    value: "+14%",
    tag: "Attention",
    severity: "high",
    action: "Schedule a call stack walkthrough",
  },
  {
    id: 3,
    title: "Arrays are showing strong improvement",
    explanation:
      "Array-related confusion dropped from 34% to 18% over the past week — the largest improvement across all concepts.",
    value: "-16%",
    tag: "Great progress",
    severity: "low",
    action: null,
  },
  {
    id: 4,
    title: "Pointer understanding improved significantly",
    explanation:
      "After last Thursday's visual diagram session, pointer confusion fell 16%. The real-world memory analogy appears to have been effective.",
    value: "-16%",
    tag: "Improving",
    severity: "low",
    action: null,
  },
  {
    id: 5,
    title: "12 concepts monitored, 5 showing improvement",
    explanation:
      "More than 40% of concepts are trending positively this week. Overall class confusion decreased by 12%.",
    value: "5 / 12",
    tag: "Weekly",
    severity: "neutral",
    action: null,
  },
];

export const reportsData = [
  {
    id: 1,
    label: "Yesterday",
    dateRange: "Monday, September 15, 2026",
    class: "CSE AI - S2",
    studentsAnalyzed: 42,
    topConfusion: "Trees (71%)",
    trend: "Confusion up 8% from last session",
    trendDirection: "up",
  },
  {
    id: 2,
    label: "This Week",
    dateRange: "September 9 – 15, 2026",
    class: "CSE AI - S2",
    studentsAnalyzed: 42,
    topConfusion: "Recursion (68%)",
    trend: "Overall confusion down 12%",
    trendDirection: "down",
  },
  {
    id: 3,
    label: "This Month",
    dateRange: "September 1 – 15, 2026",
    class: "CSE AI - S2",
    studentsAnalyzed: 42,
    topConfusion: "Trees (avg 58%)",
    trend: "Steady improvement since Week 1",
    trendDirection: "down",
  },
];

export const settingsData = {
  teacher: {
    name: "Dr. Priya Nair",
    class: "CSE AI - S2",
    subject: "Data Structures & Algorithms",
    institution: "SCMS School of Engineering & Technology",
  },
  notifications: {
    learningAlerts: true,
    weeklySummaries: true,
  },
  preferences: {
    confusionThreshold: 50,
    insightFrequency: "Daily",
  },
};