"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, Stars, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function SkillIcon({ text, position, color }) {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            ref.current.position.y += Math.sin(state.clock.elapsedTime * 1 + position[0]) * 0.002;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Text
                ref={ref}
                position={position}
                fontSize={0.4}
                color={color}
                anchorX="center"
                anchorY="middle"
                maxWidth={2}
            >
                {text}
                <meshStandardMaterial
                    emissive={color}
                    emissiveIntensity={0.5}
                    toneMapped={false}
                />
            </Text>
        </Float>
    );
}

export default function SkillsCloud() {
    const skills = [
        { name: "React", color: "#61DAFB" },
        { name: "Next.js", color: "#ffffff" },
        { name: "Three.js", color: "#049EF4" },
        { name: "Python", color: "#3776AB" },
        { name: "Node.js", color: "#339933" },
        { name: "MongoDB", color: "#47A248" },
        { name: "Tailwind", color: "#06B6D4" },
        { name: "TypeScript", color: "#3178C6" },
        { name: "Docker", color: "#2496ED" },
        { name: "Git", color: "#F05032" },
    ];

    const positions = useMemo(() => {
        return skills.map((_, i) => {
            const angle = (i / skills.length) * Math.PI * 2;
            const radius = 4;
            return [
                Math.cos(angle) * (radius + Math.random() * 0.5),
                (Math.random() - 0.5) * 3,
                Math.sin(angle) * (radius + Math.random() * 0.5)
            ];
        });
    }, [skills.length]);

    return (
        <div className="h-[500px] w-full relative">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22D3EE" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Sphere args={[1, 64, 64]} position={[0, 0, 0]}>
                    <MeshDistortMaterial
                        color="#8B5CF6"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0}
                    />
                </Sphere>

                {skills.map((skill, i) => (
                    <SkillIcon
                        key={skill.name}
                        text={skill.name}
                        position={positions[i]}
                        color={skill.color}
                    />
                ))}
            </Canvas>

            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border border-white/5 animate-pulse" />
            </div>
        </div>
    );
}
