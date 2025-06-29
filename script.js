function showMenu() {
  const menu = document.getElementById("menu");

  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "block";
    menu.classList.remove("hide");
    menu.classList.add("show");
  } else {
    menu.classList.remove("show");
    menu.classList.add("hide");
    setTimeout(() => {
      menu.style.display = "none";
    }, 800); // Match hide animation duration
  }
}
