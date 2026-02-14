'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, ArrowUpRight } from 'lucide-react';
import { portfolio } from '@/data/portfolio';
import { Spotlight } from '@/components/ui/Spotlight';
import { ParallaxText } from '@/components/ui/ParallaxText';

export default function Projects() {
    const { projects } = portfolio;

    // Stagger animation for projects
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const projectVariants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 20 } },
    };

    return (
        <section id="projects" className="py-32 bg-black overflow-hidden text-white relative">
            <div className="absolute top-0 w-full mb-20 opacity-20 pointer-events-none">
                <ParallaxText baseVelocity={-2}>INNOVATION • AI • CODE •</ParallaxText>
                <ParallaxText baseVelocity={2}>FUTURE • DESIGN • BUILD •</ParallaxText>
            </div>

            <div className="container mx-auto px-6 pt-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">
                        SELECTED PROJECTS
                    </h2>
                    <div className="w-24 h-px bg-white/50 mx-auto" />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project, index) => (
                        <motion.div key={index} variants={projectVariants}>
                            <Spotlight className="h-full flex flex-col group p-8 bg-slate-900/50 backdrop-blur-sm border-slate-800/50 hover:border-slate-700 transition-colors duration-500">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-zinc-800/50 rounded-xl border border-zinc-700 group-hover:bg-white/10 group-hover:border-white/30 transition-colors duration-300">
                                        <Code className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="flex gap-4">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-zinc-500 hover:text-white transition-colors hover:scale-110 transform"
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-zinc-500 hover:text-white transition-colors hover:scale-110 transform"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-zinc-200 transition-colors flex items-center gap-2">
                                    {project.title}
                                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300" />
                                </h3>

                                <p className="text-zinc-400 mb-8 flex-grow leading-relaxed group-hover:text-zinc-300 transition-colors">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tech.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-xs font-semibold tracking-wide text-zinc-300 bg-zinc-800/50 rounded-full border border-zinc-700/50 group-hover:border-white/50 transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </Spotlight>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
