import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchCollectionData } from '../firebase/config';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let chatSession;

const retrieveRelevantInfo = async (query) => {
  query = query.toLowerCase();
  let relevantInfo = {};

  const categories = {
    timetable: ["timetable", "schedule", "class", "time table", "time", "professor", "prof"],
    teachers: ["teacher", "Teacher", "mam" , "professor", "mail", "room", "email", "faculty", "detail", "cabin"],
    pgandhostel: ["pg", "hostel", "accommodation", "resident"],
    clubsandsocieties: ["club", "society", "extracurricular"],
    foodoption: ["food", "canteen", "cafeteria", "meal"],
    laundry: ["laundry", "washing"],
    gymdetail: ["gym", "fitness"],
    acadmicoffice: ["academic office", "administration"],
    newstudentchecklist: ["new student", "checklist", "orientation"],
    sportsfacility: ["sports", "facility", "game"],
    busservices: ["bus", "transport", "shuttle"],
    facultylocation: ["faculty location", "office", "department"],
    examinationrules: ["examination", "rules", "exam", "exam rules", "exam schedule", "Examination Rules"],
    holidaylist: ["holiday", "Holiday List", "holidays", "holiday list"]
  };

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => query.includes(keyword))) {
      const data = await fetchCollectionData(category);
      if (data) {
        relevantInfo[category] = data;
      }
    }
  }

  return JSON.stringify(relevantInfo, null, 2);
};

export const initializeGeminiWithUserData = async (userData) => {
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
        parts: [{ text: `I am ${userData.name} from Christ University. I am a ${userData.course} student. I am currently in section ${userData.section}. My registration number is ${userData.regNumber}.` }],
      },
      {
        role: "model",
        parts: [{ text: `Thank you for providing your information, ${userData.name}. As a ${userData.course} student in section ${userData.section} at Christ University, I'm here to assist you with any questions you might have about your courses, teachers, schedules, or other university-related matters. What would you like to know?` }],
      },
    ],
  });
};

export const generateResponse = async (prompt) => {
  try {
    if (!chatSession) {
      throw new Error("Chat session not initialized. Please log in first.");
    }

    const relevantInfo = await retrieveRelevantInfo(prompt);
    const enhancedPrompt = `User query: ${prompt}\n\nRelevant information: ${relevantInfo}\n\nPlease provide a response based on the user query and the relevant information provided. If the relevant information is empty, still try to answer based on your general knowledge about university structures and the context provided in the chat history. Always prioritize the provided information over general knowledge when available.`;

    const result = await chatSession.sendMessage(enhancedPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
};

export const clearChatHistory = async () => {
  chatSession = null;
};
