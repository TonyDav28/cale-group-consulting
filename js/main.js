document.addEventListener("DOMContentLoaded", function () {

  const codigoPais = document.querySelector("#codigoPais");
  const telefonoInput = document.querySelector("#telefonoCliente");

  function actualizarLimiteTelefono() {
    if (!codigoPais || !telefonoInput) return;

    const cantidadDigitos = codigoPais.options[codigoPais.selectedIndex].getAttribute("data-length");

    telefonoInput.maxLength = cantidadDigitos;
    telefonoInput.value = telefonoInput.value.replace(/\D/g, "").slice(0, cantidadDigitos);
  }

  if (codigoPais && telefonoInput) {
    actualizarLimiteTelefono();

    codigoPais.addEventListener("change", actualizarLimiteTelefono);

    telefonoInput.addEventListener("input", function () {
      const cantidadDigitos = codigoPais.options[codigoPais.selectedIndex].getAttribute("data-length");

      this.value = this.value.replace(/\D/g, "").slice(0, cantidadDigitos);
    });
  }

  const forms = document.querySelectorAll(".contact-form");

  forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const nombre = form.querySelector('input[placeholder="Nombre completo"]').value.trim();
      const empresa = form.querySelector('input[placeholder="Empresa o institución"]').value.trim();
      const correo = form.querySelector('input[placeholder="Correo electrónico"]').value.trim();
      const codigoPais = form.querySelector("#codigoPais");
      const telefonoInput = form.querySelector("#telefonoCliente");
      const servicio = form.querySelector("#servicioInteres").value;
      const mensaje = form.querySelector("textarea").value.trim();

      const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const telefonoValido = /^[0-9]+$/;

      const codigoSeleccionado = codigoPais.value;
      const cantidadDigitos = parseInt(
        codigoPais.options[codigoPais.selectedIndex].getAttribute("data-length")
      );

      const telefono = telefonoInput.value.trim();

      if (nombre.length < 3) {
        alert("Por favor, ingresa un nombre válido.");
        return;
      }

      if (!correoValido.test(correo)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
      }

      if (!telefonoValido.test(telefono)) {
        alert("El teléfono solo debe contener números.");
        return;
      }

      if (telefono.length !== cantidadDigitos) {
        alert(`El número para el país seleccionado debe tener ${cantidadDigitos} dígitos.`);
        return;
      }

      if (servicio === "") {
        alert("Por favor, selecciona un servicio de interés.");
        return;
      }

      if (mensaje.length < 10) {
        alert("Por favor, escribe un mensaje más detallado.");
        return;
      }

      const numeroWhatsApp = "51974608530";

      const texto = `
Hola, deseo solicitar información sobre los servicios de CALE Group Consulting.

Nombre: ${nombre}
Empresa / Institución: ${empresa}
Correo: ${correo}
Teléfono: ${codigoSeleccionado} ${telefono}
Servicio de interés: ${servicio}

Mensaje:
${mensaje}
      `;

      const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

      window.open(url, "_blank");

      form.reset();
      actualizarLimiteTelefono();
    });
  });

  const botonesServicio = document.querySelectorAll(".btn-servicio");

  botonesServicio.forEach(function (boton) {
    boton.addEventListener("click", function (event) {
      event.preventDefault();

      const servicio = boton.getAttribute("data-servicio");
      const numeroWhatsApp = "51974608530";

      const texto = `Hola, deseo información sobre el servicio de "${servicio}" de CALE Group Consulting.`;

      const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

      window.open(url, "_blank");
    });
  });

  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

});