const mobileMenu = () => {
  document.querySelector(".header__menu-btn").addEventListener("click", () => {
    document.querySelector(".header").classList.toggle("header_active");
    document.querySelector(".overlay").classList.toggle("overlay_active");
  });
};

export default mobileMenu;
