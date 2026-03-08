"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

const techLabels = [
    { label: "React", color: "#61DAFB", angle: 0, radius: 2.8 },
    { label: "Next.js", color: "#ffffff", angle: 60, radius: 3.2 },
    { label: "Node.js", color: "#68A063", angle: 120, radius: 2.6 },
    { label: "Docker", color: "#2496ED", angle: 180, radius: 3.0 },
    { label: "Git", color: "#F05032", angle: 240, radius: 2.9 },
    { label: "MongoDB", color: "#47A248", angle: 300, radius: 3.1 },
];

function Planet() {
    const meshRef = useRef();
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.003;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });
    return (
        <mesh ref={meshRef} castShadow>
            <Sphere args={[1.4, 64, 64]}>
                <MeshDistortMaterial
                    color="#4C1D95"
                    attach="material"
                    distort={0.3}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                    emissive="#8B5CF6"
                    emissiveIntensity={0.4}
                />
            </Sphere>
            {/* Atmosphere ring */}
            <mesh>
                <torusGeometry args={[1.7, 0.04, 16, 100]} />
                <meshBasicMaterial color="#22D3EE" transparent opacity={0.5} />
            </mesh>
        </mesh>
    );
}

function OrbitingTechBall({ angle, radius, color, speed = 1 }) {
    const ref = useRef();
    const initialAngle = (angle * Math.PI) / 180;
    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.elapsedTime * speed * 0.4 + initialAngle;
            ref.current.position.x = Math.cos(t) * radius;
            ref.current.position.z = Math.sin(t) * radius;
            ref.current.position.y = Math.sin(t * 0.5) * 0.3;
        }
    });
    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.8}
                metalness={0.9}
                roughness={0.1}
            />
        </mesh>
    );
}

function OrbitRing({ radius, tilt = 0 }) {
    return (
        <mesh rotation={[Math.PI / 2 + tilt, 0, 0]}>
            <torusGeometry args={[radius, 0.008, 8, 120]} />
            <meshBasicMaterial color="#8B5CF6" transparent opacity={0.2} />
        </mesh>
    );
}

function ParticleField() {
    const count = 800;
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 30;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }
        return arr;
    }, []);

    const colors = useMemo(() => {
        const arr = new Float32Array(count * 3);
        const palette = [
            [0.55, 0.36, 0.96],
            [0.13, 0.83, 0.94],
            [0.93, 0.28, 0.6],
        ];
        for (let i = 0; i < count; i++) {
            const c = palette[i % 3];
            arr[i * 3] = c[0];
            arr[i * 3 + 1] = c[1];
            arr[i * 3 + 2] = c[2];
        }
        return arr;
    }, []);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.04} vertexColors transparent opacity={0.7} />
        </points>
    );
}

export default function PlanetScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 7], fov: 50 }}
            dpr={[1, 2]}
            style={{ background: "transparent" }}
        >
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
            <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8B5CF6" />
            <pointLight position={[5, 5, 5]} intensity={0.3} color="#22D3EE" />

            <Stars radius={50} depth={50} count={3000} factor={3} fade speed={1} />

            <Planet />

            {techLabels.map((tech) => (
                <OrbitRing key={tech.label} radius={tech.radius} tilt={Math.random() * 0.3} />
            ))}

            {techLabels.map((tech) => (
                <OrbitingTechBall
                    key={tech.label}
                    angle={tech.angle}
                    radius={tech.radius}
                    color={tech.color}
                    speed={0.8 + Math.random() * 0.4}
                />
            ))}

            <ParticleField />

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.3}
                maxPolarAngle={Math.PI / 1.5}
                minPolarAngle={Math.PI / 3}
            />
        </Canvas>
    );
}
