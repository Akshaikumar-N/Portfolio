'use client';

import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { portfolio } from '@/data/portfolio';

export default function Contact() {
    const { personal } = portfolio;

    return (
        <section id="contact" className="py-24 bg-black text-white relative border-t border-zinc-900">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:50px_50px] opacity-20" />

            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-1/2"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        Let's <span className="text-zinc-500">Connect</span>
                    </h2>
                    <p className="text-zinc-400 mb-8 max-w-lg leading-relaxed">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                    </p>

                    <div className="flex flex-col gap-6">
                        <a href={`mailto:${personal.email}`} className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-white transition-colors">
                                <Mail className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <span className="block text-sm text-zinc-500 font-mono">Mail Me</span>
                                <span className="block text-lg font-medium text-white group-hover:text-zinc-300 transition-colors">{personal.email}</span>
                            </div>
                        </a>
                        {/* Can add more contact info here if needed */}
                    </div>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full md:w-1/2 bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800 shadow-2xl backdrop-blur-sm"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="mb-6">
                        <label className="block text-zinc-400 mb-2 font-medium">Name</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white/50 transition-all text-white placeholder-zinc-700"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-zinc-400 mb-2 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white/50 transition-all text-white placeholder-zinc-700"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-zinc-400 mb-2 font-medium">Message</label>
                        <textarea
                            placeholder="What's on your mind?"
                            rows={4}
                            className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white/50 transition-all text-white placeholder-zinc-700 resize-none"
                        ></textarea>
                    </div>

                    <button className="w-full px-6 py-4 bg-white text-black font-bold rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 hover:bg-zinc-200">
                        Send Message
                        <Send className="w-4 h-4" />
                    </button>
                </motion.form>
            </div>
        </section>
    );
}
