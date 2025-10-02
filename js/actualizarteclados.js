// =====================
// Buscar teclado por código
// =====================
document.getElementById("btn-search").addEventListener("click", async () => {
  const codigo = document.getElementById("input-code").value.trim();

  if (!codigo) {
    alert("Por favor ingresa un código para buscar");
    return;
  }

  try {
    const instrumento = await buscarInstrumento(codigo);

    if (!instrumento) {
      alert("No se encontró ningún instrumento con ese código ❌");
      limpiarCampos();
      return;
    }

    // Validar que sea un teclado
    if (instrumento.type !== "teclado") {
      alert("El código corresponde a otro tipo de instrumento, no a un teclado ⚠️");
      limpiarCampos();
      return;
    }

    // ✅ Llenar los campos
    document.getElementById("input-name").value = instrumento.nombre || "";
    document.getElementById("input-brand").value = instrumento.marca || "";
    document.getElementById("input-price").value = instrumento.precioBase || "";
    document.getElementById("input-stock").value = instrumento.stock || "";
    document.getElementById("input-date").value = instrumento.fechaIngreso || "";
    document.getElementById("input-keys").value = instrumento.numeroTeclas || "";

    // 👇 Mostrar "Digital" o "Analógico" según booleano
    document.getElementById("input-type").value = instrumento.digital ? "Digital" : "Analógico";

    document.getElementById("input-sensitivity").value = instrumento.sensibilidad || "";

  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al buscar el teclado ❌");
  }
});

// =====================
// Actualizar teclado
// =====================
document.getElementById("btn-update").addEventListener("click", async () => {
  const codigo = document.getElementById("input-code").value.trim();

  if (!codigo) {
    alert("Primero busca un teclado antes de actualizar ⚠️");
    return;
  }

  // 👇 Convertir texto en booleano
  const tipoTexto = document.getElementById("input-type").value.trim().toLowerCase();
  const esDigital = tipoTexto === "digital";

  const tecladoModificado = {
    type: "teclado",
    codigo: codigo,
    nombre: document.getElementById("input-name").value.trim(),
    marca: document.getElementById("input-brand").value.trim(),
    precioBase: parseFloat(document.getElementById("input-price").value) || 0,
    stock: parseInt(document.getElementById("input-stock").value) || 0,
    fechaIngreso: document.getElementById("input-date").value.trim(),
    numeroTeclas: parseInt(document.getElementById("input-keys").value) || 0,
    digital: esDigital, // ← true si el texto es "Digital"
    sensibilidad: document.getElementById("input-sensitivity").value.trim()
  };

  try {
    const response = await editarInstrumento(codigo, tecladoModificado);

    if (response) {
      alert("✅ Teclado actualizado correctamente");
      limpiarCampos();
    } else {
      alert("❌ Hubo un problema al actualizar el teclado");
    }
  } catch (error) {
    console.error("Error:", error);

    if (error.message.includes("404")) {
      alert("El teclado no existe (404)");
    } else if (error.message.includes("409")) {
      alert("Ya existe un instrumento con ese código (409)");
    } else {
      alert("Error inesperado al actualizar el teclado ❌");
    }
  }
});

// =====================
// Limpiar campos
// =====================
function limpiarCampos() {
  document.getElementById("input-name").value = "";
  document.getElementById("input-brand").value = "";
  document.getElementById("input-price").value = "";
  document.getElementById("input-stock").value = "";
  document.getElementById("input-date").value = "";
  document.getElementById("input-keys").value = "";
  document.getElementById("input-type").value = "";
  document.getElementById("input-sensitivity").value = "";
}
