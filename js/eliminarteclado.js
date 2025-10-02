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

    // ✅ llenar los campos solo si el instrumento es de tipo teclado
    if (instrumento.type !== "teclado") {
      alert("El código corresponde a otro tipo de instrumento, no a un teclado ⚠️");
      limpiarCampos();
      return;
    }

    // Rellenar campos con el teclado encontrado
    document.getElementById("input-name").value = instrumento.nombre || "";
    document.getElementById("input-brand").value = instrumento.marca || "";
    document.getElementById("input-price").value = instrumento.precioBase || "";
    document.getElementById("input-stock").value = instrumento.stock || "";
    document.getElementById("input-date").value = instrumento.fechaIngreso || "";
    document.getElementById("input-keys").value = instrumento.numeroTeclas || "";
    document.getElementById("input-type").value = instrumento.digital ? "Digital" : "Analógico";
    document.getElementById("input-sensitivity").value = instrumento.sensibilidad || "";

  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al buscar el teclado ❌");
  }
});

// =====================
// Eliminar teclado
// =====================
document.getElementById("btn-delete").addEventListener("click", async () => {
  const codigo = document.getElementById("input-code").value.trim();

  if (!codigo) {
    alert("Primero busca un teclado antes de eliminar ⚠️");
    return;
  }

  const confirmar = confirm(`¿Seguro que deseas eliminar el teclado con código ${codigo}? Esta acción no se puede deshacer.`);
  if (!confirmar) return;

  try {
    const response = await eliminarInstrumento(codigo);

    if (response) {
      alert("Teclado eliminado correctamente ✅");
      limpiarCampos();
    } else {
      alert("Hubo un problema al eliminar el teclado ❌");
    }
  } catch (error) {
    console.error("Error:", error);

    if (error.message.includes("404")) {
      alert("El teclado no existe (404)");
    } else {
      alert("Error inesperado al eliminar el teclado ❌");
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
