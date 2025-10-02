// =====================
// Buscar guitarra por código
// =====================
document.getElementById("btn-search-guitar").addEventListener("click", async () => {
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

    // ✅ llenar los campos solo si el instrumento es de tipo guitarra
    if (instrumento.type !== "guitarra") {
      alert("El código corresponde a otro tipo de instrumento, no a una guitarra ⚠️");
      limpiarCampos();
      return;
    }

    // Rellenar campos con la guitarra encontrada
    document.getElementById("input-name").value = instrumento.nombre || "";
    document.getElementById("input-brand").value = instrumento.marca || "";
    document.getElementById("input-price").value = instrumento.precioBase || "";
    document.getElementById("input-stock").value = instrumento.stock || "";
    document.getElementById("input-date").value = instrumento.fechaIngreso || "";
    document.getElementById("input-type").value = instrumento.tipo || "";
    document.getElementById("input-material").value = instrumento.materialCuerpo || "";

  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al buscar la guitarra ❌");
  }
});

// =====================
// Actualizar guitarra (sin fundas)
// =====================
document.getElementById("btn-update").addEventListener("click", async () => {
  const codigo = document.getElementById("input-code").value.trim();

  if (!codigo) {
    alert("Primero busca una guitarra antes de actualizar ⚠️");
    return;
  }

  const guitarraModificada = {
    type: "guitarra",
    codigo: codigo,
    nombre: document.getElementById("input-name").value.trim(),
    marca: document.getElementById("input-brand").value.trim(),
    precioBase: parseFloat(document.getElementById("input-price").value) || 0,
    stock: parseInt(document.getElementById("input-stock").value) || 0,
    fechaIngreso: document.getElementById("input-date").value.trim(),
    tipo: document.getElementById("input-type").value.trim(),
    materialCuerpo: document.getElementById("input-material").value.trim()
    // 🔥 sin "fundas" aquí, se maneja con su endpoint
  };

  try {
    const response = await editarInstrumento(codigo, guitarraModificada);

    if (response) {
      alert("Guitarra actualizada correctamente ✅");
      limpiarCampos();
    } else {
      alert("Hubo un problema al actualizar la guitarra ❌");
    }
  } catch (error) {
    console.error("Error:", error);

    if (error.message.includes("404")) {
      alert("La guitarra no existe (404)");
    } else if (error.message.includes("409")) {
      alert("Ya existe un instrumento con ese código (409)");
    } else {
      alert("Error inesperado al actualizar la guitarra ❌");
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
  document.getElementById("input-type").value = "";
  document.getElementById("input-material").value = "";
  // 🔥 eliminé el input-case porque ya no aplica
}
