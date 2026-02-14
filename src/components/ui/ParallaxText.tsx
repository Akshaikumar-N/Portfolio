'use client';

import { useRef, useEffect } from 'react';
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useMotionTemplate,
    MotionValue,
} from 'framer-motion';

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

interface ParallaxTextProps {
    children: string;
    baseVelocity?: number;
}

export function ParallaxText({ children, baseVelocity = 100 }: ParallaxTextProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useSpring(scrollY, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(scrollVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    /* 
     * This is a magic wrapping for the length of the text - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useTransform(scrollY, (v) => v); // Just to subscribe to updates if needed, though useSpring handles velocity

    const rafId = useRef<number | null>(null);

    // Create a loop function that we can call
    const move = () => {
        let moveBy = baseVelocity * (1 / 60); // Assuming 60fps for simplicity

        // Get velocity from the spring
        const velocity = velocityFactor.get();

        if (velocity < 0) {
            directionFactor.current = -1;
        } else if (velocity > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocity;

        baseX.set(baseX.get() + moveBy);
        rafId.current = requestAnimationFrame(move);
    };

    // Start animation loop on mount

    useEffect(() => {
        rafId.current = requestAnimationFrame(move);
        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    return (
        <div className="parallax overflow-hidden whitespace-nowrap flex flex-nowrap m-0">
            <motion.div className="scroller font-bold uppercase text-6xl md:text-9xl flex whitespace-nowrap flex-nowrap" style={{ x }}>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
            </motion.div>
        </div>
    );
}

// Helper specifically for this file
function wrap(min: number, max: number, v: number) {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}
