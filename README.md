# KanjiApp

KanjiApp is a web application built with Vue 3 with Google Realtime Database. It provides users with the ability to create an account, log in, and create their own deck of flashcards for studying Japanese kanji.

## Features
- **User Accounts:** Users can create an account and log in to access their personalized study materials.
- **Email Verification:** KanjiApp includes an email verification process to ensure the security and validity of user accounts.
- **Flashcard Deck Creation:** Users can create their own deck of flashcards, specifically for studying Japanese kanji.
- **Study Mode:** KanjiApp provides a study mode where users can review their flashcards and practice their knowledge of kanji.
- **Google Realtime Database Integration:** KanjiApp utilizes Google Realtime Database to securely store user data and synchronize it across devices.


## Installation

To run KanjiApp locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/neupanemadan/kanjiApp.git
   
2. Install the dependencies 

   ```bash
   yarn install

3. Configure the Google Realtime Database:
- Create a new project in the Google Cloud Console.
- Enable the Realtime Database API and obtain the necessary credentials.
- Set up the Firebase configuration by creating a .env file and providing the required credentials.

4. Start the development server:

   ```bash
   yarn run dev
   
 
5. Access KanjiApp in your browser at **http://localhost:5173/**
