// auth.js - Handles user authentication

const users = {
    "user1@example.com": "password123",
    "user2@example.com": "securepass"
};

function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    if (users[email] && users[email] === password) {
        localStorage.setItem("loggedInUser", email);
        window.location.href = "index.html"; // Keep users in the app
    } else {
        alert("Invalid credentials");
    }
}

// function checkLogin() {
//     if (!localStorage.getItem("loggedInUser")) {
//         window.location.href = "login.html"; // Disabled login check
//     }
// }

function logoutUser() {
    localStorage.removeItem("loggedInUser");
    // window.location.href = "login.html"; // Disabled logout redirection
    alert("You have been logged out, but you can still use the app.");
}

