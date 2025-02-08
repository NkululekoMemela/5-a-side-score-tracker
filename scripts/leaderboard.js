// leaderboard.js - Fetches and displays leaderboard data

const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_DEPLOYMENT_URL";

function loadLeaderboard() {
    fetch(GOOGLE_SCRIPT_URL + "?action=getLeaderboard")
        .then(response => response.json())
        .then(data => {
            populateTable("topScorers", data.scorers);
            populateTable("topAssists", data.assists);
        })
        .catch(error => console.error("Error fetching leaderboard data:", error));
}

function populateTable(tableId, data) {
    const tableBody = document.getElementById(tableId);
    tableBody.innerHTML = "";
    data.forEach((player, index) => {
        let row = tableBody.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = player.name;
        row.insertCell(2).textContent = player.count;
    });
}
