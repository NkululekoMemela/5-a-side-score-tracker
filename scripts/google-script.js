// google-script.js - Handles sending data to Google Sheets via Google Apps Script

const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_DEPLOYMENT_URL";

function sendToGoogleSheets(data) {
    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(() => alert("Data successfully sent to Google Sheets!"))
    .catch(error => console.error("Error sending data: ", error));
}

function recordGoal() {
    const goalScorer = document.getElementById("goalScorer").value;
    const assistPlayer = document.getElementById("assistPlayer").value;
    const user = localStorage.getItem("loggedInUser");
    const timestamp = new Date().toISOString();
    
    let goalData = {
        team: selectedTeam,
        scorer: goalScorer,
        assist: assistPlayer !== "None" ? assistPlayer : "",
        recordedBy: user,
        timestamp: timestamp
    };
    
    sendToGoogleSheets(goalData);
}
