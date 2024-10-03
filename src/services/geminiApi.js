import { GoogleGenerativeAI } from "@google/generative-ai";
import knowledgeBase from "./knowledgeBase"

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let chatSession;

// Improved retrieval function
const retrieveRelevantInfo = (query) => {
  query = query.toLowerCase();
  let relevantInfo = {};

  const categories = {
    timetable: ["timetable", "schedule", "class", "time table", "time"],
    teachers: ["teacher","mam", "professor", "mail", "room", "email", "faculty", "detail", "cabin"],
    pgandhostel: ["pg", "hostel", "accommodation"],
    clubsandsocieties: ["club", "society", "extracurricular"],
    foodoption: ["food", "canteen", "cafeteria", "meal"],
    laundry: ["laundry", "washing"],
    gymdetail: ["gym", "fitness"],
    acadmicoffice: ["academic office", "administration"],
    newstudentchecklist: ["new student", "checklist", "orientation"],
    sportsfacility: ["sports", "facility", "game"],
    busservices: ["bus", "transport", "shuttle"],
    facultylocation: ["faculty location", "office", "department"]
  };

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => query.includes(keyword))) {
      relevantInfo[category] = knowledgeBase[category];
    }
  }

  return JSON.stringify(relevantInfo, null, 2);
};

const initializeChatSession = async () => {
  chatSession = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "You are a helpful classroom assistant chatbot created for Christ University students. You have access to information about teachers, timetables, and other university-related data. Please use this information to answer questions accurately." }],
      },
      {
        role: "model",
        parts: [{ text: "Understood. I'm here to help with any classroom-related questions or tasks, including information about teachers, timetables, and other university-related data. How can I assist you today?" }],
      },
      {
        role: "user",
        parts: [{ text: "I am Satyam Tiwari from Christ University. I am a Bachelor in Computer Application (BCA) student. I am currently in my 5th semester." }],
      },
      {
        role: "model",
        parts: [{ text: "Thank you for providing your information, Satyam. As a 5th semester Bachelor in Computer Application student at Christ University, I'm here to assist you with any questions you might have about your courses, teachers, schedules, or other university-related matters. What would you like to know?" }],
      },
    ],
  });
};

export const generateResponse = async (prompt) => {
  try {
    if (!chatSession) {
      await initializeChatSession();
    }

    // Retrieve relevant information from the knowledge base
    const relevantInfo = retrieveRelevantInfo(prompt);

    // Combine the user's prompt with the retrieved information
    const enhancedPrompt = `User query: ${prompt}\n\nRelevant information: ${relevantInfo}\n\nPlease provide a response based on the user query and the relevant information provided. If the relevant information is empty, still try to answer based on your general knowledge about university structures and the context provided in the chat history. Always prioritize the provided information over general knowledge when available.`;

    const result = await chatSession.sendMessage(enhancedPrompt);
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
