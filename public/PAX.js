
const toggleIcon = document.getElementById('toggle-icon');
const passwordInput = document.getElementById('password');
const eyeIcon = document.getElementById('eye');
const eyeCrossedIcon = document.getElementById('eye-crossed');

toggleIcon.addEventListener('click', function() {
  // Toggle the type between password and text
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    // Switch to the crossed-eye icon
    eyeCrossedIcon.style.display = 'none';
    eyeIcon.style.display = 'block';
  } else {
    passwordInput.type = 'password';
    // Switch back to the normal eye icon
    eyeCrossedIcon.style.display = 'block';
    eyeIcon.style.display = 'none';
  }
});


document.getElementById("sign-in-btn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission

    const emailInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    // Basic validation for email/phone and password
    if (emailInput === "" || passwordInput === "") {
        alert("Please fill in both fields.");
        return;
    }

    if (passwordInput.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    // Call the next function if validation passes
    openPuzzle();
});

function openPuzzle() {
    let popup = document.getElementById('puzzlePopup');
    popup.style.animation = 'zoomIn 0.3s forwards';
    popup.style.display = 'block';
}
function closePuzzle() {
    let popup = document.getElementById('puzzlePopup');
    popup.style.animation = 'zoomOut 0.3s forwards';
    setTimeout(() => { popup.style.display = 'none'; }, 300);
}
function resetPuzzle() {
    document.getElementById('slider').value = 0;
    document.getElementById('puzzlePiece').style.left = '0px';
}
document.getElementById('slider').addEventListener('input', function() {
    document.getElementById('puzzlePiece').style.left = this.value + 'px';
    if (this.value >= 250) {
        setTimeout(() => {
            closePuzzle();
            setTimeout(() => { window.location.href = 'PAX_V.html'; }, 300);
        }, 500);
    }
});


// puzzle
function openPuzzle1() {
    let popup = document.getElementById('puzzlePopup1');
    popup.style.animation = 'zoomIn 0.3s forwards';
    popup.style.display = 'block';
}
function closePuzzle1() {
    let popup = document.getElementById('puzzlePopup1');
    popup.style.animation = 'zoomOut 0.3s forwards';
    setTimeout(() => { popup.style.display = 'none'; }, 300);
}
function resetPuzzle1() {
    document.getElementById('slider').value = 0;
    document.getElementById('puzzlePiece').style.left = '0px';
}

// generate code
function generatePasscode() {
    const dayCodes = {
        "Sunday": "05",
        "Monday": "10",
        "Tuesday": "15",
        "Wednesday": "20",
        "Thursday": "25",
        "Friday": "30",
        "Saturday": "00"
    };

    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const dd = String(today.getDate()).padStart(2, '0');  // Day of the month (e.g., 01, 02)
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Month (01-12)
    const dayCode = dayCodes[dayName];

    // Extract first and last digit from day code
    const firstDigit = dayCode.charAt(0);
    const lastDigit = dayCode.charAt(1);

    return `${firstDigit}${dd}${mm}${lastDigit}`;  // Example format: "220525"
}


// Inputs
let attemptsLeft = 3; // Maximum attempts

document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".otp-input");

    inputs.forEach((input, index) => {
        input.addEventListener("input", (e) => handleInput(e, index));
        input.addEventListener("keydown", (e) => handleBackspace(e, index));
        input.addEventListener("paste", (e) => e.preventDefault()); // Disable pasting
    });
});

function handleInput(event, index) {
    const inputs = document.querySelectorAll(".otp-input");
    let value = event.target.value;

    // Allow only digits
    if (!/^\d$/.test(value)) {
        event.target.value = "";
        return;
    }

    // Move to next input if available
    if (index < inputs.length - 1) {
        inputs[index + 1].focus();
    } else {
        // When last digit is entered, verify OTP
        verifyOTP();
    }
}

function handleBackspace(event, index) {
    const inputs = document.querySelectorAll(".otp-input");

    // Move back on Backspace if empty
    if (event.key === "Backspace" && !inputs[index].value && index > 0) {
        inputs[index - 1].focus();
    }
}


function verifyOTP() {
    const inputs = document.querySelectorAll(".otp-input");
    let otp = Array.from(inputs).map(input => input.value).join("");

    if (otp.length < 6) {
        showError("Please enter all 6 digits.");
        return;
    }

    const correctCode = generatePasscode(); // Generate today's passcode

    if (otp === correctCode) {
        document.getElementById("error-message").innerHTML = "<span style='color: green;'>✅ Access Granted! Redirecting...</span>";

        setTimeout(() => {
            window.location.href = "HEXYO.html"; // Redirect after 1 second
        }, 1000);
        return;
    }

    // Wrong OTP case
    attemptsLeft--;

    if (attemptsLeft > 0) {
        showError(`❌ Incorrect code. You have ${attemptsLeft} attempt(s) left.`);
    } else {
        showError("⚠️ Too many incorrect attempts. Please try again later.");
        disableInputs();
    }
}

function showError(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = message;
    errorMessage.style.display = "block";

    // Highlight OTP inputs in red
    document.querySelectorAll(".otp-input").forEach(input => {
        input.style.borderColor = "red";
    });
}

function disableInputs() {
    document.querySelectorAll(".otp-input").forEach(input => {
        input.disabled = true;
    });
}
