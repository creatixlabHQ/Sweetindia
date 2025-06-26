function showMenu() {
  const menu = document.getElementById("menu");
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "block";
    menu.classList.add("animated");
  } else {
    menu.style.display = "none";
  }
}
