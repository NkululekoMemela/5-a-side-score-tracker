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
        window.location.href = "index.html";
    } else {
        alert("Invalid credentials");
    }
}

// function checkLogin() {
//     if (!localStorage.getItem("loggedInUser")) {
//         window.location.href = "login.html";
//     }
// }

function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

