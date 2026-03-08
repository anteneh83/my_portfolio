"use client";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, RoundedBox, OrbitControls } from "@react-three/drei";
import { projects } from "@/data/projects";

function ProjectCard({ project, index, total, onSelect }) {
    const ref = useRef();
    const [hovered, setHovered] = useState(false);
    const angle = (index / total) * Math.PI * 2;
    const radius = 3.5;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    useFrame((state) => {
        if (ref.current) {
            ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.15;
            const targetScale = hovered ? 1.12 : 1;
            ref.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
        }
    });

    // Parse hex color to RGB fractions for Three.js
    const hex = project.color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    return (
        <group position={[x, 0, z]} rotation={[0, -angle + Math.PI / 2, 0]} ref={ref}>
            <RoundedBox
                args={[2.2, 1.4, 0.12]}
                radius={0.08}
                smoothness={4}
                onClick={() => onSelect(project)}
                onPointerOver={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
                onPointerOut={() => { setHovered(false); document.body.style.cursor = "default"; }}
            >
                <meshStandardMaterial
                    color={[r * 0.15, g * 0.15, b * 0.15]}
                    emissive={[r * (hovered ? 0.3 : 0.1), g * (hovered ? 0.3 : 0.1), b * (hovered ? 0.3 : 0.1)]}
                    metalness={0.7}
                    roughness={0.3}
                    transparent
                    opacity={0.9}
                />
            </RoundedBox>

            {/* Title */}
            <Text
                position={[0, 0.35, 0.07]}
                fontSize={0.2}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                maxWidth={2}
            >
                {project.title}
            </Text>

            {/* Role */}
            <Text
                position={[0, 0.1, 0.07]}
                fontSize={0.11}
                color={project.color}
                anchorX="center"
                anchorY="middle"
                maxWidth={2}
            >
                {project.role}
            </Text>

            {/* Tech stack */}
            <Text
                position={[0, -0.15, 0.07]}
                fontSize={0.09}
                color="#94A3B8"
                anchorX="center"
                anchorY="middle"
                maxWidth={2}
            >
                {project.tech.join(" · ")}
            </Text>

            {/* "Click to view" hint */}
            <Text
                position={[0, -0.45, 0.07]}
                fontSize={0.085}
                color={hovered ? "#22D3EE" : "#475569"}
                anchorX="center"
                anchorY="middle"
            >
                {hovered ? "Click to explore →" : "Hover to explore"}
            </Text>
        </group>
    );
}

export default function ProjectScene({ onSelect }) {
    return (
        <Canvas
            camera={{ position: [0, 2.5, 9], fov: 55 }}
            dpr={[1, 2]}
            style={{ background: "transparent" }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={1} />
            <pointLight position={[0, 5, 0]} intensity={0.5} color="#8B5CF6" />

            {projects.map((project, i) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    index={i}
                    total={projects.length}
                    onSelect={onSelect}
                />
            ))}

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.4}
                maxPolarAngle={Math.PI / 2.2}
                minPolarAngle={Math.PI / 4}
            />
        </Canvas>
    );
}
