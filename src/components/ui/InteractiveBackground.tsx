'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    density: number;
    color: string;
    baseX: number;
    baseY: number;
    update: () => void;
    draw: () => void;
}

export default function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particlesArray: Particle[] = [];
        let animationId: number;

        const mouse = {
            x: null as number | null,
            y: null as number | null,
            radius: 100,
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        }

        class ParticleObject implements Particle {
            x: number;
            y: number;
            size: number;
            density: number;
            color: string;
            baseX: number;
            baseY: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 2 + 0.5;
                this.density = (Math.random() * 20) + 1;
                this.color = 'rgba(255, 255, 255, 0.8)';
                this.baseX = x;
                this.baseY = y;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                if (!ctx) return;

                // Interaction
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        const directionX = forceDirectionX * force * this.density;
                        const directionY = forceDirectionY * force * this.density;

                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        if (this.x !== this.baseX) {
                            let dx = this.x - this.baseX;
                            this.x -= dx / 15;
                        }
                        if (this.y !== this.baseY) {
                            let dy = this.y - this.baseY;
                            this.y -= dy / 15;
                        }
                    }
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 15;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 15;
                    }
                }

                this.draw();
            }
        }

        function init() {
            const canvas = canvasRef.current; // Re-declare canvas here or assume closure capture, but simpler to use explicit ref if needed. 
            // NOTE: The previous code used 'canvas' captured from useEffect scope.
            // But 'init' is defined inside useEffect where 'canvas' is available.
            if (!canvas) return;
            particlesArray = [];
            // Reduced density: divisor increased from 15000 to 25000
            const numberOfParticles = (canvas.width * canvas.height) / 25000;
            for (let i = 0; i < numberOfParticles; i++) {
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                particlesArray.push(new ParticleObject(x as number, y as number)); // Typo fix: ParticleObject constructor args
            }
        }

        function connect() {
            if (!ctx || !canvasRef.current) return;
            const canvas = canvasRef.current;
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distance = dx * dx + dy * dy;

                    // Reduced connection distance divisor from 7 to 9 (smaller distance)
                    if (distance < (canvas.width / 9) * (canvas.height / 9)) {
                        // Reduced opacity multiplier to make it fainter
                        opacityValue = 1 - (distance / 15000);
                        if (opacityValue > 0) {
                            ctx.strokeStyle = 'rgba(255, 255, 255,' + (opacityValue * 0.5) + ')'; // Max 0.5 opacity
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                            ctx.stroke();
                        }
                    }
                }
            }
        }

        function animate() {
            if (!canvas || !ctx) return;
            animationId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-auto z-20"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
