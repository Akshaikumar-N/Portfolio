'use client';

import { portfolio } from '@/data/portfolio';

export default function Footer() {
    const { personal } = portfolio;

    return (
        <footer className="py-8 bg-black text-zinc-600 text-center border-t border-zinc-900">
            <div className="container mx-auto px-6">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
                </p>
                <div className="flex justify-center gap-4 mt-4">
                    {Object.entries(personal.socials).map(([key, url]) => (
                        <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="capitalize hover:text-white transition-colors"
                        >
                            {key}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
