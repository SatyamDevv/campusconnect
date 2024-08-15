import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let chatSession;

const initializeChatSession = async () => {
  chatSession = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "You are a helpful classroom assistant chatbot created for chirst university students." }],
      },
      {
        role: "model",
        parts: [{ text: "Understood. I'm here to help with any classroom-related questions or tasks. How can I assist you today?" }],
      },
    ],
  });
};

export const generateResponse = async (prompt) => {
  try {
    if (!chatSession) {
      await initializeChatSession();
    }

    const result = await chatSession.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error generating response:", error);
    return "I'm sorry, I encountered an error while processing your request.";
  }
};

export const clearChatHistory = async () => {
  await initializeChatSession();
};