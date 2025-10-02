// === LISTARTECLADOS.JS ===

// Al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
    await cargarTeclados();
    configurarFiltrosTeclados();
  });
  
  // Cargar teclados desde API
  async function cargarTeclados() {
    try {
      const teclados = await listarTeclados(); // función de config.js
      renderizarTablaTeclados(teclados);
    } catch (error) {
      console.error("Error cargando teclados:", error);
    }
  }
  
  // Renderizar tabla con teclados
  function renderizarTablaTeclados(teclados) {
    const tbody = document.getElementById("tbody-keyboards");
    tbody.innerHTML = "";
  
    if (!teclados || teclados.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9">No hay teclados disponibles</td></tr>`;
      return;
    }
  
    teclados.forEach(teclado => {
      const fila = document.createElement("tr");
  
      fila.innerHTML = `
        <td>${teclado.codigo}</td>
        <td>${teclado.nombre}</td>
        <td>${teclado.marca}</td>
        <td>${teclado.precioBase || teclado.precio || "-"}</td>
        <td>${teclado.stock}</td>
        <td>${teclado.fechaIngreso || "-"}</td>
        <td>${teclado.numeroTeclas || "-"}</td>
        <td>${teclado.digital ? "Sí" : "No"}</td>
        <td>${teclado.sensibilidad || "-"}</td>
      `;
  
      tbody.appendChild(fila);
    });
  }
  
  // Configurar filtros del modal
  function configurarFiltrosTeclados() {
    const formFiltros = document.getElementById("form-filtros");
  
    formFiltros.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const filtro = {};
  
      const inputs = formFiltros.querySelectorAll("input[type='text'], input[type='number'], select");
  
      if (document.getElementById("chk-nombre").checked) filtro.nombre = inputs[0].value.trim();
      if (document.getElementById("chk-marca").checked) filtro.marca = inputs[1].value.trim();
      if (document.getElementById("chk-preciomin").checked) filtro.precioMin = inputs[2].value;
      if (document.getElementById("chk-preciomax").checked) filtro.precioMax = inputs[3].value;
      if (document.getElementById("chk-stockmin").checked) filtro.stockMin = inputs[4].value;
      if (document.getElementById("chk-stockmax").checked) filtro.stockMax = inputs[5].value;
      if (document.getElementById("chk-sensibilidad").checked) filtro.sensibilidad = inputs[6].value;
  
      try {
        const response = await fetch(`${BASE_URL}/teclados/filtrar`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(filtro)
        });
  
        const teclados = await response.json();
        renderizarTablaTeclados(teclados);
      } catch (error) {
        console.error("Error aplicando filtros:", error);
      }
    });
  }
  