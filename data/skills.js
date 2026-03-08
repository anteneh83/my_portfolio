import {
    SiPython, SiJavascript, SiTypescript, SiCplusplus, SiPhp, SiDart,
    SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiFlutter,
    SiMysql, SiMongodb, SiSqlite, SiPostgresql,
    SiDocker, SiGit, SiLinux, SiGithubactions, SiVercel, SiTailwindcss, SiThreedotjs
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

export const skillCategories = [
    {
        category: "Programming",
        skills: [
            { name: "Python", icon: SiPython, color: "#3776AB" },
            { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "Java", icon: FaJava, color: "#007396" },
            { name: "C++", icon: SiCplusplus, color: "#00599C" },
            { name: "PHP", icon: SiPhp, color: "#777BB4" },
            { name: "Dart", icon: SiDart, color: "#0175C2" },
        ],
    },
    {
        category: "Frameworks & 3D",
        skills: [
            { name: "React", icon: SiReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
            { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
            { name: "Express.js", icon: SiExpress, color: "#ffffff" },
            { name: "Flutter", icon: SiFlutter, color: "#02569B" },
            { name: "Three.js", icon: SiThreedotjs, color: "#049EF4" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
        ],
    },
    {
        category: "Databases",
        skills: [
            { name: "MySQL", icon: SiMysql, color: "#4479A1" },
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
            { name: "SQLite", icon: SiSqlite, color: "#003B57" },
        ],
    },
    {
        category: "Tools & Deployment",
        skills: [
            { name: "Docker", icon: SiDocker, color: "#2496ED" },
            { name: "Git", icon: SiGit, color: "#F05032" },
            { name: "Linux", icon: SiLinux, color: "#FCC624" },
            { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
            { name: "Vercel", icon: SiVercel, color: "#ffffff" },
        ],
    },
];
