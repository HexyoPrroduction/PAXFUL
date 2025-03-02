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

    // Simulated OTP verification (correct OTP = "123456")
    if (otp === "06791K") {
        alert("✅ OTP Verified!");
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

function goBack() {
    alert("Going back...");
}
