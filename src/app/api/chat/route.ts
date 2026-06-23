import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the AI Assistant for Abdul Salam Kareem's personal portfolio website. Your role is to help visitors learn about Abdul Salam Kareem's professional profile, technical skills, projects, work experience, education, and contact details.
Be concise, professional, friendly, and helpful. Keep responses short (under 3-4 sentences or bullet points) so they fit well in the small chat window.

Here is Abdul Salam's professional background:
- Name: Abdul Salam Kareem
- Professional Title: AI Engineer & Full-Stack Python Developer
- Location: Kerala, India
- Email: salamkareemk@gmail.com
- LinkedIn: https://www.linkedin.com/in/abdul-salam-kareem/
- Instagram: https://www.instagram.com/abdul_salam_kareem/
- GitHub: https://github.com/salamkareemk
- Core Bio: Passions include building intelligent, real-world AI applications, developing scalable backend systems, interactive frontends, and AI-driven solutions. Experienced in REST APIs, authentication, structuring relational databases, machine learning models, computer vision systems, and NLP.
- Technical Arsenal (Skills):
  - Languages: Python, Java, C, SQL, JavaScript, TypeScript, HTML/CSS
  - AI/ML/Data Science: TensorFlow, PyTorch, Scikit-learn, OpenCV, NumPy, Pandas, NLP, Computer Vision
  - Web & Backend: Flask, Django, Next.js, React, REST APIs, Tailwind CSS
  - Tools & DBs: Microsoft Azure AI, GitHub, VS Code, MySQL, Docker
- Academic Background: B.Tech in Artificial Intelligence & Machine Learning (Completed 2025).
- Professional Journey (Experience):
  - Advanced Python Django & GenAI Intern at HACA (Dec 2025 - Present). Developed robust backend architectures using Django and integrated state-of-the-art Generative AI models.
  - AI Intern at SmecLabs (May 2024 - June 2024). Built foundational AI models, engaged in data processing pipelines, predictive modeling, and CV.
  - AI & Python Intern at Codesoft (Aug 2023 - Sept 2023). Implemented ML algorithms, created datasets, trained and evaluated models.
- Licenses & Certifications:
  - Microsoft LinkedIn Generative AI
  - Infosys AI/NLP/Deep Learning
  - GUVI Google Certifications
  - IT Specialist Python & JavaScript
- Featured Innovations (Projects):
  - Traffic Sign Detection & Vehicle Counting System: Real-time CV system using YOLO and OpenCV.
  - Hate Speech Detection: NLP web app using LSTM and BERT to filter comments.
  - AI Chatbot: Conversational agent with transformer models and memory.
  - Movie Database System: Backend system with SQL and REST APIs in Django.
  - ATM Machine Simulation: Secure ATM simulation in Java focusing on state management.

If someone asks for contact details or wants to send a message, mention the email (salamkareemk@gmail.com) or guide them to use the Contact Me form at the bottom of the page.
If asked about topics outside of Abdul Salam's background, politely redirect the focus to his profile. Do not answer general knowledge questions unless they relate to his skills or projects.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages history." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined. Falling back to mock response.");
      // Fallback response if API key is not configured
      const lastUserMessage = messages[messages.length - 1]?.text?.toLowerCase() || "";
      let reply = "I am Abdul Salam's AI assistant. To enable fully dynamic AI responses, please configure the GEMINI_API_KEY in the environment.";
      if (lastUserMessage.includes("contact") || lastUserMessage.includes("email")) {
        reply = "You can contact Abdul Salam at salamkareemk@gmail.com or by filling out the form at the bottom of this page.";
      } else if (lastUserMessage.includes("project")) {
        reply = "Abdul Salam has built impressive projects like a Traffic Sign Detection system and a Hate Speech Detection app. Explore them in the Innovations section!";
      } else if (lastUserMessage.includes("skill")) {
        reply = "Abdul Salam's core skills include Python, TensorFlow, PyTorch, Django, Next.js, and Machine Learning.";
      }
      return NextResponse.json({ reply });
    }

    // Format messages history for Google Gemini API
    // Gemini roles must be "user" or "model"
    const formattedContents = messages.map((msg: { text: string; isBot: boolean }) => ({
      role: msg.isBot ? "model" : "user",
      parts: [{ text: msg.text }],
    }));

    const requestBody = JSON.stringify({
      contents: formattedContents,
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 250,
      },
    });

    // Try models in order — fall back if one is overloaded
    const models = ["gemini-2.5-flash", "gemini-2.0-flash"];
    let lastError = "";

    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: requestBody,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          lastError = errorData.error?.message || "Gemini API request failed.";
          console.warn(`Model ${model} failed: ${lastError}. Trying next...`);
          continue;
        }

        const data = await response.json();
        const replyText =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "I couldn't process that. How can I help you explore this portfolio?";

        return NextResponse.json({ reply: replyText });
      } catch (fetchError) {
        lastError = fetchError instanceof Error ? fetchError.message : "Network error.";
        console.warn(`Model ${model} threw: ${lastError}. Trying next...`);
        continue;
      }
    }

    // All models failed
    return NextResponse.json(
      { error: lastError || "All AI models are currently unavailable. Please try again later." },
      { status: 503 }
    );
  } catch (error: unknown) {
    console.error("Chatbot API Error:", error);
    const message = error instanceof Error ? error.message : "Something went wrong.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
