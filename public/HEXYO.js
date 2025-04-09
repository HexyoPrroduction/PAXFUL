function myFunction() {
  var x = document.querySelector(".navbar");
  if (x.className === "navbar") {
      x.className += " responsive";
  } else {
      x.className = "navbar";
  }
}


let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 5000); // Change image every 2 seconds
}

// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}

//pop up here
 // passcode
 function openPuzzle1() {
  let popup = document.getElementById('popup');
  popup.style.animation = 'zoomIn 0.3s forwards';
  popup.style.display = 'block';
}
function closePuzzle1() {
  let popup = document.getElementById('popup');
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
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dayCode = dayCodes[dayName];

  const firstDigit = dayCode.charAt(0);
  const lastDigit = dayCode.charAt(1);

  return `${firstDigit}${dd}${mm}${lastDigit}`;
}

// Inputs
let attemptsLeft = 3;

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".otp-input");

  inputs.forEach((input, index) => {
    input.addEventListener("input", (e) => handleInput(e, index));
    input.addEventListener("keydown", (e) => handleBackspace(e, index));
    input.addEventListener("paste", (e) => e.preventDefault());
  });

  inputs[0].focus(); // Auto-focus first input
});

function handleInput(event, index) {
  const inputs = document.querySelectorAll(".otp-input");
  let value = event.target.value;

  if (!/^\d$/.test(value)) {
    event.target.value = "";
    return;
  }

  if (index < inputs.length - 1) {
    inputs[index + 1].focus();
  } else {
    verifyOTP();
  }
}

function handleBackspace(event, index) {
  const inputs = document.querySelectorAll(".otp-input");

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

  const correctCode = generatePasscode();

  if (otp === correctCode) {
    document.getElementById("error-message").innerHTML = "<span style='color: green;'>✅ Access Granted! Redirecting...</span>";
    document.getElementById("main-content").classList.remove("blurred");

    const popup = document.getElementById("popup");
    popup.style.boxShadow = "0 0 30px #FFFFFF";

    setTimeout(() => {
      popup.classList.remove("active");
      popup.classList.add("shrink");

      setTimeout(() => {
        document.getElementById("overlay").style.display = "none"; // Change to your actual page
      }, 1000);
    }, 2000);
    
  } else {
    attemptsLeft--;

    if (attemptsLeft > 0) {
      showError(`❌ Incorrect code. You have ${attemptsLeft} attempt(s) left.`);
    } else {
      showError("⚠️ Too many incorrect attempts. Please try again later.");
      disableInputs();
    }
  }
}

function showError(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";

  document.querySelectorAll(".otp-input").forEach(input => {
    input.style.borderColor = "red";
  });
}

function disableInputs() {
  document.querySelectorAll(".otp-input").forEach(input => {
    input.disabled = true;
  });
}

function closeTabAtMidnight() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0); // Set to midnight

  const timeUntilMidnight = midnight.getTime() - now.getTime();

  // If it's already midnight, close the tab
  if (timeUntilMidnight <= 0) {
      window.close(); // Close tab immediately if it's midnight
  } else {
      // Set timeout to close the tab exactly at midnight
      setTimeout(() => {
          window.close();
      }, timeUntilMidnight);
  }
}

// Run the function when the page loads
window.onload = closeTabAtMidnight;