# Campus Assist - Christ University Chatbot

Campus Assist is a chatbot designed to help students, faculty, and visitors at Christ University access essential information quickly and efficiently. The app is built using **React.js** for the frontend and powered by the **Gemini API** for backend processing. **Firebase** is used for authentication and as the knowledge database.

## Features

- **Class Timetable**: View daily and weekly class schedules.
- **Teacher Information**: Access teacher details and office locations.
- **PG and Hostel Details**: Find information on nearby accommodations.
- **Clubs and Societies**: Discover extracurricular groups and activities.
- **Food Options**: Locate food outlets on campus.
- **Laundry Services**: Information on laundry facilities.
- **Gym Details**: Access gym services and sports facilities.
- **Academic Office**: Find academic office contact and examination rules.
- **New Student Checklist**: A guide for first-time students.
- **Bus Services & Faculty Locations**: Access transport routes and faculty locations.

## Technologies Used

- **React.js**: Frontend framework for building the user interface.
- **Gemini API**: For chatbot backend and response processing.
- **Firebase**: For authentication and real-time database management.

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/campus-assist.git
2. Install dependencies:
   ```bash
   npm install
3. Run the development server:
   ```bash
   npm start

## Environment Variables

To run this project, you will need to add a `.env` file in the root directory of your project with the following environment variables:

```bash
# Gemini API Key
REACT_APP_GEMINI_API_KEY=GEMINI_API_KEY_HERE

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=FIREBASE_API_KEY_HERE
REACT_APP_FIREBASE_AUTH_DOMAIN=FIREBASE_AUTH_DOMAIN_HERE
REACT_APP_FIREBASE_PROJECT_ID=FIREBASE_PROJECT_ID_HERE
REACT_APP_FIREBASE_STORAGE_BUCKET=FIREBASE_STORAGE_BUCKET_HERE
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=FIREBASE_MESSAGING_SENDER_ID_HERE
REACT_APP_FIREBASE_APP_ID=1:FIREBASE_APP_ID_HERE

