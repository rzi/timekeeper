const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".navigation");
const handleClick = () => {
  hamburger.classList.toggle("hamburger--active");
  hamburger.setAttribute(
    "aria-expanded",
    hamburger.classList.contains("hamburger--active")
  );
  nav.classList.toggle("navigation--active");
};
hamburger.addEventListener("click", handleClick);
