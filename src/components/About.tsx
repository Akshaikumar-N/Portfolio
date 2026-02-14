'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { portfolio } from '@/data/portfolio';

export default function About() {
    const { personal } = portfolio;
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]); // Start a bit higher up (-20%)
    const blur = useTransform(scrollYProgress, [0.3, 0.6, 1], ["0px", "0px", "10px"]);
    const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

    return (
        <section ref={containerRef} id="about" className="py-24 bg-black relative overflow-hidden">
            {/* Decorative circle */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-zinc-800/10 rounded-full blur-[100px] -mr-32 pointer-events-none" />

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    style={{ y, filter: useTransform(blur, (v) => `blur(${v}) grayscale(100%) contrast(120%) brightness(110%)`), opacity }}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative aspect-square md:aspect-auto md:h-[500px] rounded-2xl overflow-hidden"
                >
                    <Image
                        src="/profile.png"
                        alt={personal.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-black uppercase bg-white rounded-full">
                        About Me
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Designing Intelligence <br />
                        <span className="text-zinc-500">for the Future.</span>
                    </h2>
                    <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
                        {personal.bio}
                    </p>
                    <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                        I specialize in building scalable AI solutions, from computer vision models to natural language processing systems. My goal is to bridge the gap between complex algorithms and user-friendly applications.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/50">
                            <h3 className="text-3xl font-bold text-white mb-1">3+</h3>
                            <p className="text-zinc-500 text-sm">Years of Experience</p>
                        </div>
                        <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/50">
                            <h3 className="text-3xl font-bold text-white mb-1">10+</h3>
                            <p className="text-zinc-500 text-sm">Projects Completed</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
