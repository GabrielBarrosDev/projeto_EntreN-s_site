// ScrollReveal - animações específicas por seção
ScrollReveal().reveal(".home .content", {
  delay: 200,
  distance: "50px",
  origin: "bottom",
  duration: 1000,
  reset: true,
});

ScrollReveal().reveal(".home .social-text", {
  delay: 400,
  distance: "40px",
  origin: "left",
  duration: 1000,
  reset: false,
});

ScrollReveal().reveal(".home-redes", {
  delay: 500,
  distance: "40px",
  origin: "bottom",
  duration: 1000,
  reset: false,
});

ScrollReveal().reveal(".sobre", {
  delay: 200,
  distance: "50px",
  origin: "left",
  duration: 1000,
  reset: true,
});

ScrollReveal().reveal(".contato", {
  delay: 200,
  distance: "50px",
  origin: "right",
  duration: 1000,
  reset: true,
});

ScrollReveal().reveal(".footer", {
  delay: 300,
  distance: "50px",
  origin: "bottom",
  duration: 1000,
  reset: false,
});

// Envio do formulário com AJAX (FormSubmit)
document.querySelector(".form-contato").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;
  const formData = new FormData(form);
  const email = form.querySelector('input[name="email"]');

  if (!email.checkValidity()) {
    alert("Por favor, insira um e-mail válido.");
    return;
  }

  fetch("https://formsubmit.co/ajax/gbielbarros6@gmail.com.com", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      const sucesso = document.querySelector(".form-sucesso");
      sucesso.style.display = "block";
      form.reset();
      setTimeout(() => {
        sucesso.style.display = "none";
      }, 4000);
    })
    .catch((error) => {
      alert("Erro ao enviar. Tente novamente mais tarde.");
    });
});
