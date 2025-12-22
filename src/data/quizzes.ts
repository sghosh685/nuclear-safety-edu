import type { Quiz } from '../types';

export const reactorQuiz: Quiz = {
    id: 'reactor-knowledge',
    title: 'Reactor Types Quiz',
    questions: [
        {
            id: 'rq1',
            question: 'Which component is used in a PWR but NOT in a BWR?',
            options: ['Control Rods', 'Steam Generator', 'Turbine', 'Fuel Rods'],
            correctAnswer: 1,
            explanation: 'Pressurized Water Reactors (PWR) use a steam generator to transfer heat from the primary loop to the secondary loop. Boiling Water Reactors (BWR) generate steam directly in the core.',
        },
        {
            id: 'rq2',
            question: 'What is the "moderator" used for in a nuclear reactor?',
            options: ['To cool the fuel', 'To slow down neutrons', 'To absorb radiation', 'To spin the turbine'],
            correctAnswer: 1,
            explanation: 'A moderator (like water or graphite) slows down fast neutrons, making them more likely to cause fission and sustain the nuclear chain reaction.',
        },
        {
            id: 'rq3',
            question: 'Which reactor type can use natural (unenriched) uranium as fuel?',
            options: ['PWR', 'BWR', 'CANDU', 'SMR'],
            correctAnswer: 2,
            explanation: 'CANDU reactors use heavy water as a moderator, which absorbs fewer neutrons than light water, allowing them to operate with natural uranium (0.7% U-235).',
        },
        {
            id: 'rq4',
            question: 'What makes the RBMK design particularly dangerous at low power?',
            options: ['It uses graphite', 'It has a positive void coefficient', 'It has no control rods', 'It uses heavy water'],
            correctAnswer: 1,
            explanation: 'The RBMK has a positive void coefficient, meaning that as water boils and creates voids, reactivity increases instead of decreasing. This made it unstable at low power levels.',
        },
        {
            id: 'rq5',
            question: 'What coolant does an HTGR use?',
            options: ['Heavy Water', 'Light Water', 'Helium Gas', 'Sodium'],
            correctAnswer: 2,
            explanation: 'High-Temperature Gas-Cooled Reactors use helium gas as coolant, allowing them to reach very high temperatures (up to 950°C) for industrial applications.',
        }
    ]
};

export const safetyQuiz: Quiz = {
    id: 'safety-knowledge',
    title: 'Safety Principles Quiz',
    questions: [
        {
            id: 'sq1',
            question: 'According to IAEA Principle 1, who has the prime responsibility for safety?',
            options: ['The Government', 'The IAEA', 'The Licensee/Operator', 'The Public'],
            correctAnswer: 2,
            explanation: 'The prime responsibility for safety rests with the person or organization responsible for the facility (the licensee/operator). Government provides oversight but doesn\'t assume primary responsibility.',
        },
        {
            id: 'sq2',
            question: 'What does the ALARA principle stand for?',
            options: ['All Limits Are Reasonably Achievable', 'As Low As Reasonably Achievable', 'Always Lower All Radiation Always', 'Atomic Legislation And Regulatory Authority'],
            correctAnswer: 1,
            explanation: 'ALARA means "As Low As Reasonably Achievable" - the principle that radiation exposure should be minimized, considering economic and social factors.',
        },
        {
            id: 'sq3',
            question: 'What is "Defense in Depth"?',
            options: ['A military strategy for protecting nuclear plants', 'Multiple independent barriers to prevent accidents', 'Deep underground reactor placement', 'Thick containment walls'],
            correctAnswer: 1,
            explanation: 'Defense in Depth is a safety philosophy using multiple independent layers of protection (physical barriers, safety systems, procedures) so that failure of one layer doesn\'t lead to accident.',
        },
        {
            id: 'sq4',
            question: 'Which organization was created after Chernobyl to promote nuclear safety internationally?',
            options: ['IAEA', 'WANO', 'NRC', 'INPO'],
            correctAnswer: 1,
            explanation: 'WANO (World Association of Nuclear Operators) was founded in 1989 after Chernobyl to maximize safety and reliability of nuclear power plants worldwide through peer reviews and knowledge sharing.',
        },
        {
            id: 'sq5',
            question: 'What does a "negative temperature coefficient" mean for reactor safety?',
            options: ['The reactor gets colder over time', 'Increasing temperature reduces reactivity', 'The reactor cannot overheat', 'Temperature sensors work in reverse'],
            correctAnswer: 1,
            explanation: 'A negative temperature coefficient means that as temperature increases, reactivity decreases, providing inherent self-regulation and stability - a key safety feature in PWR and BWR designs.',
        }
    ]
};

export const accidentsQuiz: Quiz = {
    id: 'accidents-knowledge',
    title: 'Historical Accidents Quiz',
    questions: [
        {
            id: 'aq1',
            question: 'Which accident resulted in the creation of WANO (World Association of Nuclear Operators)?',
            options: ['Fukushima Daiichi', 'Three Mile Island', 'Chernobyl', 'Windscale Fire'],
            correctAnswer: 2,
            explanation: 'WANO was formed in 1989 following the Chernobyl disaster to improve safety standards through international cooperation and peer reviews.',
        },
        {
            id: 'aq2',
            question: 'What was the primary cause of the Fukushima accident?',
            options: ['Operator error', 'Earthquake damage to reactor', 'Tsunami flooding backup generators', 'Terrorist attack'],
            correctAnswer: 2,
            explanation: 'While the earthquake caused the initial shutdown, the tsunami flooded the backup diesel generators in the basement, causing the loss of all cooling power (station blackout).',
        },
        {
            id: 'aq3',
            question: 'What organization was created in the US after Three Mile Island?',
            options: ['WANO', 'NRC', 'INPO', 'DOE'],
            correctAnswer: 2,
            explanation: 'INPO (Institute of Nuclear Power Operations) was created in 1979 after TMI to promote the highest levels of safety and reliability in nuclear plant operations through benchmarking and training.',
        },
        {
            id: 'aq4',
            question: 'The INES scale rates nuclear accidents from 1 to 7. What level was Chernobyl?',
            options: ['Level 5', 'Level 6', 'Level 7', 'Level 8'],
            correctAnswer: 2,
            explanation: 'Both Chernobyl and Fukushima were rated Level 7 (Major Accident) - the highest on the International Nuclear and Radiological Event Scale.',
        },
        {
            id: 'aq5',
            question: 'What unique element of TMI led to improved control room design?',
            options: ['Radiation leaked', 'Operators couldn\'t tell if a valve was open or closed', 'The reactor exploded', 'Fire broke out'],
            correctAnswer: 1,
            explanation: 'At TMI, the control room indicator showed the commanded position of the relief valve, not its actual position. This led to major improvements in human factors engineering and instrument design.',
        }
    ]
};

// Keep the original general quiz for backward compatibility
export const generalQuiz = reactorQuiz;
