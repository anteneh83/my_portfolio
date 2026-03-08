export async function POST(req) {
    try {
        const { message } = await req.json();

        // Portfolio context for the AI
        const portfolioContext = `
You are "Anteneh AI" — a friendly AI assistant that answers questions about Anteneh Getnet, a Software Engineer.
Keep answers concise, helpful and enthusiastic. Always speak positively about Anteneh.

== SCOPE & GUARDRAILS ==
- Your primary goal is to answer questions about Anteneh's career, projects, skills, and professional background.
- If a user asks a question that is NOT related to Anteneh, his work, or his portfolio (e.g., general knowledge, unrelated technical questions, personal advice), you MUST politely decline.
- Sample rejection response: "I'm Anteneh's portfolio assistant, so I'm here to talk about his work and skills! I don't have information on that topic, but I'd love to tell you about his projects like ZemaHub or NewsBrief."
- Do not provide code for unrelated tasks. Always redirect the conversation back to Anteneh.

== ABOUT ==
Anteneh Getnet is a Software Engineer specializing in full-stack web development and scalable system design.
He is a student at Addis Ababa Science and Technology University (AASTU) and an A2SV Fellow (Google-backed).

== FEATURED PROJECTS ==
1. ZemaHub (Featured)
   Ethiopian Music Discovery Platform using Next.js, Node.js, MongoDB, and YouTube API. Features trending music and favorites.
   Link: https://zemahub-47u2.vercel.app/

2. NewsBrief (Featured)
   AI-powered bilingual (Amharic/English) news summarizer. Uses GPT-4 for summaries and gTTS for audio playback.
   Link: https://news-brief.onrender.com/

3. Wekil AI
   Agreement generator for Ethiopian freelancers. Supports Amharic/English, PDF export, and digital signatures.
   Link: https://g6-wekil-ai-1.vercel.app/

== OTHER PROJECTS ==
- CamLink: Multi-camera live streaming platform (WebRTC, React).
- A2SV Tracker: Internal application management system for A2SV.
- Gauge Engineering: Electromechanical design website.

== SKILLS ==
Programming: Python, JavaScript, TypeScript, Java, C++, PHP, Dart
Frameworks: React, Next.js, Node.js, Express.js, Flutter, Three.js, Tailwind CSS
Databases: MySQL, MongoDB, PostgreSQL, SQLite
Tools: Docker, Git, Linux, GitHub Actions, Vercel

== CONTACT ==
- GitHub: https://github.com/anteneh83
- LinkedIn: https://www.linkedin.com/in/antig74/
- Telegram: https://t.me/Yours_2123
- Email: antenehgetnet83@gmail.com
    `;

        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey || apiKey === "sk-your-key-here") {
            return Response.json({ reply: getFallbackReply(message) });
        }

        try {
            const { OpenAI } = await import("openai");
            const openai = new OpenAI({ apiKey });

            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: portfolioContext },
                    { role: "user", content: message },
                ],
                max_tokens: 300,
                temperature: 0.7,
            });

            return Response.json({
                reply: completion.choices[0].message.content,
            });
        } catch (error) {
            console.error("OpenAI API error, using fallback:", error);
            return Response.json({
                reply: getFallbackReply(message),
            });
        }
    } catch (error) {
        console.error("General AI Route error:", error);
        return Response.json(
            { reply: "I'm having a moment! Please try again shortly." },
            { status: 200 }
        );
    }
}

function getFallbackReply(message) {
    const msg = message.toLowerCase();

    // Keywords that are related to Anteneh
    const relatedKeywords = [
        "anteneh", "project", "work", "skill", "tech", "contact", "email",
        "zemahub", "newsbrief", "wekil", "camlink", "a2sv", "astu",
        "github", "linkedin", "who are you", "what can you do", "help"
    ];

    const isRelated = relatedKeywords.some(keyword => msg.includes(keyword));

    if (!isRelated) {
        return "I'm Anteneh's portfolio assistant, so I'm here to talk about his work and skills! I don't have information on that topic, but I'd love to tell you about his projects like ZemaHub or NewsBrief. 😊";
    }

    if (msg.includes("zemahub"))
        return "ZemaHub is Anteneh's featured Ethiopian Music Discovery Platform. It aggregates trending music from YouTube, allowing users to discover, rank, and favorite their top songs. Check it out at: https://zemahub-47u2.vercel.app/ 🎵";

    if (msg.includes("newsbrief") || msg.includes("news"))
        return "NewsBrief is an AI-powered news summarizer for Ethiopia. It's bilingual (Amharic/English), uses GPT-4 for summaries, and even has Text-to-Speech for audio playback! See it here: https://news-brief.onrender.com/ 📰";

    if (msg.includes("wekil") || msg.includes("agreement"))
        return "Wekil AI helps Ethiopian freelancers create informal agreements quickly using AI. It supports bilingual text, PDF exports, and digital signatures. Live demo: https://g6-wekil-ai-1.vercel.app/ ✍️";

    if (msg.includes("skill") || msg.includes("tech") || msg.includes("know"))
        return "Anteneh is a master of many tools! His stack includes React, Next.js, TypeScript, Python, Node.js, and even 3D web tech like Three.js. He also works with Docker and multiple databases like MongoDB and PostgreSQL. 🚀";

    if (msg.includes("project") || msg.includes("built") || msg.includes("work"))
        return "Anteneh has built several impressive projects: ZemaHub (music discovery), NewsBrief (AI news), Wekil AI (legal tech), and CamLink (live streaming). He's always building something innovative! 💡";

    if (msg.includes("achiev") || msg.includes("award") || msg.includes("hackathon") || msg.includes("presidential"))
        return "Anteneh is a high-achiever! He won the Presidential Award at ASTU (Top 1% of students), took 2nd place in a major GDG Hackathon, and has coached nearly 50 teams at hackathons. 🏆";

    if (msg.includes("contact") || msg.includes("reach") || msg.includes("hire") || msg.includes("email"))
        return "You can reach Anteneh via email at antenehgetnet83@gmail.com, or find him on LinkedIn and GitHub. You can also send a message directly through the Contact section below! 📬";

    if (msg.includes("who") || msg.includes("anteneh") || msg.includes("about"))
        return "Anteneh Getnet is a Software Engineer from Ethiopia, an A2SV Fellow, and a student at ASTU. He's an expert in full-stack dev and competitive programming (400+ problems solved!). 👨‍💻";

    return "That's a great question about Anteneh! He's a Software Engineer obsessed with building high-impact tools like ZemaHub and NewsBrief. Ask me about his projects, skills, or achievements! 😊";
}
