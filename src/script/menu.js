document.addEventListener("DOMContentLoaded", function () {
  const botaoHamburguer = document.querySelector(".hamburguer");
  const menuMobile = document.querySelector(".menu-mobile");

  botaoHamburguer.addEventListener("click", () => {
    menuMobile.classList.toggle("active");
  });

  // Fecha o menu ao clicar em qualquer link (melhor UX)
  menuMobile.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuMobile.classList.remove("active");
    });
  });
});