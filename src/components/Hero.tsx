'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { portfolio } from '@/data/portfolio';
import InteractiveBackground from '@/components/ui/InteractiveBackground';

export default function Hero() {
    const { personal } = portfolio;
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={targetRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
            {/* Dynamic Background Elements - Particles */}
            <div className="absolute inset-0 z-0">
                <InteractiveBackground />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center">
                {/* Text Content */}
                <motion.div
                    style={{ opacity }}
                    className="flex flex-col items-center max-w-4xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 inline-block"
                    >
                        <div className="border border-white/20 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm">
                            <span className="font-mono text-sm tracking-widest uppercase text-white/70">
                                {personal.title}
                            </span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-8 tracking-tight"
                    >
                        {personal.name}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-zinc-400 text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto"
                    >
                        {personal.bio}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-6"
                    >
                        <a
                            href="#projects"
                            className="group px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:bg-zinc-200 transition-all hover:scale-105"
                        >
                            View Selected Work
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <div className="flex items-center gap-6 px-6 py-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                            {[
                                { icon: Github, link: personal.socials.github },
                                { icon: Linkedin, link: personal.socials.linkedin },
                                { icon: Twitter, link: personal.socials.twitter },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-400 hover:text-white transition-colors hover:scale-110 transform"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>

        </section>
    );
}
