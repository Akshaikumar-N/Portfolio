'use client';

import { motion } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import { Spotlight } from '@/components/ui/Spotlight';

export default function Experience() {
    const { experience } = portfolio;

    return (
        <section id="experience" className="py-20 bg-black overflow-hidden relative">
            <div className="absolute inset-0 z-[-1] pointer-events-none">
                <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Professional <span className="text-zinc-500">Experience</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        My career journey in the field of Artificial Intelligence.
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Timeline Line */}
                    <div className="absolute left-1/2 -ml-px w-px h-full bg-zinc-800 md:block hidden" />

                    {experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`relative mb-12 flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            <div className="flex-1 w-full md:w-1/2" />

                            <div className="z-10 bg-black border-4 border-black rounded-full w-4 h-4 flex items-center justify-center shadow md:absolute left-1/2 -translate-x-1/2 md:mb-0 mb-4 ring-2 ring-zinc-700">
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                            </div>

                            <div className={`flex-1 w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 text-center md:text-right' : 'md:pl-12 text-center md:text-left'
                                }`}>
                                <Spotlight className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800/30 hover:border-white/30 transition-all shadow-xl backdrop-blur-sm group">
                                    <span className="text-zinc-500 font-mono text-xs tracking-widest uppercase mb-2 block">{exp.period}</span>
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-zinc-200 transition-colors">{exp.role}</h3>
                                    <h4 className="text-lg text-zinc-400 font-medium mb-4">{exp.company}</h4>
                                    <p className="text-zinc-500 leading-relaxed font-light text-sm">
                                        {exp.description}
                                    </p>
                                </Spotlight>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
