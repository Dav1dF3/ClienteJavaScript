// === AGREGARTECLADO.JS ===

document.addEventListener("DOMContentLoaded", () => {
    const btnAdd = document.getElementById("btn-add-keyboard");
    btnAdd.addEventListener("click", agregarTeclado);
});

// Agregar teclado
async function agregarTeclado() {
    // Convertir fecha de dd/mm/yyyy a yyyy-mm-dd
    let fechaInput = document.getElementById("input-date-keyboard").value.trim();
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

    // Obtener valor de digital (true si seleccionó Digital, false si seleccionó Analógico)
    let digital = null;
    if (document.getElementById("input-digital").checked) {
        digital = true;
    } else if (document.getElementById("input-analog").checked) {
        digital = false;
    }

    // Datos básicos del teclado
    const teclado = {
        type: "teclado",
        codigo: document.getElementById("input-code-keyboard").value.trim(),
        nombre: document.getElementById("input-name-keyboard").value.trim(),
        marca: document.getElementById("input-brand-keyboard").value.trim(),
        precioBase: parseFloat(document.getElementById("input-price-keyboard").value) || 0,
        stock: parseInt(document.getElementById("input-stock-keyboard").value) || 0,
        fechaIngreso: fechaIngreso,
        numeroTeclas: parseInt(document.getElementById("input-keys-keyboard").value) || 0,
        digital: digital,
        sensibilidad: mapSensibilidad(document.getElementById("select-sensitivity-keyboard").value)
    };

    console.log("JSON teclado listo para API:", teclado);

    // Llamar al backend
    try {
        const response = await fetch(BASE_URL, {
          method: "POST",
          headers: headers, // definidos en config.js
          body: JSON.stringify(teclado) // o teclado según corresponda
        });
      
        if (response.status === 409) {
          alert("❌ El código ya existe. No puedes registrar un duplicado.");
          return; // detenemos aquí para no continuar con la lógica de éxito
        }
      
        if (!response.ok) {
          throw new Error("Error al guardar el teclado");
        }
      
        alert("✅ Teclado agregada correctamente");
      
      } catch (error) {
        console.error("Error:", error);
        alert("Hubo un error al agregar el teclado ❌");
      }
}

// Mapeo de sensibilidad (para que coincida con lo que espera tu API)
function mapSensibilidad(valor) {
    switch (valor) {
        case "none": return "Ninguna";
        case "basic": return "Básica";
        case "medium": return "Media";
        case "high": return "Alta";
        case "pro": return "Profesional";
        default: return "-";
    }
}
