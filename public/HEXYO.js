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
 const hourMap = {
  13: "12:00 PM", 35: "1:00 PM", 57: "2:00 PM", 79: "3:00 PM",
  91: "4:00 PM", 93: "5:00 PM", 71: "6:00 PM", 59: "7:00 PM",
  37: "8:00 PM", 15: "9:00 PM", 11: "10:00 PM", 55: "11:00 PM",
  31: "12:00 AM", 53: "1:00 AM", 75: "2:00 AM", 97: "3:00 AM",
  19: "4:00 AM", 39: "5:00 AM", 17: "6:00 AM", 95: "7:00 AM",
  73: "8:00 AM", 51: "9:00 AM", 33: "10:00 AM", 77: "11:00 AM"
};

function to24HourTime(timeStr) {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return [hours, minutes];
}

function decodeHourCode(code) {
  const resultBox = document.getElementById("resultBox");
  resultBox.innerHTML = "";

  const SS = parseInt(code[0] + code[5]);
  const EE = parseInt(code[1] + code[4]);
  const DD = parseInt(code[2] + code[3]);

  const startHour = hourMap[SS];
  const endHour = hourMap[EE];

  if (!startHour || !endHour) {
    resultBox.innerHTML = `<span class="unverified">Invalid Code</span>`;
    return false;
  }

  const now = new Date();
  const year = now.getFullYear();
  const monthIndex = now.getMonth();
  const day = DD - (monthIndex + 1);

  const [startH, startM] = to24HourTime(startHour);
  const [endH, endM] = to24HourTime(endHour);

  const startTime = new Date(year, monthIndex, day, startH, startM);
  const endTime = new Date(year, monthIndex, day, endH, endM);

  const isVerified = now >= startTime && now <= endTime;

  resultBox.innerHTML = isVerified
    ? `<span class="verified">Verified</span>`
    : `<span class="unverified">Unverified</span>`;

  return isVerified;
}

function verifyCode() {
  const inputs = document.querySelectorAll(".otp-input");
  const code = Array.from(inputs).map(input => input.value).join("");

  if (code.length < 6) {
    showError("Please enter all 6 digits.");
    return;
  }

  const isVerified = decodeHourCode(code);
  const resultText = document.getElementById("resultBox").textContent.trim();

  // Reset input styles (border color) before checking the result
  inputs.forEach(input => {
    input.style.borderColor = "#ccc"; // Reset to default
  });

  if (resultText === "Verified") {
    document.getElementById("error-message").innerHTML = "<span style='color: green;'>✅ Access Granted! Redirecting...</span>";
    document.getElementById("main-content").classList.remove("blurred");
    const popup = document.getElementById("popup");
    popup.style.boxShadow = "0 0 30px #FFFFFF";

    setTimeout(() => {
      popup.classList.remove("active");
      popup.classList.add("shrink");

      setTimeout(() => {
        document.getElementById("overlay").style.display = "none";
      }, 1000);
    }, 2000);
  } else {
    showError("❌ Access Denied. Time window expired or invalid code.");
    // Change the input field border color to red when code is incorrect
    inputs.forEach(input => {
      input.style.borderColor = "red";
    });
  }
}

function showError(msg) {
  const err = document.getElementById("error-message");
  err.textContent = msg;
  err.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".otp-input");

  inputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      if (!/^\d$/.test(e.target.value)) {
        e.target.value = "";
        return;
      }

      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      } else {
        verifyCode();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !inputs[index].value && index > 0) {
        inputs[index - 1].focus();
      }
    });

    input.addEventListener("paste", (e) => e.preventDefault());
  });

  inputs[0].focus();
});


function waitUntilExpiredAndClose(endTime) {
  const now = new Date();

  // If already past endTime, close immediately
  if (now >= endTime) {
    window.close();
    return;
  }

  // Otherwise, calculate the delay in milliseconds
  const timeUntilEnd = endTime.getTime() - now.getTime();

  // Schedule to close the tab exactly at the moment it expires
  setTimeout(() => {
    window.close();
  }, timeUntilEnd);
}
