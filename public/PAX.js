
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
