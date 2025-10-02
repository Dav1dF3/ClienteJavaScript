// === INVENTARIO.JS ===

// Cargar todos los instrumentos al iniciar la página
document.addEventListener("DOMContentLoaded", async () => {
    await cargarInstrumentos();
    configurarFiltros();
  });
  
  // Función para cargar instrumentos y llenar la tabla
  async function cargarInstrumentos() {
    try {
      const instrumentos = await listarInstrumentos();
      renderizarTabla(instrumentos);
    } catch (error) {
      console.error("Error al cargar instrumentos:", error);
    }
  }
  
  // Renderizar tabla dinámica
  function renderizarTabla(instrumentos) {
    const tablaBody = document.getElementById("tabla-body");
    tablaBody.innerHTML = ""; // Limpiar antes de agregar
  
    if (!instrumentos || instrumentos.length === 0) {
      tablaBody.innerHTML = `<tr><td colspan="7">No hay instrumentos disponibles</td></tr>`;
      return;
    }
  
    instrumentos.forEach(instr => {
      const fila = document.createElement("tr");
  
      fila.innerHTML = `
        <td>${instr.codigo}</td>
        <td>${instr.nombre}</td>
        <td>${instr.marca}</td>
        <td>${instr.precioBase || instr.precio || "-"}</td>
        <td>${instr.stock}</td>
        <td>${instr.fechaIngreso || "-"}</td>
        <td>${instr.type || "-"}</td>
      `;
  
      tablaBody.appendChild(fila);
    });
  }
  
  // Configurar filtros del modal
  function configurarFiltros() {
    const formFiltros = document.getElementById("form-filtros");
  
    formFiltros.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const filtro = {};
  
      const nombreChk = document.getElementById("chk-nombre");
      const marcaChk = document.getElementById("chk-marca");
      const precioMinChk = document.getElementById("chk-preciomin");
      const precioMaxChk = document.getElementById("chk-preciomax");
      const stockMinChk = document.getElementById("chk-stockmin");
      const stockMaxChk = document.getElementById("chk-stockmax");
  
      const inputs = formFiltros.querySelectorAll("input[type='text'], input[type='number']");
  
      if (nombreChk.checked) filtro.nombre = inputs[0].value.trim();
      if (marcaChk.checked) filtro.marca = inputs[1].value.trim();
      if (precioMinChk.checked) filtro.precioMin = inputs[2].value;
      if (precioMaxChk.checked) filtro.precioMax = inputs[3].value;
      if (stockMinChk.checked) filtro.stockMin = inputs[4].value;
      if (stockMaxChk.checked) filtro.stockMax = inputs[5].value;
  
      try {
        // 👀 Importante: tu API usa GET con @RequestBody, pero fetch con GET no permite body.
        // Mejor hacemos POST si tu backend lo acepta. 
        // Si no, habría que cambiar el controlador a @PostMapping("/filtrar")
        const response = await fetch(`${BASE_URL}/filtrar`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(filtro)
        });
        const instrumentos = await response.json();
        renderizarTabla(instrumentos);
      } catch (error) {
        console.error("Error aplicando filtros:", error);
      }
    });
  }
  