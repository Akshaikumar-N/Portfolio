'use client';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function NeuralNetwork() {
    const [nodes, setNodes] = useState<{ x: number; y: number; id: number; layer: number }[]>([]);
    const [connections, setConnections] = useState<{ start: number; end: number; id: string }[]>([]);

    useEffect(() => {
        // Generate nodes in layers
        const layers = [3, 5, 5, 2]; // Number of nodes per layer (Updated as requested)
        const newNodes = [];
        const newConnections = [];
        let nodeId = 0;

        const width = 400;
        const height = 400;
        const layerSpacing = width / (layers.length - 1);

        // Calculate constant vertical spacing based on the densest layer to ensure even spacing for all
        const maxNodes = Math.max(...layers);
        const maxLayerHeight = height * 0.8;
        const verticalSpacing = maxLayerHeight / (maxNodes - 1);

        // Create Nodes
        for (let l = 0; l < layers.length; l++) {
            const nodeCount = layers[l];
            // Height of THIS layer based on constant spacing
            const currentLayerHeight = (nodeCount - 1) * verticalSpacing;
            const startY = (height - currentLayerHeight) / 2;

            for (let i = 0; i < nodeCount; i++) {
                newNodes.push({
                    x: l * layerSpacing,
                    y: startY + i * verticalSpacing,
                    id: nodeId,
                    layer: l,
                });
                nodeId++;
            }
        }

        // Create Connections
        for (let l = 0; l < layers.length - 1; l++) {
            const currentLayerNodes = newNodes.filter((n) => n.layer === l);
            const nextLayerNodes = newNodes.filter((n) => n.layer === l + 1);

            for (const startNode of currentLayerNodes) {
                for (const endNode of nextLayerNodes) {
                    // Randomly connect some nodes, not all, to avoid clutter
                    if (Math.random() > 0.3) {
                        newConnections.push({
                            start: startNode.id,
                            end: endNode.id,
                            id: `${startNode.id}-${endNode.id}`,
                        });
                    }
                }
            }
        }

        setNodes(newNodes);
        setConnections(newConnections);
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center p-8">
            <svg viewBox="0 0 400 400" className="w-full h-full max-w-lg overflow-visible">
                <defs>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                    </linearGradient>
                </defs>

                {/* Connections */}
                {connections.map((conn, i) => {
                    const start = nodes.find((n) => n.id === conn.start)!;
                    const end = nodes.find((n) => n.id === conn.end)!;
                    return (
                        <motion.line
                            key={conn.id}
                            x1={start.x}
                            y1={start.y}
                            x2={end.x}
                            y2={end.y}
                            stroke="url(#line-gradient)"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: i * 0.01 + 0.5 }}
                        />
                    );
                })}

                {/* Signals - Moving dots along random connections */}
                {connections.map((conn, i) => {
                    const start = nodes.find((n) => n.id === conn.start)!;
                    const end = nodes.find((n) => n.id === conn.end)!;

                    // Increased probability of signals
                    if (i % 2 !== 0) return null;

                    return (
                        <motion.circle
                            key={`signal-${i}`}
                            r="3"
                            fill="#fff"
                            initial={{ offsetDistance: "0%" }}
                            animate={{
                                cx: [start.x, end.x],
                                cy: [start.y, end.y],
                                opacity: [0, 1, 0],
                                scale: [0.5, 1.2, 0.5] // Pulse size while moving
                            }}
                            transition={{
                                duration: 1 + Math.random() * 1.5, // Faster signals
                                repeat: Infinity,
                                repeatDelay: Math.random() * 1,
                                ease: "easeInOut"
                            }}
                        />
                    )
                })}


                {/* Nodes */}
                {nodes.map((node) => (
                    <motion.circle
                        key={node.id}
                        cx={node.x}
                        cy={node.y}
                        r="5"
                        fill="white"
                        initial={{ scale: 1 }}
                        animate={{
                            scale: [1, 1.3, 1], // Firing pulse
                            boxShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 20px rgba(255,255,255,0.8)", "0px 0px 0px rgba(255,255,255,0)"]
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatDelay: Math.random() * 3 + 1, // Random firing intervals
                            ease: "easeOut"
                        }}
                    />
                ))}

                {nodes.map((node) => (
                    <motion.circle
                        key={`glow-${node.id}`}
                        cx={node.x}
                        cy={node.y}
                        r="8"
                        fill="white"
                        opacity="0.2"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: node.layer * 0.2,
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}
