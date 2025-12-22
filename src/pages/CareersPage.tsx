import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Atom, Shield, Building, Cpu, Globe, ArrowRight, ExternalLink, Lightbulb } from 'lucide-react';

const careerAreas = [
    {
        title: 'Engineering',
        icon: Atom,
        color: 'blue',
        roles: ['Nuclear Engineer', 'Mechanical Engineer', 'Electrical Engineer', 'Civil/Structural Engineer', 'Control Systems Engineer'],
        description: 'Design, build, and maintain reactor systems, safety equipment, and supporting infrastructure.',
    },
    {
        title: 'Operations',
        icon: Building,
        color: 'emerald',
        roles: ['Reactor Operator', 'Control Room Supervisor', 'Shift Manager', 'Maintenance Technician', 'Health Physics Technician'],
        description: 'Run the plant day-to-day, monitor systems, perform maintenance, and ensure safe operation.',
    },
    {
        title: 'Safety & Regulation',
        icon: Shield,
        color: 'amber',
        roles: ['Safety Analyst', 'Licensing Engineer', 'Radiation Protection Specialist', 'Inspector', 'Emergency Preparedness'],
        description: 'Ensure compliance with regulations, analyze risks, and protect workers and the public.',
    },
    {
        title: 'Research & Development',
        icon: Cpu,
        color: 'purple',
        roles: ['Nuclear Physicist', 'Materials Scientist', 'Fuel Cycle Engineer', 'Advanced Reactor Designer', 'Waste Management Specialist'],
        description: 'Develop new reactor designs, improve fuel efficiency, and solve long-term challenges.',
    },
    {
        title: 'Communication & Policy',
        icon: Globe,
        color: 'rose',
        roles: ['Public Affairs Officer', 'Science Communicator', 'Policy Analyst', 'Government Relations', 'Educator'],
        description: 'Explain nuclear energy to the public, shape policy, and build understanding.',
    },
];

const canadianEmployers = [
    { name: 'Bruce Power', url: 'https://www.brucepower.com/careers/', description: 'Largest nuclear facility in North America' },
    { name: 'Ontario Power Generation', url: 'https://www.opg.com/careers/', description: 'Operates Pickering and Darlington plants' },
    { name: 'CNSC', url: 'https://www.cnsc-ccsn.gc.ca/eng/careers/', description: 'Canada\'s nuclear regulator' },
    { name: 'Canadian Nuclear Laboratories', url: 'https://www.cnl.ca/careers/', description: 'R&D and SMR development' },
    { name: 'Cameco', url: 'https://www.cameco.com/careers/', description: 'World\'s largest uranium producer' },
    { name: 'SNC-Lavalin Nuclear', url: 'https://www.snclavalin.com/en/careers', description: 'Nuclear engineering services' },
];

const innovations = [
    {
        title: 'Small Modular Reactors (SMRs)',
        description: 'Factory-built, compact reactors (under 300 MW) that can be deployed faster and in remote locations. Canada is a global leader with projects underway.',
    },
    {
        title: 'Advanced Reactor Designs',
        description: 'Gen IV reactors using molten salt, liquid metal, or high-temperature gas. More efficient, produce less waste, enhanced safety.',
    },
    {
        title: 'Nuclear Medicine & Isotopes',
        description: 'Canada produces critical medical isotopes used worldwide for cancer diagnosis and treatment. Growing field with humanitarian impact.',
    },
    {
        title: 'Clean Hydrogen Production',
        description: 'Using nuclear heat to produce hydrogen fuel — a pathway for decarbonizing heavy industry and transportation.',
    },
];

export const CareersPage = () => {
    return (
        <motion.div
            className="max-w-5xl mx-auto space-y-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Header */}
            <section className="text-center space-y-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                    <Briefcase className="w-16 h-16 text-blue-400 mx-auto" />
                </motion.div>
                <h1 className="text-4xl font-bold text-white">Nuclear Careers & Innovation</h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Nuclear is a forward-looking field with diverse career paths. Here's who works in the industry and what's being built for the future.
                </p>
            </section>

            {/* Career Areas */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white">Career Areas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {careerAreas.map((area, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-${area.color}-500/30 transition-colors`}
                        >
                            <div className={`w-12 h-12 rounded-xl bg-${area.color}-500/10 flex items-center justify-center mb-4`}>
                                <area.icon className={`w-6 h-6 text-${area.color}-400`} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{area.title}</h3>
                            <p className="text-sm text-slate-400 mb-4">{area.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {area.roles.slice(0, 3).map((role, j) => (
                                    <span key={j} className="text-xs px-2 py-1 bg-slate-800 text-slate-400 rounded">
                                        {role}
                                    </span>
                                ))}
                                {area.roles.length > 3 && (
                                    <span className="text-xs px-2 py-1 bg-slate-800 text-slate-500 rounded">
                                        +{area.roles.length - 3} more
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Skills Needed */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8"
            >
                <h3 className="text-xl font-bold text-white mb-4">Skills That Matter</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        'STEM Education',
                        'Problem Solving',
                        'Safety Mindset',
                        'Attention to Detail',
                        'Communication',
                        'Teamwork',
                        'Continuous Learning',
                        'Questioning Attitude',
                    ].map((skill, i) => (
                        <div key={i} className="flex items-center gap-2 text-slate-300">
                            <span className="w-2 h-2 bg-blue-400 rounded-full" />
                            {skill}
                        </div>
                    ))}
                </div>
                <p className="text-slate-400 text-sm mt-4">
                    Nuclear careers value safety culture — the willingness to speak up, ask questions, and put safety first, even under pressure.
                </p>
            </motion.section>

            {/* Canadian Employers */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
            >
                <div className="flex items-center gap-3">
                    <span className="text-3xl">🍁</span>
                    <h2 className="text-2xl font-bold text-white">Work in Canada</h2>
                </div>
                <p className="text-slate-400">
                    Canada's nuclear sector employs over 70,000 people directly and indirectly. Major employers:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {canadianEmployers.map((employer, i) => (
                        <a
                            key={i}
                            href={employer.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-red-500/30 transition-colors"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h4 className="font-bold text-white group-hover:text-red-400 transition-colors">{employer.name}</h4>
                                    <p className="text-xs text-slate-500 mt-1">{employer.description}</p>
                                </div>
                                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-red-400 flex-shrink-0" />
                            </div>
                        </a>
                    ))}
                </div>
            </motion.section>

            {/* Innovation */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Lightbulb className="w-6 h-6 text-yellow-400" /> Innovation Happening Now
                </h2>
                <div className="space-y-4">
                    {innovations.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-yellow-500/30 transition-colors"
                        >
                            <h4 className="font-bold text-white mb-2">{item.title}</h4>
                            <p className="text-sm text-slate-400">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* CTA */}
            <section className="text-center py-8 border-t border-slate-800">
                <p className="text-slate-400 mb-4">Interested in learning more about the technology?</p>
                <Link
                    to="/reactors"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-colors gap-2"
                >
                    Explore Reactor Types <ArrowRight className="w-4 h-4" />
                </Link>
            </section>
        </motion.div>
    );
};
