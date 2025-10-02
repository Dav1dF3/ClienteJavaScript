// === LISTARGUITARRAS.JS ===

// Al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
    await cargarGuitarras();
    configurarFiltros();
  });
  
  // Cargar guitarras desde API
  async function cargarGuitarras() {
    try {
      const guitarras = await listarGuitarras(); // función de config.js
      renderizarTablaGuitarras(guitarras);
    } catch (error) {
      console.error("Error cargando guitarras:", error);
    }
  }
  
  // Renderizar tabla con guitarras
  function renderizarTablaGuitarras(guitarras) {
    const tbody = document.getElementById("tbody-guitars");
    tbody.innerHTML = "";
  
    if (!guitarras || guitarras.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9">No hay guitarras disponibles</td></tr>`;
      return;
    }
  
    guitarras.forEach(guitarra => {
      const fila = document.createElement("tr");
  
      // Fundas: si existen, concatenarlas
      const fundasTexto = guitarra.fundas && guitarra.fundas.length > 0
        ? guitarra.fundas.map(f => f.nombre || f.codigo).join(", ")
        : "-";
  
      fila.innerHTML = `
        <td>${guitarra.codigo}</td>
        <td>${guitarra.nombre}</td>
        <td>${guitarra.marca}</td>
        <td>${guitarra.precioBase || guitarra.precio || "-"}</td>
        <td>${guitarra.stock}</td>
        <td>${guitarra.fechaIngreso || "-"}</td>
        <td>${guitarra.tipo || "-"}</td>
        <td>${guitarra.materialCuerpo || "-"}</td>
        <td>${fundasTexto}</td>
      `;
  
      tbody.appendChild(fila);
    });
  }
  
  // Configurar filtros del modal
  function configurarFiltros() {
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
      if (document.getElementById("chk-tipo").checked) filtro.tipo = inputs[6].value;
  
      try {
        // Igual que antes: en REST no es común GET con body, se usa POST para filtrar
        const response = await fetch(`${BASE_URL}/filtrar`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(filtro)
        });
  
        const guitarras = await response.json();
        renderizarTablaGuitarras(guitarras);
      } catch (error) {
        console.error("Error aplicando filtros:", error);
      }
    });
  }
  