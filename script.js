function showForm(type) {
  document.getElementById("authForm").style.display = "flex";
  document.getElementById("formTitle").innerText = type === 'login' ? "Login" : "Register";
  document.getElementById("switchText").innerText = type === 'login'
    ? "Don't have an account? Register"
    : "Already have an account? Login";
  document.getElementById("switchText").setAttribute("data-form", type);
}

function hideForm() {
  document.getElementById("authForm").style.display = "none";
}

function toggleForm() {
  const form = document.getElementById("switchText").getAttribute("data-form");
  showForm(form === "login" ? "register" : "login");
}

function submitForm() {
  const username = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (username && pass) {
    alert(`Welcome ${username}!`);
    hideForm();
  } else {
    alert("Please fill out both fields.");
  }
}
