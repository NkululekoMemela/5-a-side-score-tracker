// app.js - Handles team selection, navigation, and match tracking

const GOOGLE_SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbytXHDfw_nujVmJBIi7kK1z73kFlhEax4DHT4quqUYO6kCC0kOpialIbYFwF9e87SpjLA/exec";

const squads = {
    "High Fives": ["Likhanye", "Barlo (C)", "Chad", "Lloyd", "Bavu"],
    "Tidal Wave": ["Jayd", "Banele", "Theo", "Enoch (C)", "Mdu"],
    "S-Suburbs": ["Kellelo", "Josh", "Humbu", "Nkululeko", "Dr Babs (C)"]
};

let selectedTeams = {};
let selectedTeam = "";
let scores = {};
let timer;
let startTime;
let matchID = generateMatchID(); // Generate short match ID

// Function to generate a shorter match ID
function generateMatchID() {
    let matchCount = sessionStorage.getItem("matchCount") || 0;
    matchCount = parseInt(matchCount) + 1; // Increment match count

    const today = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD format
    const matchID = `Match_${matchCount}_${today}`;

    sessionStorage.setItem("matchCount", matchCount); // Save match count
    return matchID;
}

// Step 1: Update Opponent Selection (Prevents Duplicate Teams)
function updateOpponentOptions() {
    const team1 = document.getElementById("team1").value;
    const team2Select = document.getElementById("team2");

    team2Select.innerHTML = '<option value="">Team 2</option>'; // Reset opponent selection

    Object.keys(squads).forEach(team => {
        if (team !== team1) {
            team2Select.add(new Option(team, team));
        }
    });
}

// Step 2: Start Match & Navigate to Page 2
function startMatch() {
    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;

    if (!team1 || !team2) {
        alert("⚠️ Please select two different teams before proceeding!");
        return;
    }

    selectedTeams = { team1, team2 };
    scores = { [team1]: 0, [team2]: 0 };

    matchID = generateMatchID(); // Generate short match ID for this match
    sessionStorage.setItem("selectedTeams", JSON.stringify(selectedTeams));
    sessionStorage.setItem("scores", JSON.stringify(scores));
    sessionStorage.setItem("matchID", matchID); // Store Match ID

    window.location.href = "match.html"; // Proceed to match page
}

// Step 3: Load Match Page Data
function loadMatch() {
    selectedTeams = JSON.parse(sessionStorage.getItem("selectedTeams"));
    scores = JSON.parse(sessionStorage.getItem("scores"));
    matchID = sessionStorage.getItem("matchID") || generateMatchID(); // Retrieve or generate a match ID

    if (!selectedTeams) {
        alert("No match in progress! Please start a new match.");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("team1Btn").textContent = selectedTeams.team1;
    document.getElementById("team1Btn").setAttribute("onclick", `selectTeam('${selectedTeams.team1}')`);

    document.getElementById("team2Btn").textContent = selectedTeams.team2;
    document.getElementById("team2Btn").setAttribute("onclick", `selectTeam('${selectedTeams.team2}')`);

    updateScoreboard();

    startTime = Date.now();
    timer = setInterval(updateTimer, 1000);
}

// Step 4: Select Team That Scored
function selectTeam(team) {
    selectedTeam = team;
    document.getElementById("goalEntry").classList.remove("hidden"); // Show goal entry form
    document.getElementById("goalDetailsTitle").textContent = `Goal Details by ${selectedTeam}`;
    populatePlayers(team);
}

// Step 5: Populate Players in Dropdowns
function populatePlayers(team) {
    const goalScorerSelect = document.getElementById("goalScorer");
    const assistSelect = document.getElementById("assistPlayer");

    goalScorerSelect.innerHTML = "";
    assistSelect.innerHTML = "<option value='None'>None</option>";

    goalScorerSelect.add(new Option("Unknown", "Unknown"));
    goalScorerSelect.add(new Option("Own Goal", "Own Goal"));
    assistSelect.add(new Option("Unknown", "Unknown"));

    squads[team].forEach(player => {
        goalScorerSelect.add(new Option(player, player));
        assistSelect.add(new Option(player, player));
    });

    goalScorerSelect.addEventListener("change", function () {
        updateAssistOptions(goalScorerSelect.value, team);
    });
}

// Step 6: Prevent Assist from Being the Scorer
function updateAssistOptions(selectedScorer, team) {
    const assistSelect = document.getElementById("assistPlayer");
    assistSelect.innerHTML = "<option value='None'>None</option>";

    assistSelect.add(new Option("Unknown", "Unknown"));

    squads[team].forEach(player => {
        if (player !== selectedScorer) {
            assistSelect.add(new Option(player, player));
        }
    });
}

// Step 7: Allow Re-picking the Scoring Side
function cancelGoalEntry() {
    document.getElementById("goalEntry").classList.add("hidden");
}

// Step 8: Verify & Record Goal + Send to Google Sheets
function recordGoal() {
    const goalScorer = document.getElementById("goalScorer").value;
    const assistPlayer = document.getElementById("assistPlayer").value;
    const timestamp = new Date().toISOString();

    if (goalScorer === assistPlayer) {
        alert("⚠️ Scorer and assist cannot be the same person.");
        return;
    }

    scores[selectedTeam]++;
    updateScoreboard();

    let goalText = `${selectedTeam}: ${goalScorer} scored`;
    if (assistPlayer !== "None") {
        goalText += ` (Assist: ${assistPlayer})`;
    }

    let listItem = document.createElement("li");
    listItem.textContent = goalText;
    document.getElementById("goalList").appendChild(listItem);

    sessionStorage.setItem("scores", JSON.stringify(scores));

    // Hide goal entry after recording
    document.getElementById("goalEntry").classList.add("hidden");

    // Clear dropdown selections
    document.getElementById("goalScorer").selectedIndex = 0;
    document.getElementById("assistPlayer").selectedIndex = 0;

    // Send Data to Google Sheets
    sendToGoogleSheets(selectedTeam, goalScorer, assistPlayer, timestamp, matchID);
}

// Step 9: Update Scoreboard Display
function updateScoreboard() {
    document.getElementById("scoreboard").textContent = 
        `${selectedTeams.team1}: ${scores[selectedTeams.team1]} - ${selectedTeams.team2}: ${scores[selectedTeams.team2]}`;
}

// Step 10: Send Data to Google Sheets
function sendToGoogleSheets(team, scorer, assist, timestamp, matchID) {
    const data = {
        timestamp: timestamp,
        team: team,
        goalScorer: scorer,
        assist: assist === "None" ? "" : assist,
        matchID: matchID
    };

    fetch(GOOGLE_SHEETS_WEB_APP_URL, {
        method: "POST",
        mode: "no-cors", // Prevents CORS errors
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).catch(error => console.error("Error sending data:", error));
}

// Step 11: Game Timer Update
function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    document.getElementById("gameTimer").textContent = `Elapsed Time: ${minutes}m ${seconds}s`;
}

// Step 12: End Match & Return to Page 1
function endMatch() {
    clearInterval(timer);
    sessionStorage.clear();
    window.location.replace("index.html");
}
