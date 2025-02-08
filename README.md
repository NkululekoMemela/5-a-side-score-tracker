# 5-A-Side Score Tracker

## Overview
The **5-A-Side Score Tracker** is a web-based application designed to collect and manage soccer scores for 5-a-side matches. The application allows users to:
- Record real-time goal updates
- Manage team squads
- Authenticate users before making updates
- Store data in Google Sheets for persistent storage

## Features
- **User Authentication**: Only logged-in users can record scores and update squads.
- **Real-Time Goal Recording**: Select a team, choose goal scorers and assistants, and log scores instantly.
- **Squad Management**: Create new squads or update existing squads.
- **Google Sheets Integration**: All data is saved in a Google Sheet via Google Apps Script.

## Project Structure
```
5-a-side-score-tracker/
├── index.html            # Main HTML file for data entry
├── login.html            # Login page for user authentication
├── squads.html           # Page to manage squads
├── scripts/
│   ├── app.js            # Handles goal recording logic
│   ├── squads.js         # Handles squad management
│   ├── auth.js           # Manages user authentication
│   ├── google-script.js  # Sends data to Google Sheets
├── styles/
│   ├── style.css         # Stylesheet for layout & design
├── assets/
│   ├── images/           # Team logos (optional)
├── README.md             # Project documentation
```

## Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/NkululekoMemela/5-a-side-score-tracker.git
   ```
2. **Open `index.html` in a browser.**
3. **Deploy Google Apps Script:**
   - Open Google Sheets.
   - Create a new script in Apps Script.
   - Copy and paste `google-script.js` code.
   - Deploy it as a Web App.
   - Update the web app URL in `app.js`.

## Usage
### Login
1. Navigate to `login.html`.
2. Enter email and password (stored locally for now).
3. If authenticated, redirect to `index.html`.

### Recording a Goal
1. Click on a team that scores.
2. Select a goal scorer and an assist (optional).
3. Click "Record Goal".
4. The score is logged and saved.

### Managing Squads
1. Navigate to `squads.html`.
2. Select a team and add/remove players.
3. Changes are updated in the UI.

## Deployment
- The project can be hosted on **GitHub Pages, Netlify, or Vercel**.
- Google Apps Script ensures data is saved in Google Sheets.

## Future Improvements
- Implement **Google Authentication**.
- Enhance **UI/UX** with better design elements.
- Add **match history tracking**.

## Contributors
- **Nkululeko Memela** - Developer

## License
This project is open-source and available under the MIT License.

