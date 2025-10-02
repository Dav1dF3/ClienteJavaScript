const btnFiltros = document.getElementById("btn-filtros");
    const modal = document.getElementById("modal-filtros");
    const spanClose = document.querySelector(".close");

    // abrir modal
    btnFiltros.onclick = function () {
      modal.style.display = "block";
    }

    // cerrar modal
    spanClose.onclick = function () {
      modal.style.display = "none";
    }

    // cerrar al hacer clic fuera
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    // habilitar/deshabilitar inputs según checkbox
    document.querySelectorAll("#form-filtros input[type=checkbox]").forEach(chk => {
      chk.addEventListener("change", function () {
        const input = this.parentElement.nextElementSibling;
        if (input) input.disabled = !this.checked;
      });
    });