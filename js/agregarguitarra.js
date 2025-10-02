// === AGREGARGUITARRA.JS ===

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const btnAdd = document.getElementById("btn-add-guitar");
  btnAdd.addEventListener("click", agregarGuitarra);

  // Mostrar/ocultar campos de funda
  const fundaSi = document.getElementById("funda-si");
  const fundaNo = document.getElementById("funda-no");

  fundaSi.addEventListener("change", toggleCamposFunda);
  fundaNo.addEventListener("change", toggleCamposFunda);

  toggleCamposFunda(); // inicial
});

// Mostrar/ocultar campos funda
function toggleCamposFunda() {
  const mostrar = document.getElementById("funda-si").checked;
  document.getElementById("row-code-case").style.display = mostrar ? "" : "none";
  document.getElementById("row-name-case").style.display = mostrar ? "" : "none";
  document.getElementById("row-price-case").style.display = mostrar ? "" : "none";
}

// Agregar guitarra
async function agregarGuitarra() {
  // Convertir fecha de dd/mm/yyyy a yyyy-mm-dd
  let fechaInput = document.getElementById("input-date-guitar").value.trim();
  let fechaIngreso = "";
  if (fechaInput) {
    const partes = fechaInput.split("/"); // [dd, mm, yyyy]
    if (partes.length === 3) {
      const dia = partes[0].padStart(2, "0");
      const mes = partes[1].padStart(2, "0");
      const anio = partes[2];
      fechaIngreso = `${anio}-${mes}-${dia}`;
    }
  }

  // Datos básicos de la guitarra
  const guitarra = {
    type: "guitarra",
    codigo: document.getElementById("input-code-guitar").value.trim(),
    nombre: document.getElementById("input-name-guitar").value.trim(),
    marca: document.getElementById("input-brand-guitar").value.trim(),
    precioBase: parseFloat(document.getElementById("input-price-guitar").value) || 0,
    stock: parseInt(document.getElementById("input-stock-guitar").value) || 0,
    fechaIngreso: fechaIngreso,
    tipo: document.getElementById("select-type-guitar").value,
    materialCuerpo: document.getElementById("input-material-guitar").value.trim(),
    fundas: []
  };

  // Si se eligió "sí funda", armar objeto funda
  if (document.getElementById("funda-si").checked) {
    const funda = {
      codigo: document.getElementById("input-code-case").value.trim(),
      nombre: document.getElementById("input-name-case").value.trim(),
      precio: parseFloat(document.getElementById("input-price-case").value) || 0
    };

    // Validar que al menos tenga código/nombre
    if (funda.codigo || funda.nombre) {
      guitarra.fundas.push(funda);
    }
  }

  console.log("JSON guitarra listo para API:", guitarra);

  // Llamar al backend
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: headers, // definidos en config.js
      body: JSON.stringify(guitarra) // o teclado según corresponda
    });

    if (response.status === 409) {
      alert("❌ El código ya existe. No puedes registrar un duplicado.");
      return; // detenemos aquí para no continuar con la lógica de éxito
    }

    if (!response.ok) {
      throw new Error("Error al guardar la guitarra");
    }

    alert("✅ Guitarra agregada correctamente");
    limpiarCampos();

  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al agregar la guitarra ❌");
  }

  // =====================
  // Limpiar campos del formulario de guitarra
  // =====================
  function limpiarCampos() {
    // Campos de la guitarra
    document.getElementById("input-code-guitar").value = "";
    document.getElementById("input-name-guitar").value = "";
    document.getElementById("input-brand-guitar").value = "";
    document.getElementById("input-price-guitar").value = "";
    document.getElementById("input-stock-guitar").value = "";
    document.getElementById("input-date-guitar").value = "";
    document.getElementById("select-type-guitar").selectedIndex = 0;
    document.getElementById("input-material-guitar").value = "";

    // Campos de la funda
    document.getElementById("input-code-case").value = "";
    document.getElementById("input-name-case").value = "";
    document.getElementById("input-price-case").value = "";

    // Resetear radios de funda
    document.getElementById("funda-no").checked = true;
    toggleCamposFunda(); // para ocultar campos si se marcó "no"
  }

}
