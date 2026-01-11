// Nuclear Career Quiz - Data and Scoring Logic
// Matches users with nuclear industry career paths based on interests and skills

// ============================================================================
// CAREER PROFILES
// ============================================================================

export interface CareerProfile {
    id: string;
    title: string;
    emoji: string;
    description: string;
    salary: string;
    education: string;
    skills: string[];
    dayInLife: string;
    growth: string;
    color: string;
}

export const CAREERS: CareerProfile[] = [
    {
        id: 'reactor_operator',
        title: 'Reactor Operator',
        emoji: '⚛️',
        description: 'Control the heart of the nuclear plant from the control room. Monitor systems, respond to alarms, and ensure safe operation 24/7.',
        salary: '$80,000 - $120,000',
        education: 'High school diploma + on-the-job training, NRC license. Many operators come from Navy Nuclear programs.',
        skills: ['Attention to detail', 'Calm under pressure', 'Technical aptitude', 'Teamwork'],
        dayInLife: 'Monitor reactor parameters, perform system tests, respond to alarms, document operations',
        growth: 'Senior Reactor Operator → Shift Supervisor → Operations Manager',
        color: 'blue'
    },
    {
        id: 'nuclear_engineer',
        title: 'Nuclear Engineer',
        emoji: '🔬',
        description: 'Design, analyze, and improve nuclear systems. Work on reactor physics, thermal hydraulics, safety analysis, and emerging SMR (Small Modular Reactor) technology that\'s revolutionizing the industry.',
        salary: '$90,000 - $150,000',
        education: "Bachelor's or Master's in Nuclear Engineering (ABET accredited preferred)",
        skills: ['Advanced math', 'Problem solving', 'Computer modeling', 'Technical writing', 'SMR design'],
        dayInLife: 'Run simulations, analyze data, write reports, collaborate with teams on advanced reactor designs',
        growth: 'Junior Engineer → Senior Engineer → Principal Engineer → Director',
        color: 'purple'
    },
    {
        id: 'health_physicist',
        title: 'Health Physicist',
        emoji: '☢️',
        description: 'Protect workers and the public from radiation. Monitor exposure, set safety limits, and ensure regulatory compliance.',
        salary: '$75,000 - $130,000',
        education: "Bachelor's in Health Physics, Physics, or related field",
        skills: ['Radiation physics', 'Regulatory knowledge', 'Communication', 'Data analysis'],
        dayInLife: 'Conduct surveys, review exposure records, train workers, audit procedures',
        growth: 'HP Technician → Health Physicist → Radiation Protection Manager',
        color: 'amber'
    },
    {
        id: 'regulatory_specialist',
        title: 'Regulatory Specialist',
        emoji: '📋',
        description: 'Navigate the complex world of nuclear regulations. Ensure plant compliance with NRC, IAEA, and other standards.',
        salary: '$85,000 - $140,000',
        education: "Bachelor's degree + knowledge of nuclear regulations",
        skills: ['Legal interpretation', 'Technical writing', 'Communication', 'Attention to detail'],
        dayInLife: 'Review procedures, prepare license amendments, interface with regulators',
        growth: 'Analyst → Senior Specialist → Regulatory Affairs Manager',
        color: 'slate'
    },
    {
        id: 'waste_management',
        title: 'Waste Management Specialist',
        emoji: '♻️',
        description: 'Handle the critical task of managing nuclear waste. Develop storage solutions, ensure safety, and plan for long-term disposal.',
        salary: '$70,000 - $110,000',
        education: "Bachelor's in Environmental Science, Engineering, or related",
        skills: ['Environmental science', 'Project management', 'Safety protocols', 'Chemistry'],
        dayInLife: 'Monitor waste storage, coordinate shipments, develop disposal plans',
        growth: 'Technician → Specialist → Waste Program Manager',
        color: 'green'
    },
    {
        id: 'fusion_researcher',
        title: 'Fusion Research Scientist',
        emoji: '🌟',
        description: 'Work on the future of energy. Research plasma physics, magnetic confinement, and the science of creating a star on Earth.',
        salary: '$100,000 - $180,000',
        education: "Ph.D. in Physics, Nuclear Engineering, or related field",
        skills: ['Plasma physics', 'Advanced math', 'Research methodology', 'Innovation'],
        dayInLife: 'Design experiments, analyze data, publish papers, collaborate globally',
        growth: 'Postdoc → Research Scientist → Principal Investigator → Lab Director',
        color: 'cyan'
    },
    {
        id: 'nuclear_medicine',
        title: 'Nuclear Medicine Technologist',
        emoji: '🏥',
        description: 'Use radioactive materials to diagnose and treat diseases. Prepare radiopharmaceuticals and operate imaging equipment.',
        salary: '$65,000 - $95,000',
        education: "Associate's or Bachelor's in Nuclear Medicine Technology",
        skills: ['Patient care', 'Imaging technology', 'Safety protocols', 'Communication'],
        dayInLife: 'Prepare doses, position patients, operate scanners, collaborate with physicians',
        growth: 'Technologist → Senior Tech → Chief Technologist → Department Manager',
        color: 'rose'
    },
    {
        id: 'decommissioning',
        title: 'Decommissioning Specialist',
        emoji: '🏗️',
        description: 'Safely dismantle retired nuclear facilities. Manage radioactive materials, oversee cleanup, and restore sites.',
        salary: '$85,000 - $130,000',
        education: "Bachelor's in Engineering + project management experience",
        skills: ['Project management', 'Radiation safety', 'Engineering', 'Regulatory compliance'],
        dayInLife: 'Plan dismantlement, oversee crews, manage waste, document progress',
        growth: 'Field Engineer → Project Lead → Decommissioning Manager',
        color: 'orange'
    },
    {
        id: 'nuclear_security',
        title: 'Nuclear Security Specialist',
        emoji: '🔐',
        description: 'Protect nuclear facilities from threats. Post-9/11, this is a critical role ensuring physical security, cybersecurity, and emergency response readiness.',
        salary: '$70,000 - $120,000',
        education: "Bachelor's in Criminal Justice, Security Management, or related. Military/law enforcement background valued.",
        skills: ['Threat assessment', 'Emergency response', 'Cybersecurity', 'Physical security'],
        dayInLife: 'Conduct security patrols, monitor access systems, run drills, assess vulnerabilities',
        growth: 'Security Officer → Shift Supervisor → Security Manager → Director of Security',
        color: 'red'
    }
];

// ============================================================================
// QUIZ QUESTIONS
// ============================================================================

export interface QuizQuestion {
    id: number;
    question: string;
    options: QuizOption[];
}

export interface QuizOption {
    text: string;
    scores: Record<string, number>; // career_id -> score
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 1,
        question: "What type of work environment appeals to you most?",
        options: [
            { text: "A control room with real-time monitoring systems", scores: { reactor_operator: 3, nuclear_engineer: 1, nuclear_security: 2 } },
            { text: "A research lab with cutting-edge equipment", scores: { fusion_researcher: 3, nuclear_engineer: 2, health_physicist: 1 } },
            { text: "A hospital or clinical setting", scores: { nuclear_medicine: 3 } },
            { text: "Outdoor field sites or industrial facilities", scores: { decommissioning: 3, waste_management: 2 } },
            { text: "An office with policy documents and regulations", scores: { regulatory_specialist: 3, health_physicist: 1 } }
        ]
    },
    {
        id: 2,
        question: "Which statement best describes your ideal workday?",
        options: [
            { text: "Monitoring systems and responding to situations as they arise", scores: { reactor_operator: 3, health_physicist: 1, nuclear_security: 2 } },
            { text: "Running computer simulations and analyzing data", scores: { nuclear_engineer: 3, fusion_researcher: 2 } },
            { text: "Helping patients directly and seeing immediate results", scores: { nuclear_medicine: 3 } },
            { text: "Managing projects and coordinating teams", scores: { decommissioning: 3, waste_management: 2, regulatory_specialist: 1 } },
            { text: "Writing reports and ensuring compliance with rules", scores: { regulatory_specialist: 3, health_physicist: 2 } }
        ]
    },
    {
        id: 3,
        question: "How do you handle pressure and stress?",
        options: [
            { text: "I stay calm and focused - I'm great in emergencies", scores: { reactor_operator: 3, nuclear_medicine: 2, nuclear_security: 3 } },
            { text: "I prefer to analyze problems methodically with time to think", scores: { nuclear_engineer: 3, fusion_researcher: 2, regulatory_specialist: 1 } },
            { text: "I break big problems into manageable steps", scores: { decommissioning: 3, waste_management: 2 } },
            { text: "I rely on procedures and checklists", scores: { health_physicist: 3, regulatory_specialist: 2 } }
        ]
    },
    {
        id: 4,
        question: "What aspect of nuclear technology interests you most?",
        options: [
            { text: "Controlling the chain reaction - the physics of fission", scores: { reactor_operator: 3, nuclear_engineer: 2 } },
            { text: "Designing new and better reactor systems", scores: { nuclear_engineer: 3, fusion_researcher: 2 } },
            { text: "Protecting people from radiation exposure", scores: { health_physicist: 3, regulatory_specialist: 1 } },
            { text: "Medical applications - diagnosis and treatment", scores: { nuclear_medicine: 3 } },
            { text: "Solving the waste problem", scores: { waste_management: 3, decommissioning: 2 } },
            { text: "Fusion - building a star on Earth", scores: { fusion_researcher: 3 } }
        ]
    },
    {
        id: 5,
        question: "How much formal education are you willing to pursue?",
        options: [
            { text: "High school + specialized training is enough for me", scores: { reactor_operator: 3, waste_management: 2 } },
            { text: "A 2-year associate's degree sounds right", scores: { nuclear_medicine: 3 } },
            { text: "I'm ready for a full bachelor's degree", scores: { nuclear_engineer: 2, health_physicist: 2, regulatory_specialist: 2, decommissioning: 2 } },
            { text: "I want to pursue a master's or even a Ph.D.", scores: { fusion_researcher: 3, nuclear_engineer: 3, health_physicist: 2 } }
        ]
    },
    {
        id: 6,
        question: "Which skill are you most confident in?",
        options: [
            { text: "Technical problem-solving and math", scores: { nuclear_engineer: 3, fusion_researcher: 3, health_physicist: 2 } },
            { text: "Staying alert and monitoring multiple things at once", scores: { reactor_operator: 3, nuclear_security: 2 } },
            { text: "Working with people and patients", scores: { nuclear_medicine: 3, health_physicist: 1 } },
            { text: "Writing and interpreting complex documents", scores: { regulatory_specialist: 3, health_physicist: 1 } },
            { text: "Managing projects and leading teams", scores: { decommissioning: 3, waste_management: 2 } }
        ]
    },
    {
        id: 7,
        question: "What motivates you most in a career?",
        options: [
            { text: "Being essential - knowing the power grid depends on me", scores: { reactor_operator: 3 } },
            { text: "Discovery and innovation - pushing the boundaries of science", scores: { fusion_researcher: 3, nuclear_engineer: 2 } },
            { text: "Helping people directly with their health", scores: { nuclear_medicine: 3 } },
            { text: "Protecting the environment and public safety", scores: { health_physicist: 3, waste_management: 2, regulatory_specialist: 1, nuclear_security: 2 } },
            { text: "Cleaning up and leaving things better than I found them", scores: { decommissioning: 3, waste_management: 2 } }
        ]
    },
    {
        id: 8,
        question: "How do you feel about shift work (nights, weekends, holidays)?",
        options: [
            { text: "I'm fine with it - I like non-traditional schedules", scores: { reactor_operator: 3, nuclear_medicine: 2 } },
            { text: "I prefer a regular 9-to-5 schedule", scores: { nuclear_engineer: 2, regulatory_specialist: 3, health_physicist: 2, fusion_researcher: 1 } },
            { text: "I'm okay with occasional overtime for projects", scores: { decommissioning: 2, waste_management: 2, nuclear_engineer: 2 } }
        ]
    },
    {
        id: 9,
        question: "Which of these activities sounds most enjoyable?",
        options: [
            { text: "Watching real-time data and responding to changes", scores: { reactor_operator: 3 } },
            { text: "Building computer models and running simulations", scores: { nuclear_engineer: 3, fusion_researcher: 3 } },
            { text: "Conducting safety surveys with specialized instruments", scores: { health_physicist: 3 } },
            { text: "Reviewing documents and ensuring everything is in order", scores: { regulatory_specialist: 3 } },
            { text: "Operating medical imaging equipment", scores: { nuclear_medicine: 3 } },
            { text: "Planning and executing large-scale projects", scores: { decommissioning: 3, waste_management: 2 } }
        ]
    },
    {
        id: 10,
        question: "Where do you see yourself in 10 years?",
        options: [
            { text: "Running shifts at a nuclear power plant", scores: { reactor_operator: 3 } },
            { text: "Leading a team of engineers on cutting-edge reactor designs", scores: { nuclear_engineer: 3 } },
            { text: "Managing radiation protection for a major facility", scores: { health_physicist: 3 } },
            { text: "Heading regulatory affairs for a nuclear company", scores: { regulatory_specialist: 3 } },
            { text: "Running the imaging department at a hospital", scores: { nuclear_medicine: 3 } },
            { text: "Publishing breakthrough research on fusion energy", scores: { fusion_researcher: 3 } },
            { text: "Leading the cleanup of old nuclear sites", scores: { decommissioning: 3, waste_management: 2 } },
            { text: "Managing security for a nuclear facility", scores: { nuclear_security: 3 } }
        ]
    }
];

// ============================================================================
// SCORING FUNCTION
// ============================================================================

export interface QuizResult {
    topMatch: CareerProfile;
    secondMatch: CareerProfile;
    thirdMatch: CareerProfile;
    scores: { career: CareerProfile; score: number; percentage: number }[];
}

export function calculateQuizResults(answers: Record<number, number>): QuizResult {
    // Initialize scores for all careers
    const careerScores: Record<string, number> = {};
    CAREERS.forEach(c => careerScores[c.id] = 0);

    // Calculate scores based on answers
    Object.entries(answers).forEach(([questionId, optionIndex]) => {
        const question = QUIZ_QUESTIONS.find(q => q.id === parseInt(questionId));
        if (question && question.options[optionIndex]) {
            const option = question.options[optionIndex];
            Object.entries(option.scores).forEach(([careerId, points]) => {
                careerScores[careerId] = (careerScores[careerId] || 0) + points;
            });
        }
    });

    // Calculate max possible score for percentage
    const maxPossible = QUIZ_QUESTIONS.length * 3; // Max 3 points per question

    // Sort careers by score
    const sortedResults = CAREERS.map(career => ({
        career,
        score: careerScores[career.id] || 0,
        percentage: Math.round((careerScores[career.id] / maxPossible) * 100)
    })).sort((a, b) => b.score - a.score);

    return {
        topMatch: sortedResults[0].career,
        secondMatch: sortedResults[1].career,
        thirdMatch: sortedResults[2].career,
        scores: sortedResults
    };
}

// ============================================================================
// DISPLAY HELPERS
// ============================================================================

export const CAREER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50' },
    purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/50' },
    amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/50' },
    slate: { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/50' },
    green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/50' },
    cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/50' },
    rose: { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/50' },
    orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/50' },
    red: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50' }
};
