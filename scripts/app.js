// app.js - Handles goal recording

function selectTeam(team) {
    if (!localStorage.getItem("loggedInUser")) {
        alert("Please log in to update scores.");
        return;
    }
    
    selectedTeam = team;
    document.getElementById("goalEntry").classList.remove("hidden");
    populatePlayers(team);
}

function populatePlayers(team) {
    const goalScorerSelect = document.getElementById("goalScorer");
    const assistSelect = document.getElementById("assistPlayer");
    goalScorerSelect.innerHTML = "";
    assistSelect.innerHTML = "<option value='None'>None</option>";
    
    squads[team].forEach(player => {
        let option = new Option(player, player);
        goalScorerSelect.add(option);
        assistSelect.add(new Option(player, player));
    });
}

function recordGoal() {
    const goalScorer = document.getElementById("goalScorer").value;
    const assistPlayer = document.getElementById("assistPlayer").value;
    const user = localStorage.getItem("loggedInUser");
    
    let goalText = `${selectedTeam}: ${goalScorer} scored`;
    if (assistPlayer !== "None") {
        goalText += ` (Assist: ${assistPlayer})`;
    }
    goalText += ` - Recorded by ${user}`;
    
    let listItem = document.createElement("li");
    listItem.textContent = goalText;
    document.getElementById("goalList").appendChild(listItem);
}
