// =====================
// Buscar guitarra por código
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
    document.getElementById("input-case").value =
        instrumento.fundas && instrumento.fundas.length > 0
          ? instrumento.fundas.map(f => f.nombre || f).join(", ")
          : "";

  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al buscar la guitarra ❌");
  }
});

// =====================
// Eliminar guitarra
// =====================
document.getElementById("btn-delete").addEventListener("click", async () => {
  const codigo = document.getElementById("input-code").value.trim();

  if (!codigo) {
    alert("Primero busca una guitarra antes de eliminar ⚠️");
    return;
  }

  const confirmar = confirm(`¿Seguro que deseas eliminar la guitarra con código ${codigo}? Esta acción no se puede deshacer.`);
  if (!confirmar) return;

  try {
    const response = await eliminarInstrumento(codigo);

    if (response) {
      alert("Guitarra eliminada correctamente ✅");
      limpiarCampos();
    } else {
      alert("Hubo un problema al eliminar la guitarra ❌");
    }
  } catch (error) {
    console.error("Error:", error);

    if (error.message.includes("404")) {
      alert("La guitarra no existe (404)");
    } else {
      alert("Error inesperado al eliminar la guitarra ❌");
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
  document.getElementById("input-case").value = "";
}
