export interface ReactorType {
    id: string;
    name: string; // e.g., "PWR"
    fullName: string; // e.g., "Pressurized Water Reactor"
    description: string;
    keyFeature?: string; // One-line unique benefit or characteristic
    coolant: string;
    moderator: string;
    pros: string[];
    cons: string[];
    imagePrompt?: string; // For generating images later
}

export interface Accident {
    id: string;
    name: string; // e.g., "Chernobyl"
    date: string;
    location: string;
    severity: number; // INES Scale
    summary: string;
    causes: string[];
    lessonsLearned: string[];
    // Structured simple content
    whatHappened?: string[];
    whyItHappened?: string[];
    consequences?: string[];
    quickRecap?: string;
}

export interface SafetyPrinciple {
    id: string; // e.g., "SF-1"
    title: string;
    description: string;
    // Enhanced content
    plainTitle?: string;
    simpleExplanation?: string;
    realLifeExample?: string;
    icon?: string;
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // Index of the correct option
    explanation: string;
}

export interface Quiz {
    id: string;
    title: string;
    questions: QuizQuestion[];
}
