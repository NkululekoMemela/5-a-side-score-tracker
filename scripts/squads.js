// squads.js - Handles squad updates

function addPlayer() {
    if (!localStorage.getItem("loggedInUser")) {
        alert("Please log in to update squads.");
        return;
    }
    
    const team = document.getElementById("teamSelect").value;
    const playerName = document.getElementById("playerName").value;
    if (playerName) {
        squads[team].push(playerName);
        alert(`Added ${playerName} to ${team}`);
        displaySquads();
    }
}

function displaySquads() {
    let output = "";
    for (const team in squads) {
        output += `<h3>${team}</h3><ul>`;
        squads[team].forEach(player => {
            output += `<li>${player}</li>`;
        });
        output += "</ul>";
    }
    document.getElementById("squadList").innerHTML = output;
}

document.addEventListener("DOMContentLoaded", displaySquads);
