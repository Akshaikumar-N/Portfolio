'use client';
import { motion } from 'framer-motion';
import { portfolio } from '@/data/portfolio';

export default function Skills() {
    const { skills } = portfolio;

    return (
        <section id="skills" className="py-24 relative bg-black border-t border-zinc-900">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Technical Arsenal
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        My proficiency in the tools that power intelligent systems.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="group"
                        >
                            <div className="flex justify-between items-end mb-2">
                                <h3 className="text-lg font-medium text-white group-hover:text-zinc-300 transition-colors">
                                    {skill.name}
                                </h3>
                                <span className="text-sm font-mono text-zinc-500 group-hover:text-white transition-colors">
                                    {skill.level}%
                                </span>
                            </div>

                            {/* Progress Bar Container */}
                            <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-white rounded-full relative"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                >
                                    {/* Shimmer Effect */}
                                    <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
