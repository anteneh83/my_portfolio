import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
});

export const metadata = {
    title: "Anteneh Getnet | Software Engineer",
    description:
        "Full-stack developer specializing in Next.js, React, and scalable web applications. A2SV Fellow, Competitive Programmer, and Technical Mentor.",
    keywords: [
        "Anteneh Getnet",
        "Software Engineer",
        "Full Stack Developer",
        "React",
        "Next.js",
        "A2SV",
    ],
    openGraph: {
        title: "Anteneh Getnet | Software Engineer",
        description:
            "Full-stack developer specializing in Next.js, React, and scalable web applications.",
        type: "website",
    },
};

import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
            <body className="bg-[#0F172A] font-body text-white antialiased overflow-x-hidden cursor-none">
                <CustomCursor />
                {children}
            </body>
        </html>
    );
}
