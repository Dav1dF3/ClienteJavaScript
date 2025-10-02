document.addEventListener("DOMContentLoaded", () => {
  const formFiltros = document.getElementById("form-filtros");
  const tablaBody = document.getElementById("tabla-body");

  formFiltros.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Construir objeto filtro con todas las claves que el backend espera
    const filtro = {
      nombre: null,
      marca: null,
      precioMin: null,
      precioMax: null,
      stockMin: null,
      stockMax: null,
      tipoGuitarra: null,
      sensibilidad: null
    };

    // Nombre
    if (document.getElementById("chk-nombre").checked) {
      const val = document.querySelector("#chk-nombre + label + input").value.trim();
      filtro.nombre = val !== "" ? val : null;
    }

    // Marca
    if (document.getElementById("chk-marca").checked) {
      const val = document.querySelector("#chk-marca + label + input").value.trim();
      filtro.marca = val !== "" ? val : null;
    }

    // Precio mínimo
    if (document.getElementById("chk-preciomin").checked) {
      const val = document.querySelector("#chk-preciomin + label + input").value;
      filtro.precioMin = val !== "" ? parseFloat(val) : null;
    }

    // Precio máximo
    if (document.getElementById("chk-preciomax").checked) {
      const val = document.querySelector("#chk-preciomax + label + input").value;
      filtro.precioMax = val !== "" ? parseFloat(val) : null;
    }

    // Stock mínimo
    if (document.getElementById("chk-stockmin").checked) {
      const val = document.querySelector("#chk-stockmin + label + input").value;
      filtro.stockMin = val !== "" ? parseInt(val) : null;
    }

    // Stock máximo
    if (document.getElementById("chk-stockmax").checked) {
      const val = document.querySelector("#chk-stockmax + label + input").value;
      filtro.stockMax = val !== "" ? parseInt(val) : null;
    }

    console.log("Objeto filtro a enviar:", filtro);

    try {
      const response = await fetch(`${BASE_URL}/filtrar`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(filtro)
      });

      if (!response.ok) {
        throw new Error("Error al aplicar filtros");
      }

      const data = await response.json();
      console.log("Respuesta del backend:", data);

      cargarTabla(data);

      document.getElementById("modal-filtros").style.display = "none";

    } catch (error) {
      console.error(error);
      alert("Hubo un error al filtrar los instrumentos ❌");
    }
  });

  function cargarTabla(instrumentos) {
    tablaBody.innerHTML = "";

    if (!instrumentos || instrumentos.length === 0) {
      tablaBody.innerHTML = `<tr><td colspan="7">No se encontraron resultados</td></tr>`;
      return;
    }

    instrumentos.forEach(inst => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${inst.codigo || ""}</td>
        <td>${inst.nombre || ""}</td>
        <td>${inst.marca || ""}</td>
        <td>${inst.precioBase || ""}</td>
        <td>${inst.stock || ""}</td>
        <td>${inst.fechaIngreso || ""}</td>
        <td>${inst.type || ""}</td>
      `;

      tablaBody.appendChild(row);
    });
  }
});
